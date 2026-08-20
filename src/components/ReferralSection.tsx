import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Wallet, 
  Share2, 
  Users, 
  TrendingUp, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  IndianRupee,
  ExternalLink,
  Gift,
  QrCode,
  Upload,
  FileCheck,
  Building,
  Smartphone,
  Eye
} from 'lucide-react';
import { REFERRAL_BONUS_AMOUNT, ADMIN_UPI_ID } from '../utils/authStorage';

export const ReferralSection: React.FC = () => {
  const { 
    language, 
    currentUser, 
    walletBalance, 
    totalEarned, 
    referralCode, 
    myReferrals, 
    walletTransactions, 
    withdrawalRequests,
    approvalPaymentRequests,
    submitApprovalPayment,
    requestWithdrawal 
  } = useCourse();

  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  // Modals
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);
  const [isPaymentProofOpen, setIsPaymentProofOpen] = useState<boolean>(false);

  // Candidate Payment Proof Form State
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidatePhone, setCandidatePhone] = useState<string>('');
  const [payAmount, setPayAmount] = useState<string>('500');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [screenshotBase64, setScreenshotBase64] = useState<string>('');
  const [paymentSubmitMsg, setPaymentSubmitMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Withdrawal Form State
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawalType, setWithdrawalType] = useState<'upi' | 'bank' | 'qr'>('upi');
  const [upiId, setUpiId] = useState<string>('');
  const [accountHolderName, setAccountHolderName] = useState<string>(currentUser?.fullName || '');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [ifscCode, setIfscCode] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [qrBase64, setQrBase64] = useState<string>('');
  const [withdrawMsg, setWithdrawMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const approvedReferrals = myReferrals.filter(u => u.status === 'active');
  const pendingReferrals = myReferrals.filter(u => u.status === 'pending');

  const myPaymentSubmissions = approvalPaymentRequests.filter(
    p => p.referrerUserId === currentUser?.id || (currentUser?.phone && p.referrerPhone === currentUser.phone)
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(ADMIN_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleShareWhatsapp = () => {
    const text = language === 'hi'
      ? `नमस्ते! मैंने स्पा हब इंटरनेशनल अकादमी में प्रोफेशनल स्पा थेरेपी कोर्स जॉइन किया है। आप भी जुड़ें और मेरे रेफरल कोड *${referralCode}* का उपयोग करके रजिस्ट्रेशन करें! \nएडमिन UPI: ${ADMIN_UPI_ID} \nवेबसाइट: ${window.location.origin}`
      : `Hello! Join me at Spa Hub International Academy for professional spa therapist training. Register using my Referral Code: *${referralCode}* \nAdmin UPI: ${ADMIN_UPI_ID} \nVisit: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Handle Screenshot Upload for Payment Proof
  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('कृपया 2MB से कम साइज का स्क्रीनशॉट अपलोड करें।');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setScreenshotBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle QR Upload for Withdrawal
  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQrBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Payment Proof for Candidate Approval
  const handlePaymentProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSubmitMsg(null);

    if (!candidateName.trim() || !candidatePhone.trim()) {
      setPaymentSubmitMsg({ type: 'error', text: 'कृपया छात्र का नाम और मोबाइल नंबर दर्ज करें।' });
      return;
    }

    if (!utrNumber.trim()) {
      setPaymentSubmitMsg({ type: 'error', text: 'UTR / Transaction Reference नंबर अनिवार्य है।' });
      return;
    }

    const amt = parseFloat(payAmount) || 500;
    const res = submitApprovalPayment({
      candidateName: candidateName.trim(),
      candidatePhone: candidatePhone.replace(/\D/g, '').slice(-10),
      amount: amt,
      utrNumber: utrNumber.trim(),
      screenshotUrl: screenshotBase64,
    });

    if (res.success) {
      setPaymentSubmitMsg({ type: 'success', text: res.message });
      setTimeout(() => {
        setIsPaymentProofOpen(false);
        setCandidateName('');
        setCandidatePhone('');
        setUtrNumber('');
        setScreenshotBase64('');
        setPaymentSubmitMsg(null);
      }, 2500);
    } else {
      setPaymentSubmitMsg({ type: 'error', text: res.message });
    }
  };

  // Submit Withdrawal
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawMsg(null);

    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0) {
      setWithdrawMsg({ type: 'error', text: 'कृपया मान्य निकासी राशि दर्ज करें।' });
      return;
    }

    if (amt > walletBalance) {
      setWithdrawMsg({ type: 'error', text: 'अपर्याप्त वॉलेट बैलेंस।' });
      return;
    }

    if (withdrawalType === 'upi' && !upiId.trim()) {
      setWithdrawMsg({ type: 'error', text: 'कृपया अपनी UPI ID दर्ज करें।' });
      return;
    }

    if (withdrawalType === 'bank' && (!accountNumber.trim() || !ifscCode.trim())) {
      setWithdrawMsg({ type: 'error', text: 'कृपया बैंक खाता नंबर और IFSC कोड दर्ज करें।' });
      return;
    }

    if (withdrawalType === 'qr' && !qrBase64) {
      setWithdrawMsg({ type: 'error', text: 'कृपया अपना पेमेंट QR कोड अपलोड करें।' });
      return;
    }

    const res = requestWithdrawal(amt, withdrawalType, {
      upiId: upiId.trim(),
      accountHolderName: accountHolderName.trim(),
      accountNumber: accountNumber.trim(),
      ifscCode: ifscCode.trim().toUpperCase(),
      bankName: bankName.trim(),
      qrCodeUrl: qrBase64,
    });

    if (res.success) {
      setWithdrawMsg({ type: 'success', text: res.message });
      setWithdrawAmount('');
      setTimeout(() => {
        setIsWithdrawOpen(false);
        setWithdrawMsg(null);
      }, 2000);
    } else {
      setWithdrawMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#081C15] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[#E9C46A] text-xs font-bold uppercase tracking-wider">
              <Gift className="w-4 h-4 text-amber-300" />
              {language === 'hi' ? 'रेफर एवं अर्न नेटवर्क (₹300 प्रति स्वीकृत छात्र)' : 'Refer & Earn Network (₹300 per Approved Trainee)'}
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {language === 'hi' ? 'रेफरल डैशबोर्ड एवं डिजिटल वॉलेट' : 'Referral Network & Digital Wallet'}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm font-light leading-relaxed">
              {language === 'hi'
                ? 'अपने दोस्तों को अकादमी में आमंत्रित करें। एडमिन UPI पर पेमेंट कराकर UTR नंबर व स्क्रीनशॉट सबमिट करें। जैसे ही एडमिन द्वारा छात्र स्वीकृत होगा, आपके वॉलेट में तुरंत ₹300 क्रेडिट हो जाएंगे।'
                : 'Invite trainees. Submit payment proof (UTR & Screenshot) to the Admin UPI. Once verified by Admin, ₹300 is credited to your wallet instantly.'}
            </p>
          </div>

          {/* User Referral Code Pill Box */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-center space-y-3 shrink-0">
            <div className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
              {language === 'hi' ? 'आपका रेफरल कोड' : 'Your Referral Code'}
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#E9C46A] tracking-wider px-4 py-2 bg-black/20 rounded-2xl border border-white/10">
              {referralCode || 'SPA----'}
            </div>
            <div className="flex items-center gap-2 justify-center">
              <button
                onClick={handleCopyCode}
                className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? (language === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (language === 'hi' ? 'कोड कॉपी' : 'Copy')}</span>
              </button>
              <button
                onClick={handleShareWhatsapp}
                className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OFFICIAL ADMIN PAYMENT UPI & CANDIDATE APPROVAL REQUEST PROMPT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Admin UPI Card */}
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-500/40 rounded-3xl p-6 shadow-sm space-y-3 dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-amber-600" />
              {language === 'hi' ? 'एडमिन आधिकारिक UPI आईडी' : 'Admin Official UPI'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-bold">
              Verified
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-stone-800 rounded-2xl border border-amber-300 dark:border-amber-700 flex items-center justify-between gap-2 shadow-inner">
            <div className="font-mono text-base font-bold text-amber-900 dark:text-amber-300 truncate">
              {ADMIN_UPI_ID}
            </div>
            <button
              onClick={handleCopyUpi}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 shrink-0 transition"
            >
              {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUpi ? 'कॉपी हुआ' : 'कॉपी UPI'}</span>
            </button>
          </div>

          <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
            नए छात्र के रजिस्ट्रेशन शुल्क का भुगतान इस UPI ID पर कराएं और नीचे दिए बटन से <strong>UTR नंबर व स्क्रीनशॉट</strong> सबमिट करें।
          </p>
        </div>

        {/* Submit Candidate Payment Verification Proof Button Card */}
        <div className="md:col-span-2 bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-lg">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <FileCheck className="w-4 h-4" />
              <span>{language === 'hi' ? 'नए छात्र के अप्रूवल के लिए पेमेंट प्रूफ सबमिट करें' : 'Submit Candidate Payment Proof'}</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {language === 'hi' ? 'पेमेंट स्क्रीनशॉट एवं UTR नंबर सबमिट करें' : 'Submit Payment Screenshot & UTR No.'}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {language === 'hi' 
                ? 'एडमिन द्वारा UTR और स्क्रीनशॉट सत्यापित करते ही छात्र का खाता एक्टिव होगा और आपके वॉलेट में तुरंत ₹300 जुड़ जाएंगे।'
                : 'Admin verifies UTR & payment proof. Upon approval, trainee account activates and ₹300 is auto-credited to your wallet.'}
            </p>
          </div>

          <button
            id="btn-open-payment-proof-modal"
            onClick={() => setIsPaymentProofOpen(true)}
            className="px-5 py-3.5 bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition flex items-center gap-2 shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>{language === 'hi' ? 'पेमेंट प्रूफ सबमिट करें' : 'Submit Payment Proof'}</span>
          </button>
        </div>

      </div>

      {/* Wallet KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Main Wallet Balance Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-[#1B4332] text-white p-6 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-emerald-300" />
              {language === 'hi' ? 'वॉलेट शेष (Balance)' : 'Wallet Balance'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-700/60 font-mono text-emerald-200">
              Live ₹
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-[#E9C46A]">
            ₹{walletBalance.toLocaleString('en-IN')}
          </div>
          <div className="pt-1 flex items-center justify-between">
            <span className="text-[11px] text-emerald-200">
              {language === 'hi' ? 'कुल अर्जित: ' : 'Total Earned: '}
              <strong>₹{totalEarned.toLocaleString('en-IN')}</strong>
            </span>
            <button
              id="btn-open-withdraw-modal"
              onClick={() => setIsWithdrawOpen(true)}
              disabled={walletBalance <= 0}
              className="px-3 py-1.5 rounded-xl bg-[#D4A373] hover:bg-[#c29262] disabled:opacity-50 text-[#1B4332] text-xs font-bold shadow-xs transition flex items-center gap-1"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'निकासी (Withdraw)' : 'Withdraw'}</span>
            </button>
          </div>
        </div>

        {/* Total Referrals Card */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'कुल रेफरल (Total)' : 'Total Referred'}</span>
          </div>
          <div className="text-3xl font-bold text-stone-900 dark:text-stone-100 font-mono">
            {myReferrals.length}
          </div>
          <p className="text-[11px] text-stone-500">
            {language === 'hi' ? 'आपके कोड से जुड़े कुल छात्र' : 'Students joined via your code'}
          </p>
        </div>

        {/* Approved Referrals Card */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'hi' ? 'स्वीकृत छात्र (Approved)' : 'Approved (Paid)'}</span>
          </div>
          <div className="text-3xl font-bold text-emerald-600 font-mono">
            {approvedReferrals.length}
          </div>
          <p className="text-[11px] text-stone-500">
            {language === 'hi' ? `₹${approvedReferrals.length * REFERRAL_BONUS_AMOUNT} वॉलेट में क्रेडिट हुआ` : `₹${approvedReferrals.length * REFERRAL_BONUS_AMOUNT} credited to wallet`}
          </p>
        </div>

        {/* Pending Approval Card */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{language === 'hi' ? 'प्रतीक्षारत (Pending)' : 'Awaiting Approval'}</span>
          </div>
          <div className="text-3xl font-bold text-amber-600 font-mono">
            {pendingReferrals.length}
          </div>
          <p className="text-[11px] text-stone-500">
            {language === 'hi' ? 'एडमिन अप्रूवल के बाद ₹300 जुड़ेंगे' : '₹300 will credit upon admin approval'}
          </p>
        </div>

      </div>

      {/* Submitted Payment Requests Status Tracker */}
      {myPaymentSubmissions.length > 0 && (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                {language === 'hi' ? 'मेरी सबमिट की गई पेमेंट रिक्वेस्ट (Approval Requests)' : 'My Submitted Payment Requests'}
              </h3>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              {myPaymentSubmissions.length} Requests
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myPaymentSubmissions.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {p.candidateName}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    p.status === 'approved' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : p.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {p.status === 'approved' ? '✓ स्वीकृत (₹300 मिला)' : p.status === 'rejected' ? '✕ अस्वीकृत' : '⏳ पेंडिंग'}
                  </span>
                </div>

                <div className="space-y-1 text-stone-600 dark:text-stone-400 text-[11px]">
                  <div>मोबाइल: <span className="font-mono font-bold text-stone-800 dark:text-stone-200">+91 {p.candidatePhone}</span></div>
                  <div>राशि: <span className="font-mono font-bold text-emerald-600">₹{p.amount}</span></div>
                  <div>UTR नंबर: <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{p.utrNumber}</span></div>
                  <div>सबमिट दिनांक: <span>{new Date(p.submittedAt).toLocaleDateString('en-IN')}</span></div>
                </div>

                {p.screenshotUrl && (
                  <div className="pt-1">
                    <img 
                      src={p.screenshotUrl} 
                      alt="Payment Slip" 
                      className="w-full h-24 object-cover rounded-xl border border-stone-200 dark:border-stone-700" 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Referrals & Transaction History Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: My Referral Network */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                {language === 'hi' ? 'मेरा रेफरल नेटवर्क' : 'My Referral Network'}
              </h3>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              {myReferrals.length} {language === 'hi' ? 'छात्र जुड़े' : 'Members'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-[11px] uppercase tracking-wider text-stone-500 font-bold">
                  <th className="pb-2.5">{language === 'hi' ? 'छात्र का नाम' : 'Trainee'}</th>
                  <th className="pb-2.5">{language === 'hi' ? 'मोबाइल नंबर' : 'Phone'}</th>
                  <th className="pb-2.5">{language === 'hi' ? 'स्थिति (Status)' : 'Status'}</th>
                  <th className="pb-2.5 text-right">{language === 'hi' ? 'रिवॉर्ड' : 'Reward'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {myReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-stone-400">
                      {language === 'hi' ? 'अभी तक किसी छात्र ने आपका कोड उपयोग नहीं किया है। ऊपर दिए गए WhatsApp बटन से शेयर करें!' : 'No referrals yet. Share your code on WhatsApp to earn ₹300 per student!'}
                    </td>
                  </tr>
                ) : (
                  myReferrals.map((user, idx) => (
                    <tr key={user.id || idx} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
                      <td className="py-3 font-semibold text-stone-900 dark:text-stone-100">
                        {user.fullName || 'Registered Trainee'}
                        {user.city && <span className="block text-[10px] text-stone-400">{user.city}</span>}
                      </td>
                      <td className="py-3 font-mono text-stone-600 dark:text-stone-300">
                        +91 {user.phone ? `${user.phone.slice(0, 3)}****${user.phone.slice(-3)}` : '----------'}
                      </td>
                      <td className="py-3">
                        {user.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {language === 'hi' ? 'स्वीकृत' : 'Approved'}
                          </span>
                        ) : user.status === 'pending' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            {language === 'hi' ? 'अप्रूवल पेंडिंग' : 'Pending'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            {language === 'hi' ? 'अस्वीकृत' : 'Blocked'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right font-mono font-bold">
                        {user.status === 'active' ? (
                          <span className="text-emerald-600">+₹300</span>
                        ) : (
                          <span className="text-stone-400">₹0 (पेंडिंग)</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Wallet Passbook Transactions */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                {language === 'hi' ? 'वॉलेट पासबुक' : 'Wallet Passbook'}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">
              ₹{walletBalance}
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {walletTransactions.length === 0 ? (
              <p className="text-xs text-stone-400 text-center py-6">
                {language === 'hi' ? 'कोई लेन-देन (Transaction) नहीं हुआ है।' : 'No wallet transactions yet.'}
              </p>
            ) : (
              walletTransactions.map(tx => (
                <div key={tx.id} className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800 dark:text-stone-200">
                      {tx.type === 'referral_bonus' && (language === 'hi' ? '🎁 रेफरल बोनस' : 'Referral Bonus')}
                      {tx.type === 'admin_credit' && (language === 'hi' ? '➕ एडमिन क्रेडिट' : 'Admin Credit')}
                      {tx.type === 'admin_debit' && (language === 'hi' ? '➖ एडमिन कटौती' : 'Admin Debit')}
                      {tx.type === 'admin_reset' && (language === 'hi' ? '🔄 वॉलेट रीसेट' : 'Wallet Reset')}
                      {tx.type === 'payout_withdrawal' && (language === 'hi' ? '📤 निकासी अनुरोध' : 'Withdrawal Request')}
                    </span>
                    <span className={`font-mono font-bold ${
                      tx.type === 'referral_bonus' || tx.type === 'admin_credit'
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}>
                      {tx.type === 'referral_bonus' || tx.type === 'admin_credit' ? '+' : '-'}₹{tx.amount}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    {tx.description}
                  </p>
                  <span className="text-[10px] text-stone-400 block pt-0.5">{tx.date}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* MODAL 1: SUBMIT CANDIDATE PAYMENT PROOF (UTR & SCREENSHOT) */}
      {isPaymentProofOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-lg w-full bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center font-bold">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">
                    {language === 'hi' ? 'छात्र अप्रूवल पेमेंट प्रूफ सबमिट करें' : 'Submit Candidate Payment Proof'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    एडमिन UPI: <span className="font-mono font-bold text-emerald-600">{ADMIN_UPI_ID}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPaymentProofOpen(false)}
                className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500"
              >
                ✕
              </button>
            </div>

            {paymentSubmitMsg && (
              <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                paymentSubmitMsg.type === 'success' 
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200' 
                  : 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200'
              }`}>
                {paymentSubmitMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{paymentSubmitMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePaymentProofSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  नए छात्र का पूरा नाम (Candidate Name) *
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={e => setCandidateName(e.target.value)}
                  placeholder="जिस छात्र के लिए पेमेंट किया गया है"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    छात्र का मोबाइल नंबर *
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={candidatePhone}
                    onChange={e => setCandidatePhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-mono outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    भुगतान राशि (Amount in ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    placeholder="500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center justify-between">
                  <span>UTR / UPI Transaction Reference No. *</span>
                  <span className="text-[10px] text-amber-600 font-semibold">(अनिवार्य / Mandatory)</span>
                </label>
                <input
                  type="text"
                  required
                  value={utrNumber}
                  onChange={e => setUtrNumber(e.target.value)}
                  placeholder="e.g. 423456789012 / UPI Ref ID"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-mono tracking-wider outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Screenshot Upload */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  पेमेंट स्क्रीनशॉट अपलोड करें (Payment Screenshot) *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  className="w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 dark:file:bg-emerald-950 dark:file:text-emerald-300 hover:file:bg-emerald-200 cursor-pointer"
                />

                {screenshotBase64 && (
                  <div className="mt-2 relative">
                    <img 
                      src={screenshotBase64} 
                      alt="Uploaded screenshot preview" 
                      className="w-full max-h-40 object-contain rounded-xl border border-stone-200 dark:border-stone-700 bg-black/5" 
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsPaymentProofOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs transition"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={!utrNumber.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-700 to-[#2D6A4F] hover:from-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>सबमिट करें (Submit Payment Proof)</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: COMPLETE WITHDRAWAL REQUEST (UPI / BANK / QR) */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-lg w-full bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center font-bold">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">
                    {language === 'hi' ? 'वॉलेट से निकासी अनुरोध (Withdrawal)' : 'Request Wallet Payout'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    उपलब्ध बैलेंस: <span className="font-mono font-bold text-emerald-600">₹{walletBalance}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWithdrawOpen(false)}
                className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500"
              >
                ✕
              </button>
            </div>

            {withdrawMsg && (
              <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                withdrawMsg.type === 'success' 
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200' 
                  : 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200'
              }`}>
                {withdrawMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{withdrawMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              
              {/* Withdrawal Amount */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  निकासी राशि (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-400">₹</span>
                  <input
                    type="number"
                    max={walletBalance}
                    min="100"
                    required
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    placeholder={`अधिकतम ₹${walletBalance}`}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold font-mono outline-none text-base focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  भुगतान का माध्यम चुनें (Payment Mode) *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setWithdrawalType('upi')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border ${
                      withdrawalType === 'upi'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>UPI ID</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithdrawalType('bank')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border ${
                      withdrawalType === 'bank'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>बैंक खाता</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithdrawalType('qr')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border ${
                      withdrawalType === 'qr'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>QR कोड</span>
                  </button>
                </div>
              </div>

              {/* Mode Specific Inputs */}
              {withdrawalType === 'upi' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    आपकी UPI ID (Google Pay / PhonePe / Paytm / BHIM) *
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@upi / mobile@okaxis"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}

              {withdrawalType === 'bank' && (
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      खाताधारक का नाम (Account Holder Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={accountHolderName}
                      onChange={e => setAccountHolderName(e.target.value)}
                      placeholder="e.g. राहुल शर्मा"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        बैंक खाता संख्या (Account No.) *
                      </label>
                      <input
                        type="text"
                        required
                        value={accountNumber}
                        onChange={e => setAccountNumber(e.target.value)}
                        placeholder="Account Number"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        IFSC कोड *
                      </label>
                      <input
                        type="text"
                        required
                        value={ifscCode}
                        onChange={e => setIfscCode(e.target.value.toUpperCase())}
                        placeholder="e.g. SBIN0001234"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      बैंक का नाम (Bank Name)
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={e => setBankName(e.target.value)}
                      placeholder="e.g. State Bank of India"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none text-xs"
                    />
                  </div>
                </div>
              )}

              {withdrawalType === 'qr' && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    अपना पेमेंट QR कोड अपलोड करें *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleQrUpload}
                    className="w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 dark:file:bg-emerald-950 dark:file:text-emerald-300 hover:file:bg-emerald-200 cursor-pointer"
                  />
                  {qrBase64 && (
                    <div className="mt-2 text-center">
                      <img 
                        src={qrBase64} 
                        alt="QR Preview" 
                        className="w-32 h-32 object-contain mx-auto rounded-xl border border-stone-200 dark:border-stone-700" 
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsWithdrawOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs transition"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition"
                >
                  निकासी अनुरोध भेजें
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
