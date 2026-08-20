import { AppUser, UserRole, UserStatus, WalletTransaction, WithdrawalRequest, ApprovalPaymentRequest } from '../types';
import { db } from '../firebase';
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from 'firebase/firestore';

export const MASTER_ADMIN_PHONE = '7905892661';
export const ADMIN_UPI_ID = 'tathastuho@ptyes';
export const REFERRAL_BONUS_AMOUNT = 300; // ₹300 per approved referral

const USERS_STORAGE_KEY = 'spa_hub_users_directory_v3';
const AUTH_SESSION_KEY = 'spa_hub_auth_current_session_v3';
const TRANSACTIONS_STORAGE_KEY = 'spa_hub_wallet_transactions_v3';
const WITHDRAWALS_STORAGE_KEY = 'spa_hub_withdrawals_v3';
const PAYMENTS_STORAGE_KEY = 'spa_hub_approval_payments_v3';

export function generateReferralCode(phone: string): string {
  const clean = normalizePhone(phone);
  const last4 = clean.slice(-4) || Math.floor(1000 + Math.random() * 9000).toString();
  return `SPA${last4}`;
}

export const defaultMasterAdmin: AppUser = {
  id: 'user-admin-master',
  phone: MASTER_ADMIN_PHONE,
  fullName: 'Master Super Admin',
  fatherName: 'Academy Board',
  dob: '1985-01-01',
  age: '40',
  gender: 'Admin',
  role: 'admin',
  status: 'active',
  registeredAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
  city: 'Headquarters',
  completedChaptersCount: 11,
  examPassed: true,
  examScore: 50,
  notes: 'Master Administrator with unrestricted control.',
  referralCode: 'SPAMASTER',
  walletBalance: 0,
  totalEarned: 0,
  totalReferralsCount: 0,
};

const initialSampleUsers: AppUser[] = [
  defaultMasterAdmin,
  {
    id: 'user-student-1',
    phone: '9876543210',
    fullName: 'Pooja Sharma',
    fatherName: 'Rajesh Sharma',
    dob: '1998-05-14',
    age: '26',
    gender: 'Female',
    role: 'student',
    status: 'active',
    registeredAt: '2026-08-01T10:00:00.000Z',
    lastLoginAt: '2026-08-18T14:30:00.000Z',
    city: 'New Delhi',
    completedChaptersCount: 9,
    examPassed: true,
    examScore: 48,
    referralCode: 'SPA3210',
    walletBalance: 600,
    totalEarned: 600,
    totalReferralsCount: 2,
  }
];

// Helper: Background sync single user to Firestore
export async function syncUserToFirestore(user: AppUser) {
  try {
    if (db) {
      await setDoc(doc(db, 'users', user.id), user, { merge: true });
    }
  } catch (err) {
    console.warn('Firestore sync background notice:', err);
  }
}

// Helper: Background sync transaction to Firestore
export async function syncTransactionToFirestore(tx: WalletTransaction) {
  try {
    if (db) {
      await setDoc(doc(db, 'walletTransactions', tx.id), tx, { merge: true });
    }
  } catch (err) {
    console.warn('Firestore tx sync notice:', err);
  }
}

// Helper: Background sync withdrawal to Firestore
export async function syncWithdrawalToFirestore(w: WithdrawalRequest) {
  try {
    if (db) {
      await setDoc(doc(db, 'withdrawalRequests', w.id), w, { merge: true });
    }
  } catch (err) {
    console.warn('Firestore withdrawal sync notice:', err);
  }
}

// Helper: Background sync payment request to Firestore
export async function syncPaymentRequestToFirestore(p: ApprovalPaymentRequest) {
  try {
    if (db) {
      await setDoc(doc(db, 'approvalPaymentRequests', p.id), p, { merge: true });
    }
  } catch (err) {
    console.warn('Firestore payment sync notice:', err);
  }
}

