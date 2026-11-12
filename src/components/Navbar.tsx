import React, { useState } from 'react';
import { Sun, Moon, Search, Phone, Shield, Menu, X, Zap, ShoppingBag } from 'lucide-react';
import { StoreSettings, ActivePage, SportsCategory } from '../types';

interface NavbarProps {
  settings: StoreSettings;
  activePage: ActivePage;
  onNavigate: (page: ActivePage, category?: SportsCategory) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  activeCategory?: SportsCategory;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  activePage,
  onNavigate,
  theme,
  onToggleTheme,
  onOpenSearch,
  activeCategory,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: ActivePage; category?: SportsCategory }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop All', page: 'shop', category: 'All' },
    { label: 'Cricket', page: 'shop', category: 'Cricket' },
    { label: 'Football', page: 'shop', category: 'Football' },
    { label: 'Gym & Fitness', page: 'shop', category: 'Gym & Fitness' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage, category?: SportsCategory) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-600 dark:bg-emerald-700 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 fill-current shrink-0 animate-pulse" />
        <span>{settings.announcementText}</span>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group focus:outline-none flex items-center gap-3 shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-display font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            SN
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Sheikh Nouman
            </span>
            <span className="text-[10px] tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase -mt-1 font-bold">
              Sports & Athletics
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-bold text-zinc-600 dark:text-zinc-300">
          {navItems.map((item) => {
            const isActive =
              activePage === item.page &&
              (!item.category || item.category === activeCategory);
            return (
              <button
                key={`${item.page}-${item.category || ''}`}
                onClick={() => handleNavClick(item.page, item.category)}
                className={`py-1 relative transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                    : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Search Equipment"
            aria-label="Search Equipment"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Dark/Light Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-700" />
            )}
          </button>

          {/* Admin Portal Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              activePage === 'admin'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent'
                : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500'
            }`}
            title="Admin & Database Manager"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Admin</span>
          </button>

          {/* Basket / Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-lg shadow-sm transition-all"
            aria-label="Open Equipment Basket"
            title="View Equipment Basket"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span className="hidden sm:inline">Basket</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-white bg-emerald-600 rounded-full tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Direct WhatsApp Quick Chat Hotline */}
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
              'Salam Sheikh Nouman Sports, I would like to inquire about sports gear.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all rounded-lg shadow-sm hover:shadow"
            title={`Nouman Sheikh Hotline: +${settings.whatsappNumber}`}
          >
            <Phone className="w-4 h-4 fill-white shrink-0" />
            <span className="hidden xl:inline">Nouman Sheikh: +92 332 1460134</span>
            <span className="xl:hidden">Hotline</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-800 dark:text-zinc-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-5 space-y-4 animate-in slide-in-from-top-3 duration-200">
          {/* Quick Hotline on Mobile */}
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
              'Salam Sheikh Nouman Sports, I would like to inquire about sports gear.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>WhatsApp Hotline: +92 332 1460134 (Nouman Sheikh)</span>
          </a>

          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={`${item.page}-${item.category || ''}`}
                onClick={() => handleNavClick(item.page, item.category)}
                className="text-left py-2 font-display text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-zinc-400">→</span>
              </button>
            ))}
            <button
              onClick={() => {
                onOpenCart();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-display text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-500" />
                <span>Equipment Basket</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black">
                {cartCount}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2 font-display text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 flex items-center justify-between"
            >
              <span>Admin & Database</span>
              <span className="text-xs text-zinc-400">→</span>
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Theme</span>
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-semibold"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
