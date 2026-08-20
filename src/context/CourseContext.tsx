import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Bookmark, 
  UserNote, 
  PracticeLog, 
  CertificateData, 
  Language, 
  StudentProfile, 
  MediaVaultItem, 
  AppUser, 
  UserRole, 
  UserStatus,
  WalletTransaction,
  WithdrawalRequest,
  ApprovalPaymentRequest
} from '../types';
import { chaptersData } from '../data/chaptersData';
import { getAllMediaItems, saveMediaItem, deleteMediaItem } from '../utils/mediaStorage';
import { 
  getCurrentSession, 
  setCurrentSession, 
  authenticateWithPhoneAndOtp, 
  getAllUsers, 
  updateUserStatusInDb, 
  updateUserRoleInDb, 
  deleteUserFromDb, 
  addOrUpdateUserFromAdmin,
  adjustUserWalletInDb,
  resetUserWalletToZero,
  getAllTransactions,
  getAllWithdrawals,
  getAllApprovalPaymentRequests,
  submitApprovalPaymentRequest,
  approvePaymentAndActivateCandidateInDb,
  requestPayoutFromWallet,
  processWithdrawalRequestInDb,
  MASTER_ADMIN_PHONE,
  ADMIN_UPI_ID,
  normalizePhone
} from '../utils/authStorage';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export type ActiveTabType = 'ebook' | 'referral' | 'anatomy' | 'aromatherapy' | 'practice' | 'exam' | 'vault' | 'glossary' | 'admin';

interface CourseContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  selectedChapterId: string;
  setSelectedChapterId: (id: string) => void;
  selectedVideoId: string | null;
  setSelectedVideoId: (id: string | null) => void;
  
  // Auth & Admin
  currentUser: AppUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loginWithPhoneOtp: (phone: string, otp: string, profileData?: any) => { 
    success: boolean; 
    message: string; 
    user?: AppUser; 
    requiresProfile?: boolean;
    pendingApproval?: boolean;
  };
  logout: () => void;
  usersList: AppUser[];
  refreshUsersList: () => void;
  approveUser: (userId: string) => { success: boolean; referralBonusCredited?: boolean; referrerName?: string };
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  deleteUser: (userId: string) => void;
  toggleUserRole: (userId: string) => void;
  addUserByAdmin: (user: Partial<AppUser> & { phone: string; fullName: string }) => AppUser;

  // MLM & Wallet State
  walletBalance: number;
  totalEarned: number;
  referralCode: string;
  myReferrals: AppUser[];
  walletTransactions: WalletTransaction[];
  withdrawalRequests: WithdrawalRequest[];
  approvalPaymentRequests: ApprovalPaymentRequest[];
  
  // Candidate activation payment
  submitApprovalPayment: (data: {
    candidateName: string;
    candidatePhone: string;
    amount: number;
    utrNumber: string;
    screenshotUrl?: string;
  }) => { success: boolean; message: string };
  adminApprovePaymentAndCandidate: (paymentId: string, notes?: string) => { success: boolean; candidateName?: string; bonusCredited?: boolean };
  
  // Payout request
  requestWithdrawal: (
    amount: number, 
    withdrawalType: 'upi' | 'bank' | 'qr', 
    details: {
      upiId?: string;
      accountHolderName?: string;
      accountNumber?: string;
      ifscCode?: string;
      bankName?: string;
      qrCodeUrl?: string;
    }
  ) => { success: boolean; message: string };
  adminAdjustWallet: (userId: string, change: number, reason: string, exactOverride?: number) => void;
  adminResetWalletToZero: (userId: string) => void;
  adminProcessWithdrawal: (requestId: string, status: 'approved' | 'rejected', notes?: string) => void;
  refreshWalletData: () => void;

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
  
  // Exam Result
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
  totalCourseProgress: number;
  resetAllProgress: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const STORAGE_KEY = 'spa_hub_training_state_v4';

