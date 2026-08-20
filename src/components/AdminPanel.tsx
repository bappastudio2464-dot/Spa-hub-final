import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Users, 
  ShieldCheck, 
  UserCheck, 
  UserX, 
  UserPlus, 
  Crown, 
  Search, 
  Filter, 
  Award, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Download, 
  Smartphone, 
  BookOpen, 
  ExternalLink,
  RefreshCw,
  Phone,
  Calendar,
  Lock,
  Eye,
  Wallet,
  ArrowUpRight,
  IndianRupee,
  Share2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { AppUser, UserRole, UserStatus } from '../types';
import { MASTER_ADMIN_PHONE, normalizePhone, REFERRAL_BONUS_AMOUNT } from '../utils/authStorage';
import { AndroidideApkModal } from './AndroidideApkModal';

export const AdminPanel: React.FC = () => {
  const { 
    language, 
    currentUser, 
    usersList, 
    approveUser, 
    blockUser, 
    unblockUser, 
    deleteUser, 
    toggleUserRole, 
    addUserByAdmin, 
    adminAdjustWallet,
    adminResetWalletToZero,
    adminProcessWithdrawal,
    withdrawalRequests,
    setActiveTab, 
  } = useCourse();

  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'withdrawals'>('users');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'blocked' | 'admin'>('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState<boolean>(false);

  // Wallet Management Modal for specific user
  const [activeWalletUser, setActiveWalletUser] = useState<AppUser | null>(null);
  const [customWalletAmount, setCustomWalletAmount] = useState<string>('');
  const [walletReason, setWalletReason] = useState<string>('');
  const [walletActionType, setWalletActionType] = useState<'add' | 'deduct' | 'set'>('add');

  // Success Notification banner
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // New user form state
  const [newUserPhone, setNewUserPhone] = useState<string>('');
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserFatherName, setNewUserFatherName] = useState<string>('');
  const [newUserDob, setNewUserDob] = useState<string>('');
  const [newUserAge, setNewUserAge] = useState<string>('');
  const [newUserCity, setNewUserCity] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('student');
  const [newUserStatus, setNewUserStatus] = useState<UserStatus>('active');
  const [newUserReferredBy, setNewUserReferredBy] = useState<string>('');

  const filteredUsers = usersList.filter(user => {
    const cleanPhone = normalizePhone(user.phone);
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cleanPhone.includes(searchQuery.replace(/\D/g, '')) ||
      (user.referralCode && user.referralCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.referredBy && user.referredBy.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.fatherName && user.fatherName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.city && user.city.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'active') return user.status === 'active';
    if (statusFilter === 'pending') return user.status === 'pending';
    if (statusFilter === 'blocked') return user.status === 'blocked';
    if (statusFilter === 'admin') return user.role === 'admin';
    return true;
  });

  const totalUsers = usersList.length;
  const activeUsers = usersList.filter(u => u.status === 'active').length;
  const pendingUsers = usersList.filter(u => u.status === 'pending').length;
  const blockedUsers = usersList.filter(u => u.status === 'blocked').length;
  const totalSystemWalletBalance = usersList.reduce((acc, u) => acc + (u.walletBalance || 0), 0);
  const pendingWithdrawalsCount = withdrawalRequests.filter(w => w.status === 'pending').length;

  const handleApproveWithBonus = (userId: string, userName: string) => {
    const res = approveUser(userId);
    if (res.referralBonusCredited) {
      setActionNotice(language === 'hi'
        ? `स्वीकृत! ${userName} का खाता सक्रिय किया गया और उनके रेफरर (${res.referrerName || 'Referrer'}) के वॉलेट में ₹${REFERRAL_BONUS_AMOUNT} जोड़ दिए गए!`
        : `Approved! ${userName} is activated, and ₹${REFERRAL_BONUS_AMOUNT} referral bonus was credited to ${res.referrerName || 'Referrer'}'s wallet!`
      );
    } else {
      setActionNotice(language === 'hi' ? `${userName} का खाता सफलतापूर्वक स्वीकृत किया गया!` : `${userName} approved successfully!`);
    }
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleWalletSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWalletUser) return;

    const amt = parseFloat(customWalletAmount);
    if (isNaN(amt) || amt < 0) {
      alert(language === 'hi' ? 'कृपया मान्य राशि दर्ज करें।' : 'Please enter a valid amount.');
      return;
    }

    if (walletActionType === 'set') {
      adminAdjustWallet(activeWalletUser.id, 0, walletReason || `एडमिन द्वारा बैलेंस ₹${amt} सेट किया गया`, amt);
    } else if (walletActionType === 'add') {
      adminAdjustWallet(activeWalletUser.id, amt, walletReason || `एडमिन द्वारा ₹${amt} जोड़े गए`);
    } else if (walletActionType === 'deduct') {
      adminAdjustWallet(activeWalletUser.id, -amt, walletReason || `एडमिन द्वारा ₹${amt} काटे गए`);
    }

    setActionNotice(language === 'hi' 
      ? `${activeWalletUser.fullName} का वॉलेट सफलतापूर्वक अपडेट किया गया!` 
      : `Wallet updated for ${activeWalletUser.fullName}!`);
    setActiveWalletUser(null);
    setCustomWalletAmount('');
    setWalletReason('');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleQuickResetWallet = (user: AppUser) => {
    if (window.confirm(language === 'hi' 
      ? `क्या आप ${user.fullName} का वॉलेट खाली (₹0) करना चाहते हैं?` 
      : `Reset ${user.fullName}'s wallet balance to ₹0?`)) {
      adminResetWalletToZero(user.id);
      setActionNotice(language === 'hi' 
        ? `${user.fullName} का वॉलेट बैलेंस ₹0 कर दिया गया।` 
        : `${user.fullName}'s wallet has been reset to ₹0.`);
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserPhone || !newUserName) {
      alert(language === 'hi' ? 'कृपया मोबाइल नंबर और नाम भरें।' : 'Please provide name and phone number.');
      return;
    }
    addUserByAdmin({
      phone: newUserPhone,
      fullName: newUserName,
      fatherName: newUserFatherName,
      dob: newUserDob,
      age: newUserAge,
      city: newUserCity,
      role: newUserRole,
      status: newUserStatus,
      referredBy: newUserReferredBy.trim().toUpperCase() || undefined,
    });

    setIsAddUserOpen(false);
    setNewUserPhone('');
    setNewUserName('');
    setNewUserFatherName('');
    setNewUserDob('');
    setNewUserAge('');
    setNewUserCity('');
    setNewUserReferredBy('');
    setActionNotice(language === 'hi' ? 'नया यूजर सफलतापूर्वक जोड़ा गया!' : 'New user added successfully!');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleExportUsersJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(usersList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Spa_Hub_Users_MLM_Registry_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      
      {/* Top Super Admin Header */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#081C15] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[#E9C46A] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <Crown className="w-4 h-4 text-amber-400" />
              {language === 'hi' ? 'मास्टर एडमिन कंट्रोल पैनल' : 'Master Super Admin Control Portal'}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif">
              {language === 'hi' ? 'यूजर, MLM रेफरल एवं वॉलेट नियंत्रण' : 'User Control, MLM Referral & Wallet Admin'}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm font-light leading-relaxed">
              {language === 'hi'
                ? 'सभी छात्रों को स्वीकृत (Approve) करें, रेफरल नेटवर्क ट्रैक करें, वॉलेट बैलेंस में इच्छानुसार पैसे जोड़ें या शून्य (₹0) करें, और AndroidIDE APK कोड एक्सपोर्ट करें।'
                : 'Approve new trainees, manage ₹300 MLM referral rewards, control user wallet balances directly, process payout requests, and export Android project packages.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsApkModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-[#D4A373] hover:bg-[#c29262] text-[#1B4332] font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>{language === 'hi' ? 'AndroidIDE / APK एक्सपोर्ट' : 'Export APK Project'}</span>
            </button>

            <button
              onClick={() => setActiveTab('ebook')}
              className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'hi' ? 'कोर्स व्यू (Student View)' : 'Student Course View'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-sm font-bold flex items-center gap-3 animate-fadeIn">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        
        {/* Total Users */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'कुल यूजर्स' : 'Total Users'}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">{totalUsers}</div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-amber-200 dark:border-amber-900/60 shadow-sm space-y-1 bg-amber-50/40">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{language === 'hi' ? 'स्वीकृति पेंडिंग' : 'Pending Approval'}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-600">{pendingUsers}</div>
        </div>

        {/* Active Approved */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            <span>{language === 'hi' ? 'सक्रिय / स्वीकृत' : 'Active'}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600">{activeUsers}</div>
        </div>

        {/* Total System Wallet Balance */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D4A373] flex items-center gap-1.5">
            <Wallet className="w-4 h-4" />
            <span>{language === 'hi' ? 'कुल वॉलेट राशि' : 'Total Wallet Bal'}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 dark:text-stone-100">
            ₹{totalSystemWalletBalance.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Pending Withdrawals */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4" />
            <span>{language === 'hi' ? 'निकासी अनुरोध' : 'Payout Requests'}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-rose-600">{pendingWithdrawalsCount}</div>
        </div>

      </div>

      {/* Admin Tabs: Users Directory vs Withdrawal Requests */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-4">
        <button
          onClick={() => setActiveAdminTab('users')}
          className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeAdminTab === 'users'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{language === 'hi' ? 'यूजर एवं वॉलेट डायरेक्टरी' : 'Users & Wallet Directory'}</span>
          <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-xs">{usersList.length}</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('withdrawals')}
          className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeAdminTab === 'withdrawals'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>{language === 'hi' ? 'UPI निकासी / पेआउट अनुरोध' : 'UPI Payout Requests'}</span>
          {pendingWithdrawalsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-xs font-bold animate-pulse">
              {pendingWithdrawalsCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: USERS DIRECTORY & WALLET CONTROL */}
      {activeAdminTab === 'users' && (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={language === 'hi' ? 'नाम, मोबाइल, रेफरल कोड खोजें...' : 'Search by name, phone, ref code...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'pending', 'active', 'blocked', 'admin'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition whitespace-nowrap ${
                      statusFilter === tab
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                    }`}
                  >
                    {tab === 'all' && (language === 'hi' ? 'सभी' : 'All')}
                    {tab === 'pending' && (language === 'hi' ? 'प्रतीक्षारत (Pending)' : 'Pending')}
                    {tab === 'active' && (language === 'hi' ? 'स्वीकृत (Active)' : 'Active')}
                    {tab === 'blocked' && (language === 'hi' ? 'ब्लॉक' : 'Blocked')}
                    {tab === 'admin' && (language === 'hi' ? 'एडमिन' : 'Admins')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsAddUserOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{language === 'hi' ? 'नया यूजर जोड़ें' : 'Add User'}</span>
              </button>

              <button
                onClick={handleExportUsersJson}
                className="px-3.5 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5"
                title="Export Registry JSON"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'hi' ? 'एक्सपोर्ट' : 'Export'}</span>
              </button>
            </div>
          </div>

          {/* Users Table with Referral Info & Wallet Controls */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-[11px] uppercase tracking-wider text-stone-500 font-bold">
                  <th className="pb-3 pl-2">{language === 'hi' ? 'उपयोगकर्ता / छात्र' : 'User / Trainee'}</th>
                  <th className="pb-3">{language === 'hi' ? 'मोबाइल' : 'Phone'}</th>
                  <th className="pb-3">{language === 'hi' ? 'रेफरल विवरण' : 'Referral / MLM'}</th>
                  <th className="pb-3">{language === 'hi' ? 'स्थिति (Status)' : 'Status'}</th>
                  <th className="pb-3">{language === 'hi' ? 'वॉलेट शेष (₹)' : 'Wallet Balance'}</th>
                  <th className="pb-3 pr-2 text-right">{language === 'hi' ? 'एडमिन नियंत्रण' : 'Admin Controls'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-xs sm:text-sm">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-500">
                      {language === 'hi' ? 'कोई उपयोगकर्ता नहीं मिला।' : 'No users found.'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => {
                    const isMaster = normalizePhone(user.phone) === MASTER_ADMIN_PHONE;
                    return (
                      <tr key={user.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition">
                        
                        {/* Student Name & Avatar */}
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                              isMaster
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300'
                                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            }`}>
                              {isMaster ? <Crown className="w-5 h-5" /> : (user.fullName ? user.fullName[0].toUpperCase() : 'U')}
                            </div>
                            <div>
                              <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                                <span>{user.fullName || 'Student'}</span>
                                {isMaster && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold">
                                    MASTER ADMIN
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-stone-500">
                                {user.fatherName ? `S/O: ${user.fatherName}` : ''} {user.city ? `• ${user.city}` : ''}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Mobile Number */}
                        <td className="py-4 font-mono font-medium text-stone-700 dark:text-stone-300">
                          +91 {user.phone}
                        </td>

                        {/* MLM Referral info */}
                        <td className="py-4">
                          <div className="text-xs space-y-0.5">
                            <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                              <Share2 className="w-3 h-3" />
                              <span>Code: {user.referralCode || 'SPA----'}</span>
                            </div>
                            {user.referredBy ? (
                              <div className="text-[11px] text-stone-500">
                                Invited By: <strong className="text-amber-700 dark:text-amber-400 font-mono">{user.referredBy}</strong>
                              </div>
                            ) : (
                              <div className="text-[10px] text-stone-400">Direct Entry</div>
                            )}
                          </div>
                        </td>

                        {/* Status (Pending / Active / Blocked) */}
                        <td className="py-4">
                          {user.status === 'active' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                              {language === 'hi' ? 'स्वीकृत (Active)' : 'Active'}
                            </span>
                          )}
                          {user.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                              <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                              {language === 'hi' ? 'प्रतीक्षारत (Pending)' : 'Pending'}
                            </span>
                          )}
                          {user.status === 'blocked' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              {language === 'hi' ? 'ब्लॉक' : 'Blocked'}
                            </span>
                          )}
                        </td>

                        {/* Wallet Balance Column */}
                        <td className="py-4">
                          <div className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1">
                            <span className="text-emerald-600">₹{(user.walletBalance || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="text-[10px] text-stone-400">
                            Earned: ₹{(user.totalEarned || 0).toLocaleString('en-IN')}
                          </div>
                        </td>

                        {/* Actions & Full Wallet Controls */}
                        <td className="py-4 pr-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* APPROVE BUTTON (Auto Credits ₹300 to Referrer!) */}
                            {user.status !== 'active' && (
                              <button
                                onClick={() => handleApproveWithBonus(user.id, user.fullName)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1"
                                title="Approve Student & Auto-credit ₹300 to Referrer"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>{language === 'hi' ? 'स्वीकृत करें' : 'Approve'}</span>
                              </button>
                            )}

                            {/* WALLET CONTROL BUTTON */}
                            <button
                              onClick={() => {
                                setActiveWalletUser(user);
                                setCustomWalletAmount(user.walletBalance ? user.walletBalance.toString() : '0');
                                setWalletActionType('set');
                              }}
                              className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-100 hover:text-emerald-800 text-stone-700 dark:text-stone-300 text-xs font-bold transition flex items-center gap-1"
                              title="Edit / Adjust Wallet Balance"
                            >
                              <Wallet className="w-3.5 h-3.5" />
                              <span>{language === 'hi' ? 'वॉलेट' : 'Wallet'}</span>
                            </button>

                            {/* 1-Click Zero Wallet */}
                            {(user.walletBalance || 0) > 0 && (
                              <button
                                onClick={() => handleQuickResetWallet(user)}
                                className="px-2 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-rose-100 hover:text-rose-700 text-stone-500 text-xs font-bold transition"
                                title="Reset Wallet to ₹0"
                              >
                                <span>₹0</span>
                              </button>
                            )}

                            {/* Block/Unblock */}
                            {!isMaster && (
                              user.status === 'blocked' ? (
                                <button
                                  onClick={() => unblockUser(user.id)}
                                  className="px-2 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition"
                                  title="Unblock"
                                >
                                  {language === 'hi' ? 'अनब्लॉक' : 'Unblock'}
                                </button>
                              ) : (
                                <button
                                  onClick={() => blockUser(user.id)}
                                  className="px-2 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 text-rose-700 dark:text-rose-300 text-xs font-bold transition"
                                  title="Block User"
                                >
                                  {language === 'hi' ? 'ब्लॉक' : 'Block'}
                                </button>
                              )
                            )}

                            {/* Delete User */}
                            {!isMaster && (
                              <button
                                onClick={() => {
                                  if (window.confirm(language === 'hi' ? 'क्या आप इस यूजर को हटाना चाहते हैं?' : 'Delete this user?')) {
                                    deleteUser(user.id);
                                  }
                                }}
                                className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-red-100 hover:text-red-700 text-stone-400 transition"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: UPI WITHDRAWAL / PAYOUT REQUESTS */}
      {activeAdminTab === 'withdrawals' && (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                {language === 'hi' ? 'छात्रों के UPI पेआउट / निकासी अनुरोध' : 'Student UPI Payout Requests'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'hi' 
                  ? 'छात्रों द्वारा भेजे गए UPI ट्रांसफर अनुरोधों को स्वीकृत करें या अस्वीकृत कर रिफंड करें।' 
                  : 'Verify student withdrawal requests and mark as paid.'}
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              {withdrawalRequests.length} {language === 'hi' ? 'अनुरोध कुल' : 'Total Requests'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-[11px] uppercase tracking-wider text-stone-500 font-bold">
                  <th className="pb-3">{language === 'hi' ? 'छात्र का नाम' : 'Student Name'}</th>
                  <th className="pb-3">{language === 'hi' ? 'मोबाइल' : 'Phone'}</th>
                  <th className="pb-3">{language === 'hi' ? 'निकासी राशि' : 'Amount'}</th>
                  <th className="pb-3">{language === 'hi' ? 'UPI ID / बैंक' : 'UPI ID / Bank'}</th>
                  <th className="pb-3">{language === 'hi' ? 'तारीख' : 'Date'}</th>
                  <th className="pb-3">{language === 'hi' ? 'स्थिति' : 'Status'}</th>
                  <th className="pb-3 text-right">{language === 'hi' ? 'निर्णय (Action)' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {withdrawalRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-400">
                      {language === 'hi' ? 'कोई नया निकासी अनुरोध उपलब्ध नहीं है।' : 'No withdrawal requests found.'}
                    </td>
                  </tr>
                ) : (
                  withdrawalRequests.map(w => (
                    <tr key={w.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
                      <td className="py-3 font-bold text-stone-900 dark:text-stone-100">
                        {w.userName}
                      </td>
                      <td className="py-3 font-mono text-stone-600 dark:text-stone-300">
                        +91 {w.userPhone}
                      </td>
                      <td className="py-3 font-mono font-bold text-emerald-600 text-sm">
                        ₹{w.amount}
                      </td>
                      <td className="py-3">
                        <div className="font-mono font-semibold text-stone-800 dark:text-stone-200">{w.upiId}</div>
                        {w.bankDetails && <div className="text-[10px] text-stone-400">{w.bankDetails}</div>}
                      </td>
                      <td className="py-3 text-stone-500">
                        {w.requestDate}
                      </td>
                      <td className="py-3">
                        {w.status === 'approved' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {language === 'hi' ? 'भुगतान संपन्न (Paid)' : 'Paid'}
                          </span>
                        )}
                        {w.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            {language === 'hi' ? 'प्रतीक्षारत (Pending)' : 'Pending'}
                          </span>
                        )}
                        {w.status === 'rejected' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            {language === 'hi' ? 'अस्वीकृत व रिफंड' : 'Rejected'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {w.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                adminProcessWithdrawal(w.id, 'approved', 'एडमिन द्वारा UPI भुगतान संपन्न');
                                setActionNotice(language === 'hi' ? `₹${w.amount} का पेआउट स्वीकृत व मार्क किया गया!` : `Payout approved!`);
                              }}
                              className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                            >
                              {language === 'hi' ? 'भुगतान किया (Approve)' : 'Approve (Paid)'}
                            </button>
                            <button
                              onClick={() => {
                                adminProcessWithdrawal(w.id, 'rejected', 'अमान्य UPI विवरण');
                                setActionNotice(language === 'hi' ? `अनुरोध अस्वीकृत व ₹${w.amount} छात्र के वॉलेट में वापस रिफंड किए गए!` : `Rejected & refunded!`);
                              }}
                              className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 font-bold text-xs transition"
                            >
                              {language === 'hi' ? 'अस्वीकृत (Refund)' : 'Reject'}
                            </button>
                          </div>
                        ) : (
                          <span className="text-stone-400 font-mono text-[11px]">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WALLET CONTROL MODAL FOR SPECIFIC USER */}
      {activeWalletUser && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center font-bold">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">
                    {language === 'hi' ? 'वॉलेट नियंत्रण एवं राशि संशोधन' : 'User Wallet Administration'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {activeWalletUser.fullName} (+91 {activeWalletUser.phone})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveWalletUser(null)}
                className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500"
              >
                ✕
              </button>
            </div>

            {/* Current Balance Display */}
            <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/80 flex items-center justify-between">
              <span className="text-xs text-stone-600 dark:text-stone-300 font-semibold">
                {language === 'hi' ? 'वर्तमान वॉलेट बैलेंस:' : 'Current Balance:'}
              </span>
              <span className="text-2xl font-mono font-bold text-emerald-600">
                ₹{(activeWalletUser.walletBalance || 0).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Quick 1-Click Options */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setWalletActionType('set');
                  setCustomWalletAmount('0');
                  setWalletReason('एडमिन द्वारा वॉलेट रीसेट (₹0)');
                }}
                className="flex-1 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition"
              >
                {language === 'hi' ? 'शून्य (₹0) करें' : 'Reset to ₹0'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setWalletActionType('add');
                  setCustomWalletAmount('300');
                  setWalletReason('मैन्युअल रेफरल बोनस ₹300');
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition"
              >
                +₹300 जोड़ें
              </button>
              <button
                type="button"
                onClick={() => {
                  setWalletActionType('add');
                  setCustomWalletAmount('500');
                  setWalletReason('विशेष इंसेंटिव ₹500');
                }}
                className="flex-1 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition"
              >
                +₹500 जोड़ें
              </button>
            </div>

            <form onSubmit={handleWalletSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'hi' ? 'क्रिया प्रकार (Action Type)' : 'Action'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setWalletActionType('add')}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      walletActionType === 'add' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    + जोड़ें (Add)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWalletActionType('deduct')}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      walletActionType === 'deduct' ? 'bg-rose-700 text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    - काटें (Deduct)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWalletActionType('set')}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      walletActionType === 'set' ? 'bg-blue-700 text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    = सेट करें (Set)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'hi' ? 'राशि (₹) *' : 'Amount (₹) *'}
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={customWalletAmount}
                  onChange={e => setCustomWalletAmount(e.target.value)}
                  placeholder="e.g. 300"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'hi' ? 'कारण / नोट (Reason/Note)' : 'Reason / Note'}
                </label>
                <input
                  type="text"
                  value={walletReason}
                  onChange={e => setWalletReason(e.target.value)}
                  placeholder="e.g. Referral reward adjustment"
                  className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 outline-none text-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveWalletUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs transition"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition"
                >
                  {language === 'hi' ? 'वॉलेट अपडेट करें' : 'Update Wallet'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-lg w-full bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">
                    {language === 'hi' ? 'नया छात्र / यूजर जोड़ें' : 'Add New Student or Admin'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {language === 'hi' ? 'विवरण भरें और स्थिति निर्धारित करें' : 'Provide custom details and set status'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'hi' ? 'मोबाइल नंबर (10 अंक) *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={newUserPhone}
                  onChange={e => setNewUserPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'hi' ? 'रेफरल कोड (किसके द्वारा रेफर किया गया - वैकल्पिक)' : 'Referred By Code (Optional)'}
                </label>
                <input
                  type="text"
                  value={newUserReferredBy}
                  onChange={e => setNewUserReferredBy(e.target.value.toUpperCase())}
                  placeholder="e.g. SPA3210"
                  className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 uppercase text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'hi' ? 'पिता का नाम' : 'Father’s Name'}
                  </label>
                  <input
                    type="text"
                    value={newUserFatherName}
                    onChange={e => setNewUserFatherName(e.target.value)}
                    placeholder="Suresh Sharma"
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'hi' ? 'शहर / राज्य' : 'City'}
                  </label>
                  <input
                    type="text"
                    value={newUserCity}
                    onChange={e => setNewUserCity(e.target.value)}
                    placeholder="Mumbai / Delhi"
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'hi' ? 'जन्म तिथि (DOB)' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    value={newUserDob}
                    onChange={e => setNewUserDob(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'hi' ? 'उम्र (Age)' : 'Age'}
                  </label>
                  <input
                    type="number"
                    value={newUserAge}
                    onChange={e => setNewUserAge(e.target.value)}
                    placeholder="25"
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'hi' ? 'रोल' : 'Role'}
                  </label>
                  <select
                    value={newUserRole}
                    onChange={e => setNewUserRole(e.target.value as UserRole)}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs outline-none"
                  >
                    <option value="student">Student (छात्र)</option>
                    <option value="admin">Admin (प्रशासक)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'hi' ? 'स्थिति' : 'Status'}
                  </label>
                  <select
                    value={newUserStatus}
                    onChange={e => setNewUserStatus(e.target.value as UserStatus)}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs outline-none"
                  >
                    <option value="active">Active (स्वीकृत)</option>
                    <option value="pending">Pending (प्रतीक्षारत)</option>
                    <option value="blocked">Blocked (ब्लॉक)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs transition"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition"
                >
                  {language === 'hi' ? 'यूजर सेव करें' : 'Save & Register User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AndroidIDE APK Project Exporter Modal */}
      <AndroidideApkModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

    </div>
  );
};
