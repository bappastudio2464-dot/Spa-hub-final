import React, { useState, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Camera, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  ZoomIn, 
  X, 
  Download, 
  Check, 
  Sparkles,
  Info,
  Calendar
} from 'lucide-react';
import { fileToBase64 } from '../utils/mediaStorage';

interface ChapterCustomPhotosProps {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
}

export const ChapterCustomPhotos: React.FC<ChapterCustomPhotosProps> = ({
  chapterId,
  chapterNumber,
  chapterTitle,
}) => {
  const { language, mediaItems, addMediaItem, removeMediaItem } = useCourse();

  // Filter photos specific to this chapter
  const chapterPhotos = mediaItems.filter(item => item.chapterId === chapterId);

  const [isUploading, setIsUploading] = useState(false);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [selectedFileSize, setSelectedFileSize] = useState<number>(0);
  const [activePreviewImage, setActivePreviewImage] = useState<{ url: string; title: string; desc?: string; date: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await fileToBase64(file);
      setSelectedImageBase64(base64);
      setSelectedFileName(file.name);
      setSelectedFileSize(file.size);
      if (!photoTitle) {
        // Default title based on file name or chapter step
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setPhotoTitle(`Ch.${chapterNumber} - ${cleanName}`);
      }
      setIsUploading(true);
    } catch (err) {
      alert(language === 'hi' ? 'फोटो लोड करने में त्रुटि हुई।' : 'Error loading image file.');
    }
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImageBase64) return;

    await addMediaItem({
      title: photoTitle.trim() || `Chapter ${chapterNumber} Practice Photo`,
      description: photoDescription.trim() || `Imported practical photo for ${chapterTitle}`,
      category: 'Chapter Photo',
      chapterId: chapterId,
      mediaType: 'image',
      dataUrl: selectedImageBase64,
      fileName: selectedFileName || `chapter_${chapterNumber}_photo.jpg`,
      fileSize: selectedFileSize || selectedImageBase64.length,
    });

    // Reset form
    setSelectedImageBase64(null);
    setPhotoTitle('');
    setPhotoDescription('');
    setSelectedFileName('');
    setSelectedFileSize(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancelUpload = () => {
    setSelectedImageBase64(null);
    setPhotoTitle('');
    setPhotoDescription('');
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadPhoto = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName || `chapter_${chapterNumber}_practice.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Camera className="w-4 h-4" />
            <span>{language === 'hi' ? 'अध्याय कस्टमाइज़ फोटो गैलरी' : 'Chapter Practice Photo Vault'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {language === 'hi' 
              ? `अध्याय ${chapterNumber}: अपनी प्रैक्टिकल फोटो इंपोर्ट व सेव करें` 
              : `Chapter ${chapterNumber}: Custom Practice Photos & Notes`}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
            {language === 'hi'
              ? 'फोन स्टोरेज / गैलरी से अपनी मसाज प्रैक्टिस, मॉडल, हस्त मुद्रा या नोट्स की फोटो अपलोड करें। यह डेटा ऐप में हमेशा सुरक्षित रहेगा।'
              : 'Import practical massage photos, model hand positions, or notes from your phone gallery. Stored permanently in app storage.'}
          </p>
        </div>

        {/* Trigger File Input Button */}
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <button
            type="button"
            id={`btn-add-photo-ch-${chapterNumber}`}
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 hover:to-[#1B4332] text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2.5"
          >
            <Upload className="w-4 h-4" />
            <span>{language === 'hi' ? 'गैलरी से फोटो जोड़ें (Import)' : '+ Import Photo from Phone'}</span>
          </button>
        </div>
      </div>

      {/* Upload & Customize Modal / Box */}
      {isUploading && selectedImageBase64 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 animate-fadeIn space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {language === 'hi' ? 'फोटो विवरण व कैप्शन दर्ज करें' : 'Add Photo Details & Permanent Save'}
            </h4>
            <button
              onClick={handleCancelUpload}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSavePhoto} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              
              {/* Photo Preview Thumbnail */}
              <div className="sm:col-span-4 h-40 rounded-xl overflow-hidden border-2 border-emerald-300 dark:border-emerald-700 bg-black flex items-center justify-center shadow-inner">
                <img 
                  src={selectedImageBase64} 
                  alt="Upload Preview" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Form Inputs */}
              <div className="sm:col-span-8 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    {language === 'hi' ? 'फोटो का शीर्षक (Title)' : 'Photo Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder={language === 'hi' ? 'जैसे: स्वीडिश पेट्रिसाज प्रैक्टिस...' : 'e.g. Swedish Petrissage Back Technique...'}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    {language === 'hi' ? 'विवरण या थेरेपी नोट्स (Description / Notes)' : 'Description or Practical Note'}
                  </label>
                  <textarea
                    rows={2}
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    placeholder={language === 'hi' ? 'दबाव का स्तर, क्लाइंट रिस्पांस या हस्त मुद्रा विवरण...' : 'Hand pressure notes, client feedback, or technique observation...'}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelUpload}
                className="px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-xl transition"
              >
                {language === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                {language === 'hi' ? 'ऐप में हमेशा के लिए सेव करें' : 'Save Permanently to App'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Display Saved Chapter Photos */}
      {chapterPhotos.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-dashed border-stone-200 dark:border-stone-700/80 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">
              {language === 'hi' ? 'इस अध्याय में अभी कोई कस्टमाइज़ फोटो नहीं है' : 'No Custom Photos in this Chapter Yet'}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              {language === 'hi'
                ? 'ऊपर दिए गए बटन पर क्लिक करके फोन गैलरी से अपनी थेरेपी अभ्यास फोटो, मॉडल हस्त मुद्रा या रूम सेटअप जोड़ें।'
                : 'Click the button above to import your practical training photos, hand positioning, or room setup from your phone.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapterPhotos.map((item) => (
            <div 
              key={item.id}
              className="group bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Photo View Box */}
              <div className="relative h-48 bg-stone-900 overflow-hidden cursor-pointer">
                <img 
                  src={item.dataUrl} 
                  alt={item.title} 
                  onClick={() => setActivePreviewImage({ url: item.dataUrl, title: item.title, desc: item.description, date: item.createdAt })}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <button
                    onClick={() => setActivePreviewImage({ url: item.dataUrl, title: item.title, desc: item.description, date: item.createdAt })}
                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-xl backdrop-blur-md transition"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadPhoto(item.dataUrl, item.fileName)}
                      className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-xl backdrop-blur-md transition"
                      title="Download to Phone"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(language === 'hi' ? 'क्या आप इस फोटो को स्थायी रूप से हटाना चाहते हैं?' : 'Are you sure you want to delete this custom photo?')) {
                          removeMediaItem(item.id);
                        }
                      }}
                      className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl backdrop-blur-md transition"
                      title="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                    {item.title}
                  </h5>
                  {item.description && (
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    Saved in App
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activePreviewImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 flex flex-col shadow-2xl">
            {/* Modal Top Bar */}
            <div className="p-4 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between text-white">
              <div>
                <h4 className="font-bold text-base">{activePreviewImage.title}</h4>
                <span className="text-xs text-stone-400">{activePreviewImage.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownloadPhoto(activePreviewImage.url, `${activePreviewImage.title.replace(/\s+/g, '_')}.jpg`)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'डाउनलोड करें' : 'Download'}</span>
                </button>
                <button
                  onClick={() => setActivePreviewImage(null)}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black">
              <img 
                src={activePreviewImage.url} 
                alt={activePreviewImage.title} 
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Modal Bottom Caption */}
            {activePreviewImage.desc && (
              <div className="p-4 bg-stone-950 text-stone-300 text-xs border-t border-stone-800">
                {activePreviewImage.desc}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
