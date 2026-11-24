import { Product, StoreSettings, WhatsAppInquiryLog } from '../types';
import { firebaseRealtimeAdapter } from './firebaseRealtimeAdapter';

export const INITIAL_SETTINGS: StoreSettings = {
  whatsappNumber: '923321460134',
  contactName: 'Nouman Sheikh',
  storeName: 'Sheikh Nouman Sports',
  tagline: 'Engineered for Champions · Elite Athletic Equipment',
  currency: 'Rs.',
  email: 'sales@sheikhnoumansports.com',
  phone: '+92 332 1460134',
  address: 'Shop 14-16, Olympic Arcade, Nishtar Sports Complex, Lahore, Pakistan',
  operatingHours: 'Monday – Saturday: 10:00 AM – 10:00 PM PKT',
  announcementText: '⚡ Official Match Gear & Pro Equipment · Fast Nationwide Courier Dispatch',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'sns-001',
    name: 'Sheikh Nouman Pro Edition English Willow Cricket Bat',
    slug: 'sheikh-nouman-pro-edition-english-willow-bat',
    category: 'Cricket',
    subCategory: 'Bats',
    categoryPath: 'Sports/Cricket/Bats',
    categoryHierarchy: ['Sports', 'Cricket', 'Bats'],
    brand: 'Sheikh Nouman Pro',
    price: 45000,
    originalPrice: 52000,
    discountPercent: 13,
    rating: 4.9,
    reviewsCount: 38,
    image: '/src/assets/images/product_pro_cricket_bat_1794237555691.jpg',
    gallery: [
      '/src/assets/images/product_pro_cricket_bat_1794237555691.jpg',
      '/src/assets/images/sports_hero_banner_1794237555222.jpg',
    ],
    tagline: 'Hand-pressed Grade 1+ English Willow with massive 40mm contoured edges',
    description:
      'The crown jewel of Sheikh Nouman Sports. Handcrafted by master bat-makers from seasoned Grade 1+ clefts of genuine English Willow. Features a mid-to-low sweet spot engineered for explosive boundary hitting on subcontinental pitches. Balanced to perfection with a feather-light pickup.',
    specifications: {
      'Willow Grade': 'Grade 1+ Hand-Selected English Willow',
      'Edge Profile': '40mm - 42mm Massive Power Bulge',
      'Grain Count': '8 - 11 Straight Even Grains',
      'Weight Range': '2 lbs 7 oz – 2 lbs 9 oz (1100g - 1160g)',
      'Handle': '12-Piece Semi-Oval Saravak Cane with Chevron Grip',
      'Pre-Knocked': 'Factory oiled & machine hammered (3,000 strikes)',
      'Warranty': '1 Year Full Handle & Blade Guarantee',
    },
    inStock: true,
    badge: 'Pro Grade',
    isTrending: true,
    isFeatured: true,
    createdAt: '2026-10-12',
  },
  {
    id: 'sns-002',
    name: 'Ultra Match Pro FIFA Quality Soccer Football',
    slug: 'ultra-match-pro-fifa-quality-soccer-football',
    category: 'Football',
    subCategory: 'Match Balls',
    categoryPath: 'Sports/Football/Match Balls',
    categoryHierarchy: ['Sports', 'Football', 'Match Balls'],
    brand: 'Nike',
    price: 14500,
    originalPrice: 17000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 42,
    image: '/src/assets/images/product_match_football_1794237554505.jpg',
    gallery: [
      '/src/assets/images/product_match_football_1794237554505.jpg',
    ],
    tagline: 'Thermo-bonded seamless official size 5 match ball with textured aerodynamics',
    description:
      'Engineered for peak aerodynamic stability and zero water absorption. Constructed with a 32-panel thermo-bonded polyurethane casing and micro-dimpled surface texture for true flight trajectories. Backed by a high-rebound butyl bladder that maintains optimum air pressure across 90 minutes of high-intensity play.',
    specifications: {
      'Standard Size': 'Official Size 5 (Ages 12+ and Adult Match)',
      'Construction': 'Seamless Thermo-Bonded Technology (Zero Stitching)',
      'Outer Casing': '1.2mm Textured PU Leather with Dimple Flow Tech',
      'Bladder': 'Zero-Leak Taiwan Butyl Wrapped with Polyester Cord',
      'Certification': 'FIFA Quality Pro Equivalent Ballistic Spec',
      'Recommended Pitch': 'Natural Grass, 4G Artificial Turf, Indoor Arenas',
    },
    inStock: true,
    badge: 'Official Match',
    isTrending: true,
    isFeatured: true,
    createdAt: '2026-10-18',
  },
  {
    id: 'sns-003',
    name: 'Hex Rubber Olympic Dumbbells (20kg Pair)',
    slug: 'hex-rubber-olympic-dumbbells-20kg-pair',
    category: 'Gym & Fitness',
    brand: 'Sheikh Nouman Pro',
    price: 26000,
    originalPrice: 30000,
    rating: 5.0,
    reviewsCount: 29,
    image: '/src/assets/images/product_gym_dumbbells_1794237556788.jpg',
    gallery: [
      '/src/assets/images/product_gym_dumbbells_1794237556788.jpg',
    ],
    tagline: 'Heavy-duty virgin rubber encased heads with diamond knurled chrome handles',
    description:
      'Engineered for commercial fitness facilities and home gym powerhouses. The six-sided anti-roll hex heads are molded from premium high-density virgin rubber to minimize floor noise and eliminate scuffing. Heavy-gauge solid steel handles feature precision diamond knurling for a non-slip, chalk-friendly grip.',
    specifications: {
      'Total Weight': '20kg each (40kg Pair Total)',
      'Head Coating': 'High-Density Virgin Rubber (Odor-Free)',
      'Handle Construction': 'Solid Hard Chrome Ergonomic Steel Bar',
      'Grip Diameter': '28mm Standard Olympic Contour',
      'Joint Integrity': 'Friction-Welded Core (Will Never Loosen)',
      'Finish': 'Matte Black with Debossed Weight Mold',
    },
    inStock: true,
    badge: 'Heavy Duty',
    isTrending: true,
    isFeatured: true,
    createdAt: '2026-10-25',
  },
  {
    id: 'sns-004',
    name: 'AeroSpeed High-Modulus Carbon Fiber Badminton Racket',
    slug: 'aerospeed-high-modulus-carbon-fiber-badminton-racket',
    category: 'Racket Sports',
    brand: 'Yonex',
    price: 18500,
    originalPrice: 22000,
    rating: 4.9,
    reviewsCount: 31,
    image: '/src/assets/images/product_carbon_badminton_1794237558192.jpg',
    gallery: [
      '/src/assets/images/product_carbon_badminton_1794237558192.jpg',
    ],
    tagline: 'Ultra-lightweight 4U frame with 30 lbs string tension capacity',
    description:
      'Dominate the court with blistering smash velocities and pinpoint defensive touch. Forged from Japanese High-Modulus Toray Carbon Fiber with an aerodynamic sword frame design that slices through air drag. Strung with pre-stretched BG65 Ti strings with cushioned perforated leather grip.',
    specifications: {
      'Frame Material': '30T High-Modulus Japanese Carbon Graphite',
      'Weight Category': '4U (82g ± 2g unstrung)',
      'Balance Point': '295mm (Head Heavy for Attacking Smashes)',
      'Tension Capacity': 'Pre-strung at 26 lbs, Supports up to 30 lbs',
      'Grip Size': 'G5 with Sweat-Resistant Perforated Overgrip',
      'Included': 'Full Thermo-Insulated Protective Racket Cover',
    },
    inStock: true,
    badge: 'Best Seller',
    isTrending: false,
    isFeatured: true,
    createdAt: '2026-11-01',
  },
  {
    id: 'sns-005',
    name: 'CA Plus 15000 7-Star Batting Legguards & Gloves Kit',
    slug: 'ca-plus-15000-7-star-batting-kit',
    category: 'Cricket',
    brand: 'CA Plus',
    price: 32000,
    originalPrice: 38000,
    rating: 4.8,
    reviewsCount: 24,
    image: '/src/assets/images/product_pro_cricket_bat_1794237555691.jpg',
    gallery: [
      '/src/assets/images/product_pro_cricket_bat_1794237555691.jpg',
    ],
    tagline: 'International test grade protection with high-density cane reinforcement',
    description:
      'Trusted by international cricketers. Includes premium test-standard ultra-light batting pads with reinforced knee bolsters and Pittards leather palm batting gloves with multi-flex split-finger armor. Unsurpassed shock absorption against 145+ km/h pace bowling.',
    specifications: {
      'Level': 'Test Match & First-Class Standard',
      'Pad Construction': 'High-Density Plastazote Foam with Cane Rod Core',
      'Glove Palm': 'Genuine Imported Pittards English Sheepskin Leather',
      'Finger Protection': 'Fibre-Shield inserts on all 10 fingers',
      'Closure': 'Extra-wide padded Velcro straps with quick-release tabs',
    },
    inStock: true,
    badge: 'Test Match Grade',
    isTrending: false,
    isFeatured: false,
    createdAt: '2026-10-05',
  },
  {
    id: 'sns-006',
    name: 'Adidas Predator Elite Firm-Ground Football Cleats',
    slug: 'adidas-predator-elite-firm-ground-football-cleats',
    category: 'Football',
    brand: 'Adidas',
    price: 24500,
    originalPrice: 28000,
    rating: 4.7,
    reviewsCount: 19,
    image: '/src/assets/images/product_match_football_1794237554505.jpg',
    gallery: [
      '/src/assets/images/product_match_football_1794237554505.jpg',
    ],
    tagline: 'Strikeskin rubber grip fins with ultra-light controlframe 2.0 outsole',
    description:
      'Engineered for playmakers who demand pinpoint curling strikes and decisive traction. HybridTouch 2.0 synthetic suede upper contours naturally to your foot, while strategic rubber Strikeskin fins offer maximum spin on crosses and free kicks.',
    specifications: {
      'Soleplate': 'Controlframe 2.0 for Firm Natural Grass & Modern Turf',
      'Upper Material': 'HybridTouch 2.0 Microfiber with Rubber Fins',
      'Stud Configuration': 'Bladed Chevron & Conical Hybrid Studs',
      'Available Sizes': 'UK 7, UK 8, UK 9, UK 10, UK 11',
      'Lacing': 'Asymmetric Clean Strike Zone',
    },
    inStock: true,
    badge: 'New Arrival',
    isTrending: true,
    isFeatured: true,
    createdAt: '2026-11-04',
  },
  {
    id: 'sns-007',
    name: 'Cast Iron Competition Kettlebell (24kg Powder Coated)',
    slug: 'cast-iron-competition-kettlebell-24kg',
    category: 'Gym & Fitness',
    brand: 'Sheikh Nouman Pro',
    price: 16500,
    originalPrice: 19500,
    rating: 4.9,
    reviewsCount: 15,
    image: '/src/assets/images/product_gym_dumbbells_1794237556788.jpg',
    gallery: [
      '/src/assets/images/product_gym_dumbbells_1794237556788.jpg',
    ],
    tagline: 'Single-piece gravity cast iron with smooth textured matte powder coat',
    description:
      'Constructed from a single solid pour of virgin ore iron with zero seam welding. Machined flat bottom prevents rocking on deck floors. The matte powder-coated texture holds chalk cleanly for high-volume kettlebell swings, snatches, and Turkish get-ups.',
    specifications: {
      'Weight': '24 Kilograms (53 lbs)',
      'Casting': 'Single-Pour Gravity Cast Iron (No Plastic/Filler)',
      'Handle Diameter': '38mm Ergonomic Championship Grip',
      'Base': 'Precision CNC Machined Flat Base',
      'Color Stripe': 'Green Weight ID Ring on Handle Horns',
    },
    inStock: true,
    badge: 'Gym Favorite',
    isTrending: false,
    isFeatured: false,
    createdAt: '2026-10-22',
  },
  {
    id: 'sns-008',
    name: 'Wilson Pro Staff 97 v14 Precision Tennis Racket',
    slug: 'wilson-pro-staff-97-v14-precision-tennis-racket',
    category: 'Racket Sports',
    brand: 'Wilson',
    price: 42000,
    originalPrice: 48000,
    rating: 5.0,
    reviewsCount: 17,
    image: '/src/assets/images/product_carbon_badminton_1794237558192.jpg',
    gallery: [
      '/src/assets/images/product_carbon_badminton_1794237558192.jpg',
    ],
    tagline: 'Braid 45 construction offering legendary feel and surgical control',
    description:
      'The modern evolution of the racket of champions. Features Braid 45 carbon fiber matrix oriented at 45-degree angles for exceptional pocketing and torsional stability. Finished in a dynamic copper-bronze shifting iridescent clear coat.',
    specifications: {
      'Head Size': '97 sq inches (626 sq cm)',
      'Unstrung Weight': '315 grams (11.1 oz)',
      'String Pattern': '16 × 19 Precision Spin',
      'Balance': '31cm / 10 pts Head Light',
      'Beam Width': '21.5mm Flat Beam',
      'Grip Size': '4 3/8" (Size 3)',
    },
    inStock: true,
    badge: 'Pro Tour Spec',
    isTrending: true,
    isFeatured: false,
    createdAt: '2026-10-30',
  },
  {
    id: 'sns-009',
    name: 'Kookaburra Turf White Match Leather Cricket Balls (Box of 6)',
    slug: 'kookaburra-turf-white-match-leather-balls-box',
    category: 'Cricket',
    brand: 'Sheikh Nouman Pro',
    price: 28000,
    originalPrice: 33000,
    rating: 4.9,
    reviewsCount: 22,
    image: '/src/assets/images/product_pro_cricket_bat_1794237555691.jpg',
    gallery: [
      '/src/assets/images/product_pro_cricket_bat_1794237555691.jpg',
    ],
    tagline: 'Four-piece alum tanned Australian steer hide leather balls for day/night games',
    description:
      'Certified for 50-over and T20 professional white ball cricket. Constructed with 4 pieces of finest selected steer hide, hand-stitched with 80+ proud seams that hold swing across 30 overs. Finished with a durable fluoropolymer glaze for enhanced visibility under floodlights.',
    specifications: {
      'Quantity': 'Box of 6 Match Balls',
      'Leather': 'Grade 1 Alum Tanned Steer Hide (White)',
      'Core': 'Layered Portuguese Cork and Pure New Zealand Wool',
      'Weight per ball': '156g (5.5 oz Standard Men Match Spec)',
      'Seam': 'Alternating Linen & Polyester Hand-Stitched Seam',
    },
    inStock: true,
    badge: 'Match Box',
    isTrending: false,
    isFeatured: false,
    createdAt: '2026-10-15',
  },
  {
    id: 'sns-010',
    name: 'Speed Pro Bearing High-Velocity Wire Jump Rope',
    slug: 'speed-pro-bearing-high-velocity-wire-jump-rope',
    category: 'Outdoor & Athletics',
    brand: 'Sheikh Nouman Pro',
    price: 3500,
    originalPrice: 4500,
    rating: 4.8,
    reviewsCount: 56,
    image: '/src/assets/images/product_gym_dumbbells_1794237556788.jpg',
    gallery: [
      '/src/assets/images/product_gym_dumbbells_1794237556788.jpg',
    ],
    tagline: '360° dual-axis ball bearing system with coated aircraft steel cable',
    description:
      'Built for boxers, CrossFitters, and conditioning athletes pursuing effortless double-unders. Aircraft-grade aluminum knurled handles house ultra-smooth frictionless ball bearings that spin up to 6 revolutions per second with zero rope tangling.',
    specifications: {
      'Cable Length': '10ft (3m) Easily Adjustable with Thumb Screws',
      'Cable Core': '2.5mm Coated High-Tensile Steel Wire',
      'Bearings': 'Dual High-Speed 360° Stainless Steel Ball Bearings',
      'Handles': 'Textured Billet Aluminum with Non-Slip Grip',
      'Included': 'Carrying bag + spare protective PVC rope sleeve',
    },
    inStock: true,
    badge: 'Popular',
    isTrending: false,
    isFeatured: false,
    createdAt: '2026-11-03',
  },
];

