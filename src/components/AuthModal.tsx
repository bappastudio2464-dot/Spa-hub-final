import React, { useState, useEffect } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Phone, 
  KeyRound, 
  ShieldCheck, 
  User, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  RefreshCw,
  Crown,
  Share2,
  GraduationCap,
  Clock,
  QrCode
} from 'lucide-react';
import { generateOtpForPhone, normalizePhone, checkUserExists, ADMIN_UPI_ID } from '../utils/authStorage';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  canDismiss?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, canDismiss = false }) => {
  const { language, loginWithPhoneOtp, isLoggedIn, currentUser } = useCourse();

  // Mode: 'student' or 'admin'
  const [authRoleTab, setAuthRoleTab] = useState<'student' | 'admin'>('student');

  // Input states (blank by default)
  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<'phone' | 'otp' | 'register_details' | 'pending_approval'>('phone');
  
  // Custom Registration Form (for 1st time new users only)
  const [fullName, setFullName] = useState<string>('');
  const [fatherName, setFatherName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [referralCodeInput, setReferralCodeInput] = useState<string>('');

  const [countdown, setCountdown] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedOtpHint, setGeneratedOtpHint] = useState<string>('');
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen && isLoggedIn) return null;

  const handleTabSwitch = (tab: 'student' | 'admin') => {
    setAuthRoleTab(tab);
    setPhone('');
    setOtp('');
    setStep('phone');
    setErrorMsg('');
    setSuccessMsg('');
    setGeneratedOtpHint('');
    setIsExistingUser(false);
  };

  // Custom DOB handler to calculate approximate age cleanly without interfering with form input
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDob(val);
    if (val) {
      const birthYear = new Date(val).getFullYear();
      const currentYear = new Date().getFullYear();
      if (!isNaN(birthYear) && birthYear > 1900 && birthYear <= currentYear) {
        setAge(String(currentYear - birthYear));
      }
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const clean = normalizePhone(phone);
    if (clean.length !== 10) {
      setErrorMsg(language === 'hi' 
        ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।' 
        : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Check if user already exists
      const check = checkUserExists(clean);
      setIsExistingUser(check.exists);

      const code = generateOtpForPhone(clean);
      setGeneratedOtpHint(code);
      setStep('otp');
      setCountdown(45);
      setLoading(false);
      
      setSuccessMsg(language === 'hi' 
        ? `आपके मोबाइल नंबर (+91 ${clean}) पर OTP भेजा गया है।` 
        : `OTP sent to +91 ${clean}.`);
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const clean = normalizePhone(phone);
      
      // If admin, or existing active user, authenticate immediately
      const res = loginWithPhoneOtp(clean, otp.trim(), {
        fullName,
        fatherName,
        dob,
        age,
        city,
        referredByCode: referralCodeInput.trim()
      });

      setLoading(false);

      if (res.success) {
        setSuccessMsg(res.message);
        if (onClose) onClose();
      } else if (res.pendingApproval) {
        setStep('pending_approval');
        setErrorMsg(res.message);
      } else if (res.requiresProfile) {
        // First-time signup -> Ask for profile details only once!
        setStep('register_details');
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('कृपया अपना पूरा नाम दर्ज करें।');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const clean = normalizePhone(phone);
      const res = loginWithPhoneOtp(clean, otp.trim(), {
        fullName: fullName.trim(),
        fatherName: fatherName.trim(),
        dob,
        age,
        city: city.trim(),
        referredByCode: referralCodeInput.trim()
      });

      setLoading(false);

      if (res.success) {
        setSuccessMsg(res.message);
        if (onClose) onClose();
      } else if (res.pendingApproval) {
        setStep('pending_approval');
        setSuccessMsg('पंजीकरण सफल! एडमिन स्वीकृति के लिए सबमिट कर दिया गया है।');
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative max-w-lg w-full bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl">
        
        {/* Header Ribbon */}
        <div className="p-6 bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#081C15] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A373] text-[#1B4332] flex items-center justify-center font-bold shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#E9C46A] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                {language === 'hi' ? 'सुरक्षित ऑनलाइन OTP सत्यापन' : 'Secure Online OTP Authentication'}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {language === 'hi' ? 'स्पा हब इंटरनेशनल अकादमी' : 'Spa Hub International Academy'}
              </h2>
            </div>
          </div>
        </div>

        {/* Separate Tabs for Student vs Admin (No pre-filled numbers) */}
        {step !== 'pending_approval' && (
          <div className="grid grid-cols-2 p-2 bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700">
            <button
              id="tab-student-login"
              type="button"
              onClick={() => handleTabSwitch('student')}
              className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                authRoleTab === 'student'
                  ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'hi' ? 'छात्र / यूजर लॉगिन' : 'Student Login'}</span>
            </button>

            <button
              id="tab-admin-login"
              type="button"
              onClick={() => handleTabSwitch('admin')}
              className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                authRoleTab === 'admin'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>{language === 'hi' ? 'एडमिन पोर्टल' : 'Admin Portal'}</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-5">

          {/* Error & Success Alerts */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* STEP 1: Enter Phone Number */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  {authRoleTab === 'admin'
                    ? (language === 'hi' ? 'एडमिन मोबाइल नंबर दर्ज करें *' : 'Enter Admin Mobile Number *')
                    : (language === 'hi' ? 'अपना मोबाइल नंबर दर्ज करें (10 अंक) *' : 'Enter Your 10-Digit Mobile Number *')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Phone className="w-4 h-4" />
                    <span className="ml-1.5 font-bold text-xs text-stone-500 border-r border-stone-300 dark:border-stone-700 pr-2">+91</span>
                  </div>
                  <input
                    id="input-login-phone"
                    type="tel"
                    maxLength={10}
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter mobile number"
                    className="w-full pl-20 pr-4 py-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold text-base tracking-wider focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  />
                </div>
              </div>

              <button
                id="btn-send-otp"
                type="submit"
                disabled={loading || phone.length < 10}
                className={`w-full py-3.5 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                  authRoleTab === 'admin'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800'
                    : 'bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 hover:to-[#1B4332]'
                }`}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                <span>{language === 'hi' ? 'OTP प्राप्त करें (Send OTP)' : 'Send OTP Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Enter OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
              <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500">{language === 'hi' ? 'मोबाइल नंबर: ' : 'Phone: '}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">+91 {phone}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                >
                  {language === 'hi' ? 'बदलें' : 'Change'}
                </button>
              </div>

              {/* OTP Code Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    {language === 'hi' ? 'OTP कोड दर्ज करें *' : 'Enter OTP Code *'}
                  </label>
                  {generatedOtpHint && (
                    <button
                      type="button"
                      onClick={() => setOtp(generatedOtpHint)}
                      className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{`Auto Fill (${generatedOtpHint})`}</span>
                    </button>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="input-login-otp"
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold text-center text-lg tracking-widest focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs transition"
                >
                  {language === 'hi' ? 'वापस' : 'Back'}
                </button>
                <button
                  id="btn-verify-otp-login"
                  type="submit"
                  disabled={loading || !otp.trim()}
                  className={`flex-1 py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 ${
                    authRoleTab === 'admin'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800'
                      : 'bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 hover:to-[#1B4332]'
                  }`}
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                  <span>{language === 'hi' ? 'सत्यापित करें (Verify)' : 'Verify & Continue'}</span>
                </button>
              </div>

              {/* Resend OTP */}
              <div className="text-center pt-1">
                {countdown > 0 ? (
                  <span className="text-[11px] text-stone-500">
                    {language === 'hi' ? `पुनः OTP भेजें (${countdown}s)` : `Resend OTP in ${countdown}s`}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                  >
                    {language === 'hi' ? 'OTP दोबारा भेजें' : 'Resend OTP'}
                  </button>
                )}
              </div>
            </form>
          )}

          {/* STEP 3: 1st-Time Student Registration Details Form */}
          {step === 'register_details' && (
            <form onSubmit={handleCompleteRegistration} className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs text-amber-900 dark:text-amber-200">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>प्रथम बार पंजीकरण (First-Time Registration)</span>
                </div>
                <p>यह विवरण केवल पहली बार लिया जाता है। एडमिन द्वारा स्वीकृति के बाद आप सीधे OTP से लॉगिन कर सकेंगे।</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                    पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. अमित कुमार"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      पिता का नाम (Father’s Name)
                    </label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={e => setFatherName(e.target.value)}
                      placeholder="पिता का नाम"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      शहर / राज्य (City / State)
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="e.g. दिल्ली, लखनऊ"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      जन्म तिथि (DOB)
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={handleDobChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      उम्र (Age)
                    </label>
                    <input
                      type="text"
                      value={age}
                      onChange={e => setAge(e.target.value)}
                      placeholder="e.g. 24"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>रेफरल कोड (Referral Code - Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={referralCodeInput}
                    onChange={e => setReferralCodeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. SPA3210"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 uppercase tracking-wider outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('otp')}
                  className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs transition"
                >
                  वापस
                </button>
                <button
                  type="submit"
                  disabled={loading || !fullName.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>पंजीकरण जमा करें (Submit Registration)</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: PENDING APPROVAL GATE NOTICE */}
          {step === 'pending_approval' && (
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                  स्वीकृति लंबित है (Approval Pending)
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed max-w-sm mx-auto">
                  आपका मोबाइल नंबर <span className="font-bold text-stone-900 dark:text-stone-100">+91 {phone}</span> पंजीकृत हो गया है। बिना एडमिन अप्रूवल के कोर्स एक्सेस नहीं हो सकता।
                </p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-left space-y-2 text-xs">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>एडमिन आधिकारिक UPI आईडी:</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-stone-900 rounded-xl font-mono text-sm font-bold text-emerald-700 dark:text-emerald-300 text-center select-all border border-emerald-300 dark:border-emerald-700">
                  {ADMIN_UPI_ID}
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400">
                  एडमिन द्वारा आपके पेमेंट व विवरण का सत्यापन होते ही आपका खाता तुरंत एक्टिव हो जाएगा।
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setPhone('');
                    setOtp('');
                  }}
                  className="w-full py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-200 transition"
                >
                  अन्य नंबर से लॉगिन करें
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
