import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Smartphone, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  FolderArchive, 
  Terminal, 
  Sparkles, 
  Loader2, 
  ExternalLink,
  Layers,
  FileCode,
  ShieldCheck
} from 'lucide-react';
import { generateAndroidProjectZip } from '../utils/apkExporter';

interface AndroidideApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidideApkModal: React.FC<AndroidideApkModalProps> = ({ isOpen, onClose }) => {
  const { language } = useCourse();
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleExportZip = async () => {
    try {
      setIsExporting(true);
      setDownloadSuccess(false);
      setExportProgress(5);
      setStatusMsg(language === 'hi' ? 'सभी मीडिया व कोड फ़ाइलों को तैयार किया जा रहा है...' : 'Preparing project files & media assets...');

      const blob = await generateAndroidProjectZip((progress, status) => {
        setExportProgress(progress);
        setStatusMsg(status);
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Spa_Hub_AndroidIDE_Full_Project_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);

      setDownloadSuccess(true);
      setStatusMsg(language === 'hi' ? 'ZIP फ़ाइल सफलतापूर्वक डाउनलोड हो गई है!' : 'ZIP file downloaded successfully!');
    } catch (err) {
      console.error('Failed to export Android project ZIP', err);
      alert(language === 'hi' ? 'ZIP फ़ाइल तैयार करने में त्रुटि आई।' : 'Failed to export Android project ZIP.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="max-w-2xl w-full bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl space-y-0">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#081C15] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A373] text-[#1B4332] flex items-center justify-center font-bold shadow-md">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#E9C46A]">
                {language === 'hi' ? 'AndroidIDE व मोबाइल APK सिस्टम' : 'AndroidIDE & 1-Click Mobile APK Engine'}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif">
                {language === 'hi' ? 'AndroidIDE ZIP प्रोजेक्ट डाउनलोड' : 'Download Complete APK Project ZIP'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Feature Highlights */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100">
            <div className="font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>
                {language === 'hi'
                  ? 'इस ZIP फ़ाइल में सभी आयातित (Imported) फ़ोटो और वीडियो इनबिल्ट रहेंगे!'
                  : 'All imported photos, videos & course data are bundled natively into this ZIP!'}
              </span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
              {language === 'hi'
                ? 'जब आप इस ZIP से AndroidIDE ऐप में APK बनाएंगे और मोबाइल में इनस्टॉल करेंगे, तो आपके द्वारा इम्पोर्ट की गई सभी फ़ोटो, नोट्स, और सर्टिफिकेट सेटिंग्स डिफ़ॉल्ट रूप से इनबिल्ट मिलेंगी।'
                : 'When compiled in AndroidIDE and installed on Android, all custom photos, practical notes, and admin controls are permanently baked in.'}
            </p>
          </div>

          {/* Download Button with Progress */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center mx-auto">
              <FolderArchive className="w-7 h-7" />
            </div>
            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-base">
                {language === 'hi' ? 'Spa Hub Full Source & Android Project (.ZIP)' : 'Full Source & Android Project (.ZIP)'}
              </div>
              <div className="text-xs text-stone-500">
                {language === 'hi'
                  ? 'शामिल: build.gradle, AndroidManifest.xml (Camera/Storage Permissions), Java Bridge, Capacitor, Preloaded Media Bundle'
                  : 'Includes: Gradle scripts, Android Manifest with storage/camera permissions, Java Bridge & Asset bundle'}
              </div>
            </div>

            {isExporting ? (
              <div className="space-y-2 pt-2">
                <div className="w-full bg-stone-200 dark:bg-stone-700 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{statusMsg || `${exportProgress}%`}</span>
                </div>
              </div>
            ) : downloadSuccess ? (
              <div className="pt-2 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'hi' ? 'डाउनलोड पूरा हुआ! नीचे दिए गए स्टेप्स से APK बनाएं।' : 'Downloaded! Follow steps below to build APK.'}</span>
                </div>
                <div>
                  <button
                    onClick={handleExportZip}
                    className="text-xs text-emerald-700 dark:text-emerald-400 underline font-semibold"
                  >
                    {language === 'hi' ? 'दोबारा डाउनलोड करें' : 'Download Again'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                id="btn-download-androidide-zip"
                onClick={handleExportZip}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 hover:to-[#1B4332] text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'hi' ? '1-Click संपूर्ण प्रोजेक्ट ZIP डाउनलोड करें' : '1-Click Download Full Project ZIP'}</span>
              </button>
            )}
          </div>

          {/* Step-by-Step AndroidIDE Installation Guide */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? '📱 AndroidIDE से मोबाइल में APK बनाने की विधि:' : '📱 How to Build APK in AndroidIDE on Phone:'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <div className="font-bold text-stone-800 dark:text-stone-200">
                  {language === 'hi' ? 'ZIP Extract करें' : '1. Extract ZIP'}
                </div>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                  {language === 'hi'
                    ? 'डाउनलोड की गई ZIP फाइल को अपने फोन के फाइल मैनेजर में किसी फोल्डर में Extract (Unzip) करें।'
                    : 'Extract the downloaded ZIP file into any folder on your phone storage.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <div className="font-bold text-stone-800 dark:text-stone-200">
                  {language === 'hi' ? 'AndroidIDE में खोलें' : '2. Open in AndroidIDE'}
                </div>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                  {language === 'hi'
                    ? 'AndroidIDE ऐप खोलें और "Open Project" में जाकर extract किए गए "android" फोल्डर को चुनें।'
                    : 'Open AndroidIDE app on your phone and choose "Open Project" -> select the "android" folder.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <div className="font-bold text-stone-800 dark:text-stone-200">
                  {language === 'hi' ? 'Build APK & Install' : '3. Build & Install'}
                </div>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                  {language === 'hi'
                    ? 'AndroidIDE में ऊपर दिए गए "Run ▶" या "Build APK" बटन पर क्लिक करें। 1 मिनट में APK बनकर इनस्टॉल हो जाएगी।'
                    : 'Tap the Run (Play ▶) button or Build APK in AndroidIDE. The APK will compile and install in 1 click!'}
                </p>
              </div>
            </div>
          </div>

          {/* Master Admin Reminder */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center gap-3 text-xs text-amber-900 dark:text-amber-200">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">
                {language === 'hi' ? 'मास्टर एडमिन लॉगिन: ' : 'Master Admin Phone: '}
              </span>
              <span>7905892661 (OTP: 7905) — {language === 'hi' ? 'APK इंस्टॉल होने के बाद इसी नंबर से लॉगिन करके एडमिन पैनल खुलेगा।' : 'Use this number in the installed APK to access the Admin Control Panel.'}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 dark:bg-stone-800/70 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-800 dark:text-stone-200 text-xs font-semibold transition"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
