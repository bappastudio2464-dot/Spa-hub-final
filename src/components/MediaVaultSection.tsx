import React, { useState, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  FolderPlus, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Trash2, 
  Download, 
  Share2, 
  Sparkles, 
  Eye, 
  Tag, 
  Calendar,
  HardDrive,
  CheckCircle,
  Play,
  X,
  Plus
} from 'lucide-react';
import { MediaVaultItem } from '../types';

export const MediaVaultSection: React.FC = () => {
  const { language, mediaItems, addMediaItem, removeMediaItem } = useCourse();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
  const [activeModalItem, setActiveModalItem] = useState<MediaVaultItem | null>(null);

  // Upload Form Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Technique Practice');
  const [newDescription, setNewDescription] = useState<string>('');
  const [previewBlob, setPreviewBlob] = useState<{ url: string; type: 'image' | 'video'; name: string; size: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');

      if (!isImage && !isVideo) {
        alert(language === 'hi' ? 'कृपया केवल फोटो या वीडियो फाइल चुनें।' : 'Please select an image or video file only.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreviewBlob({
          url: dataUrl,
          type: isVideo ? 'video' : 'image',
          name: file.name,
          size: formatFileSize(file.size)
        });
        if (!newTitle) {
          setNewTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewBlob) {
      alert(language === 'hi' ? 'कृपया पहले गैलरी से फाइल चुनें।' : 'Please select a file from gallery first.');
      return;
    }

    await addMediaItem({
      title: newTitle.trim() || previewBlob.name,
      type: previewBlob.type,
      category: newCategory,
      dataUrl: previewBlob.url,
      thumbnailUrl: previewBlob.url,
      description: newDescription.trim() || undefined,
      sizeFormatted: previewBlob.size
    });

    // Reset
    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setPreviewBlob(null);
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesCategory && matchesType;
  });

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी फाइलें' : 'All Files' },
    { id: 'Technique Practice', label: language === 'hi' ? 'प्रैक्टिस फोटो/वीडियो' : 'Technique Practice' },
    { id: 'Room Setup', label: language === 'hi' ? 'स्पा रूम सेटअप' : 'Spa Room Setup' },
    { id: 'Before & After', label: language === 'hi' ? 'क्लाइंट रिजल्ट्स' : 'Client Results' },
    { id: 'Certificates & Docs', label: language === 'hi' ? 'दस्तावेज व सर्टिफिकेट' : 'Certificates & Docs' },
    { id: 'Marketing Assets', label: language === 'hi' ? 'मार्केटिंग फोटो/रील्स' : 'Marketing & Reels' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#081C15] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/40 text-[#E9C46A] text-xs font-semibold tracking-wide">
            <HardDrive className="w-4 h-4" />
            {language === 'hi' ? 'सुरक्षित परमानेंट फोन व ऐप स्टोरेज वॉल्ट' : 'Permanent Device & App Media Storage Vault'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif">
            {language === 'hi' ? 'स्पा मीडिया व ट्रेनिंग गैलरी वॉल्ट' : 'Spa Media & Practical Training Vault'}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'अपने फोन की गैलरी से प्रैक्टिकल मसाज के वीडियो, स्पा रूम सेटअप की तस्वीरें, लाइसेंस और सर्टिफिकेट हमेशा के लिए ऐप स्टोरेज में सुरक्षित सेव करें।'
              : 'Import, store, and organize client technique videos, spa room aesthetics, before-and-after results, and legal documents permanently in your secure offline-capable storage.'}
          </p>
        </div>

        <button
          id="btn-open-upload-modal"
          onClick={() => setIsUploadModalOpen(true)}
          className="relative z-10 px-6 py-3.5 bg-gradient-to-r from-[#D4A373] to-[#E9C46A] hover:from-[#c29262] hover:to-[#dfb958] text-[#1B4332] font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2.5 shrink-0"
        >
          <Upload className="w-5 h-5" />
          {language === 'hi' ? 'फोन गैलरी से फोटो/वीडियो अपलोड करें' : 'Import from Gallery / Device'}
        </button>
      </div>

      {/* Storage Filters */}
      <div className="bg-white dark:bg-stone-900 p-4 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Type Filter (All / Images / Videos) */}
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-2xl">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === 'all' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500'
              }`}
            >
              {language === 'hi' ? 'सभी' : 'All'}
            </button>
            <button
              onClick={() => setSelectedType('image')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedType === 'image' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-400 shadow-sm' : 'text-stone-500'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              {language === 'hi' ? 'फोटो' : 'Photos'}
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedType === 'video' ? 'bg-white dark:bg-stone-700 text-indigo-700 dark:text-indigo-400 shadow-sm' : 'text-stone-500'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              {language === 'hi' ? 'वीडियो' : 'Videos'}
            </button>
          </div>

        </div>
      </div>

      {/* Media Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-dashed border-stone-300 dark:border-stone-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
            <FolderPlus className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
            {language === 'hi' ? 'कोई मीडिया फाइल नहीं मिली' : 'No Media Files in Storage Vault Yet'}
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            {language === 'hi'
              ? 'ऊपर दिए गए बटन पर क्लिक करके अपने फोन से तस्वीरें या वीडियो अपलोड करें। वे हमेशा के लिए इस ऐप में सुरक्षित रहेंगी।'
              : 'Click "Import from Gallery" to upload your practical massage videos, spa room pictures, and certificates. They stay safely stored forever.'}
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            {language === 'hi' ? 'पहली फाइल अपलोड करें' : 'Upload First File'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Media Thumbnail Box */}
              <div 
                onClick={() => setActiveModalItem(item)}
                className="relative aspect-video bg-stone-900 overflow-hidden cursor-pointer flex items-center justify-center"
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.dataUrl} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <img 
                    src={item.thumbnailUrl || item.dataUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                )}

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  {item.type === 'video' ? <Video className="w-3 h-3 text-indigo-400" /> : <ImageIcon className="w-3 h-3 text-emerald-400" />}
                  {item.type}
                </div>

                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Media Content Info */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm line-clamp-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                  <span>{item.dateAdded}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      title="View Fullscreen"
                      className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-300 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeMediaItem(item.id)}
                      title="Delete from Storage"
                      className="p-1.5 hover:bg-rose-100 dark:hover:bg-rose-950/60 rounded-lg text-rose-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-6 animate-scaleIn max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg font-serif">
                    {language === 'hi' ? 'फोन गैलरी से मीडिया अपलोड करें' : 'Import Media to App Storage'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {language === 'hi' ? 'फोटो या वीडियो चुनें और सुरक्षित सेव करें' : 'Select photos or video files from your device'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setPreviewBlob(null);
                }}
                className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="space-y-4">
              
              {/* File Selector Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl p-6 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 transition-all group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="hidden"
                />

                {previewBlob ? (
                  <div className="space-y-3">
                    <div className="w-full aspect-video rounded-xl bg-black overflow-hidden flex items-center justify-center relative">
                      {previewBlob.type === 'video' ? (
                        <video src={previewBlob.url} className="w-full h-full object-contain" controls />
                      ) : (
                        <img src={previewBlob.url} alt="Preview" className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                      {previewBlob.name} ({previewBlob.size})
                    </div>
                    <span className="text-xs text-emerald-600 font-bold underline">
                      {language === 'hi' ? 'दूसरी फाइल चुनें' : 'Choose a different file'}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
                      <FolderPlus className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      {language === 'hi' ? 'गैलरी / स्टोरेज से फाइल चुनें' : 'Click to Browse Device Storage / Gallery'}
                    </div>
                    <p className="text-xs text-stone-500">
                      {language === 'hi' ? 'सपोर्टेड: MP4, MOV, JPG, PNG, WEBP' : 'Supports Photos (JPG, PNG) & Videos (MP4, MOV)'}
                    </p>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  {language === 'hi' ? 'शीर्षक (Title)' : 'Title / Caption'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Thai Cobra Stretch Practical / Spa Room Setup"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  {language === 'hi' ? 'श्रेणी (Category)' : 'Category'}
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Technique Practice">{language === 'hi' ? 'प्रैक्टिस फोटो/वीडियो' : 'Technique Practice'}</option>
                  <option value="Room Setup">{language === 'hi' ? 'स्पा रूम सेटअप' : 'Spa Room Setup'}</option>
                  <option value="Before & After">{language === 'hi' ? 'क्लाइंट रिजल्ट्स' : 'Before & After'}</option>
                  <option value="Certificates & Docs">{language === 'hi' ? 'दस्तावेज व सर्टिफिकेट' : 'Certificates & Docs'}</option>
                  <option value="Marketing Assets">{language === 'hi' ? 'मार्केटिंग फोटो/रील्स' : 'Marketing & Reels'}</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  {language === 'hi' ? 'विवरण / नोट्स (वैकल्पिक)' : 'Notes / Description (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="e.g. Practiced with 2% lavender blend in Archer stance."
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-semibold text-sm transition-all"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!previewBlob}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {language === 'hi' ? 'ऐप स्टोरेज में सेव करें' : 'Save to App Storage'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* FULLSCREEN PREVIEW LIGHTBOX MODAL */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 bg-stone-950 flex items-center justify-between border-b border-stone-800 text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {activeModalItem.category}
                </span>
                <h3 className="font-bold text-base font-serif">{activeModalItem.title}</h3>
              </div>
              <button 
                onClick={() => setActiveModalItem(null)}
                className="p-2 rounded-full hover:bg-white/10 text-stone-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Media Player Box */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden p-2">
              {activeModalItem.type === 'video' ? (
                <video 
                  src={activeModalItem.dataUrl} 
                  controls 
                  autoPlay 
                  className="max-h-[60vh] max-w-full rounded-xl"
                />
              ) : (
                <img 
                  src={activeModalItem.dataUrl} 
                  alt={activeModalItem.title} 
                  className="max-h-[60vh] max-w-full object-contain rounded-xl"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
              <div>
                {activeModalItem.description && <p className="text-stone-300 mb-1">{activeModalItem.description}</p>}
                <span>Added on {activeModalItem.dateAdded} • {activeModalItem.sizeFormatted || 'Stored in Vault'}</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={activeModalItem.dataUrl}
                  download={activeModalItem.title}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  {language === 'hi' ? 'डाउनलोड करें' : 'Download File'}
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
