export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatPrice(price: string): string {
  return `₩${parseInt(price).toLocaleString("ko-KR")}`;
}
