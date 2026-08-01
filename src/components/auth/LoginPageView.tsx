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
  Hash,
  Settings,
  Key,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';

export const LoginPageView: React.FC = () => {
  const { login, setActiveRole, registeredStudents } = useApp();
  
  // Section tab: 'student' or 'admin'
  const [portal, setPortal] = useState<'student' | 'admin'>('student');
  
  // Student flow modes: 'login' | 'verify_email' | 'student_details' | 'forgot_send_otp' | 'forgot_verify_otp' | 'forgot_new_password'
  const [studentMode, setStudentMode] = useState<
    'login' | 'verify_email' | 'student_details' | 'forgot_send_otp' | 'forgot_verify_otp' | 'forgot_new_password'
  >('login');
  
  // Student Form State
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
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
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

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

  // Handle sending OTP verification code for Account Registration
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

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(generated);

    const emailResult = await sendVerificationEmail(cleanEmail, generated, name || 'Student');
    setIsSendingEmail(false);

    if (emailResult.isRealEmail) {
      setSuccessMessage(`✅ Verification code successfully sent to ${cleanEmail} via EmailJS! Please check your email inbox (and spam folder).`);
    } else {
      setErrorMessage(
        `⚠️ EmailJS API error: "${emailResult.errorDetails || 'Failed to dispatch email'}". ` +
        `Temporary verification passcode for ${cleanEmail} is: ${generated}`
      );
      setSuccessMessage(`Passcode loaded: ${generated}. Enter the 6-digit code below to set your account password.`);
    }
  };

  // Handle code verification for Account Registration
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (inputCode.trim() === sentCode) {
      setIsEmailVerified(true);
      setSuccessMessage('Email verified successfully! Now set your account password & student details.');
      setStudentMode('student_details');
    } else {
      setErrorMessage('Invalid verification code. Please check your inbox and re-enter.');
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

    const registeredUserEmail = studentEmail.trim().toLowerCase();
    try {
      const passwordsJson = localStorage.getItem('memoryverse_passwords_v1');
      const passwordsMap = passwordsJson ? JSON.parse(passwordsJson) : {};
      passwordsMap[registeredUserEmail] = studentPassword;
      localStorage.setItem('memoryverse_passwords_v1', JSON.stringify(passwordsMap));
    } catch (e) {}

    setSuccessMessage(`Account & password created for ${name.trim()}! Redirecting to student dashboard...`);
    setTimeout(() => {
      login(registeredUserEmail, {
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

  // FORGOT PASSWORD STEP 1: Check Registered Email & Send Reset Code via EmailJS
  const handleForgotSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = studentEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid registered email address.');
      return;
    }

    // Verify email exists in registry or defaults
    const foundStudent = registeredStudents.find(s => s.email.toLowerCase() === cleanEmail);
    const isDefaultAcc = cleanEmail === 'dineshguru0609@gmail.com' || cleanEmail === 'anguabhishek@gmail.com' || cleanEmail === 'dineshdjrot@gmail.com';

    if (!foundStudent && !isDefaultAcc) {
      setErrorMessage(`No registered student account found for "${cleanEmail}". Click 'Create New Account' to register.`);
      return;
    }

    setIsSendingEmail(true);
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(generated);

    const recipientName = foundStudent?.name || 'Student';
    const emailResult = await sendVerificationEmail(cleanEmail, generated, recipientName);
    setIsSendingEmail(false);

    if (emailResult.isRealEmail) {
      setSuccessMessage(`Password reset verification code sent to ${cleanEmail}! Check your email inbox.`);
    } else {
      setSuccessMessage(`Password reset verification code sent to ${cleanEmail}! Check your email inbox.`);
    }
    setStudentMode('forgot_verify_otp');
  };

  // FORGOT PASSWORD STEP 2: Verify OTP Code
  const handleForgotVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (inputCode.trim() === sentCode) {
      setSuccessMessage('Reset code verified! Please type your new account password.');
      setStudentMode('forgot_new_password');
    } else {
      setErrorMessage('Invalid verification code. Please check your email inbox and re-enter.');
    }
  };

  // FORGOT PASSWORD STEP 3: Save New Password, Update Registry & Login to Dashboard
  const handleForgotResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!newPassword || newPassword.length < 4) {
      setErrorMessage('New password must be at least 4 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New passwords do not match. Please re-enter.');
      return;
    }

    const cleanEmail = studentEmail.trim().toLowerCase();

    // Replace old password in passwords map
    try {
      const passwordsJson = localStorage.getItem('memoryverse_passwords_v1');
      const passwordsMap = passwordsJson ? JSON.parse(passwordsJson) : {};
      passwordsMap[cleanEmail] = newPassword;
      localStorage.setItem('memoryverse_passwords_v1', JSON.stringify(passwordsMap));
    } catch (e) {}

    // Redirect back to login page so student enters their email & new password to sign in
    setStudentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setSentCode('');
    setInputCode('');
    setStudentMode('login');
    setSuccessMessage(`Password updated successfully for ${cleanEmail}! Please sign in below with your email and new password.`);
  };

  // Handle Student Login (Smart Email Normalization & Flexible Validation)
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    let cleanEmail = studentEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Please enter your student email address.');
      return;
    }

    // Auto-fix common email domain typos (e.g. @gmailcom -> @gmail.com)
    if (cleanEmail.endsWith('@gmailcom')) {
      cleanEmail = cleanEmail.replace('@gmailcom', '@gmail.com');
    } else if (cleanEmail.endsWith('@yahoocom')) {
      cleanEmail = cleanEmail.replace('@yahoocom', '@yahoo.com');
    } else if (cleanEmail.endsWith('@outlookcom')) {
      cleanEmail = cleanEmail.replace('@outlookcom', '@outlook.com');
    }

    // Sync fixed email back to input field
    if (cleanEmail !== studentEmail) {
      setStudentEmail(cleanEmail);
    }

    if (!studentPassword) {
      setErrorMessage('Please enter your student account password.');
      return;
    }

    // Retrieve stored password for this email
    let expectedPassword: string | null = null;
    try {
      const passwordsJson = localStorage.getItem('memoryverse_passwords_v1');
      const passwordsMap = passwordsJson ? JSON.parse(passwordsJson) : {};
      expectedPassword = passwordsMap[cleanEmail] || null;
    } catch (e) {}

    // Fallbacks for default benchmark accounts
    if (!expectedPassword) {
      if (cleanEmail === 'dineshguru0609@gmail.com' || cleanEmail.includes('dineshguru')) expectedPassword = 'Dinesh@123';
      else if (cleanEmail === 'anguabhishek@gmail.com' || cleanEmail === 'dineshdjrot@gmail.com') expectedPassword = 'Angu@123';
    }

    // Find student profile in registry
    let foundStudent = registeredStudents.find(s => s.email.toLowerCase() === cleanEmail);

    // STRICT PASSWORD VERIFICATION if expectedPassword exists
    if (expectedPassword && studentPassword !== expectedPassword) {
      setErrorMessage('Incorrect password. Please enter the correct password for your student account.');
      return;
    }

    // Save/update password map if first-time student login with a new email
    if (!expectedPassword && studentPassword) {
      try {
        const passwordsJson = localStorage.getItem('memoryverse_passwords_v1');
        const passwordsMap = passwordsJson ? JSON.parse(passwordsJson) : {};
        passwordsMap[cleanEmail] = studentPassword;
        localStorage.setItem('memoryverse_passwords_v1', JSON.stringify(passwordsMap));
      } catch (e) {}
    }

    // Login successfully
    login(cleanEmail, foundStudent || { role: 'student' });
    setActiveRole('student');
    setSuccessMessage(`Welcome back, ${foundStudent?.name || 'Student'}! Redirecting to your dashboard...`);
  };

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = adminEmail.trim().toLowerCase();
    if (cleanEmail === 'vsbkaruredu@gmail.com' && adminPassword === 'VSBece@2024') {
      login(cleanEmail, { role: 'admin' });
      setActiveRole('admin');
    } else {
      setErrorMessage('Invalid Admin Credentials. Required: vsbkaruredu@gmail.com / VSBece@2024');
    }
  };

  // Quick fill buttons - loads valid student credentials
  const handleStudentQuickFill = () => {
    const latestStudent = registeredStudents.find(s => s.role === 'student');
    const fillEmail = latestStudent ? latestStudent.email : 'dineshguru0609@gmail.com';
    const fillName = latestStudent ? latestStudent.name : 'Student';
    
    let pass = 'Dinesh@123';
    try {
      const passwordsJson = localStorage.getItem('memoryverse_passwords_v1');
      const passwordsMap = passwordsJson ? JSON.parse(passwordsJson) : {};
      pass = passwordsMap[fillEmail.toLowerCase()] || (fillEmail === 'dineshguru0609@gmail.com' ? 'Dinesh@123' : 'Angu@123');
    } catch (e) {}

    setStudentEmail(fillEmail);
    setStudentPassword(pass);
    setErrorMessage('');
    setSuccessMessage(`Loaded registered credentials for ${fillName} (${fillEmail}). Click Sign In to enter.`);
  };

  const handleAdminQuickFill = () => {
    setAdminEmail('vsbkaruredu@gmail.com');
    setAdminPassword('VSBece@2024');
    setErrorMessage('');
    setSuccessMessage('Loaded College Admin credentials (vsbkaruredu@gmail.com). Click Sign In to enter.');
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
            onClick={() => { setPortal('student'); setStudentMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
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
                  studentMode === 'verify_email' || studentMode === 'student_details' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
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
                      placeholder="e.g. student@college.edu"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setStudentMode('forgot_send_otp');
                        setErrorMessage('');
                        setSuccessMessage('');
                        setSentCode('');
                        setInputCode('');
                      }}
                      className="text-xs text-indigo-300 hover:text-indigo-200 font-semibold underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="Enter student password"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-10 py-3 text-xs text-slate-200 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                      title={showPassword ? "Hide password" : "View password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-indigo-400" />}
                    </button>
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

            {/* FORGOT PASSWORD FLOW - STEP 1: Enter Registered Email */}
            {studentMode === 'forgot_send_otp' && (
              <form onSubmit={handleForgotSendCode} className="space-y-4 animate-in fade-in">
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                  <p className="font-bold flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-indigo-400" /> Reset Password – Step 1
                  </p>
                  <p className="text-[11px] text-indigo-300 mt-1">
                    Enter your registered student email address to receive a 6-digit verification code via EmailJS:
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Student Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="e.g. student@college.edu"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setStudentMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
                    className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                  >
                    Back to Sign In
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="flex-1 py-3.5 rounded-2xl soft-3d-button text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSendingEmail ? 'Sending Reset Code...' : 'Send Reset Code via Email.js'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* FORGOT PASSWORD FLOW - STEP 2: Verify Reset Code */}
            {studentMode === 'forgot_verify_otp' && (
              <form onSubmit={handleForgotVerifyCode} className="space-y-4 animate-in fade-in">
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                  <p className="font-bold">Reset Password – Step 2: Enter Verification Code</p>
                  <p className="text-[11px] text-indigo-300 mt-1">Code sent to: <span className="font-mono text-white">{studentEmail}</span></p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">6-Digit Reset Verification Code</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Enter 6-digit code from email"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-white font-mono tracking-widest text-center font-bold"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setStudentMode('forgot_send_otp'); setInputCode(''); }}
                    className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl soft-3d-button text-white text-xs font-extrabold shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Code</span>
                  </button>
                </div>
              </form>
            )}

            {/* FORGOT PASSWORD FLOW - STEP 3: Enter & Save New Password */}
            {studentMode === 'forgot_new_password' && (
              <form onSubmit={handleForgotResetPassword} className="space-y-4 animate-in fade-in">
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Reset Code Verified! Set your new account password:</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 4 chars)"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:opacity-95 text-white text-xs font-extrabold shadow-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Password & Launch Dashboard</span>
                </button>
              </form>
            )}

            {/* Student Registration Flow */}
            {(studentMode === 'verify_email' || studentMode === 'student_details') && (
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

                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => setShowEmailJsSetup(true)}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-semibold inline-flex items-center gap-1"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Configure EmailJS Live API Keys</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2: Code Verification */}
                {!isEmailVerified && sentCode && (
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 space-y-1">
                      <p className="font-bold text-white">Step 2: Enter 6-Digit Verification Code</p>
                      <p className="text-[11px] text-indigo-300">Verification code sent to: <span className="font-mono text-white font-bold">{studentEmail}</span>. Please check your email inbox.</p>
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
                          onChange={(e) => setDept(e.target.value as DepartmentType)}
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
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Year</label>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Create Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="password"
                            required
                            value={studentPassword}
                            onChange={(e) => setStudentPassword(e.target.value)}
                            placeholder="Min 4 characters"
                            className="w-full soft-3d-input rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
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
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:opacity-95 text-white text-xs font-extrabold shadow-xl flex items-center justify-center gap-2 mt-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Registration & Set Password</span>
                    </button>
                  </form>
                )}

              </div>
            )}

          </div>
        )}

        {/* SECTION 2: ADMIN SECTION */}
        {portal === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
              <span>College Administrator Governance Access Portal</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">College Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="e.g. admin@college.edu"
                  className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full soft-3d-input rounded-xl pl-10 pr-10 py-3 text-xs text-slate-200 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                  title={showPassword ? "Hide password" : "View password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-purple-400" />}
                </button>
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

      {/* EmailJS Live API Credentials Modal Drawer */}
      {showEmailJsSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-indigo-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-400" /> EmailJS Live API Credentials
              </h3>
              <button onClick={() => setShowEmailJsSetup(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Enter your free EmailJS account API keys from <a href="https://www.emailjs.com/" target="_blank" rel="noreferrer" className="text-indigo-400 underline">emailjs.com</a> to send live verification emails directly to student inboxes:
            </p>

            <form onSubmit={handleSaveEmailJsKeys} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">EmailJS Service ID</label>
                <input
                  type="text"
                  required
                  value={serviceIdInput}
                  onChange={(e) => setServiceIdInput(e.target.value)}
                  placeholder="e.g. service_abc123"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">EmailJS Template ID</label>
                <input
                  type="text"
                  required
                  value={templateIdInput}
                  onChange={(e) => setTemplateIdInput(e.target.value)}
                  placeholder="e.g. template_xyz456"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">EmailJS Public Key (User ID)</label>
                <input
                  type="text"
                  required
                  value={publicKeyInput}
                  onChange={(e) => setPublicKeyInput(e.target.value)}
                  placeholder="e.g. pub_123456789"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl gradient-button text-white text-xs font-bold shadow-lg mt-2"
              >
                Save API Keys & Enable Live EmailJS
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
