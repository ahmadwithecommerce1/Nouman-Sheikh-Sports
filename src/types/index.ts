export type SportsCategory =
  | 'All'
  | 'Cricket'
  | 'Football'
  | 'Gym & Fitness'
  | 'Racket Sports'
  | 'Outdoor & Athletics';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Cricket' | 'Football' | 'Gym & Fitness' | 'Racket Sports' | 'Outdoor & Athletics';
  subCategory?: string;
  categoryPath?: string; // e.g. "Sports/Cricket/Bats" or "Sports > Cricket > Bats"
  categoryHierarchy?: string[]; // e.g. ["Sports", "Cricket", "Bats"]
  brand: string;
  price: number; // Current active selling price (discounted price if discount exists)
  originalPrice?: number; // Pre-discount price
  discountPercent?: number; // e.g. 15 for 15% OFF
  rating: number;
  reviewsCount: number;
  image: string; // Primary image
  gallery: string[]; // Up to 4 images
  videoUrl?: string; // Optional product preview video URL or file data
  tagline: string;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  badge?: string;
  isTrending: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  contactName: string;
  storeName: string;
  tagline: string;
  currency: string;
  email: string;
  phone: string;
  address: string;
  operatingHours: string;
  announcementText: string;
}

export type ActivePage = 'home' | 'shop' | 'product-detail' | 'about' | 'contact' | 'admin';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customNote?: string;
}

export interface WhatsAppInquiryLog {
  id: string;
  timestamp: string;
  productName: string;
  price: number;
  imageUrl: string;
  whatsappUrl: string;
}
