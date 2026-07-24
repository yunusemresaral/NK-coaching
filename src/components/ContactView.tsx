/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MessageCircle, Calendar, Check, ArrowRight, ArrowLeft, Send, Award, Activity, Heart, Sparkles, Scale } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactViewProps {
  initialPackageType?: 'fitness' | 'pilates' | 'hybrid' | '';
}

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function ContactView({ initialPackageType = '' }: ContactViewProps) {
  // Multistep form state
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    fitnessGoal: 'toning',
    primaryInterest: initialPackageType ? (initialPackageType as 'pilates' | 'fitness' | 'hybrid') : 'hybrid',
    hasInjuries: 'Hayır, herhangi bir sakatlığım veya kronik rahatsızlığım yok.',
    experience: 'beginner',
    message: ''
  });

  // Handle preselection when initialPackageType change
  useEffect(() => {
    if (initialPackageType) {
      setFormData(prev => ({
        ...prev,
        primaryInterest: initialPackageType as 'pilates' | 'fitness' | 'hybrid'
      }));
    }
  }, [initialPackageType]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [report, setReport] = useState<any | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      let val = value.replace(/\D/g, '');
      if (val.length > 0 && val[0] !== '0') {
        val = '0' + val;
      }
      setFormData(prev => ({ ...prev, [name]: val.slice(0, 11) }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const calculateReport = (data: ContactFormData) => {
    const weightNum = parseFloat(data.weight) || 60;
    const heightNum = (parseFloat(data.height) || 165) / 100;
    const bmi = +(weightNum / (heightNum * heightNum)).toFixed(1);
    
    let bmiCategory = '';
    let bmiColor = '';
    if (bmi < 18.5) {
      bmiCategory = 'Düşük Kilolu (Kilo artışı ve kas kütlesi kazanımı önerilir)';
      bmiColor = 'text-amber-600 bg-amber-50';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      bmiCategory = 'Normal Kilolu (Mevcut formu koruma ve kas kalitesini artırma önerilir)';
      bmiColor = 'text-emerald-600 bg-emerald-50';
    } else if (bmi >= 25 && bmi < 29.9) {
      bmiCategory = 'Hafif Kilolu (Yağ yakımı, sıkılaşma ve postür destekli direnç egzersizi önerilir)';
      bmiColor = 'text-amber-600 bg-amber-50';
    } else {
      bmiCategory = 'Fazla Kilolu (Düzenli yağ yakımı, düşük eklem yükü ile pilates ve kalori açığı önerilir)';
      bmiColor = 'text-rose-600 bg-rose-50';
    }

    // Recommended package based on goal & primary interest
    let recommendedPackage = '';
    let packageReason = '';
    
    if (data.primaryInterest === 'pilates' || data.fitnessGoal === 'posture_flexibility') {
      recommendedPackage = 'Clinical Pilates & Postür';
      packageReason = 'Öncelikli olarak postür düzeltme, omurga sağlığı, core bölgesi stabilizasyonu ve esneklik odaklı hedefleriniz olduğu için Clinical Pilates paketi sizin için idealdir.';
    } else if (data.primaryInterest === 'fitness' || data.fitnessGoal === 'fat_loss') {
      recommendedPackage = 'Fit & Lean Coaching';
      packageReason = 'Yağ yakımı, genel kondisyon kazanımı ve ev/salon ortamında ağırlık egzersizleri ile şekillenme hedefinize en uygun, yüksek kalori harcatan programdır.';
    } else {
      recommendedPackage = 'Bütünsel Değişim VIP';
      packageReason = 'Hem kas kalitenizi artırmak (Fitness) hem de derin kas gruplarını esnetip postürünüzü düzeltmek (Pilates) istediğiniz için menstrual döngü uyumlu hibrit programımız sizin için en verimli olandır.';
    }

    // Daily water recommendation
    const water = +(weightNum * 0.035).toFixed(1);

    return {
      bmi,
      bmiCategory,
      bmiColor,
      water,
      recommendedPackage,
      packageReason,
      protein: Math.round(weightNum * 1.5), // 1.5g per kg
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const generatedReport = calculateReport(formData);
      setReport(generatedReport);
      setIsSubmitting(false);
    }, 1500);
  };

  const resetForm = () => {
    setStep(1);
    setReport(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      weight: '',
      height: '',
      activityLevel: 'moderate',
      fitnessGoal: 'toning',
      primaryInterest: 'hybrid',
      hasInjuries: 'Hayır, herhangi bir sakatlığım veya kronik rahatsızlığım yok.',
      experience: 'beginner',
      message: ''
    });
  };

  return (
    <div className="py-6 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-brand-accent font-mono text-xs tracking-widest uppercase mb-2 block">İLETİŞİM & BAŞVURU</span>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium tracking-tight mb-4">
          Benimle İletişime Geçin
        </h2>
        <p className="text-brand-gray text-base max-w-xl mx-auto">
          Online koçluk sistemimize katılmak veya bireysel pilates dersleri hakkında detaylı bilgi almak için aşağıdaki kanalları kullanabilir ya da analiz formunu doldurabilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Contact info channels (4 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 shadow-sm">
            <h3 className="text-xl font-serif font-medium text-white mb-6">İletişim Kanalları</h3>
            
            <div className="space-y-6">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/905306969523" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900/60 border border-zinc-900 hover:border-emerald-500/25 transition-all duration-300 group"
              >
                <div>
                  <p className="text-brand-gray text-[10px] font-mono uppercase tracking-wider leading-none">Hızlı WhatsApp Hattı</p>
                  <p className="text-white text-sm font-semibold mt-1 group-hover:text-emerald-400 transition-colors">+90 (530) 696 95 23</p>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/neslikrga" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900/60 border border-zinc-900 hover:border-pink-500/25 transition-all duration-300 group"
              >
                <div>
                  <p className="text-brand-gray text-[10px] font-mono uppercase tracking-wider leading-none">Instagram Paylaşımları</p>
                  <p className="text-white text-sm font-semibold mt-1 group-hover:text-pink-400 transition-colors">@neslikrga</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-step Form & Assessment Report (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-md relative min-h-[480px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!report ? (
              <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between h-full">
                <div>
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-brand-accent">
                      ADIM {step} / 4 &bull; {step === 1 ? 'Kişisel' : step === 2 ? 'Ölçüler' : step === 3 ? 'Hedefler' : 'Sağlık'}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                            i <= step ? 'bg-brand-accent' : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Step 1: Personal Info */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-serif font-medium text-white mb-2">Başlangıç İletişim Bilgileriniz</h3>
                      <p className="text-brand-gray text-xs leading-relaxed mb-4">Size özel hazırlık raporunu oluşturabilmem için lütfen temel iletişim bilgilerinizi girin.</p>
                      
                      <div>
                        <label className="block text-white text-xs font-semibold mb-1">Adınız Soyadınız *</label>
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Örn. Elif Yılmaz"
                          className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white placeholder-zinc-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white text-xs font-semibold mb-1">E-posta Adresiniz *</label>
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="mail@ornek.com"
                            className={`w-full text-xs sm:text-sm px-4 py-3 rounded-xl border ${formData.email && !isValidEmail(formData.email) ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-brand-accent'} focus:outline-none bg-zinc-900 text-white placeholder-zinc-600`}
                          />
                          {formData.email && !isValidEmail(formData.email) && (
                            <p className="text-[10px] text-red-400 mt-1.5 ml-1">Geçerli bir e-posta adresi giriniz.</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-white text-xs font-semibold mb-1">Telefon Numarası *</label>
                          <input
                            required
                            type="tel"
                            name="phone"
                            maxLength={11}
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="05551234567"
                            className={`w-full text-xs sm:text-sm px-4 py-3 rounded-xl border ${formData.phone && formData.phone.length < 11 ? 'border-amber-500/50 focus:border-amber-500' : 'border-zinc-800 focus:border-brand-accent'} focus:outline-none bg-zinc-900 text-white placeholder-zinc-600`}
                          />
                          {formData.phone && formData.phone.length < 11 && (
                            <p className="text-[10px] text-amber-400/80 mt-1.5 ml-1">Telefon numarası 11 haneli olmalıdır.</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white text-xs font-semibold mb-1">Yaşınız *</label>
                        <input
                          required
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Örn. 28"
                          className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white placeholder-zinc-600"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Physical Metrics */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-serif font-medium text-white mb-2">Fiziksel Profiliniz</h3>
                      <p className="text-brand-gray text-xs leading-relaxed mb-4">Bu ölçümler vücut kitle indeksinizi hesaplamak ve kalori ihtiyacınızı analiz etmek için kullanılacaktır.</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white text-xs font-semibold mb-1">Kilonuz (kg) *</label>
                          <input
                            required
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            placeholder="Örn. 62"
                            className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white placeholder-zinc-600"
                          />
                        </div>
                        <div>
                          <label className="block text-white text-xs font-semibold mb-1">Boyunuz (cm) *</label>
                          <input
                            required
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            placeholder="Örn. 168"
                            className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white placeholder-zinc-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white text-xs font-semibold mb-1">Günlük Aktivite Seviyeniz *</label>
                        <select
                          name="activityLevel"
                          value={formData.activityLevel}
                          onChange={handleInputChange}
                          className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white"
                        >
                          <option value="sedentary">Hareketsiz / Masa başı iş</option>
                          <option value="light">Hafif Aktif / Haftada 1-2 gün yürüyüş veya spor</option>
                          <option value="moderate">Orta Aktif / Haftada 3-4 gün aktif antrenman</option>
                          <option value="active">Çok Aktif / Düzenli spor ve yoğun günlük hareketlilik</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Goals & Experience */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-serif font-medium text-white mb-2">Hedefleriniz & Deneyiminiz</h3>
                      <p className="text-brand-gray text-xs leading-relaxed mb-4">Programınızı hangi egzersiz türü ve yoğunluk seviyesine göre kurgulayacağımızı seçin.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white text-xs font-semibold mb-1">Ana Hedefiniz *</label>
                          <select
                            name="fitnessGoal"
                            value={formData.fitnessGoal}
                            onChange={handleInputChange}
                            className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white"
                          >
                            <option value="fat_loss">Kilo Kaybı & Yağ Yakımı</option>
                            <option value="toning">Sıkılaşma & Kas Kalitesi Artışı</option>
                            <option value="posture_flexibility">Postür Düzeltme & Esneklik</option>
                            <option value="muscle_gain">Sağlıklı Kilo & Kas Kazanımı</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-white text-xs font-semibold mb-1">Tercih Ettiğiniz Egzersiz Türü *</label>
                          <select
                            name="primaryInterest"
                            value={formData.primaryInterest}
                            onChange={handleInputChange}
                            className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white"
                          >
                            <option value="pilates">Clinical Pilates / Reformer & Mat</option>
                            <option value="fitness">Fitness / Direnç Antrenmanları</option>
                            <option value="hybrid">Hibrit (Pilates + Fitness Esnekliği)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white text-xs font-semibold mb-1">Egzersiz Deneyiminiz *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: 'beginner', label: 'Başlangıç' },
                            { value: 'intermediate', label: 'Orta' },
                            { value: 'advanced', label: 'İleri' }
                          ].map((exp) => (
                            <button
                              key={exp.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, experience: exp.value as any }))}
                              className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                                formData.experience === exp.value
                                  ? 'bg-brand-accent text-white border-brand-accent'
                                  : 'bg-zinc-900 text-brand-gray border-zinc-800 hover:border-brand-accent'
                              }`}
                            >
                              {exp.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Health & Message */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-serif font-medium text-white mb-2">Sağlık ve Detaylar</h3>
                      <p className="text-brand-gray text-xs leading-relaxed mb-4">Sizin için güvenli ve verimli bir omurga akışı planlayabilmem adına çok kritik adımlardır.</p>

                      <div>
                        <label className="block text-brand-primary text-xs font-semibold mb-1">Herhangi bir sakatlığınız veya kronik rahatsızlığınız var mı? *</label>
                        <textarea
                          required
                          rows={2}
                          name="hasInjuries"
                          value={formData.hasInjuries}
                          onChange={handleInputChange}
                          placeholder="Bel fıtığı, diz ağrısı, skolyoz veya bilinen diğer rahatsızlıklarınızı yazınız."
                          className="w-full text-xs px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white placeholder-zinc-600"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-xs font-semibold mb-1">Bana iletmek istediğiniz ek notlar (İsteğe Bağlı)</label>
                        <textarea
                          rows={2}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Beslenme tercihleri (Glutensiz, vejetaryen vb.), günlük uykusuzluk, emzirme dönemi gibi belirtmek istediğiniz her detay..."
                          className="w-full text-xs px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-brand-accent bg-zinc-900 text-white placeholder-zinc-600"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between border-t border-zinc-900 pt-6 mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 text-xs font-semibold text-brand-gray hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Geri
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        step === 1 && (!formData.fullName || !isValidEmail(formData.email) || formData.phone.length !== 11 || !formData.age) ||
                        step === 2 && (!formData.weight || !formData.height)
                      }
                      className="px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-2sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      İlerle <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-2sm"
                    >
                      {isSubmitting ? (
                        <>Analiz Ediliyor...</>
                      ) : (
                        <>
                          Formu Gönder ve Analiz Et <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              // Evaluation report output
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 flex-grow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-semibold text-white mb-1">
                    Sayın {formData.fullName}, Fiziksel Profil Raporunuz
                  </h3>
                  <p className="text-brand-gray text-[11px] mb-6">Sistemimiz girdilerinize göre metabolik ve hedefinize özel ön değerlendirmeyi bizzat Neslihan Karga metodolojisiyle hesapladı.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {/* BMI */}
                    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                      <p className="text-xl font-serif font-bold text-white">{report.bmi}</p>
                      <p className="text-[10px] text-brand-gray/80 leading-tight mt-1">{report.bmiCategory.split(' (')[0]}</p>
                    </div>

                    {/* Water */}
                    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                      <p className="text-xl font-serif font-bold text-white">{report.water} Litre</p>
                      <p className="text-[10px] text-brand-gray/80 leading-tight mt-1">Ödem atmak ve eklem sıvısını korumak için.</p>
                    </div>

                    {/* Protein */}
                    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                      <p className="text-xl font-serif font-bold text-white">~{report.protein} gr</p>
                      <p className="text-[10px] text-brand-gray/80 leading-tight mt-1">Kas liflerini beslemek ve doygunluk için.</p>
                    </div>
                  </div>

                  {/* Recommendation block */}
                  <div className="bg-zinc-900 text-white p-5 rounded-2xl border border-brand-accent/40 mb-6">
                    <span className="bg-brand-accent text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full font-semibold">
                      SİZE EN UYGUN KOÇLUK PAKETİ
                    </span>
                    <h4 className="text-lg font-serif font-semibold mt-2 text-brand-accent">
                      {report.recommendedPackage}
                    </h4>
                    <p className="text-zinc-300 text-xs leading-relaxed mt-2">
                      {report.packageReason}
                    </p>
                  </div>

                  {/* Next Step Note */}
                  <div className="text-xs text-brand-gray leading-relaxed p-4 bg-amber-950/20 rounded-xl border border-amber-500/25">
                    <p className="font-semibold text-white mb-1">Süreç Nasıl İlerleyecek?</p>
                    Girdiğiniz bu değerli veriler ve raporunuz doğrudan <strong>Neslihan Karga</strong>'ya iletildi. Kendisi başvurunuzu bizzat inceledikten sonra <strong>24 saat içinde</strong> telefon numaranızdan (WhatsApp) sizinle iletişime geçip detaylı süreci ve program başlangıcını planlayacaktır.
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-900 pt-6 mt-6">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-xs font-semibold text-brand-gray hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Yeni Analiz Doldur
                  </button>

                  <a
                    href="https://wa.me/905306969523"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-2sm"
                  >
                    WhatsApp'tan Ön Onay Al <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
