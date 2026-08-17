import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bookmark, UserNote, PracticeLog, CertificateData, Language, StudentProfile, MediaVaultItem } from '../types';
import { chaptersData } from '../data/chaptersData';
import { videosData } from '../data/videosData';
import { getAllMediaItems, saveMediaItem, deleteMediaItem } from '../utils/mediaStorage';

export type ActiveTabType = 'ebook' | 'anatomy' | 'aromatherapy' | 'practice' | 'exam' | 'vault' | 'glossary';

interface CourseContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  selectedChapterId: string;
  setSelectedChapterId: (id: string) => void;
  selectedVideoId: string | null;
  setSelectedVideoId: (id: string | null) => void;
  
  completedChapters: string[];
  toggleChapterComplete: (id: string) => void;
  completedVideos: string[];
  toggleVideoComplete: (id: string) => void;
  
  chapterQuizScores: Record<string, number>;
  saveChapterQuizScore: (chapterId: string, score: number) => void;
  
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (chapterId: string, sectionId: string) => boolean;
  
  notes: UserNote[];
  addNote: (note: Omit<UserNote, 'id' | 'createdAt'>) => void;
  deleteNote: (id: string) => void;
  
  practiceLogs: PracticeLog[];
  addPracticeLog: (log: Omit<PracticeLog, 'id' | 'date'>) => void;
  
  // Student Profile
  studentProfile: StudentProfile;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  
  // 50 Questions Exam Result
  examResult: { 
    score: number; 
    totalQuestions: number;
    percentage: number; 
    passed: boolean; 
    completedAt: string 
  } | null;
  saveExamResult: (score: number, total: number) => void;
  
  // Certificate
  certificate: CertificateData | null;
  issueCertificate: (detailsOrName?: { 
    studentName?: string; 
    fatherName?: string; 
    dob?: string; 
    age?: string; 
    photoUrl?: string; 
    academyName?: string 
  } | string, fatherName?: string, dob?: string, age?: string, photoUrl?: string) => void;
  
  // Media Vault (Persistent Gallery)
  mediaItems: MediaVaultItem[];
  addMediaItem: (item: Omit<MediaVaultItem, 'id' | 'createdAt'>) => Promise<void>;
  removeMediaItem: (id: string) => Promise<void>;
  refreshMediaItems: () => Promise<void>;
  
  readingTheme: 'light' | 'sepia' | 'dark';
  setReadingTheme: (theme: 'light' | 'sepia' | 'dark') => void;
  fontSize: 'sm' | 'md' | 'lg';
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isGlossaryOpen: boolean;
  setIsGlossaryOpen: (open: boolean) => void;
  
  totalProgressPercentage: number;
  totalCourseProgress: number; // alias
  resetAllProgress: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const STORAGE_KEY = 'spa_hub_training_state_v1';

