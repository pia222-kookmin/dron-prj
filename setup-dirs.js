const fs = require('fs');
const path = require('path');

const dirs = [
  'src/app',
  'src/components/ui',
  'src/components/layout',
  'src/components/sections',
  'src/components/icons',
  'src/constants',
  'src/hooks',
  'src/lib',
  'src/types',
  'public/images/products'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  fs.mkdirSync(fullPath, { recursive: true });
  
  // Create .gitkeep file in each directory
  const gitkeepPath = path.join(fullPath, '.gitkeep');
  fs.writeFileSync(gitkeepPath, '');
  
  console.log('✓ Created:', fullPath);
  console.log('✓ Created:', gitkeepPath);
});

console.log('\nAll directories and .gitkeep files created!');
