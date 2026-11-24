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
        <span>
          {settings.announcementText
            .replace(/·?\s*WhatsApp Hotline[^·]*/gi, '')
            .replace(/\(Nouman Sheikh\)/gi, '')
            .replace(/:\s*\+?\d[\d\s-]{7,}/g, '')
            .replace(/\+?\d[\d\s-]{8,}/g, '')
            .replace(/·\s*·/g, '·')
            .replace(/^\s*·\s*|\s*·\s*$/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim()}
        </span>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group focus:outline-none flex items-center gap-2.5 sm:gap-3 min-w-0 shrink"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-display font-black text-base sm:text-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
            SN
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-base sm:text-xl lg:text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight truncate">
              Sheikh Nouman
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase -mt-0.5 font-bold truncate">
              Sports & Athletics
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Hidden on mobile/tablet below lg) */}
        <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 text-xs uppercase tracking-wider font-bold text-zinc-600 dark:text-zinc-300">
          {navItems.map((item) => {
            const isActive =
              activePage === item.page &&
              (!item.category || item.category === activeCategory);
            return (
              <button
                key={`${item.page}-${item.category || ''}`}
                onClick={() => handleNavClick(item.page, item.category)}
                className={`py-1.5 relative transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap ${
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
        <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Search Equipment"
            aria-label="Search Equipment"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Dark/Light Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700" />
            )}
          </button>

          {/* Admin Portal Button (Tablet/Desktop) */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden md:inline-flex items-center justify-center gap-1.5 h-9 px-3 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
              activePage === 'admin'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent'
                : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500'
            }`}
            title="Admin & Database Manager"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Admin</span>
          </button>

          {/* Basket / Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 px-2.5 sm:px-3.5 text-xs font-black uppercase tracking-wider text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-lg shadow-sm transition-all whitespace-nowrap"
            aria-label="Open Equipment Basket"
            title="View Equipment Basket"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">Basket</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-white bg-emerald-600 rounded-full tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Direct WhatsApp Quick Chat Hotline (Desktop & Wide Tablets) */}
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
              'Salam Sheikh Nouman Sports, I would like to inquire about sports gear.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center gap-2 h-9 px-3.5 text-xs font-black uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20BD5A] transition-all rounded-lg shadow-sm hover:shadow whitespace-nowrap"
            title={`Nouman Sheikh Hotline: +${settings.whatsappNumber}`}
          >
            <Phone className="w-3.5 h-3.5 fill-white shrink-0" />
            <span className="hidden 2xl:inline">Nouman Sheikh: +92 332 1460134</span>
            <span className="2xl:hidden">Hotline</span>
          </a>

          {/* Mobile Hamburger Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-5 space-y-4 animate-in slide-in-from-top-3 duration-200">
          {/* Quick Hotline on Mobile (Centered & Responsive) */}
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
              'Salam Sheikh Nouman Sports, I would like to inquire about sports gear.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 text-center shadow-sm"
          >
            <Phone className="w-4 h-4 fill-white shrink-0" />
            <span>Nouman Sheikh: +92 332 1460134</span>
          </a>

          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <button
                key={`${item.page}-${item.category || ''}`}
                onClick={() => handleNavClick(item.page, item.category)}
                className="text-left py-2.5 px-2 rounded-lg font-display text-base font-bold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between transition-colors"
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
              className="text-left py-2.5 px-2 rounded-lg font-display text-base font-bold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-emerald-600 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-500" />
                <span>Equipment Basket</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black tabular-nums">
                {cartCount}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2.5 px-2 rounded-lg font-display text-base font-bold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-emerald-600 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Admin & Database</span>
              </span>
              <span className="text-xs text-zinc-400">→</span>
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-zinc-500">Appearance</span>
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
