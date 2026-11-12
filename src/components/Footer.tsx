import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, Mail, ArrowUpRight, Zap } from 'lucide-react';
import { StoreSettings, ActivePage, SportsCategory } from '../types';
import { buildGeneralContactUrl } from '../utils/whatsapp';

interface FooterProps {
  settings: StoreSettings;
  onNavigate: (page: ActivePage, category?: SportsCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const whatsappUrl = buildGeneralContactUrl(settings);

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-display font-black text-sm">
                SN
              </div>
              <div>
                <span className="font-display text-lg font-black uppercase text-zinc-900 dark:text-white">
                  Sheikh Nouman Sports
                </span>
                <p className="text-[10px] tracking-widest text-emerald-600 dark:text-emerald-400 uppercase -mt-0.5 font-bold">
                  Pro Equipment Atelier
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Official supplier of tournament-grade English Willow cricket bats, FIFA-spec match footballs, heavy Olympic weights, and pro racket gear. Direct WhatsApp orders only.
            </p>

            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 text-xs font-bold hover:bg-[#25D366]/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 fill-[#25D366]" />
                <span>WhatsApp: +{settings.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Disciplines Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display text-xs uppercase font-extrabold tracking-wider text-zinc-900 dark:text-white">
              Disciplines
            </h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Cricket')}
                  className="hover:text-emerald-500 transition-colors"
                >
                  English Willow Cricket Bats & Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Football')}
                  className="hover:text-emerald-500 transition-colors"
                >
                  Official Match Soccer Footballs & Cleats
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Gym & Fitness')}
                  className="hover:text-emerald-500 transition-colors"
                >
                  Hex Dumbbells & Heavy Cast Kettlebells
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Racket Sports')}
                  className="hover:text-emerald-500 transition-colors"
                >
                  Carbon Badminton & Wilson Tennis Rackets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'Outdoor & Athletics')}
                  className="hover:text-emerald-500 transition-colors"
                >
                  Speed Jump Ropes & Athletics
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display text-xs uppercase font-extrabold tracking-wider text-zinc-900 dark:text-white">
              Flagship Pro Store
            </h4>
            <ul className="space-y-2.5 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{settings.operatingHours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>

          {/* Ordering Policy */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display text-xs uppercase font-extrabold tracking-wider text-zinc-900 dark:text-white">
              Ordering Policy
            </h4>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Direct WhatsApp Commerce</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                No complex payment forms or traditional checkout required. Orders are verified and scheduled for courier dispatch directly on WhatsApp.
              </p>
            </div>
            <div className="pt-1">
              <button
                onClick={() => onNavigate('admin')}
                className="text-[11px] text-zinc-500 hover:text-emerald-500 flex items-center gap-1 transition-colors font-bold"
              >
                <span>Store Admin & Firebase Panel</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Sheikh Nouman Sports. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct WhatsApp Ordering Store</span>
            <span>·</span>
            <span>Tournament Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
