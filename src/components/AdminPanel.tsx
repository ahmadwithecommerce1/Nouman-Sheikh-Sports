import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  Phone,
  Database,
  BarChart3,
  Package,
  CheckCircle,
  ExternalLink,
  AlertCircle,
  Shield,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  Video,
  Percent,
  Upload,
  Play,
  Layers,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { Product, StoreSettings, WhatsAppInquiryLog, SportsCategory } from '../types';
import { productService } from '../services/productService';
import { firebaseRealtimeAdapter, FirebaseRealtimeConfig } from '../services/firebaseRealtimeAdapter';
import { CategoryTreeSelect } from './CategoryTreeSelect';

interface AdminPanelProps {
  products: Product[];
  settings: StoreSettings;
  onProductsUpdated: (products: Product[]) => void;
  onSettingsUpdated: (settings: StoreSettings) => void;
  onBackToStore: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  settings,
  onProductsUpdated,
  onSettingsUpdated,
  onBackToStore,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'products' | 'whatsapp' | 'firebase' | 'inquiries'>('products');

  // Product Modal State
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields - Basic Info
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('Pro Grade');
  const [inStock, setInStock] = useState(true);

  // Form Fields - Hierarchical Category & Brand
  const [category, setCategory] = useState<Product['category']>('Cricket');
  const [subCategory, setSubCategory] = useState<string | undefined>('Bats');
  const [categoryPath, setCategoryPath] = useState<string | undefined>('Sports/Cricket/Bats');
  const [categoryHierarchy, setCategoryHierarchy] = useState<string[]>(['Sports', 'Cricket', 'Bats']);
  const [brand, setBrand] = useState('Sheikh Nouman Pro');

  // Form Fields - Pricing & Discounts
  const [originalPrice, setOriginalPrice] = useState<number>(50000);
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [discountedPrice, setDiscountedPrice] = useState<number>(42500);

  // Form Fields - Media (Up to 4 Pictures + Video)
  const [galleryImages, setGalleryImages] = useState<string[]>([
    '/src/assets/images/product_pro_cricket_bat_1794237555691.jpg',
  ]);
  const [singleUrlInput, setSingleUrlInput] = useState('');
  const [videoUrl, setVideoUrl] = useState<string>('');

