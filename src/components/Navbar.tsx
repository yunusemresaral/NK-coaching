/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

function getDirectImageUrl(url: string): string {
  if (!url) return '';
  let cleanUrl = url.trim().replace(/\$0$/, '');
  const imgurMatch = cleanUrl.match(/^https?:\/\/(?:i\.|www\.)?imgur\.com\/([a-zA-Z0-9]+)(?:_[a-zA-Z0-9]+)?(?:\.[a-zA-Z0-9]+)?(?:\?.*)?$/);
  if (imgurMatch && imgurMatch[1]) {
    return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
  }
  return cleanUrl;
}

const LOGO_IMAGE_SRC = 'https://i.imgur.com/ydXfdhR_d.webp?maxwidth=760&fidelity=grand$0';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCtaClick: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onCtaClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const logoUrl = getDirectImageUrl(LOGO_IMAGE_SRC);

  const navItems = [
    { id: 'about', label: 'Ben Kimim' },
    { id: 'packages', label: 'Paketler & Nasıl Çalışır' },
    { id: 'transformations', label: 'Değişimler' },
    { id: 'contact', label: 'İletişim & Analiz' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => setActiveTab('about')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full border-2 border-brand-accent/50 group-hover:border-brand-accent group-hover:scale-105 transition-all duration-300 bg-zinc-950 flex-shrink-0 flex items-center justify-center text-brand-accent font-serif font-bold text-sm sm:text-base tracking-wider shadow-inner p-1">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Neslihan Karga Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-full"
                />
              ) : (
                "NK"
              )}
            </div>
            <div>
              <p className="font-serif text-base sm:text-lg font-semibold tracking-widest text-white leading-none">
                NESLİHAN KARGA
              </p>
              <p className="text-[9px] font-mono tracking-wider uppercase text-brand-accent mt-0.5 font-medium leading-none">
                Kişisel Koçluk
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === item.id ? 'text-white' : 'text-brand-gray hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA action button */}
            <button
              onClick={onCtaClick}
              className="bg-brand-accent hover:bg-brand-accent/90 text-white px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-sm"
            >
              Hemen Başla
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-accent p-2 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black border-b border-zinc-900"
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-brand-accent-light text-white font-bold border border-brand-accent/20' 
                  : 'text-brand-gray hover:bg-zinc-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                onCtaClick();
                setIsOpen(false);
              }}
              className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
            >
              Hemen Başla
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
