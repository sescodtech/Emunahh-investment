import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Logo } from '../../components/Logo';
import { isSupabaseConfigured, sendPasswordReset, signIn } from '../../lib/supabaseAuth';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter your administrator email and password.');
      return;
    }

    if (!isSupabaseConfigured()) {
      setError('Supabase authentication is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.');
      return;
    }

    try {
      setIsLoading(true);
      await signIn(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to authenticate this administrator account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!resetEmail.trim()) return;

    try {
      await sendPasswordReset(resetEmail);
      setForgotSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send the password recovery email.');
    }
  };

  return (
    <div className="min-h-screen bg-[#e3fff2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block focus:outline-hidden">
          <Logo variant="light" size="md" layout="stacked" />
        </Link>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e7020b]">
          <ShieldCheck className="w-4 h-4 text-[#e7020b]" />
          <span>Executive Control Portal</span>
        </div>

        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0d0a64] tracking-tight">
          Admin Sign In
        </h2>
        <p className="mt-1 text-xs text-[#17202A]/60">
          Restricted to authorized Emunahh-Invest management officers.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl border border-[#0d0a64]/10 sm:rounded-xl sm:px-10">
          
          {error && (
            <div className="mb-6 p-3.5 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-[#0d0a64] uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@emunahhinvest.com"
                  className="block w-full pl-10 pr-3 py-2.5 text-xs text-[#0d0a64] bg-white border border-[#0d0a64]/20 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#e7020b] focus:border-[#e7020b]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#0d0a64] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-semibold text-[#e7020b] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 text-xs text-[#0d0a64] bg-white border border-[#0d0a64]/20 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#e7020b] focus:border-[#e7020b]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#e7020b] focus:ring-[#e7020b] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-[#17202A]/80">
                Keep administrative session active on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-md shadow-sm text-xs font-bold text-white bg-[#e7020b] hover:bg-[#a3140a] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#e7020b] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Access Management Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </>
              )}
            </button>

          </form>

          <div className="mt-4 text-center">
            <Link to="/" className="text-xs font-semibold text-[#0d0a64] hover:text-[#e7020b] transition-colors">
              ← Return to Public Website
            </Link>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-[#0d0a64]">Reset Administrator Access</h3>
            <p className="text-xs text-gray-600 mt-1 mb-4">
              Enter your registered corporate email. Security instructions will be dispatched.
            </p>

            {forgotSent ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Reset verification token dispatched to {resetEmail || email}.</span>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0d0a64] mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@emunahhinvest.com"
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e7020b]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-[#e7020b] hover:bg-[#a3140a] rounded-md"
                  >
                    Send Recovery Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
