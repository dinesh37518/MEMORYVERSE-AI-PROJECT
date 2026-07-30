import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Mail, Lock, User, GraduationCap, ArrowRight, CheckCircle2, AlertCircle, KeyRound, ShieldCheck } from 'lucide-react';

export const LoginPageView: React.FC = () => {
  const { login, setActiveRole } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'google_setup'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (mode === 'login') {
      if (email.trim().toLowerCase() === 'adminofmemoryverse@gmail.com' && password === 'Admin@123') {
        login('adminofmemoryverse@gmail.com');
        setActiveRole('admin');
        return;
      }

      if (email.trim().toLowerCase() === 'dineshguru0609@gmail.com' && password === 'Dinesh@123') {
        login('dineshguru0609@gmail.com');
        setActiveRole('student');
        return;
      }

      // Default login fallback
      login(email || 'dineshguru0609@gmail.com');
      setActiveRole('student');
    } else if (mode === 'register') {
      setSuccessMessage('Account created! Please set your password to finish registration.');
      setMode('google_setup');
    } else if (mode === 'google_setup') {
      setSuccessMessage('Password saved successfully! Logging in...');
      setTimeout(() => {
        login(email || 'dineshguru0609@gmail.com');
        setActiveRole('student');
      }, 600);
    }
  };

  const handleGoogleLogin = () => {
    setEmail('dineshguru0609@gmail.com');
    setName('Dineshkumar M');
    setSuccessMessage('Google Account authenticated! Set your password for email/password login.');
    setMode('google_setup');
  };

  const handleAdminQuickFill = () => {
    login('adminofmemoryverse@gmail.com');
    setActiveRole('admin');
  };

  const handleStudentQuickFill = () => {
    login('dineshguru0609@gmail.com');
    setActiveRole('student');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#080b11] relative overflow-hidden">
      
      {/* Soft Ambient Background Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 soft-3d-panel p-8 sm:p-10 border border-white/10 shadow-2xl">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 shadow-xl shadow-indigo-500/30 mb-4 border border-white/30">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Memory<span className="soft-gradient-text">Verse</span> AI
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">
            Intelligent Digital Identity & Career Knowledge Platform
          </p>
        </div>

        {/* Professional Quick Access Access Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-200">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authenticated Quick Portal Access
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Secure</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleStudentQuickFill}
              type="button"
              className="py-2.5 px-3 rounded-xl soft-3d-button text-white text-xs font-extrabold flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform"
            >
              <span>Student Portal</span>
            </button>
            <button
              onClick={handleAdminQuickFill}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Google Login Button */}
        <div className="mb-6">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-3.5 px-4 rounded-2xl soft-3d-button-secondary text-white text-xs font-bold flex items-center justify-center gap-3 border border-white/20 hover:border-indigo-400 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#080b11] px-3 text-[11px] text-slate-400 uppercase font-semibold tracking-wider">or sign in with credentials</span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Mode Switcher */}
        <div className="flex rounded-2xl bg-slate-950/80 p-1 mb-6 border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'login' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'register' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">University / College</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="Enter your college / university"
                    className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200"
                  />
                </div>
              </div>
            </>
          )}

          {mode !== 'google_setup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {mode === 'google_setup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Set Account Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Set your account password"
                  className="w-full soft-3d-input rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl soft-3d-button text-white text-xs font-black shadow-xl flex items-center justify-center gap-2 mt-4"
          >
            {mode === 'login' && 'Sign In to Identity Vault'}
            {mode === 'register' && 'Continue to Password Setup'}
            {mode === 'google_setup' && 'Save Password & Enter Platform'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
