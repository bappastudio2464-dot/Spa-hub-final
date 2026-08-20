export type Language = 'en' | 'hi';

export interface QuizQuestion {
  id: string;
  question: string;
  questionHi: string;
  options: string[];
  optionsHi: string[];
  correctIndex: number;
  explanation: string;
  explanationHi: string;
}

export interface TechniqueStep {
  stepNumber: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  handPosition: string;
  handPositionHi: string;
  pressureLevel: 'Gentle (1-2/5)' | 'Medium (3/5)' | 'Firm/Deep (4-5/5)';
  imageUrl?: string;
  imageCaption?: string;
  imageCaptionHi?: string;
  caution?: string;
  cautionHi?: string;
  tip?: string;
  tipHi?: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  titleHi: string;
  content: string;
  contentHi: string;
  imageUrl?: string;
  imageCaption?: string;
  imageCaptionHi?: string;
  techniques?: TechniqueStep[];
  bulletPoints?: { en: string; hi: string }[];
  keyTerms?: { term: string; meaning: string; meaningHi: string }[];
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  category: 'Fundamentals' | 'Massage Therapies' | 'Specialty Treatments' | 'Hygiene & Safety' | 'Business & Marketing';
  estimatedReadTime: string;
  summary: string;
  summaryHi: string;
  iconName: string;
  sections: ChapterSection[];
  quiz: QuizQuestion[];
  practicalAssignment: {
    title: string;
    titleHi: string;
    instructions: string[];
    instructionsHi: string[];
    timeRequired: string;
  };
}

export interface VideoTimestamp {
  time: string; // e.g. "02:15"
  seconds: number;
  label: string;
  labelHi: string;
  description: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  titleHi: string;
  category: 'Full Course Masterclass' | 'Swedish' | 'Deep Tissue' | 'Thai & Stretch' | 'Hot Stone' | 'Aromatherapy & Oils' | 'Facial & Head' | 'Reflexology' | 'Hygiene & Setup';
  duration: string;
  durationSeconds: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master Protocol';
  instructor: string;
  instructorRole: string;
  thumbnailGradient: string;
  previewAnimationType: 'effleurage' | 'kneading' | 'hotstone' | 'thai' | 'acupressure' | 'oils' | 'fullmasterclass';
  description: string;
  descriptionHi: string;
  keyTimestamps: VideoTimestamp[];
  practiceChecklist: { id: string; text: string; textHi: string }[];
  targetMuscles: string[];
  recommendedOils: string[];
  contraindications: string[];
  videoUrl?: string;
}

export interface PressurePoint {
  id: string;
  name: string;
  nameHi: string;
  sanskritOrTraditionalName?: string;
  bodyPart: 'Head & Neck' | 'Shoulders & Upper Back' | 'Lower Back & Glutes' | 'Arms & Hands' | 'Legs & Thighs' | 'Feet & Soles';
  view: 'front' | 'back';
  coordinates: { x: number; y: number }; // Percentage 0-100 on body map
  targetMuscles: string;
  pressureGrade: 'Light' | 'Medium' | 'Firm' | 'Variable';
  strokeType: string;
  benefits: string[];
  benefitsHi: string[];
  cautions: string;
  cautionsHi: string;
}

export interface EssentialOil {
  id: string;
  name: string;
  hindiName: string;
  botanicalName: string;
  scentProfile: string;
  therapeuticGrade: string;
  primaryBenefits: string[];
  primaryBenefitsHi: string[];
  blendingNotes: string;
  recommendedCarriers: string[];
  dilutionSafety: string;
  dilutionSafetyHi: string;
  contraindications: string[];
  contraindicationsHi: string[];
  color: string;
}

export interface Bookmark {
  id: string;
  chapterId: string;
  sectionId: string;
  chapterTitle: string;
  sectionTitle: string;
  createdAt: string;
}

export interface UserNote {
  id: string;
  referenceType: 'chapter' | 'video';
  referenceId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface PracticeLog {
  id: string;
  date: string;
  technique: string;
  durationMinutes: number;
  modelType: 'Training Dummy' | 'Volunteer/Friend' | 'Client' | 'Self-Stretching';
  notes: string;
  rating: number;
}

export type UserRole = 'admin' | 'student';
export type UserStatus = 'active' | 'pending' | 'blocked';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'referral_bonus' | 'admin_credit' | 'admin_debit' | 'admin_reset' | 'payout_withdrawal';
  amount: number;
  description: string;
  referredUserName?: string;
  referredUserPhone?: string;
  timestamp: string;
  date: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  amount: number;
  withdrawalType: 'upi' | 'bank' | 'qr';
  upiId?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  bankName?: string;
  qrCodeUrl?: string; // Base64 QR Image
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  adminNotes?: string;
}

export interface ApprovalPaymentRequest {
  id: string;
  referrerUserId: string;
  referrerName: string;
  referrerPhone: string;
  candidateName: string;
  candidatePhone: string;
  candidateReferralCode?: string;
  amount: number;
  utrNumber: string;
  screenshotUrl?: string; // Base64
  adminUpiId: string; // tathastuho@ptyes
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  adminNotes?: string;
}

export interface AppUser {
  id: string;
  phone: string;
  fullName: string;
  fatherName?: string;
  dob?: string;
  age?: string;
  gender?: string;
  role: UserRole;
  status: UserStatus;
  registeredAt: string;
  lastLoginAt: string;
  city?: string;
  photoUrl?: string;
  completedChaptersCount?: number;
  examPassed?: boolean;
  examScore?: number;
  notes?: string;
  
  // MLM & Wallet Integration
  referralCode: string;
  referredBy?: string; // Referral code or Phone of inviter
  walletBalance: number; // In Rupees (₹)
  totalEarned: number; // Total referral income (₹)
  totalReferralsCount: number;
  paymentStatus?: 'pending' | 'paid' | 'verified';
  upiId?: string;
  bankDetails?: string;
}

export interface StudentProfile {
  fullName: string;
  fatherName: string;
  dob: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  photoUrl: string;
  academyName: string;
  city: string;
}

export interface CertificateData {
  studentName: string;
  fatherName?: string;
  dob?: string;
  age?: string;
  photoUrl?: string;
  completionDate: string;
  certificateId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  instructorName: string;
  academyName: string;
  verificationCode: string;
}

export interface MediaVaultItem {
  id: string;
  title: string;
  description?: string;
  category: 'Swedish Practice' | 'Deep Tissue' | 'Hot Stone' | 'Thai Stretches' | 'Spa Room Setup' | 'Client Consultation' | 'Certificate & ID' | 'Chapter Photo' | 'General' | string;
  chapterId?: string;
  mediaType: 'image' | 'video';
  dataUrl: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
}

export interface GlossaryTerm {
  term: string;
  termHi: string;
  category: string;
  definition: string;
  definitionHi: string;
}
