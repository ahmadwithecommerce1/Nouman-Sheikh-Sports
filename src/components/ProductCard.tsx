import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Star, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { buildWhatsAppOrderUrl } from '../utils/whatsapp';
import { productService } from '../services/productService';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  settings,
  onSelectProduct,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Exact WhatsApp order URL containing Product Name, Price, and direct link to image
  const whatsappUrl = buildWhatsAppOrderUrl({
    product,
    settings,
  });

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening product detail when clicking order button
    productService.logInquiry({
      productName: product.name,
      price: product.price,
      imageUrl: product.image,
      whatsappUrl,
    });
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onSelectProduct(product)}
      className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 cursor-pointer transition-all duration-300 h-full"
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800/60 overflow-hidden shrink-0">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            <Sparkles className="w-6 h-6 text-emerald-500 mb-1" />
            <span className="font-display text-xs font-bold">{product.name}</span>
          </div>
        )}

        {/* Badges Stack (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <div className="bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
              {product.badge}
            </div>
          )}
          {product.discountPercent && product.discountPercent > 0 ? (
            <div className="bg-rose-600 text-white text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <span>-{product.discountPercent}% OFF</span>
            </div>
          ) : product.originalPrice && product.originalPrice > product.price ? (
            <div className="bg-rose-600 text-white text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md shadow-xs">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          ) : null}
        </div>

        {/* Brand Tag (Top Right) */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs shadow-xs">
          {product.brand}
        </div>

        {/* Video Available Indicator */}
        {product.videoUrl && (
          <div className="absolute bottom-2.5 right-2.5 bg-zinc-950/80 text-emerald-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Video</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-wider text-[10px] truncate max-w-[170px]">
              {product.subCategory ? `${product.category} › ${product.subCategory}` : product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tabular-nums">
                {product.rating}
              </span>
              <span className="text-[10px] text-zinc-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          {/* Price display with crossed-out original and highlighted discounted price */}
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-display text-lg sm:text-xl font-black text-zinc-900 dark:text-white tabular-nums">
                {settings.currency} {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through tabular-nums font-semibold">
                  {settings.currency} {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase shrink-0">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Dual Action: Add to Basket + Instant WhatsApp Order */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddClick}
              className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border min-h-[38px] ${
                justAdded
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
              title="Add to Equipment Basket"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>+ Basket</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="py-2 px-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg text-xs uppercase tracking-wider font-extrabold transition-all shadow-xs flex items-center justify-center gap-1.5 min-h-[38px]"
              title="Order this item directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
