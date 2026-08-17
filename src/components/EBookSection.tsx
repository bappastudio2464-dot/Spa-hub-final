import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import { chaptersData } from '../data/chaptersData';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  VolumeX, 
  Bookmark as BookmarkIcon, 
  BookmarkCheck,
  StickyNote, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle, 
  Play, 
  Pause,
  Award,
  Check
} from 'lucide-react';

export const EBookSection: React.FC = () => {
  const {
    language,
    selectedChapterId,
    setSelectedChapterId,
    completedChapters,
    toggleChapterComplete,
    chapterQuizScores,
    saveChapterQuizScore,
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    notes,
    addNote,
    deleteNote,
    readingTheme,
    setReadingTheme,
    fontSize,
    setFontSize,
    searchQuery,
  } = useCourse();

  // Selected Chapter
  const currentChapter = chaptersData.find(c => c.id === selectedChapterId) || chaptersData[0];
  
  // Note creation state
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');

  // Chapter Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Audio Speech state (TTS)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Reset quiz when chapter changes
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlayingAudio(false);
    }
  }, [selectedChapterId]);

  // Audio speech handler
  const toggleSpeech = () => {
    if (!synthRef.current) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      synthRef.current.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = language === 'hi'
      ? `${currentChapter.titleHi}. ${currentChapter.summaryHi}. ` + currentChapter.sections.map(s => `${s.titleHi}. ${s.contentHi}`).join('. ')
      : `${currentChapter.title}. ${currentChapter.summary}. ` + currentChapter.sections.map(s => `${s.title}. ${s.content}`).join('. ');

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = speechRate;
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.cancel(); // clear previous
    synthRef.current.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Filter chapters if search active
  const filteredChapters = chaptersData.filter(ch => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      ch.title.toLowerCase().includes(q) ||
      ch.titleHi.toLowerCase().includes(q) ||
      ch.summary.toLowerCase().includes(q) ||
      ch.summaryHi.toLowerCase().includes(q) ||
      ch.sections.some(s => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))
    );
  });

  // Handle Quiz Submission
  const handleQuizSubmit = () => {
    let correct = 0;
    currentChapter.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const percentage = Math.round((correct / currentChapter.quiz.length) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);
    saveChapterQuizScore(currentChapter.id, percentage);
    if (percentage >= 70 && !completedChapters.includes(currentChapter.id)) {
      toggleChapterComplete(currentChapter.id);
    }
  };

  // Handle saving user note
  const handleSaveNote = () => {
    if (!newNoteContent.trim()) return;
    addNote({
      referenceType: 'chapter',
      referenceId: currentChapter.id,
      title: newNoteTitle.trim() || `Note on Ch.${currentChapter.chapterNumber}: ${currentChapter.title.slice(0, 25)}...`,
      content: newNoteContent.trim(),
    });
    setNewNoteContent('');
    setNewNoteTitle('');
    setIsAddingNote(false);
  };

  // Theme styling classes
  const themeClasses = {
    light: 'bg-white text-stone-800 border-stone-200',
    sepia: 'bg-[#FAF5EB] text-[#3D332A] border-[#E8DFC8]',
    dark: 'bg-[#18201C] text-[#E0EBE4] border-[#293830]',
  };

  const contentBgClasses = {
    light: 'bg-stone-50/70 border-stone-200 text-stone-700',
    sepia: 'bg-[#F2E8D5]/70 border-[#DFCDB2] text-[#42382D]',
    dark: 'bg-[#1E2A24] border-[#2B3C33] text-[#D0DFD6]',
  };

  const fontSizes = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
  };

  // Navigation to Prev / Next chapter
  const currentIndex = chaptersData.findIndex(c => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? chaptersData[currentIndex - 1] : null;
  const nextChapter = currentIndex < chaptersData.length - 1 ? chaptersData[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Chapter List & Navigation */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                  {language === 'hi' ? 'पाठ्यक्रम अध्याय' : 'Course Curriculum'}
                </h3>
                <p className="text-xs text-stone-500">
                  {completedChapters.length} of {chaptersData.length} {language === 'hi' ? 'अध्याय पूर्ण' : 'Chapters Completed'}
                </p>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-full">
                10 Chapters
              </span>
            </div>

            {/* Chapter List */}
            <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {filteredChapters.map((chapter) => {
                const isSelected = chapter.id === selectedChapterId;
                const isCompleted = completedChapters.includes(chapter.id);
                const score = chapterQuizScores[chapter.id];

                return (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapterId(chapter.id)}
                    className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 border ${
                      isSelected
                        ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-sm'
                        : 'bg-stone-50/80 hover:bg-stone-100 text-stone-800 border-stone-200/80'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#2D6A4F]'}`} />
                      ) : (
                        <Circle className={`w-4 h-4 ${isSelected ? 'text-white/60' : 'text-stone-300'}`} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-emerald-200' : 'text-[#2D6A4F]'}`}>
                          Chapter {chapter.chapterNumber} • {chapter.estimatedReadTime}
                        </span>
                        {score !== undefined && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-[#2D6A4F]/10 text-[#2D6A4F]'
                          }`}>
                            Quiz: {score}%
                          </span>
                        )}
                      </div>

                      <h4 className={`text-xs sm:text-sm font-semibold truncate mt-0.5 ${isSelected ? 'text-white' : 'text-stone-800'}`}>
                        {language === 'hi' ? chapter.titleHi : chapter.title}
                      </h4>

                      <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-emerald-100/90' : 'text-stone-500'}`}>
                        {language === 'hi' ? chapter.subtitleHi : chapter.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Notes in this Chapter */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif font-bold text-sm text-stone-800 flex items-center gap-1.5">
                <StickyNote className="w-4 h-4 text-[#D4A373]" />
                <span>{language === 'hi' ? 'अध्याय के नोट्स' : 'Chapter Notes & Bookmarks'}</span>
              </h4>
              <button
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="text-xs font-semibold text-[#2D6A4F] hover:underline"
              >
                {isAddingNote ? 'Cancel' : '+ Add Note'}
              </button>
            </div>

            {isAddingNote && (
              <div className="mb-3 space-y-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <input
                  type="text"
                  placeholder="Note Title..."
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
                <textarea
                  placeholder="Write your study note or client tip..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={2}
                  className="w-full text-xs p-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
                <button
                  onClick={handleSaveNote}
                  className="w-full py-1.5 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] rounded-lg transition"
                >
                  Save Note
                </button>
              </div>
            )}

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {notes.filter(n => n.referenceId === currentChapter.id).length === 0 ? (
                <p className="text-xs text-stone-400 italic">No notes added yet for Chapter {currentChapter.chapterNumber}.</p>
              ) : (
                notes
                  .filter(n => n.referenceId === currentChapter.id)
                  .map((note) => (
                    <div key={note.id} className="p-2.5 bg-amber-50/60 border border-amber-200/60 rounded-xl relative group text-xs">
                      <div className="font-semibold text-stone-800">{note.title}</div>
                      <p className="text-stone-600 text-[11px] mt-1">{note.content}</p>
                      <div className="text-[9px] text-stone-400 mt-1">{note.createdAt}</div>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="absolute top-2 right-2 text-stone-400 hover:text-red-500 text-[10px]"
                      >
                        ×
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </aside>

        {/* Right Main Column: Comprehensive Chapter E-Book Reader */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* Reader Toolbar: Theme, Font Size, Audio Reader & Complete Button */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Audio Voice Reader */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSpeech}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-[#2D6A4F]/10 text-[#2D6A4F] hover:bg-[#2D6A4F]/20'
                }`}
              >
                {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? (language === 'hi' ? 'ऑडियो रोकें' : 'Stop Audio') : (language === 'hi' ? 'अध्याय सुनें (Voice)' : 'Listen Chapter')}</span>
              </button>

              {isPlayingAudio && (
                <div className="flex items-center gap-1 text-[11px] text-stone-500">
                  <button 
                    onClick={() => setSpeechRate(r => (r === 1.2 ? 0.8 : r === 0.8 ? 1 : 1.2))}
                    className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 hover:bg-stone-200"
                  >
                    {speechRate}x
                  </button>
                </div>
              )}
            </div>

            {/* Reading Customization: Themes & Font Size */}
            <div className="flex items-center gap-3">
              {/* Reading Theme */}
              <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200">
                <button
                  onClick={() => setReadingTheme('light')}
                  className={`px-2 py-1 text-xs rounded font-medium ${readingTheme === 'light' ? 'bg-white shadow-xs text-stone-800' : 'text-stone-500'}`}
                  title="Clean Light Theme"
                >
                  Light
                </button>
                <button
                  onClick={() => setReadingTheme('sepia')}
                  className={`px-2 py-1 text-xs rounded font-medium ${readingTheme === 'sepia' ? 'bg-[#F2E8D5] shadow-xs text-[#42382D]' : 'text-stone-500'}`}
                  title="Warm Sepia Theme"
                >
                  Sepia
                </button>
                <button
                  onClick={() => setReadingTheme('dark')}
                  className={`px-2 py-1 text-xs rounded font-medium ${readingTheme === 'dark' ? 'bg-[#18201C] text-white shadow-xs' : 'text-stone-500'}`}
                  title="Night Dark Theme"
                >
                  Dark
                </button>
              </div>

              {/* Font Size Adjuster */}
              <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-0.5 text-xs font-semibold rounded ${fontSize === 'sm' ? 'bg-white shadow-xs text-stone-800' : 'text-stone-500'}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('md')}
                  className={`px-2 py-0.5 text-xs font-semibold rounded ${fontSize === 'md' ? 'bg-white shadow-xs text-stone-800' : 'text-stone-500'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-0.5 text-xs font-semibold rounded ${fontSize === 'lg' ? 'bg-white shadow-xs text-stone-800' : 'text-stone-500'}`}
                >
                  A+
                </button>
              </div>

              {/* Mark Completed Button */}
              <button
                onClick={() => toggleChapterComplete(currentChapter.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  completedChapters.includes(currentChapter.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>
                  {completedChapters.includes(currentChapter.id) 
                    ? (language === 'hi' ? 'पूर्ण' : 'Mastered') 
                    : (language === 'hi' ? 'पूर्ण चिह्नित करें' : 'Mark Completed')}
                </span>
              </button>
            </div>
          </div>

          {/* Main Book Content Container with Selected Theme */}
          <article className={`rounded-3xl p-6 sm:p-10 border shadow-sm transition-colors duration-200 ${themeClasses[readingTheme]}`}>
            
            {/* Chapter Header */}
            <div className="border-b border-stone-200/50 pb-6 mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-full text-xs font-bold uppercase tracking-wider">
                  Chapter {currentChapter.chapterNumber}
                </span>
                <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-semibold">
                  {currentChapter.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-stone-500 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  {currentChapter.estimatedReadTime} read
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight mb-2">
                {language === 'hi' ? currentChapter.titleHi : currentChapter.title}
              </h1>

              <h2 className="text-sm sm:text-base font-medium text-stone-500 italic">
                {language === 'hi' ? currentChapter.subtitleHi : currentChapter.subtitle}
              </h2>
            </div>

            {/* Chapter Executive Summary Box */}
            <div className={`p-5 rounded-2xl mb-8 border ${contentBgClasses[readingTheme]}`}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'hi' ? 'अध्याय का संक्षिप्त सार (Key Highlights)' : 'Chapter Core Takeaways'}</span>
              </div>
              <p className={fontSizes[fontSize]}>
                {language === 'hi' ? currentChapter.summaryHi : currentChapter.summary}
              </p>
            </div>

            {/* Chapter Detailed Sections */}
            <div className="space-y-10">
              {currentChapter.sections.map((section, sIndex) => {
                const bookmarked = isBookmarked(currentChapter.id, section.id);

                return (
                  <section key={section.id} className="space-y-4">
                    {/* Section Title & Bookmark Action */}
                    <div className="flex items-center justify-between border-b border-stone-200/40 pb-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B4332] flex items-center gap-2">
                        <span className="text-[#2D6A4F]/60 text-lg font-mono">§ {currentChapter.chapterNumber}.{sIndex + 1}</span>
                        <span>{language === 'hi' ? section.titleHi : section.title}</span>
                      </h3>

                      <button
                        onClick={() => {
                          if (bookmarked) {
                            const found = bookmarks.find(b => b.chapterId === currentChapter.id && b.sectionId === section.id);
                            if (found) removeBookmark(found.id);
                          } else {
                            addBookmark({
                              chapterId: currentChapter.id,
                              sectionId: section.id,
                              chapterTitle: currentChapter.title,
                              sectionTitle: section.title,
                            });
                          }
                        }}
                        className={`p-1.5 rounded-lg transition ${
                          bookmarked 
                            ? 'text-amber-500 bg-amber-50' 
                            : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'
                        }`}
                        title={bookmarked ? 'Remove Bookmark' : 'Bookmark this section'}
                      >
                        {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Section Text Content */}
                    <p className={fontSizes[fontSize]}>
                      {language === 'hi' ? section.contentHi : section.content}
                    </p>

                    {/* Bilingual English & Hindi Switchable Helper Callout */}
                    <div className="p-3.5 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs text-stone-600 space-y-1">
                      <div className="font-semibold text-[#2D6A4F] flex items-center gap-1.5">
                        <span>{language === 'hi' ? '📖 अंग्रेजी मूल संदर्भ (English Text):' : '📖 हिंदी अनुवाद (Hindi Translation):'}</span>
                      </div>
                      <p className="italic text-stone-600 leading-relaxed">
                        {language === 'hi' ? section.content : section.contentHi}
                      </p>
                    </div>

                    {/* Bullet Points if any */}
                    {section.bulletPoints && (
                      <div className="space-y-2.5 my-4">
                        {section.bulletPoints.map((bp, bpIdx) => (
                          <div key={bpIdx} className={`p-3.5 rounded-xl border flex items-start gap-3 ${contentBgClasses[readingTheme]}`}>
                            <div className="w-2 h-2 rounded-full bg-[#2D6A4F] mt-2 flex-shrink-0" />
                            <div className="space-y-1">
                              <p className="text-xs sm:text-sm font-medium">
                                {language === 'hi' ? bp.hi : bp.en}
                              </p>
                              <p className="text-[11px] text-stone-500 italic">
                                {language === 'hi' ? bp.en : bp.hi}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Techniques breakdown if any */}
                    {section.techniques && (
                      <div className="space-y-4 my-6">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                          {language === 'hi' ? 'प्रैक्टिकल तकनीक और हस्त मुद्रा' : 'Practical Technique & Hand Positioning'}
                        </div>

                        {section.techniques.map((tech) => (
                          <div 
                            key={tech.stepNumber}
                            className="bg-white/90 rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold">
                                  {tech.stepNumber}
                                </span>
                                <h4 className="font-serif text-lg font-bold text-[#1B4332]">
                                  {language === 'hi' ? tech.titleHi : tech.title}
                                </h4>
                              </div>
                              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full border border-amber-200">
                                Pressure: {tech.pressureLevel}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                              {language === 'hi' ? tech.descriptionHi : tech.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                                <span className="font-bold text-stone-600 block mb-1">
                                  {language === 'hi' ? 'हस्त मुद्रा (Hand Posture):' : 'Hand Mechanics:'}
                                </span>
                                <span className="text-stone-700">
                                  {language === 'hi' ? tech.handPositionHi : tech.handPosition}
                                </span>
                              </div>

                              {tech.tip && (
                                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                                  <span className="font-bold flex items-center gap-1 mb-1">
                                    <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
                                    {language === 'hi' ? 'प्रो टिप:' : 'Therapist Tip:'}
                                  </span>
                                  <span>{language === 'hi' ? tech.tipHi : tech.tip}</span>
                                </div>
                              )}

                              {tech.caution && (
                                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-900 sm:col-span-2">
                                  <span className="font-bold flex items-center gap-1 mb-1">
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
                                    {language === 'hi' ? 'सावधानी:' : 'Safety Precaution:'}
                                  </span>
                                  <span>{language === 'hi' ? tech.cautionHi : tech.caution}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Practical Hands-On Assignment Checklist */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[#2D6A4F]/10 via-[#52B788]/10 to-[#D4A373]/10 border border-[#2D6A4F]/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#2D6A4F]" />
                  <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                    {language === 'hi' ? 'प्रैक्टिकल असाइनमेंट (Hands-on Practice)' : 'Practical Training Assignment'}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-full text-stone-600 shadow-xs border border-stone-200">
                  ⏱️ {currentChapter.practicalAssignment.timeRequired}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-stone-800">
                {language === 'hi' ? currentChapter.practicalAssignment.titleHi : currentChapter.practicalAssignment.title}
              </h4>

              <div className="space-y-2">
                {(language === 'hi' ? currentChapter.practicalAssignment.instructionsHi : currentChapter.practicalAssignment.instructions).map((ins, iIdx) => (
                  <div key={iIdx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <span className="w-5 h-5 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">
                      {iIdx + 1}
                    </span>
                    <span>{ins}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* End of Chapter Interactive Mini-Quiz */}
            <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#2D6A4F]" />
                  <h3 className="font-serif text-xl font-bold text-[#1B4332]">
                    {language === 'hi' ? 'अध्याय ज्ञान परीक्षा (Mini Quiz)' : 'End of Chapter Knowledge Check'}
                  </h3>
                </div>

                {quizScore !== null && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    quizScore >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Score: {quizScore}% {quizScore >= 70 ? '✅ Passed' : '⚠️ Review'}
                  </span>
                )}
              </div>

              {/* Quiz Questions */}
              <div className="space-y-6">
                {currentChapter.quiz.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                      <div className="text-xs font-bold uppercase text-[#2D6A4F]">
                        Question {qIdx + 1} of {currentChapter.quiz.length}
                      </div>

                      <p className="text-sm font-semibold text-stone-800">
                        {language === 'hi' ? q.questionHi : q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(language === 'hi' ? q.optionsHi : q.options).map((opt, optIdx) => {
                          const isThisSelected = selectedOpt === optIdx;
                          let btnStyle = 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-semibold';
                            } else if (isThisSelected && !isCorrect) {
                              btnStyle = 'bg-red-100 border-red-400 text-red-900';
                            }
                          } else if (isThisSelected) {
                            btnStyle = 'bg-[#2D6A4F] text-white border-[#2D6A4F]';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`p-3 rounded-xl text-left text-xs transition border flex items-start gap-2 ${btnStyle}`}
                            >
                              <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation shown after submission */}
                      {quizSubmitted && (
                        <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs text-stone-600 space-y-1">
                          <span className="font-bold text-[#2D6A4F] block">
                            {language === 'hi' ? 'व्याख्या (Explanation):' : 'Explanation:'}
                          </span>
                          <p>{language === 'hi' ? q.explanationHi : q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Retake Quiz Button */}
              <div className="flex items-center justify-between pt-2">
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < currentChapter.quiz.length}
                    className="px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                  >
                    {language === 'hi' ? 'उत्तर सबमिट करें' : 'Submit Answers'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition"
                  >
                    {language === 'hi' ? 'पुनः प्रयास करें' : 'Retake Quiz'}
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Chapter Navigation Bar */}
            <div className="mt-12 pt-6 border-t border-stone-200 flex items-center justify-between">
              {prevChapter ? (
                <button
                  onClick={() => setSelectedChapterId(prevChapter.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-semibold text-stone-700 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Ch. {prevChapter.chapterNumber}: {prevChapter.title.slice(0, 18)}...</span>
                </button>
              ) : <div />}

              {nextChapter && (
                <button
                  onClick={() => setSelectedChapterId(nextChapter.id)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl text-xs font-semibold transition shadow-xs"
                >
                  <span>Ch. {nextChapter.chapterNumber}: {nextChapter.title.slice(0, 18)}...</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </article>
        </main>
      </div>
    </div>
  );
};
