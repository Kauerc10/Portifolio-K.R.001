export function buildWhatsAppUrl(message: string): string {
  const phone = '5547991370418';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
