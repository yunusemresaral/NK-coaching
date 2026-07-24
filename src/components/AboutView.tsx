/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, ZoomIn, X } from 'lucide-react';

// Helper to convert web links (like Imgur page links) to direct image URLs
function getDirectImageUrl(url: string): string {
  if (!url) return '';
  let cleanUrl = url.trim().replace(/\$0$/, '');

  // Convert any Imgur link (page link, thumbnail suffix like _d.webp, query params) to full resolution direct JPG
  const imgurMatch = cleanUrl.match(/^https?:\/\/(?:i\.|www\.)?imgur\.com\/([a-zA-Z0-9]+)(?:_[a-zA-Z0-9]+)?(?:\.[a-zA-Z0-9]+)?(?:\?.*)?$/);
  if (imgurMatch && imgurMatch[1]) {
    return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
  }

  return cleanUrl;
}

export default function AboutView({ onNavigateToTransformations }: { onNavigateToTransformations?: () => void }) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  // 1 Large Photo + 4 Normal Photos
  const mainPhoto = {
    title: 'Ana Fotoğraf (Büyük)',
    src: 'https://i.imgur.com/6ftbRrj_d.webp?maxwidth=760&fidelity=grand$0', // Fotoğraf linkini buraya yapıştırabilirsiniz (örn: 'https://i.imgur.com/...')
  };

  const secondaryPhotos = [
    {
      id: '1',
      title: 'Fotoğraf 1',
      src: 'https://i.imgur.com/Dtm6iGU_d.webp?maxwidth=760&fidelity=grand$0', // Fotoğraf linkini buraya yapıştırabilirsiniz
    },
    {
      id: '2',
      title: 'Fotoğraf 2',
      src: 'https://i.imgur.com/FBuCTN1_d.webp?maxwidth=760&fidelity=grand$0', // Fotoğraf linkini buraya yapıştırabilirsiniz
    },
    {
      id: '3',
      title: 'Fotoğraf 3',
      src: 'https://i.imgur.com/E5IbUYc_d.webp?maxwidth=760&fidelity=grand$0', // Fotoğraf linkini buraya yapıştırabilirsiniz
    },
    {
      id: '4',
      title: 'Fotoğraf 4',
      src: 'https://i.imgur.com/2eFR710_d.webp?maxwidth=760&fidelity=grand$0', // Fotoğraf linkini buraya yapıştırabilirsiniz
    },
  ];

  const mainPhotoUrl = getDirectImageUrl(mainPhoto.src);

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero / Intro Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-medium tracking-tight leading-tight max-w-3xl mx-auto mb-6">
          Sınırlarını Sen Çiz. Potansiyelini Birlikte Açığa Çıkaralım.
        </h1>
        <div className="w-16 h-0.5 bg-brand-accent mx-auto" />
      </motion.div>

      {/* Main Content Paragraphs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6 text-brand-gray text-base leading-relaxed max-w-3xl mx-auto bg-zinc-950/60 p-6 sm:p-8 rounded-2xl border border-zinc-900 shadow-xl mb-12"
      >
        <p>
          Yaklaşık 8 yıldır fitness sektöründe aktif olarak çalışan bir Personal Trainer ve online koçum. Benim için spor sadece fiziksel bir değişim değil; disiplin, özgüven ve yaşam kalitesini artıran bir yaşam biçimi. Bu yüzden danışanlarımla çalışırken yalnızca antrenman yaptırmakla kalmıyor, onların sürdürülebilir alışkanlıklar kazanmasına da odaklanıyorum.
        </p>
        <p>
          Birebir ve online koçluk süreçlerimde kişiye özel antrenman ve beslenme programları hazırlıyor, düzenli takip ve form analizleriyle gelişimi birlikte yönetiyoruz. Amacım kısa süreli sonuçlar değil, uzun vadede sağlıklı ve güçlü bir yaşam tarzı oluşturmak.
        </p>
        <p>
          Aynı zamanda koşu ve HYROX branşında aktif olarak antrenman yapıyor, kendi sporculuk deneyimlerimi danışanlarıma aktararak onlara en doğru şekilde rehberlik ediyorum. Sahada edindiğim tecrübeyi bilimsel yaklaşımla birleştirerek her seviyeden bireyin hedeflerine ulaşmasına destek oluyorum.
        </p>
        <p className="italic text-brand-accent font-serif pr-4 border-l-2 border-brand-accent pl-4 py-1 text-lg font-medium">
          "Eğer sen de daha güçlü, daha sağlıklı ve daha özgüvenli bir versiyonuna ulaşmak istiyorsan, bu yolculukta sana rehberlik etmek için buradayım."
        </p>
      </motion.div>

      {/* Photo Gallery Grid (1 Large + 4 Normal) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 1 LARGE PHOTO BOX (Spans 6 columns on desktop) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[416px] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-brand-accent/50 transition-all duration-300 shadow-2xl group flex items-center justify-center">
              {mainPhotoUrl ? (
                <>
                  <img
                    src={mainPhotoUrl}
                    alt={mainPhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 p-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-serif font-medium">{mainPhoto.title}</p>
                    <button
                      onClick={() => setSelectedImage({ src: mainPhotoUrl, title: mainPhoto.title })}
                      className="ml-auto p-2.5 rounded-full bg-brand-accent text-white shadow-lg hover:scale-110 transition-transform"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-brand-accent">
                    <Image className="w-8 h-8" />
                  </div>
                  <p className="text-zinc-300 font-serif font-medium text-lg mb-1">Büyük Fotoğraf Kutusu</p>
                  <p className="text-zinc-500 text-xs max-w-xs">
                    <code className="text-brand-accent font-mono">mainPhoto.src</code> alanına fotoğraf linkinizi ekleyin.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 4 NORMAL PHOTO BOXES (Spans 6 columns on desktop in 2x2 grid) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {secondaryPhotos.map((item) => {
              const photoUrl = getDirectImageUrl(item.src);
              return (
                <div
                  key={item.id}
                  className="relative aspect-[4/3] lg:aspect-auto lg:h-[200px] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-brand-accent/50 transition-all duration-300 shadow-lg group flex items-center justify-center"
                >
                  {photoUrl ? (
                    <>
                      <img
                        src={photoUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 p-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <p className="text-white text-xs font-serif font-medium">{item.title}</p>
                        <button
                          onClick={() => setSelectedImage({ src: photoUrl, title: item.title })}
                          className="ml-auto p-1.5 rounded-full bg-brand-accent text-white shadow-lg"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center text-zinc-500">
                      <Image className="w-6 h-6 mb-1 text-zinc-600" />
                      <p className="text-zinc-400 font-serif text-xs font-medium">{item.title}</p>
                      <span className="text-[10px] text-zinc-600 font-mono mt-0.5">Link Ekleyin</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 transition-colors border border-zinc-800 focus:outline-none"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-zinc-800"
              />
              {selectedImage.title && (
                <p className="text-white font-serif text-sm mt-3">{selectedImage.title}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



