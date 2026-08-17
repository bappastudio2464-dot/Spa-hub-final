import React, { useState, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  HardDrive, 
  Download, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileJson, 
  Image as ImageIcon, 
  BookOpen, 
  Award, 
  X, 
  RefreshCw, 
  Database,
  Sparkles,
  Check
} from 'lucide-react';
import { exportFullAppBundle, importFullAppBundle } from '../utils/mediaStorage';

interface StorageBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorageBackupModal: React.FC<StorageBackupModalProps> = ({ isOpen, onClose }) => {
  const { 
    language, 
    mediaItems, 
    completedChapters, 
    certificate, 
    studentProfile, 
    examResult,
    refreshMediaItems
  } = useCourse();

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExportData = async () => {
    try {
      setIsExporting(true);
      const jsonBundle = await exportFullAppBundle();
      
      const blob = new Blob([jsonBundle], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `Spa_Hub_All_Data_Backup_${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      alert(language === 'hi' ? 'डेटा एक्सपोर्ट करने में त्रुटि हुई।' : 'Failed to export app data.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    setIsImporting(true);
    setImportStatus(null);

    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const result = await importFullAppBundle(content);
        if (result.success) {
          await refreshMediaItems();
          setImportStatus({
            success: true,
            message: language === 'hi' 
              ? `डेटा सफलतापूर्वक रिस्टोर हुआ! (${result.itemCount} फोटो व सभी कोर्स नोट्स लोड हो गए)`
              : `App data restored successfully! (${result.itemCount} photos and course notes loaded)`
          });
          // Quick reload after 1.5s to refresh all context states
          setTimeout(() => {
            window.location.reload();
          }, 1600);
        } else {
          setImportStatus({ success: false, message: result.message });
        }
      } catch (err: any) {
        setImportStatus({ 
          success: false, 
          message: err.message || (language === 'hi' ? 'अमान्य बैकअप फाइल' : 'Invalid backup file format') 
        });
      } finally {
        setIsImporting(false);
      }
    };

    reader.readAsText(file);
  };

  const chapterCustomPhotosCount = mediaItems.filter(item => item.chapterId).length;
  const vaultPhotosCount = mediaItems.length - chapterCustomPhotosCount;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative max-w-2xl w-full bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#0D2818] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A373] text-[#1B4332] flex items-center justify-center font-bold shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#E9C46A]">
                {language === 'hi' ? 'परमानेंट ऑफलाइन स्टोरेज एवं बैकअप' : 'Permanent App Storage & Backup Vault'}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                {language === 'hi' ? 'ऐप डेटा स्टोरेज व एक्सपोर्ट सेंटर' : 'App Storage & Data Export Center'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Storage Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-semibold mb-1 flex items-center justify-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'hi' ? 'कुल फोटो' : 'Saved Photos'}
              </div>
              <div className="text-xl font-bold text-emerald-900 dark:text-emerald-200">
                {mediaItems.length}
              </div>
              <div className="text-[10px] text-stone-400">
                {chapterCustomPhotosCount} in Ch / {vaultPhotosCount} in Vault
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-semibold mb-1 flex items-center justify-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                {language === 'hi' ? 'अध्याय प्रगति' : 'Chapters'}
              </div>
              <div className="text-xl font-bold text-amber-900 dark:text-amber-200">
                {completedChapters.length} / 11
              </div>
              <div className="text-[10px] text-stone-400">
                {((completedChapters.length / 11) * 100).toFixed(0)}% Completed
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-semibold mb-1 flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                {language === 'hi' ? 'डिप्लोमा स्टेटस' : 'Diploma'}
              </div>
              <div className="text-xl font-bold text-blue-900 dark:text-blue-200">
                {certificate ? (language === 'hi' ? 'जारी' : 'Issued') : (language === 'hi' ? 'तैयार' : 'Ready')}
              </div>
              <div className="text-[10px] text-stone-400">
                {examResult ? `Score: ${examResult.score}/50` : 'Master Exam'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-semibold mb-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                {language === 'hi' ? 'डेटाबेस' : 'Storage Engine'}
              </div>
              <div className="text-sm font-bold text-purple-900 dark:text-purple-200 mt-1">
                IndexedDB
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                ● 100% Persistent
              </div>
            </div>
          </div>

          {/* Status message */}
          {importStatus && (
            <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm ${
              importStatus.success
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 text-rose-900 dark:text-rose-200'
            }`}>
              {importStatus.success ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              <span>{importStatus.message}</span>
            </div>
          )}

          {/* Export Action Card */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                  {language === 'hi' ? 'पूरी ऐप का संपूर्ण बैकअप डाउनलोड करें (Export All Data)' : 'Export Complete App Backup File (.json)'}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {language === 'hi'
                    ? 'आपकी सभी कस्टमाइज़ फोटो, नोट्स, डिप्लोमा डिटेल्स, परीक्षा परिणाम और सेटिंग्स को एक ही फाइल में सुरक्षित डाउनलोड करें।'
                    : 'Download all imported chapter photos, student profile, diploma details, exam scores, and bookmarks in a single backup bundle.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="w-full py-3 bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 hover:to-[#1B4332] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2"
            >
              {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>
                {language === 'hi' ? 'संपूर्ण डेटा बैकअप फाइल डाउनलोड करें (.json)' : 'Download Full App Backup (.json)'}
              </span>
            </button>
          </div>

          {/* Import / Restore Action Card */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4A373]/20 text-[#A0522D] dark:text-[#E9C46A] flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                  {language === 'hi' ? 'पुराना बैकअप रिस्टोर करें (Restore / Import Backup)' : 'Restore / Import Backup File'}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {language === 'hi'
                    ? 'अपने फोन स्टोरेज से पूर्व में डाउनलोड की गई .json बैकअप फाइल चुनें। सारा डेटा तुरंत रिस्टोर हो जाएगा।'
                    : 'Select a previously exported .json backup file from your phone. All photos, certificates, and notes will be restored instantly.'}
                </p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json,application/json"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs sm:text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2"
            >
              {isImporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>
                {language === 'hi' ? 'फोन स्टोरेज से बैकअप फाइल चुनें (.json)' : 'Choose Backup File from Device (.json)'}
              </span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'hi' ? 'डेटा आपके डिवाइस में ऑफलाइन सुरक्षित रहता है' : 'Data is stored offline safely on your device'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 font-semibold rounded-xl transition"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
