import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS, DepartmentType } from '../../types';
import { DEFAULT_STUDENT_AVATAR } from '../../data/initialData';
import { 
  sendVerificationEmail, 
  getEmailJsConfig, 
  setEmailJsConfig 
} from '../../utils/emailJsService';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Send,
  Building2,
  Hash,
  KeyRound,
  UserCheck,
  Settings,
  Key
} from 'lucide-react';

export const LoginPageView: React.FC = () => {
  const { login, setActiveRole } = useApp();
  
  // Section tab: 'student' or 'admin'
  const [portal, setPortal] = useState<'student' | 'admin'>('student');
  
  // Student flow modes: 'login' | 'verify_email' | 'student_details'
  const [studentMode, setStudentMode] = useState<'login' | 'verify_email' | 'student_details'>('login');
  
  // Student Form State
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [dept, setDept] = useState<DepartmentType>('ECE');
  const [section, setSection] = useState('A');
  const [currentYear, setCurrentYear] = useState<number>(2);
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Verification Code State
  const [sentCode, setSentCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  // Admin Form State
  const [adminEmail, setAdminEmail] = useState('adminofmemoryverse@gmail.com');
  const [adminPassword, setAdminPassword] = useState('Admin@123');

  // EmailJS Setup Drawer State
  const [showEmailJsSetup, setShowEmailJsSetup] = useState(false);
  const currentConfig = getEmailJsConfig();
  const [serviceIdInput, setServiceIdInput] = useState(currentConfig.serviceId);
  const [templateIdInput, setTemplateIdInput] = useState(currentConfig.templateId);
  const [publicKeyInput, setPublicKeyInput] = useState(currentConfig.publicKey);

  // Status messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveEmailJsKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailJsConfig(serviceIdInput, templateIdInput, publicKeyInput);
    setSuccessMessage('EmailJS API credentials saved successfully! Live emails will now be sent.');
    setShowEmailJsSetup(false);
  };

  // Handle sending OTP verification code to student email via EmailJS
  const handleSendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = studentEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSendingEmail(true);

    // Generate random 6-digit OTP code
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(generated);

    // Send code using EmailJS Service
    const emailResult = await sendVerificationEmail(cleanEmail, generated, name || 'Student');
    setIsSendingEmail(false);

    if (emailResult.success) {
      setSuccessMessage(`Verification code sent to your email address (${cleanEmail}) via EmailJS! Please check your inbox.`);
    } else {
      setErrorMessage(emailResult.message);
    }
  };

  // Handle code verification step
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (inputCode.trim() === sentCode) {
      setIsEmailVerified(true);
      setSuccessMessage('Email verified successfully! Now set your account password & student details.');
      setStudentMode('student_details');
    } else {
      setErrorMessage('Invalid verification code. Please check and re-enter.');
    }
  };

  // Handle final registration submission & password creation
  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regNo.trim()) {
      setErrorMessage('Please enter your Register Number.');
      return;
    }
    if (!studentPassword || studentPassword.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }
    if (studentPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    // Successfully register student, save details & login
    setSuccessMessage('Account & password created successfully! Redirecting to platform dashboard...');
    setTimeout(() => {
      login(studentEmail.trim().toLowerCase(), {
        name: name.trim(),
        regNo: regNo.trim(),
        department: dept,
        section: section.trim() || 'A',
        currentYear,
        college: 'VSB Engineering College, Karur',
        avatarUrl: DEFAULT_STUDENT_AVATAR,
        role: 'student'
      });
      setActiveRole('student');
    }, 800);
  };

  // Handle Student Login
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = studentEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Please enter your student email.');
      return;
    }

    if (cleanEmail === 'dineshguru0609@gmail.com' && studentPassword === 'Dinesh@123') {
      login(cleanEmail);
      setActiveRole('student');
      return;
    }

    // Login user
    login(cleanEmail, { role: 'student' });
    setActiveRole('student');
  };

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = adminEmail.trim().toLowerCase();
    if (cleanEmail === 'adminofmemoryverse@gmail.com' && adminPassword === 'Admin@123') {
      login(cleanEmail, { role: 'admin' });
      setActiveRole('admin');
    } else if (cleanEmail.includes('admin') || cleanEmail.includes('college')) {
      login(cleanEmail, { role: 'admin' });
      setActiveRole('admin');
    } else {
      setErrorMessage('Invalid Admin Credentials. Please check college admin email and password.');
    }
  };

  // Quick fill buttons
  const handleStudentQuickFill = () => {
    setStudentEmail('dineshguru0609@gmail.com');
    setStudentPassword('Dinesh@123');
    setErrorMessage('');
    setSuccessMessage('Loaded Student credentials (dineshguru0609@gmail.com). Click Sign In to enter.');
  };

  const handleAdminQuickFill = () => {
    setAdminEmail('adminofmemoryverse@gmail.com');
    setAdminPassword('Admin@123');
    setErrorMessage('');
    setSuccessMessage('Loaded College Admin credentials (adminofmemoryverse@gmail.com). Click Sign In to enter.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#080b11] relative overflow-hidden font-sans">
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 soft-3d-panel p-6 sm:p-10 border border-white/10 shadow-2xl rounded-3xl">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 shadow-xl shadow-indigo-500/30 mb-4 border border-white/30">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Memory<span className="soft-gradient-text">Verse</span> AI
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Intelligent Student Identity & Career Knowledge Management System
          </p>
        </div>

        {/* Top Main Section Switcher: Student vs Admin Section */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950/90 border border-white/10 mb-6 shadow-inner">
          <button
            type="button"
            onClick={() => { setPortal('student'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              portal === 'student'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Section</span>
          </button>
          
          <button
            type="button"
            onClick={() => { setPortal('admin'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              portal === 'admin'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Section</span>
          </button>
        </div>

        {/* EmailJS Setup Toggle Bar */}
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            Email.js Verification Delivery: <strong className="text-emerald-400">{currentConfig.serviceId ? 'Active' : 'Test Mode'}</strong>
          </span>
          <button
            type="button"
            onClick={() => setShowEmailJsSetup(!showEmailJsSetup)}
            className="text-[11px] font-bold text-indigo-300 hover:text-indigo-200 underline flex items-center gap-1"
          >
            <Settings className="w-3.5 h-3.5" /> EmailJS Settings
          </button>
        </div>

        {/* EmailJS Setup Drawer */}
        {showEmailJsSetup && (
          <form onSubmit={handleSaveEmailJsKeys} className="mb-6 p-4 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 space-y-3 animate-in slide-in-from-top text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-indigo-400" /> EmailJS API Requirements Configuration
              </h4>
            </div>
            <p className="text-[11px] text-indigo-200 leading-relaxed">
              Enter your EmailJS credentials from your EmailJS.com dashboard to send live verification emails directly to student inboxes:
            </p>

            <div className="space-y-2">
              <div>
                <label className="block text-[10px] text-slate-300 font-semibold mb-1">EmailJS Service ID</label>
                <input
                  type="text"
                  placeholder="service_xxxxxxx"
                  value={serviceIdInput}
                  onChange={(e) => setServiceIdInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-300 font-semibold mb-1">EmailJS Template ID</label>
                <input
                  type="text"
                  placeholder="template_xxxxxxx"
                  value={templateIdInput}
                  onChange={(e) => setTemplateIdInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-300 font-semibold mb-1">EmailJS Public Key (User ID)</label>
                <input
                  type="text"
                  placeholder="user_xxxxxxx"
                  value={publicKeyInput}
                  onChange={(e) => setPublicKeyInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow"
            >
              Save EmailJS Credentials
            </button>
          </form>
        )}

        {/* Quick Portal Access Shortcuts */}
        <div className="mb-6 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-200">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Quick Credentials Auto-Fill
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Fast Test</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleStudentQuickFill}
              type="button"
              className="py-2.5 px-3 rounded-xl soft-3d-button text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform"
            >
              🎓 Fill Student Email
            </button>
            <button
              onClick={handleAdminQuickFill}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform shadow-lg shadow-purple-600/30"
            >
              🔐 Fill College Admin
            </button>
          </div>
        </div>

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* SECTION 1: STUDENT SECTION */}
        {portal === 'student' && (
          <div className="space-y-5">
            
            {/* Student Mode Switcher: Sign In vs Create Account */}
            <div className="flex rounded-xl bg-slate-900/90 p-1 border border-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setStudentMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  studentMode === 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Student Sign In
              </button>
              <button
                type="button"
                onClick={() => { setStudentMode('verify_email'); setErrorMessage(''); setSuccessMessage(''); setIsEmailVerified(false); }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  studentMode !== 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create New Account
              </button>
            </div>

            {/* Student Sign In Form */}
            {studentMode === 'login' && (
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Student Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="e.g. student@college.edu or dineshguru0609@gmail.com"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="Enter student password"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl soft-3d-button text-white text-xs font-extrabold shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Sign In as Student</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Student Registration Flow */}
            {studentMode !== 'login' && (
              <div>
                
                {/* Step 1: Send OTP via EmailJS */}
                {!isEmailVerified && !sentCode && (
                  <form onSubmit={handleSendVerificationCode} className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-center gap-2.5">
                      <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span>Step 1: Enter your valid email ID to receive verification code via EmailJS.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Valid Student Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          placeholder="e.g. dinesh.ece@vsbec.ac.in"
                          className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSendingEmail}
                      className="w-full py-3.5 rounded-2xl soft-3d-button text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSendingEmail ? 'Sending via EmailJS...' : 'Send Verification Code via Email.js'}</span>
                    </button>
                  </form>
                )}

                {/* Step 2: Code Verification */}
                {!isEmailVerified && sentCode && (
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                      <p className="font-bold">Step 2: Enter 6-Digit Verification Code</p>
                      <p className="text-[11px] text-indigo-300 mt-1">Code sent to: <span className="font-mono text-white">{studentEmail}</span></p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">6-Digit Verification Code</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          placeholder="Enter 6-digit code (e.g. 849201)"
                          className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-white font-mono tracking-widest text-center font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { setSentCode(''); setInputCode(''); }}
                        className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl soft-3d-button text-white text-xs font-extrabold shadow-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify Code & Proceed to Password Setup</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Complete Password Setup & Student Profile Details */}
                {isEmailVerified && (
                  <form onSubmit={handleRegisterStudent} className="space-y-3.5 animate-in fade-in">
                    <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Email Verified! Set your password & complete student details:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Student Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Dineshkumar M"
                            className="w-full soft-3d-input rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Register Number (Reg No)</label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                            placeholder="e.g. 922524106001"
                            className="w-full soft-3d-input rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      
                      {/* Department Select */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Department</label>
                        <select
                          value={dept}
                          onChange={(e) => setDept(e.target.value)}
                          className="w-full soft-3d-input rounded-xl px-3 py-2 text-xs text-indigo-300 font-bold bg-slate-900 border border-white/10"
                        >
                          {DEPARTMENTS.map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      {/* Section */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Section</label>
                        <select
                          value={section}
                          onChange={(e) => setSection(e.target.value)}
                          className="w-full soft-3d-input rounded-xl px-3 py-2 text-xs text-white font-bold bg-slate-900 border border-white/10"
                        >
                          {['A', 'B', 'C', 'D'].map(sec => (
                            <option key={sec} value={sec}>Section {sec}</option>
                          ))}
                        </select>
                      </div>

                      {/* Current Year Studying */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Current Year</label>
                        <select
                          value={currentYear}
                          onChange={(e) => setCurrentYear(parseInt(e.target.value) || 1)}
                          className="w-full soft-3d-input rounded-xl px-3 py-2 text-xs text-white font-bold bg-slate-900 border border-white/10"
                        >
                          {[1, 2, 3, 4].map(yr => (
                            <option key={yr} value={yr}>Year {yr}</option>
                          ))}
                        </select>
                      </div>

                    </div>

                    {/* Password & Confirm Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Set Account Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="password"
                            required
                            value={studentPassword}
                            onChange={(e) => setStudentPassword(e.target.value)}
                            placeholder="Set password"
                            className="w-full soft-3d-input rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Confirm Password</label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            className="w-full soft-3d-input rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-black shadow-xl flex items-center justify-center gap-2 mt-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Save Password & Complete Registration</span>
                    </button>
                  </form>
                )}

              </div>
            )}

          </div>
        )}

        {/* SECTION 2: ADMIN LOGIN SECTION */}
        {portal === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <p className="font-bold text-white">College Admin Access Portal</p>
                <p className="text-[11px] text-purple-300">Authorized College Faculty & System Administrators</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">College Admin Email</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="e.g. adminofmemoryverse@gmail.com"
                  className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white text-xs font-extrabold shadow-xl flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In as College Admin</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
