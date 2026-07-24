import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Upload, ZoomIn, X, Info } from 'lucide-react';

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

export default function TransformationsView() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const transformations = [
    {
      id: '1',
      title: 'Değişim 1 (Yağ Yakımı & Sıkılaşma)',
      fileName: 'client1.jpg',
      src: 'https://i.imgur.com/JFwYUYp.jpg',
      duration: '6 Hafta',
    },
    {
      id: '2',
      title: 'Değişim 2 (Postür & Karın Bölgesi Sıkılaşma)',
      fileName: 'client2.jpg',
      src: 'https://i.imgur.com/NHl0ZD4.jpg',
      duration: '6 Hafta',
    },
    {
      id: '3',
      title: 'Değişim 3 (Kilo Kaybı & Güç)',
      fileName: 'client3.jpg',
      src: 'https://i.imgur.com/aunHrDW.jpg',
      duration: '9 Hafta',
    },
    {
      id: '4',
      title: 'Değişim 4 (Erkek Danışan Yağ Yakımı & Rekonstrüksiyon)',
      fileName: 'client4.jpg',
      src: 'https://i.imgur.com/FDsA9Jy_d.webp?maxwidth=760&fidelity=grand$0',
      duration: '12 Hafta',
    },
  ];

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-brand-accent font-mono text-xs tracking-widest uppercase mb-3 block">
          DİSİPLİN & KARARLILIK
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white font-medium tracking-tight">
          Bahaneleri Bırakanların İmzası
        </h2>
      </div>

      {/* Grid of Transformations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {transformations.map((trans) => {
          const isError = imageErrors[trans.id];

          return (
            <motion.div
              key={trans.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col hover:border-brand-accent/50 transition-all duration-300 shadow-xl group"
            >
              {/* Photo Container */}
              <div className="relative aspect-[3/4] bg-zinc-950 flex items-center justify-center overflow-hidden">
                {isError ? (
                  /* Styled Placeholder if file doesn't exist yet */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-zinc-800 rounded-b-2xl m-3 bg-zinc-900/10">
                    <div className="p-4 rounded-full bg-zinc-900 text-zinc-500 mb-4 border border-zinc-800">
                      <Upload className="w-8 h-8 animate-pulse text-brand-accent" />
                    </div>
                    <h4 className="text-white font-medium text-sm mb-1 font-serif">Fotoğraf Bekleniyor</h4>
                    <p className="text-brand-gray text-xs max-w-[240px] leading-relaxed">
                      Lütfen sol panelden <code className="text-brand-accent font-mono bg-brand-accent/5 px-1 py-0.5 rounded font-semibold">{trans.fileName}</code> dosyasını yükleyin.
                    </p>
                  </div>
                ) : (
                  /* Real Image display */
                  <>
                    <img
                      src={getDirectImageUrl(trans.src)}
                      alt={trans.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(trans.id)}
                      className="w-full h-full object-cover object-center bg-zinc-950 group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                    
                    {/* Duration Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-brand-accent text-white font-mono text-xs px-3 py-1.5 rounded-md font-semibold tracking-wide shadow-lg shadow-black/50 border border-brand-accent/20">
                        {trans.duration}
                      </span>
                    </div>

                    {/* Dark gradient overlay for hover depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Interactive Zoom Overlay */}
                    <button
                      onClick={() => setSelectedImage({ src: trans.src, title: trans.title })}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      aria-label="Görseli büyüt"
                    >
                      <div className="p-3 rounded-full bg-brand-accent text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-zinc-900/80 text-white hover:bg-zinc-800 transition-colors border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-accent"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getDirectImageUrl(selectedImage.src)}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-zinc-800"
              />
              <p className="text-white text-center mt-4 font-serif text-base font-medium px-4">
                {selectedImage.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
