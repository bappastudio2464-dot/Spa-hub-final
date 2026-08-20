import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { Logo } from './Logo';
import { 
  BookOpen, 
  Video, 
  Activity, 
  Droplet, 
  Timer, 
  Award, 
  BookMarked, 
  Globe, 
  Search,
  CheckCircle2,
  HardDrive,
  ImageIcon,
  Crown,
  LogOut,
  User,
  Smartphone,
  ShieldCheck,
  Wallet,
  Share2,
  Gift
} from 'lucide-react';
import { MASTER_ADMIN_PHONE, normalizePhone } from '../utils/authStorage';
import { AndroidideApkModal } from './AndroidideApkModal';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    activeTab,
    setActiveTab,
    totalProgressPercentage,
    setIsGlossaryOpen,
    searchQuery,
    setSearchQuery,
    completedChapters,
    mediaItems,
    currentUser,
    walletBalance,
    myReferrals,
    isAdmin,
    logout
  } = useCourse();

  const [isApkModalOpen, setIsApkModalOpen] = useState<boolean>(false);

  const navItems = [
    ...(isAdmin ? [{
      id: 'admin' as const,
      label: language === 'hi' ? '👑 एडमिन कंट्रोल पैनल' : '👑 Master Admin Panel',
      sublabel: language === 'hi' ? 'यूजर व वॉलेट नियंत्रण' : 'User & Wallet Control',
      icon: Crown,
      highlight: true
    }] : []),
    {
      id: 'ebook' as const,
      label: language === 'hi' ? 'ई-बुक अध्याय' : 'Course E-Book',
      sublabel: `${completedChapters.length}/11 Chapters`,
      icon: BookOpen,
    },
    {
      id: 'referral' as const,
      label: language === 'hi' ? '🎁 रेफर एवं वॉलेट' : '🎁 Refer & Wallet',
      sublabel: `₹${walletBalance} Balance (${myReferrals.length} Ref)`,
      icon: Wallet,
    },
    {
      id: 'exam' as const,
      label: language === 'hi' ? '50-Q परीक्षा व डिप्लोमा' : 'Exam & Certificate',
      sublabel: '50 Questions',
      icon: Award,
    },
    {
      id: 'vault' as const,
      label: language === 'hi' ? 'गैलरी वॉल्ट' : 'Media Vault',
      sublabel: `${mediaItems.length} Saved Files`,
      icon: HardDrive,
    },
    {
      id: 'anatomy' as const,
      label: language === 'hi' ? 'एनाटॉमी व पॉइंट्स' : 'Anatomy & Points',
      sublabel: 'Interactive Map',
      icon: Activity,
    },
    {
      id: 'aromatherapy' as const,
      label: language === 'hi' ? 'अरोमा व तेल' : 'Oils & Blends',
      sublabel: 'Dilution Calculator',
      icon: Droplet,
    },
    {
      id: 'practice' as const,
      label: language === 'hi' ? 'प्रैक्टिस स्टूडियो' : 'Practice Studio',
      sublabel: 'Chime & Logs',
      icon: Timer,
    },
  ];

  const isMasterAdmin = currentUser && normalizePhone(currentUser.phone) === MASTER_ADMIN_PHONE;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8E4] shadow-xs">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo */}
        <div 
          className="cursor-pointer"
          onClick={() => setActiveTab(isAdmin ? 'admin' : 'ebook')}
        >
          <Logo size="md" />
        </div>

        {/* Global Search & Tools */}
        <div className="flex items-center gap-2.5 flex-1 max-w-2xl justify-end">
          {/* Quick Search */}
          <div className="relative w-full max-w-xs hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'चैप्टर, तकनीक या बिजनेस खोजें...' : 'Search techniques, chapters, licenses...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] text-stone-700 placeholder:text-stone-400 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                ×
              </button>
            )}
          </div>

          {/* Quick Live Wallet Balance Pill */}
          <button
            onClick={() => setActiveTab('referral')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 rounded-full border border-emerald-300 dark:border-emerald-700 transition shadow-2xs whitespace-nowrap"
            title="Open Wallet & Referrals"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>₹{walletBalance}</span>
          </button>

          {/* AndroidIDE APK Export Shortcut Button */}
          <button
            onClick={() => setIsApkModalOpen(true)}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#1B4332] bg-[#D4A373]/30 hover:bg-[#D4A373]/50 border border-[#D4A373] rounded-full transition shadow-2xs whitespace-nowrap"
            title="Download AndroidIDE Project ZIP for APK"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>{language === 'hi' ? 'APK ZIP' : 'APK ZIP'}</span>
          </button>

          {/* Spa Glossary Button */}
          <button
            onClick={() => setIsGlossaryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2D6A4F] bg-[#2D6A4F]/5 hover:bg-[#2D6A4F]/10 border border-[#2D6A4F]/20 rounded-full transition whitespace-nowrap"
            title="Open Spa Terms Glossary"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'hi' ? 'स्पा शब्दावली' : 'Spa Glossary'}</span>
          </button>

          {/* Bilingual Language Switcher Toggle */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-full border border-stone-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full transition ${
                language === 'en'
                  ? 'bg-white text-[#2D6A4F] shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full transition ${
                language === 'hi'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              हिं
            </button>
          </div>

          {/* User Profile Badge & Logout */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <div 
                onClick={() => {
                  if (isAdmin) setActiveTab('admin');
                  else setActiveTab('referral');
                }}
                className="flex items-center gap-1.5 cursor-pointer bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-full text-xs transition"
                title={`Logged in as ${currentUser.fullName || currentUser.phone}`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isMasterAdmin ? 'bg-amber-500 text-white' : 'bg-emerald-700 text-white'
                }`}>
                  {isMasterAdmin ? '👑' : (currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'U')}
                </div>
                <span className="font-bold text-stone-700 max-w-[90px] truncate hidden md:inline">
                  {currentUser.fullName || currentUser.phone}
                </span>
              </div>

              <button
                onClick={logout}
                className="p-1.5 rounded-full hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition"
                title={language === 'hi' ? 'लॉगआउट करें' : 'Logout'}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Course Overall Progress Ring */}
          <div className="flex items-center gap-1.5 pl-1.5 border-l border-stone-200">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#2D6A4F] transition-all duration-700 ease-out"
                  strokeDasharray={`${totalProgressPercentage}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[8px] font-bold text-stone-700">{totalProgressPercentage}%</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-100 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-1 sm:space-x-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                  item.id === 'admin'
                    ? isActive 
                      ? 'bg-amber-600 text-white shadow-md font-bold' 
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300 font-bold hover:bg-amber-100'
                    : isActive
                      ? 'bg-[#2D6A4F] text-white shadow-sm shadow-[#2D6A4F]/20'
                      : 'text-stone-600 hover:text-[#2D6A4F] hover:bg-stone-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.id === 'admin' ? 'text-amber-600' : 'text-[#2D6A4F]'}`} />
                <div className="flex flex-col items-start text-left">
                  <span className="leading-tight font-semibold">{item.label}</span>
                  <span className={`text-[10px] hidden md:inline leading-none mt-0.5 ${
                    isActive ? (item.id === 'admin' ? 'text-amber-100' : 'text-emerald-100') : 'text-stone-400'
                  }`}>
                    {item.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AndroidIDE APK Modal */}
      <AndroidideApkModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />
    </header>
  );
};
