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

export interface StudentProfile {
  fullName: string;
  fatherName: string;
  dob: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  photoUrl: string; // Base64 or Blob storage URL
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
  category: 'Swedish Practice' | 'Deep Tissue' | 'Hot Stone' | 'Thai Stretches' | 'Spa Room Setup' | 'Client Consultation' | 'Certificate & ID' | 'General';
  mediaType: 'image' | 'video';
  dataUrl: string; // Base64 data or object URL
  fileName: string;
  fileSize: number; // in bytes
  createdAt: string;
}

export interface GlossaryTerm {
  term: string;
  termHi: string;
  category: string;
  definition: string;
  definitionHi: string;
}


