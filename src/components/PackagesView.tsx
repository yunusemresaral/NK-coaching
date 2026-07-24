import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Dumbbell, Sparkles, Activity } from 'lucide-react';
import { CoachingPackage } from '../types';

interface PackagesViewProps {
  onSelectPackage: (pkg: CoachingPackage) => void;
}

export default function PackagesView({ onSelectPackage }: PackagesViewProps) {
  const packages: CoachingPackage[] = [
    {
      id: '6_hafta',
      name: '6 Haftalık Paket',
      tagline: 'Yeni başlayanlar veya hızlı bir başlangıç yapmak isteyenler için ideal.',
      price: 5000,
      duration: '6 Hafta',
      lessons: 12,
      type: 'fitness',
      features: [
        { text: 'Kişiye Özel Antrenman Planı', included: true },
        { text: 'Sürdürülebilir Beslenme Programı', included: true },
        { text: 'Haftalık Kilo & Ölçüm Takibi', included: true },
        { text: 'WhatsApp Soru/Cevap Desteği', included: true },
        { text: 'Görsel Egzersiz Kütüphanesi', included: true },
        { text: 'Detaylı Postür Analizi', included: false },
        { text: 'Birebir Görüntülü Değerlendirme', included: false },
      ],
    },
    {
      id: '8_hafta',
      name: '8 Haftalık Paket',
      tagline: 'Kalıcı alışkanlıklar kazanmak ve belirgin fiziksel değişim için.',
      price: 7000,
      duration: '8 Hafta',
      lessons: 16,
      popular: true,
      type: 'pilates',
      features: [
        { text: 'Kişiye Özel Antrenman Planı', included: true },
        { text: 'Sürdürülebilir Beslenme Programı', included: true },
        { text: 'Haftalık Kilo & Ölçüm Takibi', included: true },
        { text: 'WhatsApp Soru/Cevap Desteği', included: true },
        { text: 'Görsel Egzersiz Kütüphanesi', included: true },
        { text: 'Detaylı Postür Analizi', included: true },
        { text: 'Birebir Görüntülü Değerlendirme', included: false },
      ],
    },
    {
      id: '12_hafta',
      name: '12 Haftalık Paket',
      tagline: 'Tam dönüşüm ve sürdürülebilir yaşam tarzı değişimi arayanlara.',
      price: 9000,
      duration: '12 Hafta',
      lessons: 24,
      type: 'hybrid',
      features: [
        { text: 'Kişiye Özel Antrenman Planı', included: true },
        { text: 'Sürdürülebilir Beslenme Programı', included: true },
        { text: 'Haftalık Kilo & Ölçüm Takibi', included: true },
        { text: '7/24 Öncelikli WhatsApp İletişimi', included: true },
        { text: 'Görsel Egzersiz Kütüphanesi', included: true },
        { text: 'Detaylı Postür Analizi', included: true },
        { text: 'Ayda 1 Birebir Görüntülü Değerlendirme', included: true },
      ],
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Detaylı Analiz & Form',
      description: 'Sizi daha iyi tanımak için postür fotoğraflarınızı, sağlık geçmişinizi, yaşam ritminizi ve hedeflerinizi içeren analiz formunu doldurursunuz.'
    },
    {
      number: '02',
      title: 'Kişisel Programın Hazırlanması',
      description: 'Bilgileriniz doğrultusunda, tamamen size özel antrenman akışları, beslenme tabloları ve günlük alışkanlık hedefleriniz 3 iş günü içinde hazırlanır.'
    },
    {
      number: '03',
      title: 'Düzenli Takip & Check-In',
      description: 'Her hafta sonu form doldurarak ölçümlerinizi, haftalık hislerinizi ve fotoğraflarınızı paylaşırsınız. Programınız gelişiminize göre güncellenir.'
    },
    {
      number: '04',
      title: 'Soru Sorma & Canlı İletişim',
      description: 'Aklınıza takılan her soruyu WhatsApp üzerinden sorabilirsiniz. Video göndererek hareket formunuzu uzman koçunuza düzelttirebilirsiniz.'
    }
  ];

  return (
    <div className="py-6 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Introduction Header */}
      <div className="text-center mb-12">
        <span className="text-brand-accent font-mono text-xs tracking-widest uppercase mb-2 block">ONLINE KOÇLUK SİSTEMİ</span>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium tracking-tight mb-4">
          Neden Uzaktan Eğitim? Nasıl Çalışır?
        </h2>
        <p className="text-brand-gray text-base max-w-xl mx-auto">
          Lokasyondan bağımsız, tamamen sizin beden biyolojinize, postürünüze ve günlük temponuza göre tasarlanmış bütünsel gelişim süreci.
        </p>
      </div>

      {/* Step Progress Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-sm relative group hover:border-brand-accent/50 transition-colors duration-300">
            <div className="text-4xl font-serif font-semibold text-brand-accent/30 mb-4 group-hover:text-brand-accent/65 transition-colors duration-300">
              {step.number}
            </div>
            <h4 className="text-white text-base font-semibold mb-2">{step.title}</h4>
            <p className="text-brand-gray text-xs leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Pricing Header */}
      <div className="text-center mb-10">
        <span className="text-brand-accent font-mono text-xs tracking-widest uppercase mb-2 block">DANIŞMANLIK PAKETLERİ</span>
        <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium">Size En Uygun Yol Haritasını Seçin</h3>
        <p className="text-brand-gray text-xs mt-2">Fiyatlarımıza tüm beslenme, antrenman güncellemeleri ve takipler dahildir.</p>
      </div>

      {/* Packages Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-zinc-950 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
              pkg.popular 
                ? 'border-brand-accent shadow-[0_0_20px_rgba(196,30,58,0.25)] scale-102 lg:scale-103' 
                : 'border-zinc-800 shadow-sm hover:border-brand-accent/40'
            }`}
          >
            {pkg.popular && (
              <div className="bg-brand-accent text-white text-[10px] font-mono tracking-widest uppercase text-center py-1 absolute top-0 left-0 right-0">
                EN POPÜLER SEÇENEK
              </div>
            )}

            {/* Package Details Header */}
            <div className="p-8 pb-6 border-b border-zinc-900">
              <div className="flex items-center justify-between mb-2 mt-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent">
                  {pkg.duration}
                </span>
              </div>

              <h4 className="text-xl font-serif font-medium text-white mb-2">{pkg.name}</h4>
              <p className="text-brand-gray text-xs leading-relaxed min-h-10">{pkg.tagline}</p>

              {/* Price Display */}
              <div className="mt-6 flex flex-col justify-end">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-serif font-bold text-white leading-none">
                    {pkg.price} TL
                  </span>
                  <span className="text-brand-gray text-xs">
                    / Toplam
                  </span>
                </div>
                <span className="text-brand-accent text-[11px] font-medium mt-1">
                  İçerik: {pkg.lessons} Ders
                </span>
              </div>
            </div>

            {/* Feature Checklists */}
            <div className="p-8 py-6 flex-grow space-y-4 bg-zinc-900/30">
              <p className="text-[10px] font-mono tracking-wider uppercase text-brand-gray mb-2">PAKET İÇERİĞİ:</p>
              {pkg.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5">
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${feat.included ? 'text-brand-accent' : 'text-brand-gray/25'}`} />
                  <span className={`text-xs ${feat.included ? 'text-white' : 'text-brand-gray/45 line-through decoration-brand-gray/30'}`}>
                    {feat.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Action */}
            <div className="p-8 pt-4">
              <button
                onClick={() => onSelectPackage(pkg)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-sm'
                    : 'bg-transparent border border-zinc-700 text-white hover:bg-brand-accent hover:border-brand-accent'
                }`}
              >
                Sisteme Başvur
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
