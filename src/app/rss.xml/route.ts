export async function GET() {
  const siteUrl = 'https://automobi.kookmin.ac.kr';
  const siteTitle = 'OTTOMOBI | 차세대 드론 엔진 기술';
  const siteDescription = '고성능 드론 엔진 개발 및 대여 서비스. 기술 혁신 기업의 첨단 드론 추진 시스템.';

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${siteTitle}</title>
      <link>${siteUrl}</link>
      <description>${siteDescription}</description>
      <language>ko</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <item>
        <title>${siteTitle}</title>
        <link>${siteUrl}</link>
        <description>${siteDescription}</description>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <guid>${siteUrl}</guid>
      </item>
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
