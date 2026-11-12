import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ShieldCheck, Hammer, Users, Target, Phone, ArrowRight } from 'lucide-react';
import { StoreSettings } from '../types';
import { buildGeneralContactUrl } from '../utils/whatsapp';

interface AboutPageProps {
  settings: StoreSettings;
  onExploreShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onExploreShop }) => {
  const whatsappUrl = buildGeneralContactUrl(settings, 'About Us - Partnership & Team Sponsorship');

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
          The Sheikh Nouman Legacy · Est. 1998
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-zinc-900 dark:text-white tracking-tight">
          Crafting Gear for Champions Since 1998
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Founded with a relentless commitment to athletic excellence, Sheikh Nouman Sports supplies national league players, academy proteges, and serious athletes with handpicked English Willow, certified match footballs, and heavy-duty strength equipment.
        </p>
      </div>

      {/* Visual Showcase Banner */}
      <div className="aspect-[16/7] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative shadow-xl">
        <img
          src="/src/assets/images/sports_hero_banner_1794237555222.jpg"
          alt="Sheikh Nouman Sports High Performance Arena"
          className="w-full h-full object-cover object-center brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-lg">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
            Certified Excellence
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold mt-1">
            Where Craft Meets Athletic Precision
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1">
            Over 25,000 tournament-ready bats pressed, shaped, and oiled in our master workshops.
          </p>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Hammer className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Bespoke Bat Crafting
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every Grade 1+ English Willow cleft is individually weighed, balanced, and machine-pressed to exact customer weight preferences.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
            Hand-Finished Perfection
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              100% Genuine Certification
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Zero counterfeit tolerance. We source directly from authorized manufacturers including CA Plus, Nike, Adidas, Wilson, and Yonex.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
            Official Brand Distributor
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              WhatsApp Direct Support
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Skip impersonal carts. Consult directly with equipment specialists who play the game and understand your exact sporting needs.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
            Real Athlete Consultation
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Club & Team Gear
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Outfit entire tournament squads, school academies, and corporate leagues with custom-branded kits and bulk pricing.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
            Squad Outfitting
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-emerald-600 text-white rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center space-y-6">
        <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight">
          Ready to Elevate Your Sporting Performance?
        </h2>
        <p className="text-sm sm:text-base text-emerald-100 max-w-xl leading-relaxed">
          Explore our tournament-certified equipment or chat with our master equipment advisors on WhatsApp right now.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onExploreShop}
            className="px-8 py-3.5 bg-zinc-950 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Browse Equipment Catalog
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-white text-emerald-700 hover:bg-emerald-50 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Phone className="w-4 h-4 fill-emerald-700" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
