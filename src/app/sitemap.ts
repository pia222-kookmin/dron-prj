import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://automobi.kookmin.ac.kr',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // 관리자 페이지는 구글에 검색되지 않도록 제외 (robots.ts에서도 차단)
  ];
}