const defaultProfile: StudentProfile = {
  fullName: 'Pooja Sharma',
  fatherName: 'Rajesh Sharma',
  dob: '1998-05-14',
  age: '26',
  gender: 'Female',
  phone: '+91 98765 43210',
  email: 'pooja.wellness@example.com',
  photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  academyName: 'Spa Hub International Wellness Academy',
  city: 'New Delhi / Mumbai',
};

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTabType>('ebook');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch-1');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [chapterQuizScores, setChapterQuizScores] = useState<Record<string, number>>({});
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>([]);
  
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(defaultProfile);
  const [examResult, setExamResult] = useState<{ 
    score: number; 
    totalQuestions: number;
    percentage: number; 
    passed: boolean; 
    completedAt: string 
  } | null>(null);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaVaultItem[]>([]);
  
  const [readingTheme, setReadingTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  // Load media items from IndexedDB
  const refreshMediaItems = async () => {
    try {
      const items = await getAllMediaItems();
      setMediaItems(items);
    } catch (e) {
      console.error('Error loading media items', e);
    }
  };

  // Initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.completedChapters) setCompletedChapters(parsed.completedChapters);
        if (parsed.completedVideos) setCompletedVideos(parsed.completedVideos);
        if (parsed.chapterQuizScores) setChapterQuizScores(parsed.chapterQuizScores);
        if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.practiceLogs) setPracticeLogs(parsed.practiceLogs);
        if (parsed.studentProfile) setStudentProfile({ ...defaultProfile, ...parsed.studentProfile });
        if (parsed.examResult) setExamResult(parsed.examResult);
        if (parsed.certificate) setCertificate(parsed.certificate);
        if (parsed.readingTheme) setReadingTheme(parsed.readingTheme);
        if (parsed.fontSize) setFontSize(parsed.fontSize);
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    refreshMediaItems();
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      const stateToSave = {
        language,
        completedChapters,
        completedVideos,
        chapterQuizScores,
        bookmarks,
        notes,
        practiceLogs,
        studentProfile,
        examResult,
        certificate,
        readingTheme,
        fontSize,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [
    language,
    completedChapters,
    completedVideos,
    chapterQuizScores,
    bookmarks,
    notes,
    practiceLogs,
    studentProfile,
    examResult,
    certificate,
    readingTheme,
    fontSize,
  ]);

  const updateStudentProfile = (profile: Partial<StudentProfile>) => {
    setStudentProfile(prev => ({ ...prev, ...profile }));
  };

  const toggleChapterComplete = (id: string) => {
    setCompletedChapters(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleVideoComplete = (id: string) => {
    setCompletedVideos(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const saveChapterQuizScore = (chapterId: string, score: number) => {
    setChapterQuizScores(prev => ({ ...prev, [chapterId]: score }));
  };

  const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: 'bm-' + Date.now(),
      createdAt: new Date().toLocaleDateString(),
    };
    setBookmarks(prev => [newBookmark, ...prev]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const isBookmarked = (chapterId: string, sectionId: string) => {
    return bookmarks.some(b => b.chapterId === chapterId && b.sectionId === sectionId);
  };

  const addNote = (note: Omit<UserNote, 'id' | 'createdAt'>) => {
    const newNote: UserNote = {
      ...note,
      id: 'note-' + Date.now(),
      createdAt: new Date().toLocaleDateString(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const addPracticeLog = (log: Omit<PracticeLog, 'id' | 'date'>) => {
    const newLog: PracticeLog = {
      ...log,
      id: 'log-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setPracticeLogs(prev => [newLog, ...prev]);
  };

  const saveExamResult = (score: number, total: number = 50) => {
    const percentage = Math.round((score / total) * 100);
    // User requested: Certificate is issued for any score upon completing the exam
    const passed = true;
    const result = {
      score,
      totalQuestions: total,
      percentage,
      passed,
      completedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    setExamResult(result);
  };

  const issueCertificate = (
    detailsOrName?: { 
      studentName?: string; 
      fatherName?: string; 
      dob?: string; 
      age?: string; 
      photoUrl?: string; 
      academyName?: string 
    } | string,
    fatherNameArg?: string,
    dobArg?: string,
    ageArg?: string,
    photoUrlArg?: string
  ) => {
    let name = studentProfile.fullName || 'Valued Spa Trainee';
    let father = studentProfile.fatherName || '';
    let dob = studentProfile.dob || '';
    let age = studentProfile.age || '';
    let photo = studentProfile.photoUrl || '';
    let academy = studentProfile.academyName || 'Spa Hub International Wellness Academy';

    if (typeof detailsOrName === 'string') {
      if (detailsOrName.trim()) name = detailsOrName.trim();
      if (fatherNameArg?.trim()) father = fatherNameArg.trim();
      if (dobArg) dob = dobArg;
      if (ageArg) age = ageArg;
      if (photoUrlArg) photo = photoUrlArg;
    } else if (detailsOrName && typeof detailsOrName === 'object') {
      if (detailsOrName.studentName?.trim()) name = detailsOrName.studentName.trim();
      if (detailsOrName.fatherName?.trim()) father = detailsOrName.fatherName.trim();
      if (detailsOrName.dob) dob = detailsOrName.dob;
      if (detailsOrName.age) age = detailsOrName.age;
      if (detailsOrName.photoUrl) photo = detailsOrName.photoUrl;
      if (detailsOrName.academyName) academy = detailsOrName.academyName;
    }

    const score = examResult ? examResult.score : 48;
    const totalQ = examResult ? examResult.totalQuestions : 50;
    const percentage = examResult ? examResult.percentage : Math.round((score / totalQ) * 100);

    const cert: CertificateData = {
      studentName: name,
      fatherName: father,
      dob: dob,
      age: age,
      photoUrl: photo,
      completionDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      certificateId: 'SPAHUB-' + Math.floor(100000 + Math.random() * 900000),
      score: score,
      totalQuestions: totalQ,
      percentage: percentage,
      instructorName: 'Elena Roy, CIDESCO & Master Somchai Prakan',
      academyName: academy,
      verificationCode: 'VERIFIED-CIDESCO-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    };
    setCertificate(cert);
  };

  const addMediaItem = async (item: Omit<MediaVaultItem, 'id' | 'createdAt'>) => {
    const newItem: MediaVaultItem = {
      ...item,
      id: 'media-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
    };
    await saveMediaItem(newItem);
    await refreshMediaItems();
  };

  const removeMediaItem = async (id: string) => {
    await deleteMediaItem(id);
    await refreshMediaItems();
  };

  const resetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset your course progress, notes, and quiz results?')) {
      setCompletedChapters([]);
      setCompletedVideos([]);
      setChapterQuizScores({});
      setBookmarks([]);
      setNotes([]);
      setPracticeLogs([]);
      setExamResult(null);
      setCertificate(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Calculate weighted total progress across 11 chapters and certification exam
  const chapterProgress = chaptersData.length > 0 ? (completedChapters.length / chaptersData.length) * 70 : 0;
  const examProgress = examResult ? 30 : 0;
  const totalProgressPercentage = Math.min(100, Math.round(chapterProgress + examProgress));

  return (
    <CourseContext.Provider
      value={{
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        selectedChapterId,
        setSelectedChapterId,
        selectedVideoId,
        setSelectedVideoId,
        completedChapters,
        toggleChapterComplete,
        completedVideos,
        toggleVideoComplete,
        chapterQuizScores,
        saveChapterQuizScore,
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        notes,
        addNote,
        deleteNote,
        practiceLogs,
        addPracticeLog,
        studentProfile,
        updateStudentProfile,
        examResult,
        saveExamResult,
        certificate,
        issueCertificate,
        mediaItems,
        addMediaItem,
        removeMediaItem,
        refreshMediaItems,
        readingTheme,
        setReadingTheme,
        fontSize,
        setFontSize,
        searchQuery,
        setSearchQuery,
        isGlossaryOpen,
        setIsGlossaryOpen,
        totalProgressPercentage,
        totalCourseProgress: totalProgressPercentage,
        resetAllProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