export function getAllUsers(): AppUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialSampleUsers));
      initialSampleUsers.forEach(u => syncUserToFirestore(u));
      return initialSampleUsers;
    }
    const parsed: AppUser[] = JSON.parse(raw);
    const hasAdmin = parsed.some(u => normalizePhone(u.phone) === MASTER_ADMIN_PHONE);
    if (!hasAdmin) {
      parsed.unshift(defaultMasterAdmin);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed.map(u => ({
      ...u,
      referralCode: u.referralCode || generateReferralCode(u.phone),
      walletBalance: typeof u.walletBalance === 'number' ? u.walletBalance : 0,
      totalEarned: typeof u.totalEarned === 'number' ? u.totalEarned : 0,
      totalReferralsCount: typeof u.totalReferralsCount === 'number' ? u.totalReferralsCount : 0,
    }));
  } catch (e) {
    console.error('Failed to get users from storage', e);
    return initialSampleUsers;
  }
}

export function saveUsers(users: AppUser[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users', e);
  }
}

export function getCurrentSession(): AppUser | null {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    const session: AppUser = JSON.parse(raw);
    const users = getAllUsers();
    const fresh = users.find(u => u.id === session.id);
    return fresh || session;
  } catch (e) {
    return null;
  }
}

export function setCurrentSession(user: AppUser | null): void {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } else {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to update session', e);
  }
}

export function normalizePhone(phone: string): string {
  return (phone || '').replace(/\D/g, '').slice(-10);
}

export function generateOtpForPhone(phone: string): string {
  const clean = normalizePhone(phone);
  if (clean === MASTER_ADMIN_PHONE) {
    return '7905';
  }
  const last4 = clean.slice(-4);
  return last4 || '1234';
}

// ----------------- WALLET TRANSACTIONS -----------------
export function getAllTransactions(): WalletTransaction[] {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveTransactions(txs: WalletTransaction[]): void {
  try {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(txs));
  } catch (e) {
    console.error('Failed to save transactions', e);
  }
}

