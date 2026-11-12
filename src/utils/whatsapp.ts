import { Product, StoreSettings } from '../types';

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export interface BuildWhatsAppOrderParams {
  product: Product;
  settings: StoreSettings;
  customNotes?: string;
}

export function buildWhatsAppOrderUrl({
  product,
  settings,
  customNotes,
}: BuildWhatsAppOrderParams): string {
  const phone = cleanPhoneNumber(settings.whatsappNumber || '923321460134');
  
  // Format absolute image URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://sheikhnoumansports.com';
  const fullImageUrl = product.image.startsWith('http') 
    ? product.image 
    : `${origin}${product.image}`;
  const productUrl = `${origin}?page=product-detail&id=${product.id}`;
  const formattedPrice = `${settings.currency} ${product.price.toLocaleString()}`;

  const messageLines = [
    `Salam ${settings.storeName},`,
    ``,
    `I would like to order this item:`,
    `🏆 *Product:* ${product.name}`,
    `🏷️ *Price:* ${formattedPrice}`,
    `⚡ *Brand:* ${product.brand}`,
    `📦 *Category:* ${product.category}`,
    `🖼️ *Product Image:* ${fullImageUrl}`,
    `🔗 *Store Link:* ${productUrl}`,
  ];

  if (customNotes && customNotes.trim().length > 0) {
    messageLines.push(`📝 *Note/Variant:* ${customNotes.trim()}`);
  }

  messageLines.push(``);
  messageLines.push(`Please confirm stock availability and delivery instructions.`);

  const fullText = messageLines.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(fullText)}`;
}

export interface BuildCartWhatsAppOrderParams {
  items: {
    product: Product;
    quantity: number;
    customNote?: string;
  }[];
  totalPrice: number;
  settings: StoreSettings;
  customerInfo?: {
    name?: string;
    phone?: string;
    city?: string;
    address?: string;
  };
}

export function buildCartWhatsAppOrderUrl({
  items,
  totalPrice,
  settings,
  customerInfo,
}: BuildCartWhatsAppOrderParams): string {
  const phone = cleanPhoneNumber(settings.whatsappNumber || '923321460134');
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://sheikhnoumansports.com';

  const messageLines = [
    `Salam ${settings.storeName},`,
    ``,
    `🛒 *New Sports Equipment Basket Order:*`,
    ``,
  ];

  items.forEach((item, index) => {
    const subtotal = item.product.price * item.quantity;
    const fullImg = item.product.image.startsWith('http')
      ? item.product.image
      : `${origin}${item.product.image}`;

    messageLines.push(`${index + 1}. *${item.product.name}*`);
    messageLines.push(`   - Qty: ${item.quantity} × ${settings.currency} ${item.product.price.toLocaleString()} = ${settings.currency} ${subtotal.toLocaleString()}`);
    messageLines.push(`   - Brand: ${item.product.brand} | Cat: ${item.product.category}`);
    if (item.customNote && item.customNote.trim()) {
      messageLines.push(`   - Note: ${item.customNote.trim()}`);
    }
    messageLines.push(`   - Image: ${fullImg}`);
    messageLines.push(``);
  });

  messageLines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  messageLines.push(`💰 *Total Amount:* ${settings.currency} ${totalPrice.toLocaleString()}`);
  messageLines.push(`📦 *Items in Basket:* ${items.reduce((sum, it) => sum + it.quantity, 0)}`);

  if (customerInfo && (customerInfo.name || customerInfo.city || customerInfo.address)) {
    messageLines.push(``);
    messageLines.push(`📋 *Delivery Details:*`);
    if (customerInfo.name) messageLines.push(`   - Customer: ${customerInfo.name}`);
    if (customerInfo.phone) messageLines.push(`   - Contact: ${customerInfo.phone}`);
    if (customerInfo.city) messageLines.push(`   - City: ${customerInfo.city}`);
    if (customerInfo.address) messageLines.push(`   - Address: ${customerInfo.address}`);
  }

  messageLines.push(``);
  messageLines.push(`Please confirm stock availability and courier delivery timeline.`);

  const fullText = messageLines.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(fullText)}`;
}

export function buildGeneralContactUrl(settings: StoreSettings, topic?: string): string {
  const phone = cleanPhoneNumber(settings.whatsappNumber || '923321460134');
  const text = topic
    ? `Salam ${settings.storeName}, I have an inquiry regarding: ${topic}`
    : `Salam ${settings.storeName}, I would like to inquire about sports gear and bulk team orders.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
