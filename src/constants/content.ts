/**
 * 프로젝트 전역 콘텐츠 관리
 * 텍스트와 이미지 경로는 content.json에서 불러와 내보내며, 기존 컴포넌트와의 호환성을 유지합니다.
 */

import contentJson from "./content.json";

export const SITE_CONFIG = contentJson.SITE_CONFIG;
export const NAV_LINKS = contentJson.NAV_LINKS;
export const HERO_CONTENT = contentJson.HERO_CONTENT;
export const ABOUT_CONTENT = contentJson.ABOUT_CONTENT;
export const TECHNOLOGY_CONTENT = contentJson.TECHNOLOGY_CONTENT;
export const PRODUCTS_CONTENT = contentJson.PRODUCTS_CONTENT;
export const RENTAL_CONTENT = contentJson.RENTAL_CONTENT;
export const CONTACT_CONTENT = contentJson.CONTACT_CONTENT;
export const FOOTER_CONTENT = contentJson.FOOTER_CONTENT;
export const IMAGES = contentJson.IMAGES;
