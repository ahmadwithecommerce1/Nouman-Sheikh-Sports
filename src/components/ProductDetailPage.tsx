import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MessageCircle,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  Tag,
  ShoppingBag,
  Plus,
  Minus,
  Play,
  Film,
  Percent,
} from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { buildWhatsAppOrderUrl } from '../utils/whatsapp';
import { productService } from '../services/productService';

interface ProductDetailPageProps {
  product: Product;
  settings: StoreSettings;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, customNote?: string) => void;
  allProducts: Product[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  settings,
  onBack,
  onSelectProduct,
  onAddToCart,
  allProducts,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');
  const [customNote, setCustomNote] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Combine product image and gallery images (up to 4 unique images)
  const imageGallery = React.useMemo(() => {
    const list = [product.image, ...(product.gallery || [])].filter(Boolean);
    return Array.from(new Set(list)).slice(0, 4);
  }, [product.image, product.gallery]);

  const discountAmount =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  const discountPercent =
    product.discountPercent ||
    (product.originalPrice && product.originalPrice > product.price
      ? Math.round((discountAmount / product.originalPrice) * 100)
      : 0);

  const whatsappUrl = buildWhatsAppOrderUrl({
    product,
    settings,
    customNotes: customNote,
  });

  const handleWhatsAppClick = () => {
    productService.logInquiry({
      productName: product.name,
      price: product.price,
      imageUrl: product.image,
      whatsappUrl,
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      const shareUrl = `${window.location.origin}?page=product-detail&id=${product.id}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper to check if video URL is a YouTube/Vimeo embed
  const isEmbedVideo = (url?: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  // Related products from same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Catalog</span>
          </button>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-xs text-zinc-500 font-medium">Sports</span>
          <span className="text-zinc-300 dark:text-zinc-700">›</span>
          <span className="text-xs text-zinc-500 font-medium">{product.category}</span>
          {product.subCategory && (
            <>
              <span className="text-zinc-300 dark:text-zinc-700">›</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                {product.subCategory}
              </span>
            </>
          )}
        </div>

        <button
          onClick={handleShare}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Link Copied' : 'Share Gear'}</span>
        </button>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left Column: Media Showcase (Images + Video Player) */}
        <div className="space-y-4">
          {/* Main Media Frame */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md relative">
            {activeMedia === 'video' && product.videoUrl ? (
              <div className="w-full h-full flex items-center justify-center bg-black">
                {isEmbedVideo(product.videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(product.videoUrl)}
                    title={`${product.name} Video Demo`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={product.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ) : (
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Badges Stack */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 items-start pointer-events-none">
              {product.badge && (
                <div className="bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md backdrop-blur-xs shadow-md">
                  {product.badge}
                </div>
              )}
              {discountPercent > 0 && (
                <div className="bg-rose-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" />
                  <span>{discountPercent}% OFF</span>
                </div>
              )}
            </div>

            {/* Switch to Video Button Overlay if video is available */}
            {product.videoUrl && (
              <button
                onClick={() => setActiveMedia(activeMedia === 'video' ? 'image' : 'video')}
                className="absolute bottom-4 right-4 bg-zinc-900/90 hover:bg-zinc-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 backdrop-blur-md shadow-lg border border-zinc-700 hover:border-emerald-500 transition-all cursor-pointer"
              >
                {activeMedia === 'video' ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Photos</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>Watch Video Demo</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Media Thumbnails Switcher (Up to 4 Images + Video tab) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {imageGallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedImage(img);
                  setActiveMedia('image');
                }}
                className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeMedia === 'image' && selectedImage === img
                    ? 'border-emerald-500 shadow-sm scale-102'
                    : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
                }`}
                title={`View image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                  #{idx + 1}
                </span>
              </button>
            ))}

            {/* Video Thumbnail Button if video exists */}
            {product.videoUrl && (
              <button
                onClick={() => setActiveMedia('video')}
                className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-zinc-900 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  activeMedia === 'video'
                    ? 'border-emerald-500 shadow-sm scale-102'
                    : 'border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100'
                }`}
                title="Play Video Demonstration"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-emerald-400 ml-0.5" />
                </div>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Video</span>
              </button>
            )}
          </div>

          {/* Service badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <div className="p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
              <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">100% Authentic</div>
              <div className="text-[10px] text-zinc-500">Official Factory Genuine</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
              <Truck className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Express Courier</div>
              <div className="text-[10px] text-zinc-500">Nationwide 2-3 Days</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
              <RotateCcw className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Direct Support</div>
              <div className="text-[10px] text-zinc-500">Nouman Sheikh Concierge</div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="flex flex-col space-y-6">
          <div>
            {/* Category & Brand */}
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              <span>{product.category}</span>
              {product.subCategory && (
                <>
                  <span className="text-zinc-400">›</span>
                  <span>{product.subCategory}</span>
                </>
              )}
              <span className="text-zinc-400">·</span>
              <span className="text-zinc-500">{product.brand}</span>
            </div>

            {/* Product Title */}
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200 tabular-nums">
                  {product.rating}
                </span>
              </div>
              <span className="text-xs text-zinc-400">·</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {product.reviewsCount} Verified Athlete Reviews
              </span>
              <span className="text-xs text-zinc-400">·</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {product.inStock ? 'Ready to Dispatch' : 'Backorder Available'}
              </span>
            </div>

            {/* Price Row with Crossed-Out Original Price and Highlighted Discount */}
            <div className="mt-4 py-3 border-y border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-display text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tabular-nums">
                  {settings.currency} {product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-zinc-400 dark:text-zinc-500 line-through tabular-nums font-semibold">
                    {settings.currency} {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider border border-rose-500/20">
                    Save {discountPercent}% (Rs. {discountAmount.toLocaleString()})
                  </span>
                )}
              </div>
              <span className="self-start sm:self-auto text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-md">
                Direct WhatsApp Deal
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Equipment Overview
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Custom Notes / Size preference for WhatsApp */}
          <div className="space-y-2 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              Custom Requirements / Weight / Sizing Note:
            </label>
            <input
              type="text"
              placeholder="e.g. Prefer 2lb 8oz bat weight / Size UK 9 boots / 28 lbs string tension"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
              This note and the direct image link will be automatically attached to your WhatsApp message.
            </span>
          </div>

          {/* Dual Actions: Quantity + Add to Basket + Instant WhatsApp Order */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-display text-sm font-black text-zinc-900 dark:text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Basket Button */}
              <button
                onClick={() => {
                  onAddToCart(product, quantity, customNote);
                  setAddedAlert(true);
                  setTimeout(() => setAddedAlert(false), 2400);
                }}
                className="flex-1 py-3 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-500" />
                <span>Add to Basket</span>
              </button>
            </div>

            {addedAlert && (
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center animate-in fade-in">
                ✓ Added {quantity} × {product.name} to your Basket!
              </div>
            )}

            {/* Crucial WhatsApp CTA Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-sm uppercase tracking-wider font-extrabold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-center"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Order on WhatsApp Now</span>
            </a>

            <div className="text-center text-[11px] text-zinc-500">
              Direct master concierge confirms equipment weights, bat knocking, and courier details.
            </div>
          </div>

          {/* Technical Specifications Table */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
              <h3 className="font-display text-base font-bold text-zinc-900 dark:text-white">
                Technical Specifications
              </h3>
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="px-4 py-2.5 flex justify-between gap-4">
                    <span className="font-semibold text-zinc-500 dark:text-zinc-400">{key}</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">
                You May Also Need
              </span>
              <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                Related {product.category} Equipment
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => {
              const relWhatsApp = buildWhatsAppOrderUrl({ product: rel, settings });
              return (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden p-4 cursor-pointer hover:border-emerald-500/50 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full aspect-[4/3] object-cover rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-3"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                      {rel.brand}
                    </span>
                    <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {rel.name}
                    </h4>
                    <div className="mt-1 font-display font-black text-sm text-zinc-900 dark:text-white tabular-nums">
                      {settings.currency} {rel.price.toLocaleString()}
                    </div>
                  </div>
                  <a
                    href={relWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 w-full py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-[11px] font-extrabold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
