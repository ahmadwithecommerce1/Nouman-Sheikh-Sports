import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  MapPin,
  User,
  Phone,
} from 'lucide-react';
import { CartItem, StoreSettings } from '../types';
import { buildCartWhatsAppOrderUrl } from '../utils/whatsapp';
import { productService } from '../services/productService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  settings: StoreSettings;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onExploreShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  settings,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreShop,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartWhatsAppUrl = buildCartWhatsAppOrderUrl({
    items: cartItems,
    totalPrice: totalAmount,
    settings,
    customerInfo: {
      name: customerName,
      phone: customerPhone,
      city: customerCity,
      address: customerAddress,
    },
  });

  const handleCheckoutWhatsApp = () => {
    productService.logInquiry({
      productName: `Basket (${cartItems.length} items: ${cartItems.map((i) => i.product.name).join(', ')})`,
      price: totalAmount,
      imageUrl: cartItems[0]?.product.image || '',
      whatsappUrl: cartWhatsAppUrl,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative w-full max-w-md bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 h-full shadow-2xl flex flex-col z-10 border-l border-zinc-200 dark:border-zinc-800"
        >
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-base font-black uppercase text-zinc-900 dark:text-white">
                  Equipment Basket
                </h2>
                <span className="text-[11px] text-zinc-500 font-medium">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                    Your Basket is Empty
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                    Explore our tournament-ready cricket bats, match footballs, gym dumbbells, and racket gear.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreShop();
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md"
                >
                  Explore Sports Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-50 dark:bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex gap-3 shadow-xs relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-18 object-cover rounded-lg bg-zinc-200 dark:bg-zinc-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display text-xs font-bold text-zinc-900 dark:text-white truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-zinc-400 hover:text-rose-500 transition-colors p-0.5"
                            title="Remove from basket"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {item.product.category}
                          </span>
                          <span>·</span>
                          <span>{item.product.brand}</span>
                        </div>

                        {item.customNote && (
                          <p className="text-[10px] text-zinc-600 dark:text-zinc-400 italic truncate mt-0.5">
                            Note: {item.customNote}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-950">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-black tabular-nums text-zinc-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-display text-xs font-black text-zinc-900 dark:text-white tabular-nums">
                          {settings.currency} {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Delivery details accordion toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="w-full text-left p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{showAddressForm ? 'Hide Delivery Details' : '+ Add Delivery Address (Optional)'}</span>
                    </span>
                    <span className="text-[10px] text-zinc-400">{showAddressForm ? '▲' : '▼'}</span>
                  </button>

                  {showAddressForm && (
                    <div className="mt-2 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2 text-xs animate-in fade-in duration-200">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Contact Phone"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:border-emerald-500"
                        />
                        <input
                          type="text"
                          placeholder="City (e.g. Lahore)"
                          value={customerCity}
                          onChange={(e) => setCustomerCity(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <textarea
                          rows={2}
                          placeholder="Street Address / Academy / Club"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-zinc-400 hover:text-rose-500 underline transition-colors"
                  >
                    Clear All Items
                  </button>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    WhatsApp Order Ready
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-bold text-zinc-900 dark:text-white tabular-nums">
                    {settings.currency} {totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                  <span>Courier Delivery</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Calculated on WhatsApp</span>
                </div>
                <div className="flex items-center justify-between text-base font-display font-black text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Total Amount</span>
                  <span className="font-display font-black text-lg text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {settings.currency} {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Crucial: Order Entire Basket on WhatsApp Button */}
              <a
                href={cartWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCheckoutWhatsApp}
                className="w-full py-4 px-5 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-center"
              >
                <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                <span>Order Basket on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Direct WhatsApp Order · No Card Gateway Needed</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
