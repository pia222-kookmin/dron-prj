import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'], // 관리자 페이지와 API 경로는 검색엔진 수집 차단
    },
    sitemap: 'https://automobi.kookmin.ac.kr/sitemap.xml',
  };
}