const blankProfile: StudentProfile = {
  fullName: '',
  fatherName: '',
  dob: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  photoUrl: '',
  academyName: 'Spa Hub International Wellness Academy',
  city: '',
};

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hi');
  const [activeTab, setActiveTab] = useState<ActiveTabType>('ebook');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch-1');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => getCurrentSession());
  const [usersList, setUsersList] = useState<AppUser[]>(() => getAllUsers());
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => getAllTransactions());
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(() => getAllWithdrawals());
  const [approvalPaymentRequests, setApprovalPaymentRequests] = useState<ApprovalPaymentRequest[]>(() => getAllApprovalPaymentRequests());

  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [chapterQuizScores, setChapterQuizScores] = useState<Record<string, number>>({});
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>([]);
  
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(blankProfile);
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

  const isLoggedIn = !!currentUser && currentUser.status === 'active';
  const isAdmin = !!currentUser && (normalizePhone(currentUser.phone) === MASTER_ADMIN_PHONE || currentUser.role === 'admin');

  const refreshWalletData = () => {
    setWalletTransactions(getAllTransactions());
    setWithdrawalRequests(getAllWithdrawals());
    setApprovalPaymentRequests(getAllApprovalPaymentRequests());
    const list = getAllUsers();
    setUsersList(list);
    if (currentUser) {
      const freshUser = list.find(u => u.id === currentUser.id);
      if (freshUser) setCurrentUser(freshUser);
    }
  };

  const refreshUsersList = () => {
    const list = getAllUsers();
    setUsersList(list);
    if (currentUser) {
      const freshUser = list.find(u => u.id === currentUser.id);
      if (freshUser) setCurrentUser(freshUser);
    }
  };

  const refreshMediaItems = async () => {
    try {
      const items = await getAllMediaItems();
      setMediaItems(items);
    } catch (e) {
      console.error('Error loading media items', e);
    }
  };

  // Real-time Firestore Listeners
  useEffect(() => {
    if (!db) return;
    try {
      // Sync Users
      const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteUsers: AppUser[] = [];
          snapshot.forEach(doc => {
            remoteUsers.push(doc.data() as AppUser);
          });
          if (remoteUsers.length > 0) {
            setUsersList(remoteUsers);
            if (currentUser) {
              const fresh = remoteUsers.find(u => u.id === currentUser.id);
              if (fresh) setCurrentUser(fresh);
            }
          }
        }
      }, (err) => console.warn('Users online listener notice:', err));

      // Sync Payment Requests
      const unsubPayments = onSnapshot(collection(db, 'approvalPaymentRequests'), (snapshot) => {
        if (!snapshot.empty) {
          const list: ApprovalPaymentRequest[] = [];
          snapshot.forEach(doc => list.push(doc.data() as ApprovalPaymentRequest));
          setApprovalPaymentRequests(list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()));
        }
      }, (err) => console.warn('Payments listener notice:', err));

      // Sync Withdrawals
      const unsubWithdrawals = onSnapshot(collection(db, 'withdrawalRequests'), (snapshot) => {
        if (!snapshot.empty) {
          const list: WithdrawalRequest[] = [];
          snapshot.forEach(doc => list.push(doc.data() as WithdrawalRequest));
          setWithdrawalRequests(list);
        }
      }, (err) => console.warn('Withdrawals listener notice:', err));

      return () => {
        unsubUsers();
        unsubPayments();
        unsubWithdrawals();
      };
    } catch (e) {
      console.warn('Firestore real-time subscription error:', e);
    }
  }, [currentUser?.id]);

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
        if (parsed.studentProfile) setStudentProfile({ ...blankProfile, ...parsed.studentProfile });
        if (parsed.examResult) setExamResult(parsed.examResult);
        if (parsed.certificate) setCertificate(parsed.certificate);
        if (parsed.readingTheme) setReadingTheme(parsed.readingTheme);
        if (parsed.fontSize) setFontSize(parsed.fontSize);
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }

    const session = getCurrentSession();
    if (session) {
      setCurrentUser(session);
      if (normalizePhone(session.phone) === MASTER_ADMIN_PHONE) {
        setActiveTab('admin');
      }
      setStudentProfile(prev => ({
        ...prev,
        fullName: session.fullName || prev.fullName,
        fatherName: session.fatherName || prev.fatherName,
        dob: session.dob || prev.dob,
        age: session.age || prev.age,
        phone: session.phone || prev.phone,
      }));
    }

    refreshMediaItems();
    refreshUsersList();
    refreshWalletData();
  }, []);

  // Save state to local storage
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

  // Auth methods
  const loginWithPhoneOtp = (phone: string, otp: string, profileData?: any) => {
    const res = authenticateWithPhoneAndOtp(phone, otp, profileData);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setStudentProfile(prev => ({
        ...prev,
        fullName: res.user!.fullName || prev.fullName,
        fatherName: res.user!.fatherName || prev.fatherName,
        dob: res.user!.dob || prev.dob,
        age: res.user!.age || prev.age,
        phone: res.user!.phone || prev.phone,
      }));
      refreshUsersList();
      refreshWalletData();
      if (normalizePhone(res.user.phone) === MASTER_ADMIN_PHONE || res.user.role === 'admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('ebook');
      }
    }
    return res;
  };

  const logout = () => {
    setCurrentSession(null);
    setCurrentUser(null);
    setActiveTab('ebook');
  };

  const approveUser = (userId: string) => {
    const res = updateUserStatusInDb(userId, 'active');
    refreshUsersList();
    refreshWalletData();
    return res;
  };

  const blockUser = (userId: string) => {
    updateUserStatusInDb(userId, 'blocked');
    refreshUsersList();
    refreshWalletData();
  };

  const unblockUser = (userId: string) => {
    updateUserStatusInDb(userId, 'active');
    refreshUsersList();
    refreshWalletData();
  };

  const deleteUser = (userId: string) => {
    deleteUserFromDb(userId);
    refreshUsersList();
    refreshWalletData();
  };

  const toggleUserRole = (userId: string) => {
    const target = usersList.find(u => u.id === userId);
    if (!target) return;
    const newRole: UserRole = target.role === 'admin' ? 'student' : 'admin';
    updateUserRoleInDb(userId, newRole);
    refreshUsersList();
  };

  const addUserByAdmin = (user: Partial<AppUser> & { phone: string; fullName: string }) => {
    const created = addOrUpdateUserFromAdmin(user);
    refreshUsersList();
    refreshWalletData();
    return created;
  };

  // Submit payment screenshot & UTR for candidate activation
  const submitApprovalPayment = (data: {
    candidateName: string;
    candidatePhone: string;
    amount: number;
    utrNumber: string;
    screenshotUrl?: string;
  }) => {
    if (!currentUser) return { success: false, message: 'कृपया पहले लॉगिन करें।' };
    const res = submitApprovalPaymentRequest({
      referrerUserId: currentUser.id,
      referrerName: currentUser.fullName,
      referrerPhone: currentUser.phone,
      candidateName: data.candidateName,
      candidatePhone: data.candidatePhone,
      amount: data.amount,
      utrNumber: data.utrNumber,
      screenshotUrl: data.screenshotUrl,
    });
    refreshWalletData();
    return res;
  };

  const adminApprovePaymentAndCandidate = (paymentId: string, notes?: string) => {
    const res = approvePaymentAndActivateCandidateInDb(paymentId, notes);
    refreshUsersList();
    refreshWalletData();
    return res;
  };

  // Wallet and MLM operations
  const adminAdjustWallet = (userId: string, change: number, reason: string, exactOverride?: number) => {
    adjustUserWalletInDb(userId, change, reason, exactOverride);
    refreshUsersList();
    refreshWalletData();
  };

  const adminResetWalletToZero = (userId: string) => {
    resetUserWalletToZero(userId);
    refreshUsersList();
    refreshWalletData();
  };

  const requestWithdrawal = (
    amount: number, 
    withdrawalType: 'upi' | 'bank' | 'qr', 
    details: {
      upiId?: string;
      accountHolderName?: string;
      accountNumber?: string;
      ifscCode?: string;
      bankName?: string;
      qrCodeUrl?: string;
    }
  ) => {
    if (!currentUser) return { success: false, message: 'कृपया पहले लॉगिन करें।' };
    const res = requestPayoutFromWallet(currentUser.id, amount, withdrawalType, details);
    refreshUsersList();
    refreshWalletData();
    return res;
  };

  const adminProcessWithdrawal = (requestId: string, status: 'approved' | 'rejected', notes?: string) => {
    processWithdrawalRequestInDb(requestId, status, notes);
    refreshUsersList();
    refreshWalletData();
  };

  const updateStudentProfile = (profile: Partial<StudentProfile>) => {
    setStudentProfile(prev => {
      const updated = { ...prev, ...profile };
      if (currentUser) {
        const syncedUser: AppUser = {
          ...currentUser,
          fullName: updated.fullName || currentUser.fullName,
          fatherName: updated.fatherName || currentUser.fatherName,
          dob: updated.dob || currentUser.dob,
          age: updated.age || currentUser.age,
          photoUrl: updated.photoUrl || currentUser.photoUrl,
        };
        addOrUpdateUserFromAdmin(syncedUser);
        setCurrentUser(syncedUser);
        setCurrentSession(syncedUser);
      }
      return updated;
    });
  };

  const toggleChapterComplete = (id: string) => {
    setCompletedChapters(prev => {
      const updated = prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id];
      if (currentUser) {
        addOrUpdateUserFromAdmin({
          ...currentUser,
          completedChaptersCount: updated.length,
        });
      }
      return updated;
    });
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
    const passed = true;
    const result = {
      score,
      totalQuestions: total,
      percentage,
      passed,
      completedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    setExamResult(result);
    if (currentUser) {
      addOrUpdateUserFromAdmin({
        ...currentUser,
        examPassed: true,
        examScore: score,
      });
    }
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
    let name = studentProfile.fullName || currentUser?.fullName || 'Certified Spa Therapist';
    let father = studentProfile.fatherName || currentUser?.fatherName || '';
    let dob = studentProfile.dob || currentUser?.dob || '';
    let age = studentProfile.age || currentUser?.age || '';
    let photo = studentProfile.photoUrl || currentUser?.photoUrl || '';
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

  // User's referral network
  const myReferrals = currentUser
    ? usersList.filter(u => 
        u.referredBy && (
          u.referredBy.toUpperCase() === (currentUser.referralCode || '').toUpperCase() ||
          normalizePhone(u.referredBy) === normalizePhone(currentUser.phone)
        )
      )
    : [];

  const walletBalance = currentUser?.walletBalance || 0;
  const totalEarned = currentUser?.totalEarned || 0;
  const referralCode = currentUser?.referralCode || (currentUser ? `SPA${normalizePhone(currentUser.phone).slice(-4)}` : '');

  const userTransactions = currentUser
    ? walletTransactions.filter(t => t.userId === currentUser.id)
    : [];

  // Calculate weighted total progress
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
        
        currentUser,
        isLoggedIn,
        isAdmin,
        loginWithPhoneOtp,
        logout,
        usersList,
        refreshUsersList,
        approveUser,
        blockUser,
        unblockUser,
        deleteUser,
        toggleUserRole,
        addUserByAdmin,

        // MLM & Wallet
        walletBalance,
        totalEarned,
        referralCode,
        myReferrals,
        walletTransactions: userTransactions,
        withdrawalRequests,
        approvalPaymentRequests,
        submitApprovalPayment,
        adminApprovePaymentAndCandidate,
        requestWithdrawal,
        adminAdjustWallet,
        adminResetWalletToZero,
        adminProcessWithdrawal,
        refreshWalletData,

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
