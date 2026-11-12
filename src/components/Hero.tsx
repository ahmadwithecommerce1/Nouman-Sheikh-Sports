import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight, Zap, Trophy, ShieldCheck, Truck } from 'lucide-react';
import { StoreSettings, SportsCategory } from '../types';
import { buildGeneralContactUrl } from '../utils/whatsapp';

interface HeroProps {
  settings: StoreSettings;
  onExploreShop: () => void;
  onSelectCategory: (category: SportsCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onExploreShop,
  onSelectCategory,
}) => {
  const whatsappInquiryUrl = buildGeneralContactUrl(settings, 'General Store Inquiry & Team Gear Orders');

  const categories: { name: SportsCategory; label: string; icon: string; count: string }[] = [
    { name: 'Cricket', label: 'Cricket Arena', icon: '🏏', count: 'Bats, Pads, Balls' },
    { name: 'Football', label: 'Football & Soccer', icon: '⚽', count: 'Match Balls, Boots' },
    { name: 'Gym & Fitness', label: 'Gym & Fitness', icon: '🏋️', count: 'Weights, Racks' },
    { name: 'Racket Sports', label: 'Racket Sports', icon: '🏸', count: 'Badminton, Tennis' },
    { name: 'Outdoor & Athletics', label: 'Outdoor & Athletics', icon: '🏃', count: 'Speed, Accessories' },
  ];

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Background Hero Banner with Athletic Volumetric Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/sports_hero_banner_1794237555222.jpg"
          alt="Sheikh Nouman Sports Arena and Equipment Showcase"
          className="w-full h-full object-cover object-center brightness-[0.6] contrast-[1.1] scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-32 md:pb-32 flex flex-col items-center text-center">
        {/* Subtle Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Sheikh Nouman Sports · Est. 1998</span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight max-w-4xl leading-[1.05]"
        >
          Engineered For <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-4">Champions</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed"
        >
          Handcrafted Grade 1+ English Willow bats, FIFA-certified match balls, commercial gym free weights, and pro racket gear. Direct WhatsApp orders with instant specialist consultation.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onExploreShop}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 group"
          >
            <span>Explore Pro Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </a>
        </motion.div>

        {/* Featured Category Tiles */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400 mb-4 text-left sm:text-center">
            Featured Athletic Disciplines
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="group p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-emerald-500/60 backdrop-blur-md text-left transition-all hover:scale-105"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div className="font-display text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                  {cat.label}
                </div>
                <div className="text-[10px] text-zinc-400 truncate mt-0.5">
                  {cat.count}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3 Proof Badges */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full text-left">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Championship Approved</div>
              <div className="text-[11px] text-zinc-400">Used by tournament players</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">100% Genuine Gear</div>
              <div className="text-[11px] text-zinc-400">Direct factory certification</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Express Nationwide Dispatch</div>
              <div className="text-[11px] text-zinc-400">Secure protective packaging</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