  // Store Settings Form (WhatsApp Hotline)
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || '923321460134');
  const [contactName, setContactName] = useState(settings.contactName || 'Nouman Sheikh');
  const [storeName, setStoreName] = useState(settings.storeName);
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [address, setAddress] = useState(settings.address);
  const [operatingHours, setOperatingHours] = useState(settings.operatingHours);
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);

  // Firebase Realtime DB Form
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseRealtimeConfig>(() => {
    return (
      firebaseRealtimeAdapter.getConfig() || {
        apiKey: '',
        databaseURL: '',
        projectId: '',
      }
    );
  });
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(firebaseRealtimeAdapter.getIsConnected());
  const [firebaseAlert, setFirebaseAlert] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Inquiries Log
  const [inquiries, setInquiries] = useState<WhatsAppInquiryLog[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      setInquiries(productService.getInquiries());
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'sheikh2026' || pinInput.trim() === 'admin' || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Atelier Security PIN. Use: sheikh2026');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    setAuthError('');
  };

  // Discount Calculation Handlers
  const handleOriginalPriceChange = (val: number) => {
    const orig = Math.max(0, val);
    setOriginalPrice(orig);
    if (discountPercent > 0) {
      const calcDiscounted = Math.round(orig * (1 - discountPercent / 100));
      setDiscountedPrice(calcDiscounted);
    } else {
      setDiscountedPrice(orig);
    }
  };

  const handleDiscountPercentChange = (percent: number) => {
    const p = Math.min(100, Math.max(0, percent));
    setDiscountPercent(p);
    const calcDiscounted = Math.round(originalPrice * (1 - p / 100));
    setDiscountedPrice(calcDiscounted);
  };

  const handleDiscountedPriceChange = (discounted: number) => {
    const disc = Math.max(0, discounted);
    setDiscountedPrice(disc);
    if (originalPrice > 0) {
      const calcPercent = Math.max(0, Math.round(((originalPrice - disc) / originalPrice) * 100));
      setDiscountPercent(calcPercent);
    }
  };

  // Image Upload Handlers
  const handleImageFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (galleryImages.length >= 4) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          setGalleryImages((prev) => {
            if (prev.length >= 4) return prev;
            return [...prev, event.target!.result as string];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = () => {
    if (!singleUrlInput.trim()) return;
    if (galleryImages.length >= 4) {
      alert('Maximum 4 images allowed per product.');
      return;
    }
    setGalleryImages((prev) => [...prev, singleUrlInput.trim()]);
    setSingleUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    setGalleryImages((prev) => {
      const copy = [...prev];
      const [chosen] = copy.splice(index, 1);
      return [chosen, ...copy];
    });
  };

  // Video File Upload Handler
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setVideoUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setTagline('Tournament-certified sports equipment by Sheikh Nouman Sports');
    setDescription('Handcrafted from selected athletic materials engineered for tournament performance.');
    setBadge('New Arrival');
    setCategory('Cricket');
    setSubCategory('Bats');
    setCategoryPath('Sports/Cricket/Bats');
    setCategoryHierarchy(['Sports', 'Cricket', 'Bats']);
    setBrand('Sheikh Nouman Pro');
    setOriginalPrice(50000);
    setDiscountPercent(15);
    setDiscountedPrice(42500);
    setGalleryImages(['/src/assets/images/product_pro_cricket_bat_1794237555691.jpg']);
    setVideoUrl('');
    setInStock(true);
    setShowProductModal(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setTagline(p.tagline);
    setDescription(p.description);
    setBadge(p.badge || '');
    setCategory(p.category);
    setSubCategory(p.subCategory || 'Bats');
    setCategoryPath(p.categoryPath || `Sports/${p.category}/${p.subCategory || 'General'}`);
    setCategoryHierarchy(p.categoryHierarchy || ['Sports', p.category, p.subCategory || 'General']);
    setBrand(p.brand);

    const orig = p.originalPrice || p.price;
    const currentPrice = p.price;
    setOriginalPrice(orig);
    setDiscountedPrice(currentPrice);
    if (orig > currentPrice) {
      setDiscountPercent(p.discountPercent || Math.round(((orig - currentPrice) / orig) * 100));
    } else {
      setDiscountPercent(0);
    }

    const images = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image];
    setGalleryImages(images);
    setVideoUrl(p.videoUrl || '');
    setInStock(p.inStock);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (galleryImages.length === 0) {
      alert('Please provide at least 1 product image.');
      return;
    }

    const finalOriginalPrice = originalPrice > 0 ? originalPrice : discountedPrice;
    const finalSellingPrice = discountedPrice > 0 ? discountedPrice : finalOriginalPrice;
    const finalDiscountPercent =
      finalOriginalPrice > finalSellingPrice
        ? discountPercent || Math.round(((finalOriginalPrice - finalSellingPrice) / finalOriginalPrice) * 100)
        : undefined;

    const productPayload = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category,
      subCategory: subCategory || 'General',
      categoryPath: categoryPath || `Sports/${category}/${subCategory || 'General'}`,
      categoryHierarchy: categoryHierarchy && categoryHierarchy.length > 0 ? categoryHierarchy : ['Sports', category, subCategory || 'General'],
      brand,
      price: finalSellingPrice,
      originalPrice: finalOriginalPrice > finalSellingPrice ? finalOriginalPrice : undefined,
      discountPercent: finalDiscountPercent,
      rating: editingProduct ? editingProduct.rating : 4.9,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 1,
      image: galleryImages[0],
      gallery: galleryImages,
      videoUrl: videoUrl.trim() || undefined,
      tagline,
      description,
      specifications: editingProduct
        ? editingProduct.specifications
        : {
            'Manufacturer': brand,
            'Category': categoryPath || category,
            'Sport Grade': 'Tournament Standard',
            'Warranty': '1 Year Factory Support',
          },
      inStock,
      badge: badge.trim() || undefined,
      isFeatured: true,
      isTrending: true,
    };

    if (editingProduct) {
      productService.updateProduct(editingProduct.id, productPayload);
    } else {
      productService.addProduct(productPayload);
    }

    const updated = productService.getProducts();
    onProductsUpdated(updated);
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id: string, prodName: string) => {
    if (window.confirm(`Delete "${prodName}" from store catalog?`)) {
      productService.deleteProduct(id);
      const updated = productService.getProducts();
      onProductsUpdated(updated);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog back to initial default items?')) {
      const reset = productService.resetToDefaults();
      onProductsUpdated(reset);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = productService.saveSettings({
      whatsappNumber,
      contactName,
      storeName,
      announcementText,
      address,
      operatingHours,
      phone: `+${whatsappNumber.replace(/[^0-9]/g, '')}`,
    });
    onSettingsUpdated(updated);
    setSettingsSavedAlert(true);
    setTimeout(() => setSettingsSavedAlert(false), 2500);
  };

  const handleSaveFirebase = (e: React.FormEvent) => {
    e.preventDefault();
    if (firebaseConfig.databaseURL) {
      firebaseRealtimeAdapter.saveConfig(firebaseConfig);
      setIsFirebaseConnected(true);
      setFirebaseAlert('Firebase Realtime Database configuration saved!');
      setTimeout(() => setFirebaseAlert(''), 3000);
    }
  };

  const handleSyncToRealtimeDb = async () => {
    setIsSyncing(true);
    try {
      const currentProducts = productService.getProducts();
      let successCount = 0;
      for (const prod of currentProducts) {
        const ok = await firebaseRealtimeAdapter.uploadProduct(prod);
        if (ok) successCount++;
      }
      setFirebaseAlert(`Synced ${successCount} products to Firebase Realtime Database!`);
    } catch (err) {
      setFirebaseAlert('Realtime Database sync error. Please verify Database URL and Rules.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setFirebaseAlert(''), 4000);
    }
  };

  const handleClearFirebase = () => {
    firebaseRealtimeAdapter.removeConfig();
    setIsFirebaseConnected(false);
    setFirebaseConfig({
      apiKey: '',
      databaseURL: '',
      projectId: '',
    });
    setFirebaseAlert('Firebase configuration cleared.');
    setTimeout(() => setFirebaseAlert(''), 2500);
  };

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header - Centered & Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-black shrink-0">
            <Shield className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-black uppercase text-zinc-900 dark:text-white leading-tight">
              Sheikh Nouman Sports · Master Admin Console
            </h1>
            <p className="text-xs text-zinc-500">
              Hotline: <strong className="text-emerald-600 dark:text-emerald-400">+{whatsappNumber}</strong> ({contactName})
            </p>
          </div>
        </div>

        <button
          onClick={onBackToStore}
          className="self-start sm:self-auto px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 text-zinc-700 dark:text-zinc-300 transition-colors"
        >
          ← Return to Storefront
        </button>
      </div>

      {/* Auth Gate */}
      {!isAuthenticated ? (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-emerald-500 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="font-display text-2xl font-black uppercase text-zinc-900 dark:text-white">
              Admin Access Protected
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Enter master PIN to manage sports gear catalog, media uploads, and WhatsApp routing.
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-3">
            <input
              type="password"
              placeholder="Enter PIN (sheikh2026)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-4 py-3 text-center text-base tracking-widest font-mono rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
            {authError && <p className="text-xs text-rose-500 font-bold">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md"
            >
              Authenticate Admin
            </button>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline pt-2 font-bold"
            >
              1-Click Demo Login (Pass: sheikh2026)
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated Workspace */
        <div className="mt-6 space-y-6">
          {/* Responsive Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-3.5 sm:px-4 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'products'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Catalog Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`py-2 px-3.5 sm:px-4 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'whatsapp'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Phone className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Hotline (+92 332 1460134)</span>
            </button>

            <button
              onClick={() => setActiveTab('firebase')}
              className={`py-2 px-3.5 sm:px-4 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'firebase'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Database className="w-4 h-4 text-amber-500" />
              <span>Firebase Realtime DB</span>
              {isFirebaseConnected && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-2 px-3.5 sm:px-4 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'inquiries'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Inquiry Log</span>
            </button>
          </div>

          {/* TAB 1: Product Management (Responsive Table & Mobile Cards) */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-black uppercase text-zinc-900 dark:text-white">
                    Inventory & Media Management
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Add new sports equipment with discounts, multi-picture gallery, and video previews.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetCatalog}
                    className="px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Defaults</span>
                  </button>

                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Sports Equipment</span>
                  </button>
                </div>
              </div>

              {/* 1. Mobile Card Stack Layout (Eliminates horizontal scrolling & text clipping on mobile) */}
              <div className="block md:hidden space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                          <span>{p.category}</span>
                          <span>·</span>
                          <span className="text-zinc-500">{p.brand}</span>
                        </div>
                        <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-white truncate">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-display font-black text-sm text-zinc-900 dark:text-white tabular-nums">
                            {settings.currency} {p.price.toLocaleString()}
                          </span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="text-xs text-zinc-400 line-through tabular-nums">
                              {settings.currency} {p.originalPrice.toLocaleString()}
                            </span>
                          )}
                          {p.discountPercent && p.discountPercent > 0 && (
                            <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-500 text-white">
                              {p.discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            p.inStock
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                              : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        {p.videoUrl && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            <span>Video</span>
                          </span>
                        )}
                        <span className="text-[10px] text-zinc-400">
                          {p.gallery?.length || 1} imgs
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="px-2.5 py-1 text-xs font-bold rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="px-2.5 py-1 text-xs font-bold rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Desktop Table Layout */}
              <div className="hidden md:block bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase font-black text-[10px]">
                        <th className="py-3 px-4">Item & Media</th>
                        <th className="py-3 px-4">Category Tree Path</th>
                        <th className="py-3 px-4">Brand</th>
                        <th className="py-3 px-4">Price & Discount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative shrink-0">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-12 h-10 object-cover rounded-md bg-zinc-100 dark:bg-zinc-800"
                                  referrerPolicy="no-referrer"
                                />
                                {p.gallery && p.gallery.length > 1 && (
                                  <span className="absolute -top-1 -right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                                    {p.gallery.length}
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0 max-w-xs">
                                <div className="font-bold text-zinc-900 dark:text-white truncate">{p.name}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {p.badge && (
                                    <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                                      {p.badge}
                                    </span>
                                  )}
                                  {p.videoUrl && (
                                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center gap-0.5">
                                      <Video className="w-2.5 h-2.5" />
                                      <span>Video</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                            <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 truncate max-w-[200px]">
                              {p.categoryPath || `Sports > ${p.category}`}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold text-zinc-800 dark:text-zinc-200">{p.brand}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span className="font-black text-zinc-900 dark:text-white tabular-nums">
                                {settings.currency} {p.price.toLocaleString()}
                              </span>
                              {p.originalPrice && p.originalPrice > p.price && (
                                <div className="flex items-center gap-1.5 text-[10px]">
                                  <span className="text-zinc-400 line-through tabular-nums">
                                    {settings.currency} {p.originalPrice.toLocaleString()}
                                  </span>
                                  {p.discountPercent && (
                                    <span className="text-rose-600 dark:text-rose-400 font-bold">
                                      ({p.discountPercent}% OFF)
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                p.inStock
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                              }`}
                            >
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                title="Edit Gear"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-1.5 text-zinc-500 hover:text-rose-600 rounded hover:bg-rose-50 dark:hover:bg-rose-950/50"
                                title="Delete Gear"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WhatsApp Hotline Settings (+92 332 1460134) */}
          {activeTab === 'whatsapp' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="font-display text-xl font-black uppercase text-zinc-900 dark:text-white">
                  WhatsApp Hotline & Storefront Numbers
                </h2>
                <p className="text-xs text-zinc-500">
                  Global WhatsApp orders and hotline inquiries are dispatched to this phone number.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                      Active Hotline Contact
                    </div>
                    <div className="font-display text-base font-black text-zinc-900 dark:text-white">
                      +{whatsappNumber} ({contactName})
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      'Salam Sheikh Nouman Sports, this is an official hotline connection check.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-lg shrink-0 flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Test Chat Now</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      WhatsApp Phone Number (with Country Code):
                    </label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. 923321460134"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Contact Person / Representative Name:
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Nouman Sheikh"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                    Store Brand Name:
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                    Top Announcement Text:
                  </label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                    Storefront Physical Address:
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                  />
                </div>

                {settingsSavedAlert && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>WhatsApp hotline settings saved successfully!</span>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-black uppercase tracking-wider transition-all shadow-sm"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: Firebase Realtime Database */}
          {activeTab === 'firebase' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="font-display text-xl font-black uppercase text-zinc-900 dark:text-white">
                  Firebase Realtime Database Setup
                </h2>
                <p className="text-xs text-zinc-500">
                  Connect your Firebase Realtime Database here to upload and sync products directly from this Admin panel.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Realtime Database Ready Architecture</div>
                  <p className="leading-relaxed">
                    Paste your Firebase Realtime Database URL (e.g. <code className="font-mono bg-white/70 dark:bg-black/40 px-1 py-0.5 rounded">https://your-project-default-rtdb.firebaseio.com</code>). Products will automatically sync to your database!
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveFirebase} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                    Firebase Realtime Database URL:
                  </label>
                  <input
                    type="text"
                    value={firebaseConfig.databaseURL}
                    onChange={(e) => setFirebaseConfig({ ...firebaseConfig, databaseURL: e.target.value })}
                    placeholder="https://sheikh-nouman-sports-default-rtdb.firebaseio.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 font-mono text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Firebase Project ID:
                    </label>
                    <input
                      type="text"
                      value={firebaseConfig.projectId}
                      onChange={(e) => setFirebaseConfig({ ...firebaseConfig, projectId: e.target.value })}
                      placeholder="sheikh-nouman-sports"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 font-mono text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Web API Key (Optional):
                    </label>
                    <input
                      type="text"
                      value={firebaseConfig.apiKey}
                      onChange={(e) => setFirebaseConfig({ ...firebaseConfig, apiKey: e.target.value })}
                      placeholder="AIzaSy..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 font-mono text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                {firebaseAlert && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{firebaseAlert}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  {isFirebaseConnected && (
                    <button
                      type="button"
                      onClick={handleClearFirebase}
                      className="text-xs text-rose-500 hover:underline"
                    >
                      Clear Config
                    </button>
                  )}

                  <div className="flex items-center gap-3 ml-auto">
                    {firebaseConfig.databaseURL && (
                      <button
                        type="button"
                        onClick={handleSyncToRealtimeDb}
                        disabled={isSyncing}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold flex items-center gap-1.5"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Syncing...' : 'Sync Catalog Now'}</span>
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-black uppercase tracking-wider"
                    >
                      Save Config
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: Inquiries Activity */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-black uppercase text-zinc-900 dark:text-white">
                Customer WhatsApp Order Inquiries ({inquiries.length})
              </h2>

              {inquiries.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 text-center text-xs text-zinc-500">
                  No inquiries recorded in this session yet. Clicking "Order on WhatsApp" on any product logs activity here.
                </div>
              ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase font-black text-[10px]">
                          <th className="py-2.5 px-4">Time</th>
                          <th className="py-2.5 px-4">Product Name</th>
                          <th className="py-2.5 px-4">Price</th>
                          <th className="py-2.5 px-4 text-right">Link</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {inquiries.map((inq) => (
                          <tr key={inq.id}>
                            <td className="py-2.5 px-4 font-mono text-zinc-500 text-[11px]">
                              {new Date(inq.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-2.5 px-4 font-bold text-zinc-900 dark:text-white">
                              {inq.productName}
                            </td>
                            <td className="py-2.5 px-4 font-black tabular-nums">
                              {settings.currency} {inq.price.toLocaleString()}
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <a
                                href={inq.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-500 hover:underline flex items-center justify-end gap-1 font-bold"
                              >
                                <span>Open WhatsApp</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL (Enhanced with Discount, Hierarchical Categories & Media Upload) */}
      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[92vh] flex flex-col my-auto"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-zinc-900 dark:bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-display text-base font-bold uppercase tracking-wider">
                    {editingProduct ? 'Edit Sports Equipment' : 'Add New Sports Equipment'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <form onSubmit={handleSaveProduct} className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1">
                {/* 1. Basic Information */}
                <div className="space-y-3">
                  <div className="font-black uppercase tracking-wider text-zinc-400 text-[11px]">
                    01. Equipment Title & Overview
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                      Product Name / Title:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sheikh Nouman Pro Edition English Willow Bat"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                      Tagline / Highlights:
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Hand-pressed 40mm power bulge with balanced light pickup"
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                      Full Description:
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed craftsmanship, materials, sweet spot, blade grade, or weight profile..."
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* 2. Hierarchical Categories & Grouped Brands */}
                <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="font-black uppercase tracking-wider text-zinc-400 text-[11px]">
                    02. Sports Hierarchy & Brand Classification
                  </div>
                  <CategoryTreeSelect
                    selectedCategory={category}
                    selectedSubCategory={subCategory}
                    selectedPath={categoryPath}
                    selectedHierarchy={categoryHierarchy}
                    selectedBrand={brand}
                    onSelectCategory={(cat, sub, path, hierarchy) => {
                      if (cat !== 'All') {
                        setCategory(cat);
                      }
                      setSubCategory(sub);
                      if (path) setCategoryPath(path);
                      if (hierarchy) setCategoryHierarchy(hierarchy);
                    }}
                    onSelectBrand={(selected) => setBrand(selected)}
                  />
                </div>

                {/* 3. Pricing, Discounts & Deals */}
                <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase tracking-wider text-zinc-400 text-[11px] flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-emerald-500" />
                      <span>03. Pricing & Discounts</span>
                    </span>
                    {discountPercent > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px] uppercase">
                        {discountPercent}% OFF Active
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                        Original Price ({settings.currency}):
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={originalPrice}
                        onChange={(e) => handleOriginalPriceChange(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                        Discount (%):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="95"
                          value={discountPercent}
                          onChange={(e) => handleDiscountPercentChange(Number(e.target.value))}
                          placeholder="e.g. 15"
                          className="w-full px-3 py-2 pr-7 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-mono font-bold"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                        Active Selling Price ({settings.currency}):
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={discountedPrice}
                        onChange={(e) => handleDiscountedPriceChange(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono font-black text-sm"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950">
                    <span>
                      Storefront display: <strong className="text-emerald-600 dark:text-emerald-400">{settings.currency} {discountedPrice.toLocaleString()}</strong>
                      {originalPrice > discountedPrice && (
                        <span className="text-zinc-400 line-through ml-2">
                          {settings.currency} {originalPrice.toLocaleString()}
                        </span>
                      )}
                    </span>
                    {originalPrice > discountedPrice && (
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        Customer saves {settings.currency} {(originalPrice - discountedPrice).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* 4. Multiple Pictures Upload (Up to 4 High-Quality Images) */}
                <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase tracking-wider text-zinc-400 text-[11px] flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <span>04. Multiple Pictures Upload ({galleryImages.length}/4)</span>
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      Upload from device or enter URL
                    </span>
                  </div>

                  {/* Thumbnail Previews of Uploaded Images */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative group aspect-[4/3] rounded-xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 shadow-xs"
                      >
                        <img
                          src={img}
                          alt={`Product view ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />

                        {/* Cover image badge */}
                        {idx === 0 ? (
                          <div className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                            Cover Image
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(idx)}
                            className="absolute top-1.5 left-1.5 bg-black/70 hover:bg-emerald-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Set Cover
                          </button>
                        )}

                        {/* Remove Image button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-md opacity-90 hover:opacity-100 transition-opacity"
                          title="Remove image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {/* Empty upload slot if less than 4 */}
                    {galleryImages.length < 4 && (
                      <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors bg-zinc-50/50 dark:bg-zinc-950/50">
                        <Upload className="w-5 h-5 text-emerald-500 mb-1" />
                        <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                          Upload File
                        </span>
                        <span className="text-[9px] text-zinc-400">JPG, PNG, WebP</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageFilesUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Manual URL Input Option */}
                  {galleryImages.length < 4 && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Or paste image URL (e.g. /src/assets/images/... or web URL)"
                        value={singleUrlInput}
                        onChange={(e) => setSingleUrlInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-[11px] font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold rounded-lg shrink-0"
                      >
                        Add URL
                      </button>
                    </div>
                  )}

                  {/* Preset quick buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
                    <span className="text-zinc-400 shrink-0">Presets:</span>
                    <button
                      type="button"
                      onClick={() => setGalleryImages((prev) => [...prev, '/src/assets/images/product_pro_cricket_bat_1794237555691.jpg'].slice(0, 4))}
                      className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 shrink-0"
                    >
                      Bat
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryImages((prev) => [...prev, '/src/assets/images/product_match_football_1794237554505.jpg'].slice(0, 4))}
                      className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 shrink-0"
                    >
                      Football
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryImages((prev) => [...prev, '/src/assets/images/product_gym_dumbbells_1794237556788.jpg'].slice(0, 4))}
                      className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 shrink-0"
                    >
                      Dumbbells
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryImages((prev) => [...prev, '/src/assets/images/product_carbon_badminton_1794237558192.jpg'].slice(0, 4))}
                      className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 shrink-0"
                    >
                      Badminton
                    </button>
                  </div>
                </div>

                {/* 5. Video Upload & URL */}
                <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="font-black uppercase tracking-wider text-zinc-400 text-[11px] flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-purple-500" />
                      <span>05. Product Video Preview (Optional)</span>
                    </span>
                    {videoUrl && (
                      <button
                        type="button"
                        onClick={() => setVideoUrl('')}
                        className="text-[10px] text-rose-500 hover:underline"
                      >
                        Remove Video
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter video URL (MP4 direct link, YouTube video or reel URL)..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-xs font-mono"
                      />
                      <label className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Video</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {videoUrl && (
                      <div className="p-3 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                          <Play className="w-4 h-4 fill-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-zinc-900 dark:text-white truncate text-xs">
                            Video Attachment Ready
                          </div>
                          <div className="text-[10px] text-zinc-500 truncate">
                            {videoUrl.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 6. Stock & Badge Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <div>
                    <label className="block font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                      Promotional Badge:
                    </label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="e.g. Pro Grade, Trending, Official Match"
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="stockCheck"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <label htmlFor="stockCheck" className="font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer">
                      Item is In Stock & Ready for WhatsApp Orders
                    </label>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider transition-all shadow-md"
                  >
                    {editingProduct ? 'Save Equipment Updates' : 'Add Equipment to Store'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
