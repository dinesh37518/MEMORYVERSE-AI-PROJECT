import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Mail, Lock, User, GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, X, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, setActiveRole, user, registeredStudents } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'verify'>('login');
  
  // Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [college, setCollege] = useState('VSB Engineering College, Karur');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpCode, setOtpCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = email.trim().toLowerCase();

    if (mode === 'login') {
      // Validate Admin Credentials
      if (cleanEmail === 'vsbkaruredu@gmail.com') {
        if (password === 'VSBece@2024') {
          login('vsbkaruredu@gmail.com', { role: 'admin' });
          setActiveRole('admin');
          onClose();
          return;
        } else {
          setErrorMessage('Password is wrong.');
          return;
        }
      }

      // Check student password
      let expectedPassword: string | null = null;
      try {
        const passwordsJson = localStorage.getItem('memoryverse_passwords_v1');
        const passwordsMap = passwordsJson ? JSON.parse(passwordsJson) : {};
        expectedPassword = passwordsMap[cleanEmail];
      } catch (e) {}


      if (expectedPassword && password !== expectedPassword) {
        setErrorMessage('Incorrect password. Please enter the correct password for your account.');
        return;
      }

      login(cleanEmail, foundStudent || { role: 'student' });
      setActiveRole('student');
      onClose();
    } else if (mode === 'register') {
      setSuccessMessage('Verification email sent! Enter OTP to confirm account.');
      setMode('verify');
    } else if (mode === 'forgot') {
      setSuccessMessage('Password reset instructions sent to your email address.');
    } else if (mode === 'verify') {
      login(cleanEmail);
      onClose();
    }
  };

  const handleStudentQuickLogin = () => {
    const activeEmail = user?.email || registeredStudents[0]?.email || 'dineshguru0609@gmail.com';
    let pass = 'Dinesh@123';
    try {
      const passwordsJson = localStorage.getItem('memoryverse_passwords_v1');
      const passwordsMap = passwordsJson ? JSON.parse(passwordsJson) : {};
      pass = passwordsMap[activeEmail.toLowerCase()] || (activeEmail === 'dineshguru0609@gmail.com' ? 'Dinesh@123' : 'Angu@123');
    } catch (e) {}

    setEmail(activeEmail);
    setPassword(pass);
    login(activeEmail);
    setActiveRole('student');
    onClose();
  };

  const handleAdminQuickLogin = () => {
    setEmail('vsbkaruredu@gmail.com');
    setPassword('VSBece@2024');
    login('vsbkaruredu@gmail.com', { role: 'admin' });
    setActiveRole('admin');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md soft-3d-panel p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-2xl soft-3d-button-secondary text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 shadow-xl shadow-indigo-500/30 mb-3 border border-white/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Memory<span className="soft-gradient-text">Verse</span> AI</h2>
          <p className="text-xs text-slate-400 mt-1">Intelligent Digital Identity & Knowledge Platform</p>
        </div>

        {/* Quick Credentials Access Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
          <p className="text-xs text-indigo-200 font-bold flex items-center justify-between">
            <span>⚡ Authenticated Login Accounts</span>
            <span className="text-[10px] text-emerald-400">Verified</span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleStudentQuickLogin}
              type="button"
              className="py-2 px-3 rounded-xl soft-3d-button text-white text-[11px] font-bold flex items-center justify-center gap-1.5"
            >
              <span>Student Account</span>
            </button>

            <button
              onClick={handleAdminQuickLogin}
              type="button"
              className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Admin Account</span>
            </button>
          </div>
        </div>

        {/* Form Mode Selector */}
        <div className="flex rounded-2xl bg-slate-950/80 p-1 mb-6 border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'login' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'register' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Student Name"
                    className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">University / Organization</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. VSB Engineering College, Karur"
                    className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200"
                  />
                </div>
              </div>
            </>
          )}

          {mode !== 'verify' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 font-mono"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-indigo-400 hover:underline font-semibold"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full soft-3d-input rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-200 font-mono"
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
              )}
            </>
          )}

          {mode === 'verify' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Enter 6-Digit Verification Code</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter code"
                  className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 tracking-widest font-mono text-center"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl soft-3d-button text-white text-xs font-extrabold shadow-xl flex items-center justify-center gap-2 mt-4"
          >
            {mode === 'login' && 'Sign In to Identity Vault'}
            {mode === 'register' && 'Create MemoryVerse Account'}
            {mode === 'forgot' && 'Send Reset Link'}
            {mode === 'verify' && 'Verify & Enter App'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
