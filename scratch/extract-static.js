const fs = require('fs');
const path = require('path');
const http = require('http');

const OUTPUT_DIR = path.join(__dirname, '..', 'figma');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Helper to download content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

// Helper to recursively copy directories
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function main() {
  console.log('Starting static export for Figma...');

  // 1. Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 2. Fetch HTML from local dev server
  let html = '';
  try {
    html = await fetchUrl('http://localhost:3000/');
  } catch (err) {
    console.error('Error fetching homepage from localhost:3000. Is the dev server running?', err);
    process.exit(1);
  }

  // 3. Find and extract all CSS files
  const cssRegex = /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g;
  let match;
  let combinedCss = '';
  const cssUrls = [];

  while ((match = cssRegex.exec(html)) !== null) {
    const cssPath = match[1];
    if (cssPath.startsWith('/')) {
      cssUrls.push(cssPath);
    }
  }

  console.log(`Found ${cssUrls.length} stylesheet(s). Downloading...`);

  for (const cssUrl of cssUrls) {
    try {
      const fullUrl = `http://localhost:3000${cssUrl}`;
      const cssContent = await fetchUrl(fullUrl);
      combinedCss += `/* --- ${cssUrl} --- */\n` + cssContent + '\n\n';
    } catch (err) {
      console.error(`Failed to download CSS from ${cssUrl}`, err);
    }
  }

  // Write CSS
  fs.writeFileSync(path.join(OUTPUT_DIR, 'styles.css'), combinedCss, 'utf8');
  console.log('Saved combined stylesheet to figma/styles.css');

  // 4. Clean HTML and replace stylesheet links
  // Remove all existing stylesheet links
  let cleanHtml = html.replace(/<link[^>]+rel="stylesheet"[^>]+href="[^"]+"[^>]*>/g, '');
  
  // Insert the single styles.css link in head
  cleanHtml = cleanHtml.replace('</head>', '  <link rel="stylesheet" href="styles.css">\n</head>');

  // Remove next.js specific scripts/data to clean up HTML for Figma import
  cleanHtml = cleanHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  cleanHtml = cleanHtml.replace(/<next-route-announcer>[\s\S]*?<\/next-route-announcer>/gi, '');
  cleanHtml = cleanHtml.replace(/<div id="__next-prerender-indicator"[\s\S]*?<\/div>/gi, '');

  // 5. Write HTML
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), cleanHtml, 'utf8');
  console.log('Saved cleaned HTML to figma/index.html');

  // 6. Copy assets
  console.log('Copying images and uploads from public directory...');
  copyDir(path.join(PUBLIC_DIR, 'images'), path.join(OUTPUT_DIR, 'images'));
  copyDir(path.join(PUBLIC_DIR, 'uploads'), path.join(OUTPUT_DIR, 'uploads'));
  
  console.log('Export completed successfully! Check the "figma" folder.');
}

main();
