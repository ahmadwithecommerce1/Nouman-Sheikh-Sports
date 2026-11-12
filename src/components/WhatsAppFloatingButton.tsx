import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { StoreSettings } from '../types';
import { buildGeneralContactUrl } from '../utils/whatsapp';

interface WhatsAppFloatingButtonProps {
  settings: StoreSettings;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ settings }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappUrl = buildGeneralContactUrl(settings, 'Direct Storefront Order / Product Availability');

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end flex-col space-y-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs py-2 px-3.5 rounded-xl shadow-xl border border-zinc-700 dark:border-zinc-200 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0 animate-ping" />
          <span>Nouman Sheikh: <strong>+92 332 1460134</strong></span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-zinc-400 hover:text-white dark:hover:text-black ml-1 p-0.5 cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white dark:border-zinc-800"
        title="WhatsApp Hotline: +92 332 1460134 (Nouman Sheikh)"
        aria-label="Order on WhatsApp Hotline with Nouman Sheikh"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
