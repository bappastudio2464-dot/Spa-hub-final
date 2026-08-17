import React from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { Header } from './components/Header';
import { EBookSection } from './components/EBookSection';
import { AnatomyExplorer } from './components/AnatomyExplorer';
import { AromatherapyGuide } from './components/AromatherapyGuide';
import { PracticeTimer } from './components/PracticeTimer';
import { CertificationSection } from './components/CertificationSection';
import { GlossarySection } from './components/GlossarySection';
import { MediaVaultSection } from './components/MediaVaultSection';
import { Logo } from './components/Logo';
import { 
  BookOpen, 
  Activity, 
  Droplet, 
  Timer, 
  Award, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Heart,
  HardDrive
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, language, totalCourseProgress } = useCourse();

  return (
    <div className="min-h-screen bg-[#F7F9F6] flex flex-col font-sans text-stone-800 selection:bg-[#2D6A4F] selection:text-white">
      {/* Top Header & Sticky Navigation */}
      <Header />

      {/* Main Tab Views Switcher */}
      <main className="flex-1 py-4 sm:py-6">
        {activeTab === 'ebook' && <EBookSection />}
        {activeTab === 'exam' && <CertificationSection />}
        {activeTab === 'vault' && <MediaVaultSection />}
        {activeTab === 'anatomy' && <AnatomyExplorer />}
        {activeTab === 'aromatherapy' && <AromatherapyGuide />}
        {activeTab === 'practice' && <PracticeTimer />}
        {activeTab === 'glossary' && <GlossarySection />}
      </main>

      {/* Footer */}
      <footer className="bg-[#121B16] text-stone-300 border-t border-stone-800 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand column */}
            <div className="space-y-3 md:col-span-1">
              <Logo size="md" />
              <p className="text-xs text-stone-400 leading-relaxed">
                {language === 'hi'
                  ? 'व्यावसायिक स्पा थेरेपिस्ट, मालिश तकनीकों, शरीर रचना विज्ञान, स्पा बिज़नेस लाइसेंस और अरोमाथेरेपी के लिए विश्व स्तरीय ई-बुक प्रशिक्षण मंच।'
                  : 'International Spa & Wellness Academy training portal featuring 11 modular illustrated e-book chapters, 50-Q master certification, and local media vault.'}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>CIDESCO & International Spa Standards</span>
              </div>
            </div>

            {/* Quick Curriculum links */}
            <div className="space-y-2.5">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                {language === 'hi' ? 'प्रशिक्षण मॉड्यूल' : 'Training Modules'}
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button onClick={() => setActiveTab('ebook')} className="hover:text-emerald-400 transition text-left">
                    📖 {language === 'hi' ? '11 अध्याय संपूर्ण ई-बुक' : '11-Chapter Illustrated E-Book'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('vault')} className="hover:text-emerald-400 transition text-left">
                    💾 {language === 'hi' ? 'फोन गैलरी मीडिया वॉल्ट' : 'Device Media Storage Vault'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('anatomy')} className="hover:text-emerald-400 transition text-left">
                    🧘 {language === 'hi' ? 'मर्म एवं प्रेशर पॉइंट्स' : 'Pressure Points & Anatomy'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('aromatherapy')} className="hover:text-emerald-400 transition text-left">
                    🌿 {language === 'hi' ? 'एसेंशियल ऑयल्स व डायल्यूशन' : 'Essential Oils & Blends'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Practical & Exam */}
            <div className="space-y-2.5">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                {language === 'hi' ? 'प्रैक्टिस व सर्टिफिकेशन' : 'Practice & Credentials'}
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button onClick={() => setActiveTab('exam')} className="hover:text-emerald-400 transition text-left">
                    🏆 {language === 'hi' ? '50 प्रश्नों की परीक्षा व गोल्ड सील डिप्लोमा' : '50-Question Exam & Diploma'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('practice')} className="hover:text-emerald-400 transition text-left">
                    ⏱️ {language === 'hi' ? 'हैंड्स-ऑन टाइमर व लॉगबुक' : 'Zen Practice Timer & Log'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('glossary')} className="hover:text-emerald-400 transition text-left">
                    📚 {language === 'hi' ? 'स्पा शब्दकोश एवं शब्दावली' : 'International Spa Glossary'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Progress summary card */}
            <div className="space-y-3 p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider block">
                {language === 'hi' ? 'आपकी सीखने की प्रगति' : 'Learning Progress'}
              </span>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-[#D4A373] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${totalCourseProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>{totalCourseProgress}% {language === 'hi' ? 'पूर्ण' : 'Completed'}</span>
                <span>{language === 'hi' ? '11 संपूर्ण अध्याय' : '11 Illustrated Chapters'}</span>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <div>
              © 2026 Spa Hub International. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All Rights Reserved.'}
            </div>
            <div className="flex items-center gap-4">
              <span>{language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}</span>
              <span>•</span>
              <span>{language === 'hi' ? 'सर्टिफिकेशन सत्यापन' : 'Verify Certificate'}</span>
              <span>•</span>
              <span>{language === 'hi' ? 'हेल्पलाइन' : 'Student Support'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <CourseProvider>
      <MainContent />
    </CourseProvider>
  );
}

export default App;
