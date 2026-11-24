import React, { useState } from 'react';
import { Phone, MapPin, Clock, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { StoreSettings } from '../types';
import { cleanPhoneNumber } from '../utils/whatsapp';

interface ContactPageProps {
  settings: StoreSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sportInterest, setSportInterest] = useState('Cricket');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = cleanPhoneNumber(settings.whatsappNumber);
    const textLines = [
      `Salam ${settings.storeName},`,
      ``,
      `*Customer Inquiry Form:*`,
      `👤 Name: ${name || 'Customer'}`,
      `📞 Phone: ${phone || 'Not provided'}`,
      `🏅 Sport Discipline: ${sportInterest}`,
      ``,
      `💬 Message: ${message}`,
      ``,
      `Please provide details and advice on equipment options.`,
    ];

    const encoded = encodeURIComponent(textLines.join('\n'));
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
          Athlete Support & Storefront
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-zinc-900 dark:text-white">
          Contact Sheikh Nouman Sports
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Have questions about bat weights, ball specifications, or team orders? Reach out via WhatsApp or visit our flagship pro store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Direct Store Info & WhatsApp Box */}
        <div className="space-y-6">
          {/* WhatsApp Direct Highlight Box */}
          <div className="bg-[#25D366]/10 border border-[#25D366]/30 dark:border-[#25D366]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#25D366]">
                  Instant Response Concierge
                </span>
                <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
                  WhatsApp Order Hotline
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              For instant price quotes, bat knocking video previews, custom club gear discounts, or delivery tracking, contact our head technician on WhatsApp.
            </p>

            <a
              href={`https://wa.me/${cleanPhoneNumber(settings.whatsappNumber)}?text=${encodeURIComponent(
                'Salam Sheikh Nouman Sports, I have a general equipment inquiry.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Open WhatsApp: +{settings.whatsappNumber}</span>
            </a>
          </div>

          {/* Details list */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-emerald-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                  Flagship Storefront & Workshop
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  {settings.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-emerald-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                  Operating Hours PKT
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  {settings.operatingHours}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-emerald-500 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                  Corporate & Official Enquiries
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  {settings.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Direct WhatsApp Dispatch Form */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Direct Dispatch Form
            </span>
            <h3 className="font-display text-2xl font-black text-zinc-900 dark:text-white uppercase mt-1">
              Send an Inquiry on WhatsApp
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Fill in your specifications and click below to open WhatsApp with your pre-formatted request.
            </p>
          </div>

          <form onSubmit={handleSubmitWhatsApp} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                Your Full Name:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Captain Farhan Ali"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                Your Phone / WhatsApp Number:
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0300 9876543"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                Sport Discipline:
              </label>
              <select
                value={sportInterest}
                onChange={(e) => setSportInterest(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Cricket">Cricket (English Willow, Kits, Balls)</option>
                <option value="Football">Football & Soccer (Match Balls, Boots)</option>
                <option value="Gym & Fitness">Gym & Fitness (Dumbbells, Benches, Weights)</option>
                <option value="Racket Sports">Racket Sports (Badminton, Tennis)</option>
                <option value="Outdoor & Athletics">Outdoor & Athletics</option>
                <option value="Bulk Squad Orders">Bulk Squad & Academy Orders</option>
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                Message & Specific Requirements:
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the equipment you need, bat weight preference, string tension, or delivery location..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Redirecting to WhatsApp chat with Sheikh Nouman Sports...</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Open WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
