import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';

import { Product, StoreSettings, ActivePage, SportsCategory, CartItem } from './types';
import { productService } from './services/productService';
import { Flame, ArrowRight, ShoppingBag, Check } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => productService.getProducts());
  const [settings, setSettings] = useState<StoreSettings>(() => productService.getSettings());
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<SportsCategory>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartToast, setCartToast] = useState<string | null>(null);

  // Cart / Basket State persisted in LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('sns_cart_basket');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sns_cart_basket', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Theme Management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => productService.getSavedTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    productService.saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // URL Deep-Linking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page') as ActivePage | null;
      const idParam = params.get('id');
      const categoryParam = params.get('category') as SportsCategory | null;

      if (idParam) {
        const found = products.find((p) => p.id === idParam || p.slug === idParam);
        if (found) {
          setSelectedProduct(found);
          setActivePage('product-detail');
        }
      } else if (pageParam) {
        setActivePage(pageParam);
        if (categoryParam) {
          setSelectedCategory(categoryParam);
        }
      }
    }
  }, [products]);

  // Navigation Helper
  const handleNavigate = (page: ActivePage, category?: SportsCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Actions
  const handleAddToCart = (product: Product, quantity = 1, customNote?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.customNote === customNote
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        quantity,
        customNote,
      };
      return [...prev, newItem];
    });

    setCartToast(`Added ${product.name} to basket!`);
    setTimeout(() => setCartToast(null), 2500);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Trending products for Home
  const trendingProducts = products.filter((p) => p.isTrending || p.isFeatured).slice(0, 6);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* 1. Header Navigation */}
      <Navbar
        settings={settings}
        activePage={activePage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeCategory={selectedCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart Toast Notification */}
      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-5 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-xl shadow-2xl border border-zinc-700 dark:border-zinc-200 flex items-center gap-3 text-xs font-bold"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{cartToast}</span>
            <button
              onClick={() => {
                setCartToast(null);
                setIsCartOpen(true);
              }}
              className="ml-2 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-black uppercase hover:bg-emerald-500 transition-colors"
            >
              View Basket
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Page Views */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* HOME PAGE */}
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner */}
              <Hero
                settings={settings}
                onExploreShop={() => handleNavigate('shop', 'All')}
                onSelectCategory={(cat) => handleNavigate('shop', cat)}
              />

              {/* Trending Products Section */}
              <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      <Flame className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      <span>Trending Championship Gear</span>
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white mt-1">
                      Top Equipment Picks
                    </h2>
                  </div>

                  <button
                    onClick={() => handleNavigate('shop', 'All')}
                    className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 group"
                  >
                    <span>View Entire Catalog</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {trendingProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      settings={settings}
                      onSelectProduct={handleSelectProduct}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                    />
                  ))}
                </div>
              </section>

              {/* Athletic Discipline Spotlight Banners */}
              <section className="py-12 bg-zinc-100 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Cricket Feature Card */}
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-950 p-8 sm:p-10 flex flex-col justify-between min-h-[320px] shadow-lg group">
                      <img
                        src="/src/assets/images/product_pro_cricket_bat_1794237555691.jpg"
                        alt="English Willow Cricket Bats"
                        className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded">
                          Bespoke Bat Atelier
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mt-3 leading-tight">
                          Grade 1+ English Willow Masters
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-sm">
                          Hand-pressed 40mm power profiles balanced for devastating boundary clearing power.
                        </p>
                      </div>
                      <div className="relative z-10 pt-6">
                        <button
                          onClick={() => handleNavigate('shop', 'Cricket')}
                          className="px-6 py-2.5 bg-white text-zinc-900 hover:bg-zinc-100 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                        >
                          Explore Cricket Arena
                        </button>
                      </div>
                    </div>

                    {/* Football / Gym Feature Card */}
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-950 p-8 sm:p-10 flex flex-col justify-between min-h-[320px] shadow-lg group">
                      <img
                        src="/src/assets/images/product_match_football_1794237554505.jpg"
                        alt="Official Match Soccer Balls"
                        className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded">
                          Official Tournament Match
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mt-3 leading-tight">
                          Thermo-Bonded Aerodynamic Balls
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-sm">
                          Seamless FIFA-quality construction with textured outer casing for pinpoint accuracy.
                        </p>
                      </div>
                      <div className="relative z-10 pt-6">
                        <button
                          onClick={() => handleNavigate('shop', 'Football')}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                        >
                          Explore Soccer Match Gear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4-Step Direct WhatsApp Ordering Explainer */}
              <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
                    Effortless Athlete Commerce
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white">
                    How Direct WhatsApp Ordering Works
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    No complicated card checkout or checkout friction. Speak directly to our equipment pros.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                    <span className="font-display text-2xl font-black text-emerald-500">01</span>
                    <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white uppercase">
                      Select Your Gear
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Browse our tournament-grade catalog or add multiple items to your Equipment Basket.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                    <span className="font-display text-2xl font-black text-emerald-500">02</span>
                    <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white uppercase">
                      Order via WhatsApp
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Click 'Order on WhatsApp' or 'Order Basket on WhatsApp' to auto-generate the complete receipt.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                    <span className="font-display text-2xl font-black text-emerald-500">03</span>
                    <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white uppercase">
                      Specify Custom Needs
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Request video knocking verification, bat balance check, or specific string tensions.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                    <span className="font-display text-2xl font-black text-emerald-500">04</span>
                    <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white uppercase">
                      Courier Dispatch
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Securely packed in padded shipping tubes and delivered to your club or home in 48h.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* SHOP PAGE */}
          {activePage === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShopPage
                products={products}
                settings={settings}
                onSelectProduct={handleSelectProduct}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                initialCategory={selectedCategory}
              />
            </motion.div>
          )}

          {/* PRODUCT DETAIL PAGE */}
          {activePage === 'product-detail' && selectedProduct && (
            <motion.div
              key="product-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetailPage
                product={selectedProduct}
                settings={settings}
                onBack={() => handleNavigate('shop', selectedProduct.category)}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                allProducts={products}
              />
            </motion.div>
          )}

          {/* ABOUT PAGE */}
          {activePage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage
                settings={settings}
                onExploreShop={() => handleNavigate('shop', 'All')}
              />
            </motion.div>
          )}

          {/* CONTACT PAGE */}
          {activePage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage settings={settings} />
            </motion.div>
          )}

          {/* ADMIN & FIREBASE PANEL */}
          {activePage === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPanel
                products={products}
                settings={settings}
                onProductsUpdated={setProducts}
                onSettingsUpdated={setSettings}
                onBackToStore={() => handleNavigate('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
      />

      {/* 4. Equipment Basket / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        settings={settings}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onExploreShop={() => handleNavigate('shop', 'All')}
      />

      {/* 5. Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        settings={settings}
        onSelectProduct={handleSelectProduct}
      />

      {/* 6. Persistent Floating WhatsApp Button */}
      <WhatsAppFloatingButton settings={settings} />
    </div>
  );
}
