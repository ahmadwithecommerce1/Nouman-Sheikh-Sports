import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  ChevronRight,
  ChevronDown,
  Check,
  Layers,
  Tag,
  X,
  FolderTree,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';
import {
  CATEGORY_TREE_DATA,
  getAllLevel3Categories,
  getBrandsForCategory,
  CategoryLevel2Group,
  CategoryLevel3Item,
} from '../data/categoryTree';
import { SportsCategory } from '../types';

interface CategoryTreeSelectProps {
  selectedCategory: SportsCategory;
  selectedSubCategory?: string;
  selectedPath?: string;
  selectedHierarchy?: string[];
  selectedBrand: string;
  onSelectCategory: (
    category: SportsCategory,
    subCategory?: string,
    path?: string,
    hierarchy?: string[]
  ) => void;
  onSelectBrand: (brand: string) => void;
}

export const CategoryTreeSelect: React.FC<CategoryTreeSelectProps> = ({
  selectedCategory,
  selectedSubCategory,
  selectedPath,
  selectedHierarchy,
  selectedBrand,
  onSelectCategory,
  onSelectBrand,
}) => {
  // Cascading Tree Modal / Dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Active navigation within cascading columns
  const [activeLevel2Id, setActiveLevel2Id] = useState<string>(() => {
    const found = CATEGORY_TREE_DATA.categories.find(
      (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
    );
    return found ? found.id : 'cricket';
  });

  // Brand dropdown & custom brand states
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [customBrandInput, setCustomBrandInput] = useState('');
  const [showCustomBrandInput, setShowCustomBrandInput] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);

  // Close popups on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Currently hovered/selected Level 2 discipline
  const activeLevel2Group = useMemo(() => {
    return (
      CATEGORY_TREE_DATA.categories.find((c) => c.id === activeLevel2Id) ||
      CATEGORY_TREE_DATA.categories[0]
    );
  }, [activeLevel2Id]);

  // All leaf categories for search
  const allLeafCategories = useMemo(() => {
    return getAllLevel3Categories();
  }, []);

  // Search results for Category Tree
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allLeafCategories.filter(
      (leaf) =>
        leaf.name.toLowerCase().includes(q) ||
        leaf.label.toLowerCase().includes(q) ||
        leaf.displayPath.toLowerCase().includes(q) ||
        leaf.path.toLowerCase().includes(q) ||
        (leaf.level4Items && leaf.level4Items.some((item) => item.toLowerCase().includes(q))) ||
        leaf.popularBrands.some((b) => b.toLowerCase().includes(q))
    );
  }, [searchQuery, allLeafCategories]);

  // Filtered brands based on selected category & sub-category
  const availableBrands = useMemo(() => {
    const brands = getBrandsForCategory(selectedCategory, selectedSubCategory);
    if (!brandSearch.trim()) return brands;
    const q = brandSearch.toLowerCase().trim();
    return brands.filter((b) => b.toLowerCase().includes(q));
  }, [selectedCategory, selectedSubCategory, brandSearch]);

  // Handle leaf category selection
  const handleSelectLeaf = (group: CategoryLevel2Group, leaf: CategoryLevel3Item) => {
    onSelectCategory(group.name, leaf.name, leaf.path, [
      'Sports',
      group.name,
      leaf.name,
    ]);
    setIsOpen(false);
    setSearchQuery('');

    // If current brand is not among the suggested brands for this category, auto-suggest the top brand
    const newSuggestedBrands = getBrandsForCategory(group.name, leaf.name);
    if (newSuggestedBrands.length > 0 && !newSuggestedBrands.includes(selectedBrand)) {
      onSelectBrand(newSuggestedBrands[0]);
    }
  };

  // Formatted display path
  const currentDisplayPath = useMemo(() => {
    if (selectedHierarchy && selectedHierarchy.length >= 3) {
      return selectedHierarchy.join(' › ');
    }
    if (selectedPath) {
      return selectedPath.replace(/\//g, ' › ');
    }
    if (selectedCategory && selectedSubCategory) {
      return `Sports › ${selectedCategory} › ${selectedSubCategory}`;
    }
    return `Sports › ${selectedCategory || 'Cricket'}`;
  }, [selectedHierarchy, selectedPath, selectedCategory, selectedSubCategory]);

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 p-4">
      {/* ─────────────────────────────────────────────────────────────
          1. CATEGORY TREE (AMAZON-STYLE 3-LEVEL CASCADING DROPDOWN)
      ────────────────────────────────────────────────────────────── */}
      <div className="relative" ref={containerRef}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-1.5">
            <FolderTree className="w-4 h-4 text-emerald-500" />
            <span>Category Tree (Multi-Level Cascading Hierarchy)</span>
          </label>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            3-Level Amazon-Style
          </span>
        </div>

        {/* Interactive Trigger Box (looks like an Amazon Department Selector) */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full min-h-[46px] p-2.5 rounded-xl border transition-all cursor-pointer bg-white dark:bg-zinc-950 flex items-center justify-between gap-3 shadow-xs ${
            isOpen
              ? 'border-emerald-500 ring-2 ring-emerald-500/20'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
          }`}
        >
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs shrink-0">
              {activeLevel2Group?.icon || '🏆'}
            </span>

            {/* Breadcrumb Path Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold text-zinc-900 dark:text-zinc-100">
              <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px]">
                Level 1: Sports
              </span>
              <span className="text-zinc-400">›</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px] border border-emerald-200 dark:border-emerald-800">
                Level 2: {selectedCategory}
              </span>
              <span className="text-zinc-400">›</span>
              <span className="px-2.5 py-0.5 rounded bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black text-[11px] shadow-xs">
                Level 3: {selectedSubCategory || 'Bats'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
              Browse Tree
            </span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-emerald-500' : ''
              }`}
            />
          </div>
        </div>

        {/* Selected Path Confirmation Tag */}
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-zinc-500 px-1">
          <span>
            Database Storage Path: <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{selectedPath || `Sports/${selectedCategory}/${selectedSubCategory || 'Bats'}`}</code>
          </span>
          <span className="text-zinc-400">Click box to expand full hierarchy</span>
        </div>

        {/* Cascading Tree Dropdown Modal / Popover */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Popover Header with Search Bar */}
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  <span className="font-display text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                    Amazon-Style Category Classifier
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Instant Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sports hierarchy e.g. Bats, Match Balls, Dumbbells, Tennis, Shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  autoFocus
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results Mode OR Cascading Columns Mode */}
            {searchQuery.trim().length > 0 ? (
              /* Search Match Direct Selector */
              <div className="p-3 max-h-72 overflow-y-auto space-y-1 divide-y divide-zinc-100 dark:divide-zinc-900">
                <div className="text-[11px] font-bold text-zinc-400 px-2 pb-1.5">
                  Found {searchResults.length} matching category leaf nodes:
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-xs text-zinc-400">
                    No matching categories found for "{searchQuery}". Try searching "Willow", "Ball", or "Dumbbell".
                  </div>
                ) : (
                  searchResults.map((leaf) => {
                    const parentGroup = CATEGORY_TREE_DATA.categories.find((c) =>
                      c.subCategories.some((s) => s.id === leaf.id)
                    ) || CATEGORY_TREE_DATA.categories[0];

                    const isCurrent =
                      selectedCategory === parentGroup.name &&
                      selectedSubCategory === leaf.name;

                    return (
                      <button
                        key={leaf.id}
                        type="button"
                        onClick={() => handleSelectLeaf(parentGroup, leaf)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group ${
                          isCurrent
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            <span>{parentGroup.icon}</span>
                            <span>{leaf.label}</span>
                          </div>
                          <div
                            className={`text-[10px] mt-0.5 font-medium ${
                              isCurrent ? 'text-emerald-100' : 'text-zinc-400'
                            }`}
                          >
                            Path: {leaf.displayPath}
                          </div>
                        </div>

                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shrink-0 ${
                            isCurrent
                              ? 'bg-white text-emerald-700'
                              : 'bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-600 group-hover:text-white'
                          }`}
                        >
                          <span>Select</span>
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            ) : (
              /* Amazon-Style Cascading Columns (Level 1 Root -> Level 2 Discipline -> Level 3 Sub-Category) */
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[290px] max-h-[360px] divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
                {/* Column 1: Root Department (Level 1) */}
                <div className="md:col-span-3 p-3 bg-zinc-50/70 dark:bg-zinc-900/40 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400 px-2 py-1">
                    Level 1: Root
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-500/40 text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-between shadow-xs">
                    <span className="flex items-center gap-2">
                      <span>🏆</span>
                      <span>Sports & Games</span>
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <div className="p-2 text-[10px] text-zinc-400 leading-relaxed">
                    Official athletic department. Select a sports discipline on the right.
                  </div>
                </div>

                {/* Column 2: Major Sports Disciplines (Level 2) */}
                <div className="md:col-span-4 p-3 overflow-y-auto space-y-1 bg-white dark:bg-zinc-950">
                  <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400 px-2 py-1">
                    Level 2: Discipline
                  </div>
                  {CATEGORY_TREE_DATA.categories.map((cat) => {
                    const isSelected = activeLevel2Id === cat.id;
                    const isAppliedCategory = selectedCategory === cat.name;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onMouseEnter={() => setActiveLevel2Id(cat.id)}
                        onClick={() => setActiveLevel2Id(cat.id)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base">{cat.icon}</span>
                          <span className="truncate">{cat.name}</span>
                          {isAppliedCategory && !isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              isSelected
                                ? 'bg-emerald-700 text-emerald-100'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {cat.subCategories.length}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Column 3: Equipment Sub-Categories (Level 3 - Leaf Nodes) */}
                <div className="md:col-span-5 p-3 overflow-y-auto space-y-1.5 bg-zinc-50/50 dark:bg-zinc-900/30">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-zinc-400 px-2 py-1">
                    <span>Level 3: {activeLevel2Group.name} Gear</span>
                    <span className="text-emerald-500">Click to Select</span>
                  </div>

                  {activeLevel2Group.subCategories.map((sub) => {
                    const isCurrent =
                      selectedCategory === activeLevel2Group.name &&
                      selectedSubCategory === sub.name;

                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => handleSelectLeaf(activeLevel2Group, sub)}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1 group ${
                          isCurrent
                            ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-md'
                            : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-emerald-500 dark:hover:border-emerald-500 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-bold text-xs">
                            <span>{sub.name}</span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />}
                          </div>
                          <span
                            className={`text-[10px] uppercase font-black px-2 py-0.5 rounded transition-colors ${
                              isCurrent
                                ? 'bg-emerald-500 text-white'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:bg-emerald-600 group-hover:text-white'
                            }`}
                          >
                            {isCurrent ? 'Active' : 'Apply'}
                          </span>
                        </div>

                        <p
                          className={`text-[11px] leading-relaxed line-clamp-1 ${
                            isCurrent
                              ? 'text-zinc-300 dark:text-zinc-600'
                              : 'text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          {sub.label}
                        </p>

                        {/* Level 4 preview badges */}
                        {sub.level4Items && sub.level4Items.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap pt-1">
                            {sub.level4Items.slice(0, 3).map((item) => (
                              <span
                                key={item}
                                className={`text-[9px] px-1.5 py-0.5 rounded ${
                                  isCurrent
                                    ? 'bg-white/10 dark:bg-black/10 text-zinc-200 dark:text-zinc-800'
                                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400'
                                }`}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Popover Footer Breadcrumbs & Apply Summary */}
            <div className="p-3 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                <span className="font-bold text-[10px] uppercase tracking-wider text-zinc-400">
                  Current Selection:
                </span>
                <span className="font-display font-extrabold text-zinc-900 dark:text-white">
                  {currentDisplayPath}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Confirm Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. BRAND TREE (FILTERED STRICTLY BASED ON SELECTED CATEGORY)
      ────────────────────────────────────────────────────────────── */}
      <div className="relative" ref={brandDropdownRef}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-emerald-500" />
            <span>Brand Selection (Filtered for {selectedCategory})</span>
          </label>
          <span className="text-xs font-bold text-zinc-500">
            Selected: <strong className="text-emerald-600 dark:text-emerald-400">{selectedBrand || 'None'}</strong>
          </span>
        </div>

        {/* Brand Dropdown Trigger Field */}
        <div
          onClick={() => setIsBrandOpen(!isBrandOpen)}
          className={`w-full min-h-[42px] px-3.5 py-2 rounded-xl border transition-all cursor-pointer bg-white dark:bg-zinc-950 flex items-center justify-between gap-3 shadow-xs ${
            isBrandOpen
              ? 'border-emerald-500 ring-2 ring-emerald-500/20'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-display text-[10px] font-black uppercase">
              {selectedBrand ? selectedBrand.slice(0, 2) : 'BR'}
            </div>
            <span className="text-xs font-bold text-zinc-900 dark:text-white">
              {selectedBrand || `Select brand for ${selectedCategory}...`}
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">
              ({availableBrands.length} brands available for {selectedCategory})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Change</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isBrandOpen ? 'rotate-180 text-emerald-500' : ''
              }`}
            />
          </div>
        </div>

        {/* Quick Brand Pills for Fast 1-Click Selection */}
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 shrink-0">
            Quick Pick:
          </span>
          {availableBrands.slice(0, 6).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => onSelectBrand(b)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === b
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs scale-102'
                  : 'bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500'
              }`}
            >
              {b}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustomBrandInput(!showCustomBrandInput)}
            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:text-emerald-500 cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Custom Brand</span>
          </button>
        </div>

        {/* Brand Dropdown Menu */}
        {isBrandOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Search Brand Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={`Search brands for ${selectedCategory} (e.g. ${availableBrands.slice(0, 2).join(', ')})...`}
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full pl-8 pr-7 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                autoFocus
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              {brandSearch && (
                <button
                  type="button"
                  onClick={() => setBrandSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Brand List */}
            <div className="max-h-48 overflow-y-auto space-y-1 divide-y divide-zinc-100 dark:divide-zinc-900">
              {availableBrands.length === 0 ? (
                <div className="p-4 text-center text-xs text-zinc-400">
                  No preset brands match "{brandSearch}". Use custom input below.
                </div>
              ) : (
                availableBrands.map((b) => {
                  const isSelected = selectedBrand.toLowerCase() === b.toLowerCase();
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        onSelectBrand(b);
                        setIsBrandOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-black flex items-center justify-center">
                          {b.slice(0, 1)}
                        </span>
                        <span>{b}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>

            {/* Custom Brand Entry Footer */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Or enter new custom brand name..."
                  value={customBrandInput}
                  onChange={(e) => setCustomBrandInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customBrandInput.trim()) {
                      e.preventDefault();
                      onSelectBrand(customBrandInput.trim());
                      setCustomBrandInput('');
                      setIsBrandOpen(false);
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customBrandInput.trim()) {
                      onSelectBrand(customBrandInput.trim());
                      setCustomBrandInput('');
                      setIsBrandOpen(false);
                    }
                  }}
                  className="px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Brand Expandable Box */}
        {showCustomBrandInput && (
          <div className="mt-2.5 p-3 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center gap-2 animate-in fade-in duration-200">
            <input
              type="text"
              placeholder="Enter custom manufacturer / brand name..."
              value={customBrandInput}
              onChange={(e) => setCustomBrandInput(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => {
                if (customBrandInput.trim()) {
                  onSelectBrand(customBrandInput.trim());
                  setShowCustomBrandInput(false);
                }
              }}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-xs"
            >
              Set Brand
            </button>
            <button
              type="button"
              onClick={() => setShowCustomBrandInput(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