const STORAGE_KEYS = {
  PRODUCTS: 'sns_products_catalog_v2',
  SETTINGS: 'sns_store_settings_v2',
  INQUIRIES: 'sns_whatsapp_inquiries_v2',
  THEME: 'sns_theme_mode',
};

class ProductService {
  getProducts(): Product[] {
    if (typeof window === 'undefined') return INITIAL_PRODUCTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Auto-migrate products with 3-level category tree paths and hierarchies
          const migrated = parsed.map((p: Product) => {
            const sub = p.subCategory || (p.category === 'Cricket' ? 'Bats' : p.category === 'Football' ? 'Match Balls' : p.category === 'Gym & Fitness' ? 'Dumbbells' : p.category === 'Racket Sports' ? 'Badminton' : 'Speed & Agility');
            const path = p.categoryPath || `Sports/${p.category}/${sub}`;
            const hierarchy = p.categoryHierarchy || ['Sports', p.category, sub];
            const discount = p.discountPercent || (p.originalPrice && p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : undefined);
            return {
              ...p,
              subCategory: sub,
              categoryPath: path,
              categoryHierarchy: hierarchy,
              discountPercent: discount,
            };
          });
          return migrated;
        }
      }
    } catch (e) {
      console.warn('Failed to read products from localStorage:', e);
    }
    this.saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }

  saveProducts(products: Product[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }

  getProductById(id: string): Product | undefined {
    const products = this.getProducts();
    return products.find((p) => p.id === id || p.slug === id);
  }

  addProduct(productData: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.getProducts();
    const newId = `sns-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newProduct, ...products];
    this.saveProducts(updated);

    // If Firebase Realtime DB connected, sync asynchronously
    firebaseRealtimeAdapter.uploadProduct(newProduct).catch((e) => {
      console.warn('Firebase RTDB auto-sync deferred:', e);
    });

    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updatedProduct = { ...products[index], ...updates };
    products[index] = updatedProduct;
    this.saveProducts(products);

    firebaseRealtimeAdapter.uploadProduct(updatedProduct).catch((e) => {
      console.warn('Firebase RTDB auto-sync deferred:', e);
    });

    return updatedProduct;
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    this.saveProducts(filtered);

    firebaseRealtimeAdapter.deleteProduct(id).catch((e) => {
      console.warn('Firebase RTDB auto-delete deferred:', e);
    });

    return true;
  }

  resetToDefaults(): Product[] {
    this.saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }

  // --- Settings ---
  getSettings(): StoreSettings {
    if (typeof window === 'undefined') return INITIAL_SETTINGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Automatically upgrade placeholder phone number to Nouman Sheikh's official hotline
        if (!parsed.whatsappNumber || parsed.whatsappNumber === '923001234567') {
          parsed.whatsappNumber = '923321460134';
          parsed.phone = '+92 332 1460134';
          parsed.contactName = 'Nouman Sheikh';
          parsed.announcementText = '⚡ Official Match Gear & Pro Equipment · Fast Nationwide Courier Dispatch';
          this.saveSettings(parsed);
        }
        return { ...INITIAL_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to read settings from localStorage:', e);
    }
    return INITIAL_SETTINGS;
  }

  saveSettings(settings: Partial<StoreSettings>): StoreSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save settings:', e);
      }
    }
    return updated;
  }

  // --- Inquiries ---
  getInquiries(): WhatsAppInquiryLog[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read inquiries:', e);
    }
    return [];
  }

  logInquiry(inquiry: Omit<WhatsAppInquiryLog, 'id' | 'timestamp'>): void {
    if (typeof window === 'undefined') return;
    try {
      const logs = this.getInquiries();
      const newLog: WhatsAppInquiryLog = {
        ...inquiry,
        id: `inq-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };
      const updated = [newLog, ...logs].slice(0, 50);
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to log inquiry:', e);
    }
  }

  // --- Theme preference ---
  getSavedTheme(): 'dark' | 'light' {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark') return saved;
    // Default to dark theme for modern premium sports aesthetic
    return 'dark';
  }

  saveTheme(theme: 'dark' | 'light'): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
}

export const productService = new ProductService();