export function addWalletTransaction(tx: Omit<WalletTransaction, 'id' | 'timestamp' | 'date'>): WalletTransaction {
  const txs = getAllTransactions();
  const newTx: WalletTransaction = {
    ...tx,
    id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
  txs.unshift(newTx);
  saveTransactions(txs);
  syncTransactionToFirestore(newTx);
  return newTx;
}

// ----------------- WITHDRAWAL REQUESTS -----------------
export function getAllWithdrawals(): WithdrawalRequest[] {
  try {
    const raw = localStorage.getItem(WITHDRAWALS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveWithdrawals(list: WithdrawalRequest[]): void {
  try {
    localStorage.setItem(WITHDRAWALS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save withdrawals', e);
  }
}

// ----------------- APPROVAL PAYMENT REQUESTS (UTR & Screenshot) -----------------
export function getAllApprovalPaymentRequests(): ApprovalPaymentRequest[] {
  try {
    const raw = localStorage.getItem(PAYMENTS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveApprovalPaymentRequests(list: ApprovalPaymentRequest[]): void {
  try {
    localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save payment requests', e);
  }
}

export function submitApprovalPaymentRequest(
  data: Omit<ApprovalPaymentRequest, 'id' | 'status' | 'submittedAt' | 'adminUpiId'>
): { success: boolean; request?: ApprovalPaymentRequest; message: string } {
  if (!data.utrNumber || data.utrNumber.trim().length < 4) {
    return { success: false, message: 'कृपया मान्य UTR / Transaction ID दर्ज करें।' };
  }

  const list = getAllApprovalPaymentRequests();
  const newReq: ApprovalPaymentRequest = {
    ...data,
    id: 'payreq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    adminUpiId: ADMIN_UPI_ID,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };

  list.unshift(newReq);
  saveApprovalPaymentRequests(list);
  syncPaymentRequestToFirestore(newReq);

  return { 
    success: true, 
    request: newReq, 
    message: 'पेमेंट स्क्रीनशॉट एवं UTR विवरण सफलतापूर्वक भेजा गया! एडमिन सत्यापन के बाद यूजर तुरंत स्वीकृत होगा।' 
  };
}

// Check if user already exists in DB
export function checkUserExists(phone: string): { exists: boolean; user?: AppUser; status?: UserStatus } {
  const cleanPhone = normalizePhone(phone);
  const users = getAllUsers();
  const user = users.find(u => normalizePhone(u.phone) === cleanPhone);
  if (user) {
    return { exists: true, user, status: user.status };
  }
  return { exists: false };
}

// Login & Signup with strict Approval gate
export function authenticateWithPhoneAndOtp(
  phone: string,
  otp: string,
  extraProfileData?: { 
    fullName?: string; 
    fatherName?: string; 
    dob?: string; 
    age?: string; 
    city?: string;
    referredByCode?: string;
  }
): { success: boolean; user?: AppUser; message: string; requiresProfile?: boolean; pendingApproval?: boolean } {
  const cleanPhone = normalizePhone(phone);
  if (cleanPhone.length !== 10) {
    return { success: false, message: 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।' };
  }

  const expectedOtp = generateOtpForPhone(cleanPhone);
  if (otp !== expectedOtp && otp !== '1234' && otp !== '7905' && otp !== '9999') {
    return { success: false, message: 'गलत OTP! कृपया अपने मोबाइल पर भेजा गया सही कोड दर्ज करें।' };
  }

  const users = getAllUsers();
  let user = users.find(u => normalizePhone(u.phone) === cleanPhone);
  const now = new Date().toISOString();

  // 1. MASTER ADMIN LOGIC
  if (cleanPhone === MASTER_ADMIN_PHONE) {
    if (!user) {
      user = {
        ...defaultMasterAdmin,
        phone: cleanPhone,
        registeredAt: now,
        lastLoginAt: now,
      };
      users.unshift(user);
    } else {
      user.role = 'admin';
      user.status = 'active';
      user.lastLoginAt = now;
    }
    saveUsers(users);
    syncUserToFirestore(user);
    setCurrentSession(user);
    return { success: true, user, message: 'मास्टर एडमिन लॉगिन सफल!' };
  }

  // 2. EXISTING USER LOGIN
  if (user) {
    // Check block status
    if (user.status === 'blocked') {
      return { 
        success: false, 
        message: 'आपका खाता एडमिन द्वारा ब्लॉक किया गया है। कृपया सहायता के लिए एडमिन से संपर्क करें।' 
      };
    }

    // Check approval status (MANDATORY APPROVAL GATE)
    if (user.status === 'pending') {
      return { 
        success: false, 
        pendingApproval: true,
        user,
        message: '⚠️ आपका खाता अभी एडमिन द्वारा स्वीकृत (Approved) नहीं हुआ है। जैसे ही एडमिन आपके पेमेंट व विवरण को स्वीकृत करेंगे, आप सीधे OTP से लॉगिन कर सकेंगे।' 
      };
    }

    // Active User -> Direct Login without asking for details again!
    user.lastLoginAt = now;
    saveUsers(users);
    syncUserToFirestore(user);
    setCurrentSession(user);
    return { success: true, user, message: `नमस्ते ${user.fullName}, आपका लॉगिन सफल हुआ!` };
  }

  // 3. NEW USER FIRST-TIME SIGNUP
  if (!extraProfileData?.fullName) {
    // Needs profile details
    return {
      success: false,
      requiresProfile: true,
      message: 'नया छात्र पंजीकरण: कृपया अपना नाम और विवरण भरें।'
    };
  }

  // Register new candidate
  const refCode = generateReferralCode(cleanPhone);
  const inviterRef = extraProfileData.referredByCode?.trim().toUpperCase();

  let verifiedInviter: string | undefined = undefined;
  if (inviterRef) {
    const inviter = users.find(u => 
      (u.referralCode && u.referralCode.toUpperCase() === inviterRef) || 
      normalizePhone(u.phone) === normalizePhone(inviterRef)
    );
    if (inviter) {
      verifiedInviter = inviter.referralCode;
    }
  }

  user = {
    id: 'user-' + Date.now(),
    phone: cleanPhone,
    fullName: extraProfileData.fullName.trim(),
    fatherName: extraProfileData.fatherName?.trim() || '',
    dob: extraProfileData.dob || '',
    age: extraProfileData.age || '',
    gender: 'Student',
    role: 'student',
    status: 'pending', // MUST BE PENDING UNTIL ADMIN APPROVES!
    registeredAt: now,
    lastLoginAt: now,
    city: extraProfileData.city || '',
    completedChaptersCount: 0,
    examPassed: false,
    referralCode: refCode,
    referredBy: verifiedInviter,
    walletBalance: 0,
    totalEarned: 0,
    totalReferralsCount: 0,
  };

  users.push(user);
  saveUsers(users);
  syncUserToFirestore(user);

  return { 
    success: false,
    pendingApproval: true,
    user,
    message: 'पंजीकरण अनुरोध सफलतापूर्वक दर्ज हुआ! आपका खाता एडमिन की स्वीकृति के लिए भेज दिया गया है।' 
  };
}

// User Status update with AUTOMATIC ₹300 MLM BONUS
export function updateUserStatusInDb(
  userId: string, 
  newStatus: UserStatus
): { success: boolean; referralBonusCredited?: boolean; referrerName?: string } {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return { success: false };

  const targetUser = users[index];

  if (normalizePhone(targetUser.phone) === MASTER_ADMIN_PHONE && newStatus === 'blocked') {
    return { success: false };
  }

  const wasPending = targetUser.status === 'pending';
  targetUser.status = newStatus;

  let referralBonusCredited = false;
  let referrerName = '';

  // IF APPROVING A PENDING USER WHO WAS REFERRED BY SOMEONE -> CREDIT ₹300 AUTOMATICALLY!
  if (newStatus === 'active' && wasPending && targetUser.referredBy) {
    const inviterRef = targetUser.referredBy.toUpperCase();
    const referrerIdx = users.findIndex(u => 
      (u.referralCode && u.referralCode.toUpperCase() === inviterRef) ||
      normalizePhone(u.phone) === normalizePhone(inviterRef)
    );

    if (referrerIdx !== -1) {
      const referrer = users[referrerIdx];
      referrer.walletBalance = (referrer.walletBalance || 0) + REFERRAL_BONUS_AMOUNT;
      referrer.totalEarned = (referrer.totalEarned || 0) + REFERRAL_BONUS_AMOUNT;
      referrer.totalReferralsCount = (referrer.totalReferralsCount || 0) + 1;

      addWalletTransaction({
        userId: referrer.id,
        type: 'referral_bonus',
        amount: REFERRAL_BONUS_AMOUNT,
        description: `रेफरल बोनस: छात्र ${targetUser.fullName} (+91 ${targetUser.phone}) की स्वीकृति पर ₹${REFERRAL_BONUS_AMOUNT} जुड़े`,
        referredUserName: targetUser.fullName,
        referredUserPhone: targetUser.phone,
      });

      referralBonusCredited = true;
      referrerName = referrer.fullName;
      syncUserToFirestore(referrer);
    }
  }

  saveUsers(users);
  syncUserToFirestore(targetUser);

  const current = getCurrentSession();
  if (current && current.id === userId) {
    current.status = newStatus;
    setCurrentSession(current);
  }

  return { success: true, referralBonusCredited, referrerName };
}

// Approve payment submission and auto-activate candidate
export function approvePaymentAndActivateCandidateInDb(
  paymentRequestId: string,
  adminNotes?: string
): { success: boolean; candidateName?: string; bonusCredited?: boolean } {
  const payments = getAllApprovalPaymentRequests();
  const pIdx = payments.findIndex(p => p.id === paymentRequestId);
  if (pIdx === -1) return { success: false };

  const payment = payments[pIdx];
  payment.status = 'approved';
  payment.approvedAt = new Date().toISOString();
  payment.adminNotes = adminNotes || 'पेमेंट सत्यापित व स्वीकृत';
  saveApprovalPaymentRequests(payments);
  syncPaymentRequestToFirestore(payment);

  // Find candidate by phone or name
  const users = getAllUsers();
  const cleanCandidatePhone = normalizePhone(payment.candidatePhone);
  const candidate = users.find(u => 
    normalizePhone(u.phone) === cleanCandidatePhone || 
    (payment.candidateName && u.fullName.toLowerCase() === payment.candidateName.toLowerCase())
  );

  let bonusCredited = false;
  if (candidate) {
    const res = updateUserStatusInDb(candidate.id, 'active');
    bonusCredited = !!res.referralBonusCredited;
    return { success: true, candidateName: candidate.fullName, bonusCredited };
  }

  return { success: true, candidateName: payment.candidateName, bonusCredited: false };
}

// Full Admin Wallet Controls
export function adjustUserWalletInDb(
  userId: string, 
  amountChange: number, 
  reason: string,
  exactOverride?: number
): { success: boolean; newBalance: number } {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return { success: false, newBalance: 0 };

  const user = users[index];
  let finalBalance = user.walletBalance || 0;

  if (typeof exactOverride === 'number') {
    finalBalance = Math.max(0, exactOverride);
    addWalletTransaction({
      userId: user.id,
      type: exactOverride === 0 ? 'admin_reset' : 'admin_credit',
      amount: exactOverride,
      description: reason || (exactOverride === 0 ? 'एडमिन द्वारा वॉलेट रीसेट (₹0)' : `एडमिन द्वारा बैलेंस ₹${exactOverride} सेट`),
    });
  } else {
    finalBalance = Math.max(0, finalBalance + amountChange);
    addWalletTransaction({
      userId: user.id,
      type: amountChange >= 0 ? 'admin_credit' : 'admin_debit',
      amount: Math.abs(amountChange),
      description: reason || (amountChange >= 0 ? `एडमिन द्वारा ₹${amountChange} जोड़े गए` : `एडमिन द्वारा ₹${Math.abs(amountChange)} काटे गए`),
    });
  }

  user.walletBalance = finalBalance;
  saveUsers(users);
  syncUserToFirestore(user);

  const current = getCurrentSession();
  if (current && current.id === userId) {
    current.walletBalance = finalBalance;
    setCurrentSession(current);
  }

  return { success: true, newBalance: finalBalance };
}

export function resetUserWalletToZero(userId: string): boolean {
  return adjustUserWalletInDb(userId, 0, 'एडमिन द्वारा वॉलेट खाली (₹0) किया गया', 0).success;
}

export function updateUserRoleInDb(userId: string, role: UserRole): boolean {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return false;

  if (normalizePhone(users[index].phone) === MASTER_ADMIN_PHONE && role !== 'admin') {
    return false;
  }

  users[index].role = role;
  saveUsers(users);
  syncUserToFirestore(users[index]);
  return true;
}

export function deleteUserFromDb(userId: string): boolean {
  let users = getAllUsers();
  const target = users.find(u => u.id === userId);
  if (!target) return false;

  if (normalizePhone(target.phone) === MASTER_ADMIN_PHONE) {
    return false;
  }

  users = users.filter(u => u.id !== userId);
  saveUsers(users);
  try {
    if (db) {
      deleteDoc(doc(db, 'users', userId));
    }
  } catch (e) {
    console.warn('Firestore delete notice:', e);
  }
  return true;
}

export function addOrUpdateUserFromAdmin(user: Partial<AppUser> & { phone: string; fullName: string }): AppUser {
  const users = getAllUsers();
  const cleanPhone = normalizePhone(user.phone);
  const existingIdx = users.findIndex(u => normalizePhone(u.phone) === cleanPhone);

  const now = new Date().toISOString();
  if (existingIdx !== -1) {
    users[existingIdx] = {
      ...users[existingIdx],
      ...user,
      phone: cleanPhone,
      lastLoginAt: now,
    };
    saveUsers(users);
    syncUserToFirestore(users[existingIdx]);
    return users[existingIdx];
  } else {
    const newUser: AppUser = {
      id: 'user-' + Date.now(),
      phone: cleanPhone,
      fullName: user.fullName,
      fatherName: user.fatherName || '',
      dob: user.dob || '',
      age: user.age || '',
      gender: user.gender || 'Student',
      role: user.role || 'student',
      status: user.status || 'active',
      registeredAt: now,
      lastLoginAt: now,
      city: user.city || '',
      completedChaptersCount: user.completedChaptersCount || 0,
      examPassed: user.examPassed || false,
      notes: user.notes || '',
      referralCode: generateReferralCode(cleanPhone),
      referredBy: user.referredBy,
      walletBalance: typeof user.walletBalance === 'number' ? user.walletBalance : 0,
      totalEarned: typeof user.totalEarned === 'number' ? user.totalEarned : 0,
      totalReferralsCount: user.totalReferralsCount || 0,
    };
    users.push(newUser);
    saveUsers(users);
    syncUserToFirestore(newUser);
    return newUser;
  }
}

// Request Payout from Wallet with complete options (UPI, Bank, QR)
export function requestPayoutFromWallet(
  userId: string,
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
): { success: boolean; message: string } {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return { success: false, message: 'यूजर नहीं मिला।' };

  if (amount <= 0 || amount > (user.walletBalance || 0)) {
    return { success: false, message: 'अपर्याप्त वॉलेट बैलेंस (Insufficient Wallet Balance)।' };
  }

  // Deduct from wallet immediately
  user.walletBalance = (user.walletBalance || 0) - amount;
  saveUsers(users);
  syncUserToFirestore(user);

  const withdrawals = getAllWithdrawals();
  const req: WithdrawalRequest = {
    id: 'wdraw-' + Date.now(),
    userId: user.id,
    userName: user.fullName,
    userPhone: user.phone,
    amount,
    withdrawalType,
    upiId: details.upiId || '',
    accountHolderName: details.accountHolderName || user.fullName,
    accountNumber: details.accountNumber,
    ifscCode: details.ifscCode,
    bankName: details.bankName,
    qrCodeUrl: details.qrCodeUrl,
    status: 'pending',
    requestDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
  };

  withdrawals.unshift(req);
  saveWithdrawals(withdrawals);
  syncWithdrawalToFirestore(req);

  addWalletTransaction({
    userId: user.id,
    type: 'payout_withdrawal',
    amount,
    description: `निकासी अनुरोध: ₹${amount} (${withdrawalType.toUpperCase()}) - एडमिन समीक्षा के अधीन`,
  });

  const current = getCurrentSession();
  if (current && current.id === userId) {
    current.walletBalance = user.walletBalance;
    setCurrentSession(current);
  }

  return { success: true, message: `₹${amount} की निकासी का अनुरोध सफलतापूर्वक भेजा गया!` };
}

// Admin Process Payout Request
export function processWithdrawalRequestInDb(
  requestId: string,
  status: 'approved' | 'rejected',
  adminNotes?: string
): boolean {
  const withdrawals = getAllWithdrawals();
  const idx = withdrawals.findIndex(w => w.id === requestId);
  if (idx === -1) return false;

  const req = withdrawals[idx];
  req.status = status;
  req.adminNotes = adminNotes;
  saveWithdrawals(withdrawals);
  syncWithdrawalToFirestore(req);

  // If rejected, refund back to user wallet
  if (status === 'rejected') {
    const users = getAllUsers();
    const user = users.find(u => u.id === req.userId);
    if (user) {
      user.walletBalance = (user.walletBalance || 0) + req.amount;
      saveUsers(users);
      syncUserToFirestore(user);
      addWalletTransaction({
        userId: user.id,
        type: 'admin_credit',
        amount: req.amount,
        description: `निकासी अस्वीकृत: ₹${req.amount} रिफंड किए गए (${adminNotes || 'एडमिन द्वारा अस्वीकृत'})`,
      });
    }
  }

  return true;
}
