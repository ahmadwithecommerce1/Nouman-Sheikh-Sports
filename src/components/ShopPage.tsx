import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, Filter, Layers } from 'lucide-react';
import { Product, StoreSettings, SportsCategory } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORY_TREE_DATA, getBrandsForCategory } from '../data/categoryTree';

interface ShopPageProps {
  products: Product[];
  settings: StoreSettings;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  initialCategory?: SportsCategory;
}

const CATEGORIES: SportsCategory[] = [
  'All',
  'Cricket',
  'Football',
  'Gym & Fitness',
  'Racket Sports',
  'Outdoor & Athletics',
];

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  settings,
  onSelectProduct,
  onAddToCart,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SportsCategory>(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');
  const [priceTier, setPriceTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Sub-categories available for the currently selected discipline
  const availableSubCategories = useMemo(() => {
    if (selectedCategory === 'All') return [];
    const group = CATEGORY_TREE_DATA.categories.find(
      (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
    );
    return group ? group.subCategories : [];
  }, [selectedCategory]);

  // Dynamically derived brands based on selected category & existing products
  const categoryBrands = useMemo(() => {
    const preset = getBrandsForCategory(selectedCategory, selectedSubCategory === 'All' ? undefined : selectedSubCategory);
    const fromProducts = products
      .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
      .map((p) => p.brand);
    const combined = Array.from(new Set(['All Brands', ...preset, ...fromProducts]));
    return combined;
  }, [selectedCategory, selectedSubCategory, products]);

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category (Level 2)
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sub-Category (Level 3)
    if (selectedSubCategory !== 'All') {
      const subLower = selectedSubCategory.toLowerCase();
      result = result.filter((p) => {
        if (p.subCategory && p.subCategory.toLowerCase().includes(subLower)) return true;
        if (p.categoryPath && p.categoryPath.toLowerCase().includes(subLower)) return true;
        if (p.categoryHierarchy && p.categoryHierarchy.some((h) => h.toLowerCase().includes(subLower))) return true;
        return false;
      });
    }

    // Brand
    if (selectedBrand !== 'All Brands') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Price Tier
    if (priceTier === 'under-15k') {
      result = result.filter((p) => p.price < 15000);
    } else if (priceTier === '15k-30k') {
      result = result.filter((p) => p.price >= 15000 && p.price <= 30000);
    } else if (priceTier === 'above-30k') {
      result = result.filter((p) => p.price > 30000);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
          (p.categoryPath && p.categoryPath.toLowerCase().includes(q)) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedSubCategory, selectedBrand, priceTier, sortBy, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSubCategory('All');
    setSelectedBrand('All Brands');
    setPriceTier('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSubCategory !== 'All' ||
    selectedBrand !== 'All Brands' ||
    priceTier !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
            Official Equipment Catalog
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white mt-1">
            Shop Sports & Games Gear
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
            Tournament-grade cricket willow, official footballs, heavy Olympic weights, and high-modulus rackets. Ordered directly via WhatsApp.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex-1 py-2 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4 text-emerald-500" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop & Collapsible Mobile) */}
        <aside
          className={`space-y-6 lg:block ${
            showMobileFilters ? 'block' : 'hidden'
          } bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-fit lg:sticky lg:top-28`}
        >
          {/* Header + Reset */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
              <span className="font-display text-sm font-bold uppercase text-zinc-900 dark:text-white">
                Filters
              </span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-bold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Search Gear
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Willow, Dumbbells, Yonex..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories (Level 2) */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Sport Discipline
            </label>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubCategory('All');
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span>{cat === 'All' ? 'All Disciplines' : cat}</span>
                  {selectedCategory === cat && <span className="text-[10px]">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Categories (Level 3 Drilldown) */}
          {availableSubCategories.length > 0 && (
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5 animate-in fade-in duration-200">
              <label className="block text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                <span>{selectedCategory} Equipment Type</span>
              </label>
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedSubCategory('All')}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                    selectedSubCategory === 'All'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  All {selectedCategory}
                </button>
                {availableSubCategories.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubCategory(sub.name)}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                      selectedSubCategory === sub.name
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brand Filter (Filtered for Category) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Brand / Manufacturer
              </label>
              {selectedCategory !== 'All' && (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  Filtered
                </span>
              )}
            </div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              {categoryBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Tiers */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Price Range
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under-15k', label: 'Under Rs. 15,000' },
                { id: '15k-30k', label: 'Rs. 15,000 – Rs. 30,000' },
                { id: 'above-30k', label: 'Rs. 30,000 & Above' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setPriceTier(tier.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    priceTier === tier.id
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid & Sorting Header */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort and Count Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              Showing <strong className="text-zinc-900 dark:text-white tabular-nums">{filteredProducts.length}</strong> tournament-grade products
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
                No matching sports equipment
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                No products match the selected filters. Try clearing your search keyword or selecting a different brand or category.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  settings={settings}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
