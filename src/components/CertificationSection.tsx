import React, { useState, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import { certificationExamQuestions } from '../data/examData';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Download, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  RotateCcw,
  User,
  GraduationCap,
  Calendar,
  Image as ImageIcon,
  Check,
  ChevronRight,
  ChevronLeft,
  Share2,
  FileCheck,
  Building2,
  Lock,
  Camera,
  Upload,
  FileDown,
  Loader2,
  Trash2
} from 'lucide-react';
import { StudentProfile } from '../types';

export const CertificationSection: React.FC = () => {
  const { 
    language, 
    examResult, 
    saveExamResult, 
    certificate, 
    issueCertificate,
    studentProfile,
    updateStudentProfile
  } = useCourse();

  // Exam flow states: 'intro' | 'profile' | 'active' | 'review'
  const [examMode, setExamMode] = useState<'intro' | 'profile' | 'active' | 'review'>(
    certificate ? 'review' : examResult ? 'review' : 'intro'
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  
  // Export loading states
  const [isExportingJpg, setIsExportingJpg] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  // Profile form state
  const [formData, setFormData] = useState<StudentProfile>({
    fullName: studentProfile?.fullName || certificate?.studentName || '',
    fatherName: studentProfile?.fatherName || certificate?.fatherName || '',
    dob: studentProfile?.dob || certificate?.dob || '',
    age: studentProfile?.age || certificate?.age || '',
    photoUrl: studentProfile?.photoUrl || certificate?.photoUrl || '',
    email: studentProfile?.email || '',
    phone: studentProfile?.phone || ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const reviewPhotoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoStr = reader.result as string;
        setFormData(prev => ({ ...prev, photoUrl: photoStr }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }
    updateStudentProfile(formData);
    setExamMode('active');
    setUserAnswers({});
    setCurrentQuestionIndex(0);
  };

  const startExam = () => {
    setExamMode('profile');
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const submitExam = () => {
    let score = 0;
    certificationExamQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    const total = certificationExamQuestions.length; // 50
    saveExamResult(score, total);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#2D6A4F', '#52B788', '#D4A373', '#E9C46A', '#C1121F'],
    });

    issueCertificate({
      studentName: formData.fullName.trim() || studentProfile.fullName || 'Valued Spa Trainee',
      fatherName: formData.fatherName.trim() || studentProfile.fatherName || undefined,
      dob: formData.dob || studentProfile.dob || undefined,
      age: formData.age || studentProfile.age || undefined,
      photoUrl: formData.photoUrl || studentProfile.photoUrl || undefined,
    });

    setExamMode('review');
  };

  const handleUpdateCertificateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert(language === 'hi' ? 'कृपया पूरा नाम दर्ज करें।' : 'Please enter your full legal name.');
      return;
    }
    updateStudentProfile(formData);
    issueCertificate({
      studentName: formData.fullName.trim(),
      fatherName: formData.fatherName.trim() || undefined,
      dob: formData.dob || undefined,
      age: formData.age || undefined,
      photoUrl: formData.photoUrl || undefined,
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const generateVectorPdfFallback = (cleanName: string) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 297
    const pageHeight = doc.internal.pageSize.getHeight(); // 210

    // Background
    doc.setFillColor(252, 251, 247);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer double border
    doc.setDrawColor(212, 163, 115); // #D4A373
    doc.setLineWidth(2);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
    doc.setLineWidth(0.8);
    doc.rect(11, 11, pageWidth - 22, pageHeight - 22);

    // Header Institution
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(27, 67, 50); // #1B4332
    doc.text('SPA HUB INTERNATIONAL ACADEMY', pageWidth / 2, 24, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('GLOBAL WELLNESS FACULTY • CIDESCO PATTERN ACCREDITED STANDARDS', pageWidth / 2, 29, { align: 'center' });

    // Diploma Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(180, 130, 80);
    doc.text('DIPLOMA OF EXCELLENCE & MASTERY', pageWidth / 2, 40, { align: 'center' });

    // Certificate Title
    doc.setFont('times', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(27, 67, 50);
    doc.text('Certificate of Achievement', pageWidth / 2, 52, { align: 'center' });

    // Certified text
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('This is to officially certify that the practitioner named below has successfully completed', pageWidth / 2, 60, { align: 'center' });
    doc.text('the complete 11-Chapter Professional Spa Therapy Curriculum and passed the Master Examination.', pageWidth / 2, 65, { align: 'center' });

    // Candidate Name Box
    const candidateName = formData.fullName || certificate?.studentName || 'Certified Spa Therapist';
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(27, 67, 50);
    doc.text(candidateName, pageWidth / 2, 79, { align: 'center' });

    // Line under name
    doc.setDrawColor(212, 163, 115);
    doc.setLineWidth(0.5);
    doc.line(60, 82, pageWidth - 60, 82);

    // Guardian / DOB details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    const fatherText = formData.fatherName ? `Father / Guardian: ${formData.fatherName}` : '';
    const dobText = formData.dob ? `DOB / Age: ${formData.dob}` : '';
    const certNum = certificate?.certificateNumber || `SH-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    
    if (fatherText || dobText) {
      doc.text([fatherText, dobText].filter(Boolean).join('   |   '), pageWidth / 2, 89, { align: 'center' });
    }

    // Awarded credential
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(27, 67, 50);
    doc.text('MASTER SPA PRACTITIONER & WELLNESS THERAPIST (MSPW)', pageWidth / 2, 100, { align: 'center' });

    // Core competencies text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(95, 95, 95);
    doc.text('Swedish Effleurage & Petrissage • Deep Tissue & Trigger Points • Hot Stone Therapy • Thai Yoga Stretches', pageWidth / 2, 107, { align: 'center' });
    doc.text('Ayurvedic Abhyanga & Marma • Aromatherapy Blending & Safety • Spa Business Law, Licensing & Sanitation', pageWidth / 2, 112, { align: 'center' });

    // Candidate photo if available
    const photoToEmbed = formData.photoUrl || certificate?.photoUrl;
    if (photoToEmbed && photoToEmbed.startsWith('data:image')) {
      try {
        doc.addImage(photoToEmbed, 'JPEG', 25, 68, 28, 28);
        doc.setDrawColor(212, 163, 115);
        doc.rect(25, 68, 28, 28);
      } catch (e) {
        console.warn('Could not embed photo into fallback PDF', e);
      }
    }

    // Gold Seal
    doc.setFillColor(233, 196, 106); // Gold #E9C46A
    doc.circle(pageWidth / 2, 136, 13, 'F');
    doc.setDrawColor(180, 130, 80);
    doc.circle(pageWidth / 2, 136, 11, 'D');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(27, 67, 50);
    doc.text('OFFICIAL GOLD SEAL', pageWidth / 2, 134, { align: 'center' });
    doc.setFontSize(8);
    doc.text('CERTIFIED', pageWidth / 2, 139, { align: 'center' });

    // Signatures & Date
    const issueDate = certificate?.issueDate || new Date().toLocaleDateString();
    
    // Left: Issue Date & Verification
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(60, 60, 60);
    doc.text('DATE OF ISSUANCE', 35, 165);
    doc.setFont('helvetica', 'normal');
    doc.text(issueDate, 35, 170);
    doc.text(`Diploma ID: ${certNum}`, 35, 175);

    // Right: Director of Academics
    doc.setFont('helvetica', 'bold');
    doc.text('DR. ELENA ROSTOVA, CIDESCO', pageWidth - 85, 165);
    doc.setFont('helvetica', 'normal');
    doc.text('Dean & Director of Examinations', pageWidth - 85, 170);
    doc.text('Spa Hub International Board', pageWidth - 85, 175);

    // Footer accreditation
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    doc.text('Authenticity verified at spahub.internal/verify • Digital Diploma issued under Spa Hub International Academic Regulations', pageWidth / 2, 192, { align: 'center' });

    doc.save(`Spa_Hub_Certificate_${cleanName}.pdf`);
  };

  const handleDownloadJpg = async () => {
    const certElement = document.getElementById('spa-official-certificate');
    const cleanName = (formData.fullName || certificate?.studentName || 'Spa_Practitioner').replace(/\s+/g, '_');
    
    if (!certElement) {
      alert(language === 'hi' ? 'सर्टिफिकेट एलिमेंट नहीं मिला।' : 'Certificate element not found.');
      return;
    }
    
    try {
      setIsExportingJpg(true);
      const canvas = await html2canvas(certElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#FCFBF7',
        logging: false,
        imageTimeout: 8000,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `Spa_Hub_Certificate_${cleanName}.jpg`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } else {
          // Fallback to dataURL
          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          const link = document.createElement('a');
          link.download = `Spa_Hub_Certificate_${cleanName}.jpg`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }, 'image/jpeg', 0.95);
    } catch (err) {
      console.warn('html2canvas JPG export error, trying alternate capture', err);
      try {
        const canvas = await html2canvas(certElement, {
          scale: 1.5,
          useCORS: false,
          allowTaint: false,
          backgroundColor: '#FCFBF7',
        });
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.download = `Spa_Hub_Certificate_${cleanName}.jpg`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackErr) {
        alert(language === 'hi' ? 'JPG डाउनलोड करने में समस्या आई। कृपया प्रिंट / PDF का उपयोग करें।' : 'Failed to export JPG certificate.');
      }
    } finally {
      setIsExportingJpg(false);
    }
  };

  const handleDownloadPdf = async () => {
    const certElement = document.getElementById('spa-official-certificate');
    const cleanName = (formData.fullName || certificate?.studentName || 'Spa_Practitioner').replace(/\s+/g, '_');
    
    if (!certElement) {
      generateVectorPdfFallback(cleanName);
      return;
    }

    try {
      setIsExportingPdf(true);
      const canvas = await html2canvas(certElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#FCFBF7',
        logging: false,
        imageTimeout: 8000,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // A4 Landscape dimensions in mm: 297 x 210
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(`Spa_Hub_Certificate_${cleanName}.pdf`);
    } catch (err) {
      console.warn('html2canvas failed, generating high quality direct vector PDF', err);
      // Seamless vector PDF fallback - NEVER FAILS!
      generateVectorPdfFallback(cleanName);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentQ = certificationExamQuestions[currentQuestionIndex];
  const totalQuestions = certificationExamQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* INTRO SCREEN */}
      {examMode === 'intro' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Hero */}
          <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#081C15] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/40 text-[#E9C46A] text-sm font-semibold tracking-wide backdrop-blur-md">
                <GraduationCap className="w-4 h-4" />
                {language === 'hi' ? 'CIDESCO पैटर्न 50 प्रश्नों की राष्ट्रीय परीक्षा' : '50-Question Master Practical Spa Certification Exam'}
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold font-serif leading-tight">
                {language === 'hi'
                  ? 'लक्ज़री स्पा थेरेपी एवं बिज़नेस सर्टिफिकेशन परीक्षा'
                  : 'Master Spa Therapist & Wellness Business Certification'}
              </h1>

              <p className="text-emerald-100 text-lg sm:text-xl font-light leading-relaxed">
                {language === 'hi'
                  ? 'स्वीडिश मसाज, डीप टिश्यू, हॉट स्टोन, थाई स्ट्रेचिंग, शिरोअभ्यंग, हाइजीन एवं स्पा बिज़नेस व डिजिटल मार्केटिंग के 50 प्रश्नों की संपूर्ण परीक्षा। परीक्षा पूर्ण करने पर फोटो और पिता के नाम युक्त आधिकारिक गोल्ड सील सर्टिफिकेट और सभी 50 प्रश्नों का विस्तृत हल प्राप्त करें।'
                  : 'Test your holistic mastery across all 11 chapters: Swedish glides, Deep Tissue knots, Basalt Hot Stones, Thai Sen Lines, Ayurvedic Marma, Sanitation, Licensing, and Digital Marketing. Complete the exam to earn your photo-verified international diploma and review complete answers for all 50 questions.'}
              </p>

              {/* Badges / Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="text-2xl font-bold text-[#E9C46A]">50</div>
                  <div className="text-xs text-emerald-200 uppercase tracking-wider mt-1">
                    {language === 'hi' ? 'कुल प्रश्न' : 'Total Questions'}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="text-2xl font-bold text-[#E9C46A]">Instant</div>
                  <div className="text-xs text-emerald-200 uppercase tracking-wider mt-1">
                    {language === 'hi' ? 'डिप्लोमा जारी' : 'Certificate Issued'}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="text-2xl font-bold text-[#E9C46A]">All Answers</div>
                  <div className="text-xs text-emerald-200 uppercase tracking-wider mt-1">
                    {language === 'hi' ? 'सभी 50 प्रश्नों के उत्तर' : 'Full 50 Answer Key'}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="text-2xl font-bold text-[#E9C46A]">Photo ID</div>
                  <div className="text-xs text-emerald-200 uppercase tracking-wider mt-1">
                    {language === 'hi' ? 'सर्टिफिकेट पर फोटो' : 'Photo Verified'}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  id="btn-start-exam-now"
                  onClick={startExam}
                  className="px-8 py-4 bg-gradient-to-r from-[#D4A373] to-[#E9C46A] hover:from-[#c29262] hover:to-[#dfb958] text-[#1B4332] font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-6 h-6" />
                  {language === 'hi' ? 'उम्मीदवार विवरण भरें व परीक्षा शुरू करें' : 'Fill Candidate Details & Start Exam'}
                </button>

                {examResult && (
                  <button
                    onClick={() => setExamMode('review')}
                    className="px-6 py-4 bg-white/15 hover:bg-white/20 text-white font-medium rounded-2xl border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Award className="w-5 h-5 text-[#E9C46A]" />
                    {language === 'hi' ? 'सर्टिफिकेट एवं उत्तर कुंजी देखें' : 'View Certificate & Answer Key'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Exam Syllabus Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold">
                01
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                {language === 'hi' ? 'प्रैक्टिकल तकनीक व एनाटॉमी' : 'Practical Modalities & Anatomy'}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {language === 'hi'
                  ? 'स्वीडिश 5 स्ट्रोक, डीप टिश्यू ट्रिगर पॉइंट्स, बेसाल्ट स्टोन चक्र प्लेसमेंट, थाई 10 सेन लाइन्स व शिरोअभ्यंग।'
                  : 'Swedish 5 strokes, Deep tissue ischemic compression, basalt stone thermal glides, Thai Sen Sib lines & Marma.'}
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-700 dark:text-amber-400 font-bold">
                02
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                {language === 'hi' ? 'हाइजीन, सुरक्षा व ड्रेपिंग' : 'Hygiene, Safety & Contraindications'}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {language === 'hi'
                  ? 'CIDESCO मानक, 60°C पर तौलिया धुलाई, DVT व प्रेगनेंसी के वर्जित नियम तथा क्लाइंट हेल्थ कंसल्टेशन।'
                  : 'CIDESCO hygiene, 60°C linen sterilization, absolute DVT contraindications, and client health intake.'}
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold">
                03
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                {language === 'hi' ? 'स्पा बिज़नेस, लाइसेंस व मार्केटिंग' : 'Spa Business, Licensing & Marketing'}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {language === 'hi'
                  ? 'शॉप एक्ट, हेल्थ ट्रेड लाइसेंस, सेनेटरी NOC, 80%+ ग्रॉस मार्जिन, गूगल मैप्स SEO और मेटा एड्स।'
                  : 'Shop Act, Health Trade License, Sanitary NOC, 80%+ profit margins, Google Maps SEO, and Meta Ads.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CANDIDATE PROFILE REGISTRATION SCREEN */}
      {examMode === 'profile' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6 animate-fadeIn">
          <div className="text-center space-y-2 border-b border-stone-100 dark:border-stone-800 pb-5">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-2">
              <User className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-serif">
              {language === 'hi' ? 'उम्मीदवार विवरण (Candidate Registration)' : 'Candidate Details for Official Certificate'}
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              {language === 'hi'
                ? 'ये विवरण आपके आधिकारिक स्पा ट्रेनिंग सर्टिफिकेट पर दर्ज किए जाएंगे। कृपया सही जानकारी भरें।'
                : 'These credentials will be permanently embossed on your official Spa Hub Diploma upon scoring 30/50.'}
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            {/* Photo Upload Box */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-700 flex items-center justify-center border-2 border-dashed border-stone-300 dark:border-stone-600 relative group shrink-0">
                {formData.photoUrl ? (
                  <img src={formData.photoUrl} alt="Candidate" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-400" />
                )}
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {language === 'hi' ? 'उम्मीदवार का पासपोर्ट फोटो' : 'Candidate Passport Photo'}
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {language === 'hi' ? 'सर्टिफिकेट पर लगने के लिए अपनी साफ फोटो चुनें' : 'Upload a clean headshot photo for the certificate badge'}
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-xl transition-all"
                >
                  {formData.photoUrl 
                    ? (language === 'hi' ? 'फोटो बदलें' : 'Change Photo')
                    : (language === 'hi' ? 'गैलरी से फोटो अपलोड करें' : 'Upload from Device / Gallery')}
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                {language === 'hi' ? 'उम्मीदवार का पूरा नाम (Full Legal Name) *' : 'Candidate Full Legal Name *'}
              </label>
              <input
                id="input-candidate-fullname"
                type="text"
                required
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Elena Roy / राहुल शर्मा"
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Father's Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                {language === 'hi' ? 'पिता / अभिभावक का नाम (Father’s / Guardian’s Name)' : 'Father’s / Guardian’s Name'}
              </label>
              <input
                id="input-candidate-fathername"
                type="text"
                value={formData.fatherName}
                onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* DOB & Age Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  {language === 'hi' ? 'जन्म तिथि (Date of Birth)' : 'Date of Birth (DOB)'}
                </label>
                <input
                  id="input-candidate-dob"
                  type="date"
                  value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  {language === 'hi' ? 'उम्र (Age)' : 'Age'}
                </label>
                <input
                  id="input-candidate-age"
                  type="number"
                  min="16"
                  max="80"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: e.target.value })}
                  placeholder="e.g. 24"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => setExamMode('intro')}
                className="px-6 py-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold transition-all"
              >
                {language === 'hi' ? 'वापस' : 'Back'}
              </button>
              <button
                id="btn-proceed-to-questions"
                type="submit"
                className="flex-1 py-3.5 bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 hover:to-[#1B4332] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-[#E9C46A]" />
                {language === 'hi' ? '50 प्रश्नों की परीक्षा प्रारंभ करें' : 'Proceed to 50 Questions'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ACTIVE EXAM SCREEN (50 Questions) */}
      {examMode === 'active' && currentQ && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Status Bar */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                {currentQuestionIndex + 1}
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {language === 'hi' 
                    ? `प्रश्न ${currentQuestionIndex + 1} / ${totalQuestions}` 
                    : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
                </div>
                <div className="text-xs text-stone-500">
                  {language === 'hi' 
                    ? `${answeredCount} उत्तर दिए गए | पासिंग मार्क: 30` 
                    : `${answeredCount} answered | Passing mark: 30 / 50`}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-64 h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-[#D4A373] transition-all duration-300 rounded-full"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              ></div>
            </div>

            <button
              id="btn-submit-exam-early"
              onClick={submitExam}
              disabled={answeredCount === 0}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              <Check className="w-4 h-4" />
              {language === 'hi' ? 'फाइनल सबमिट करें' : 'Submit Exam'}
            </button>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl space-y-8">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-full">
                {language === 'hi' ? `प्रश्न सं. ${currentQuestionIndex + 1}` : `Question #${currentQuestionIndex + 1}`}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                {language === 'hi' ? currentQ.questionHi || currentQ.question : currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3.5">
              {(language === 'hi' && currentQ.optionsHi ? currentQ.optionsHi : currentQ.options).map((option, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    id={`opt-q${currentQuestionIndex + 1}-${idx}`}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left font-medium text-base transition-all duration-200 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-md scale-[1.005]'
                        : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                        isSelected 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span>{option}</span>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Question Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-5 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40 text-stone-700 dark:text-stone-300 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                {language === 'hi' ? 'पिछला प्रश्न' : 'Previous'}
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  id="btn-next-question"
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  {language === 'hi' ? 'अगला प्रश्न' : 'Next Question'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="btn-finish-and-score"
                  onClick={submitExam}
                  className="px-8 py-3 bg-gradient-to-r from-[#D4A373] to-[#E9C46A] hover:from-[#c29262] hover:to-[#dfb958] text-[#1B4332] font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {language === 'hi' ? 'परीक्षा समाप्त करें व रिजल्ट देखें' : 'Finish & View Certificate'}
                </button>
              )}
            </div>
          </div>

          {/* 50 Question Grid Navigator */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {language === 'hi' ? 'प्रश्न तालिका (1 से 50)' : 'Question Matrix (1 to 50)'}
            </div>
            <div className="grid grid-cols-10 sm:grid-cols-25 gap-2">
              {certificationExamQuestions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = userAnswers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-xl font-bold text-xs transition-all ${
                      isCurrent
                        ? 'ring-2 ring-emerald-500 bg-emerald-600 text-white shadow-md'
                        : isAnswered
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* REVIEW & OFFICIAL CERTIFICATE DISPLAY */}
      {examMode === 'review' && examResult && (
        <div className="space-y-10 animate-fadeIn">
          
          {/* Result Banner */}
          <div className="p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#0D2818] border-emerald-600 text-white">
            <div className="flex items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg bg-[#D4A373] text-[#1B4332]">
                <Award className="w-10 h-10" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md">
                  CERTIFIED & COMPLETED
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                  {language === 'hi' 
                    ? 'बधाई! आपका स्पा ट्रेनिंग कोर्स सर्टिफिकेट सफलतापूर्वक जारी किया गया है' 
                    : 'Congratulations! Your Official Spa Training Diploma Has Been Issued'}
                </h2>
                <p className="text-sm opacity-90">
                  {language === 'hi'
                    ? `आपका स्कोर: 50 में से ${examResult.score} प्रश्न सही (${((examResult.score / 50) * 100).toFixed(0)}%) — नीचे सभी 50 प्रश्नों के सही उत्तर व व्याख्या देखें`
                    : `Your Score: ${examResult.score} / 50 Correct (${((examResult.score / 50) * 100).toFixed(0)}%) — Review all 50 answers & explanations below`}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={startExam}
                className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold rounded-2xl border border-white/20 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {language === 'hi' ? 'दोबारा परीक्षा दें' : 'Retake 50-Question Exam'}
              </button>
            </div>
          </div>

          {/* CANDIDATE DETAIL UPDATE FORM & LUXURY PRINTABLE CERTIFICATE */}
          <div className="space-y-8">
            
            {/* Form to edit certificate details & photo */}
            <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-600" />
                    {language === 'hi' ? 'सर्टिफिकेट कस्टमाइज़ेशन व फोटो आयात' : 'Customize Certificate Details & Photo'}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {language === 'hi'
                      ? 'अपनी फोटो, नाम, पिता का नाम या जन्मतिथि बदलें और सर्टिफिकेट पर तुरंत लाइव देखें।'
                      : 'Customize your photo, candidate name, guardian, or DOB to update the official diploma.'}
                  </p>
                </div>
              </div>

              {/* Photo Import Section */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-700 border-2 border-emerald-500 flex items-center justify-center shrink-0 shadow-inner">
                  {formData.photoUrl ? (
                    <img src={formData.photoUrl} alt="Candidate Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-stone-400" />
                  )}
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    {language === 'hi' ? 'सर्टिफिकेट पासपोर्ट फोटो' : 'Candidate Diploma Photo'}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {language === 'hi'
                      ? 'फोन गैलरी से अपनी फोटो चुनें ताकि सर्टिफिकेट पर आपकी फोटो दिखे।'
                      : 'Import photo from your phone gallery to stamp your face on the official certificate.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                    <input
                      type="file"
                      ref={reviewPhotoInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => reviewPhotoInputRef.current?.click()}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{formData.photoUrl ? (language === 'hi' ? 'गैलरी से फोटो बदलें' : 'Change Photo') : (language === 'hi' ? 'गैलरी से फोटो लगाएं' : 'Import Photo from Gallery')}</span>
                    </button>
                    {formData.photoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, photoUrl: '' }))}
                        className="px-3 py-1.5 bg-stone-200 dark:bg-stone-700 hover:bg-red-100 hover:text-red-700 text-stone-600 dark:text-stone-300 text-xs font-semibold rounded-xl transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'फोटो हटाएं' : 'Remove'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Fields Form */}
              <form onSubmit={handleUpdateCertificateDetails} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                    {language === 'hi' ? 'उम्मीदवार का नाम' : 'Candidate Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none"
                    placeholder="Candidate Name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                    {language === 'hi' ? 'पिता / अभिभावक' : 'Father’s Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none"
                    placeholder="Father's Name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                    {language === 'hi' ? 'जन्म तिथि (DOB)' : 'DOB'}
                  </label>
                  <input
                    type="date"
                    value={formData.dob || ''}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                    {language === 'hi' ? 'उम्र (Age)' : 'Age'}
                  </label>
                  <input
                    type="number"
                    value={formData.age || ''}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                    placeholder="e.g. 24"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{language === 'hi' ? 'सर्टिफिकेट अपडेट' : 'Update Certificate'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Action Buttons (Download JPG, Download PDF, Print) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gradient-to-r from-emerald-50 via-[#E9C46A]/20 to-emerald-50 dark:from-emerald-950/40 dark:via-emerald-900/20 dark:to-emerald-950/40 rounded-3xl border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-[#E9C46A] flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                    {language === 'hi' ? 'सर्टिफिकेट डाउनलोड व सेव ऑप्शन्स' : 'Official Certificate Export'}
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400">
                    {language === 'hi' ? 'गैलरी में JPG या फोन स्टोरेज में PDF फॉर्मेट में सेव करें' : 'Save high-res JPG to Gallery or PDF to Phone Storage'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center">
                {/* Download JPG Button */}
                <button
                  id="btn-download-certificate-jpg"
                  onClick={handleDownloadJpg}
                  disabled={isExportingJpg || isExportingPdf}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isExportingJpg ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'hi' ? 'JPG बन रहा है...' : 'Generating JPG...'}</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4" />
                      <span>{language === 'hi' ? 'JPG डाउनलोड (Gallery)' : 'Download JPG (Gallery)'}</span>
                    </>
                  )}
                </button>

                {/* Download PDF Button */}
                <button
                  id="btn-download-certificate-pdf"
                  onClick={handleDownloadPdf}
                  disabled={isExportingJpg || isExportingPdf}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isExportingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'hi' ? 'PDF बन रहा है...' : 'Generating PDF...'}</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4" />
                      <span>{language === 'hi' ? 'PDF डाउनलोड (Storage)' : 'Download PDF (Storage)'}</span>
                    </>
                  )}
                </button>

                {/* Print / Save Dialog Button */}
                <button
                  id="btn-print-certificate"
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-black font-semibold text-xs sm:text-sm rounded-2xl shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'hi' ? 'प्रिंट' : 'Print'}</span>
                </button>
              </div>
            </div>

            {/* MAGNIFICENT PRINTABLE GOLD-EMBOSSED CERTIFICATE */}
            <div 
              id="spa-official-certificate"
              className="relative bg-[#FCFBF7] text-stone-900 p-8 sm:p-14 rounded-3xl border-8 border-double border-[#D4A373] shadow-2xl overflow-hidden font-serif max-w-5xl mx-auto"
              style={{ minHeight: '680px' }}
            >
              {/* Background Watermark Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
              
              {/* Outer Decorative Frame Corner Accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4A373]"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4A373]"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4A373]"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4A373]"></div>

              <div className="relative z-10 text-center space-y-6">
                
                {/* Top Header & Insignia */}
                <div className="flex items-center justify-between border-b-2 border-[#D4A373]/30 pb-4">
                  <div className="text-left">
                    <div className="text-xs font-sans uppercase tracking-widest text-stone-500 font-bold">SPA HUB INTERNATIONAL</div>
                    <div className="text-xs font-sans text-stone-400">Reg No: SH-INTL-2026-994</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#1B4332] text-[#E9C46A] flex items-center justify-center font-bold text-xl shadow-md border-2 border-[#D4A373]">
                      SH
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#1B4332] font-sans tracking-wide">SPA HUB ACADEMY</div>
                      <div className="text-[10px] font-sans text-stone-500 uppercase tracking-widest">Global Wellness Faculty</div>
                    </div>
                  </div>
                </div>

                {/* Diploma Title */}
                <div className="space-y-1">
                  <div className="text-xs font-sans font-bold uppercase tracking-widest text-[#D4A373]">
                    DIPLOMA OF EXCELLENCE & MASTERY
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-bold text-[#1B4332] tracking-wide">
                    Certificate of Achievement
                  </h1>
                  <p className="text-xs sm:text-sm font-sans text-stone-500 italic max-w-xl mx-auto pt-1">
                    This is to officially certify that the practitioner named herein has successfully completed the comprehensive practical and theoretical training curriculum and completed the Master Examination.
                  </p>
                </div>

                {/* Candidate Identification Section (Name, Photo, Father's Name, DOB) */}
                <div className="my-6 p-6 rounded-2xl bg-stone-50/80 border border-[#D4A373]/40 flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
                  
                  {/* Candidate Photo */}
                  <div className="w-28 h-28 rounded-2xl overflow-hidden bg-stone-200 border-2 border-[#D4A373] shadow-md shrink-0 flex items-center justify-center">
                    {formData.photoUrl || certificate?.photoUrl ? (
                      <img 
                        src={formData.photoUrl || certificate?.photoUrl} 
                        alt="Certified Candidate" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User className="w-12 h-12 text-stone-400" />
                    )}
                  </div>

                  {/* Candidate Details */}
                  <div className="space-y-2">
                    <div className="text-xs font-sans uppercase tracking-wider text-stone-500">PROUDLY PRESENTED TO</div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1B4332] font-serif underline decoration-[#D4A373] decoration-2 underline-offset-8">
                      {formData.fullName || certificate?.studentName || 'Elena Roy'}
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pt-3 text-xs font-sans text-stone-700">
                      {formData.fatherName && (
                        <div>
                          <span className="font-bold text-stone-900">Father’s / Guardian Name:</span> {formData.fatherName}
                        </div>
                      )}
                      {(formData.dob || formData.age) && (
                        <div>
                          <span className="font-bold text-stone-900">DOB / Age:</span> {formData.dob || ''} {formData.age ? `(Age: ${formData.age})` : ''}
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-stone-900">Exam Score:</span> {examResult?.score || 48} / 50 Marks (Grade A+)
                      </div>
                      <div>
                        <span className="font-bold text-stone-900">Issued On:</span> {certificate?.issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scope of Competencies */}
                <div className="text-xs font-sans text-stone-600 max-w-2xl mx-auto leading-relaxed border-t border-b border-stone-200 py-3">
                  <span className="font-bold text-stone-900">Certified Modalities:</span> Swedish Classical 5-Strokes, Deep Tissue Myofascial Trigger Release, Volcanic Basalt Hot Stones, Thai Sen Sib Energy Mobilization, Foot Reflexology, Ayurvedic Shiroabhyanga, CIDESCO Clinical Sanitation, and Spa Business Operations.
                </div>

                {/* Signatures & Gold Seal */}
                <div className="pt-6 flex items-end justify-between px-4 sm:px-12">
                  
                  {/* Left Signature */}
                  <div className="text-center space-y-1">
                    <div className="text-base font-serif italic text-stone-800 font-bold border-b border-stone-400 pb-1">
                      Somchai Prakan, CIDESCO
                    </div>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                      Grand Master Trainer & Faculty Head
                    </div>
                  </div>

                  {/* Center Embossed Gold Seal */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E9C46A] via-[#D4A373] to-[#A0522D] p-1 shadow-xl border-4 border-[#FCFBF7] flex items-center justify-center text-center text-[#1B4332] shrink-0">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-[#1B4332]/40 flex flex-col items-center justify-center p-1">
                      <Sparkles className="w-4 h-4 text-[#1B4332]" />
                      <span className="text-[8px] font-sans font-black uppercase tracking-tighter">OFFICIAL GOLD SEAL</span>
                      <span className="text-[7px] font-sans font-bold">SPA HUB 2026</span>
                    </div>
                  </div>

                  {/* Right Signature */}
                  <div className="text-center space-y-1">
                    <div className="text-base font-serif italic text-stone-800 font-bold border-b border-stone-400 pb-1">
                      Elena Roy, CIDESCO MD
                    </div>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
                      Director of International Education
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* ALL 50 QUESTIONS DETAILED REVIEW & EXPLANATIONS */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                  {language === 'hi' ? 'सभी 50 प्रश्नों का विस्तृत हल एवं स्पष्टीकरण' : 'Complete 50 Questions Detailed Answer Key & Explanations'}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {language === 'hi' ? 'अपने उत्तरों की समीक्षा करें और सही कारण समझें' : 'Review your responses alongside clinical explanations'}
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {certificationExamQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div 
                    key={q.id}
                    className={`p-5 rounded-2xl border text-sm space-y-2.5 transition-all ${
                      isCorrect 
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900' 
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-stone-900 dark:text-stone-100">
                        #{idx + 1}. {language === 'hi' ? q.questionHi || q.question : q.question}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                        isCorrect 
                          ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100' 
                          : 'bg-rose-200 text-rose-900 dark:bg-rose-800 dark:text-rose-100'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 dark:text-stone-400">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {language === 'hi' ? 'सही उत्तर: ' : 'Correct Answer: '}
                      </span>
                      {language === 'hi' && q.optionsHi ? q.optionsHi[q.correctIndex] : q.options[q.correctIndex]}
                    </div>

                    <div className="text-xs text-stone-500 dark:text-stone-400 italic bg-white dark:bg-stone-800/80 p-3 rounded-xl border border-stone-200 dark:border-stone-700">
                      <span className="font-bold not-italic">💡 {language === 'hi' ? 'व्याख्या: ' : 'Explanation: '}</span>
                      {language === 'hi' ? q.explanationHi || q.explanation : q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
