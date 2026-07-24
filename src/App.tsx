/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, Phone, MessageCircle, MapPin, Heart, Activity, ShieldCheck, HelpCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import AboutView from './components/AboutView';
import PackagesView from './components/PackagesView';
import TransformationsView from './components/TransformationsView';
import ContactView from './components/ContactView';
import { CoachingPackage } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('about');
  const [selectedPackageType, setSelectedPackageType] = useState<'fitness' | 'pilates' | 'hybrid' | ''>('');

  const handleSelectPackage = (pkg: CoachingPackage) => {
    setSelectedPackageType(pkg.type);
    setActiveTab('contact');
    // Scroll smoothly to top when switching view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCtaClick = () => {
    setSelectedPackageType('hybrid');
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'about':
        return <AboutView onNavigateToTransformations={() => handleTabChange('transformations')} />;
      case 'packages':
        return <PackagesView onSelectPackage={handleSelectPackage} />;
      case 'transformations':
        return <TransformationsView />;
      case 'contact':
        return <ContactView initialPackageType={selectedPackageType} />;
      default:
        return <AboutView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black selection:bg-brand-accent/40 selection:text-white">

      {/* Main Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        onCtaClick={handleCtaClick} 
      />

      {/* Main Content Area */}
      <main className="flex-grow py-8 sm:py-12 bg-black">
        

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
