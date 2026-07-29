import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, Chrome, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customLogo] = useState<string | null>(localStorage.getItem('platform_logo'));
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useMutation(api.auth.loginWithPassword);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await login({ email, password });
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password. Try the magic link option.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red-500/5 via-transparent to-transparent opacity-50" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="luxury-card p-10 rounded-2xl">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-20 h-20 bg-[var(--background)] border border-[var(--border)] overflow-hidden rounded-lg flex items-center justify-center">
                <img src={customLogo || "/src/assets/images/logo.jpg"} alt="1DORUZ Logo" className="w-full h-full object-cover grayscale" />
              </div>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-[var(--foreground)] uppercase tracking-wider">Welcome Back</h1>
            <p className="text-[var(--muted)] mt-2 text-sm uppercase tracking-widest font-mono">Access your 1DORUZ account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full border pl-12 pr-4 py-4 focus:border-brand-red-500 focus:outline-none transition-colors rounded-none text-sm"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border pl-12 pr-12 py-4 focus:border-brand-red-500 focus:outline-none transition-colors rounded-none text-sm"
                  style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-brand-red-500/10 border border-brand-red-500/20 rounded-lg">
                <p className="text-[10px] text-brand-red-500 font-bold uppercase tracking-widest">{error}</p>
              </div>
            )}
            <button 
              disabled={isSubmitting}
              className="luxury-button w-full bg-brand-red-500 text-black hover:bg-[var(--foreground)] disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'} <LogIn size={18} />
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted)]">Or continue with</span>
            <div className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <button 
              className="flex items-center justify-center gap-3 px-4 py-4 border hover:border-brand-red-500 transition-colors text-xs font-bold uppercase tracking-widest"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              <Chrome size={18} /> Google
            </button>
          </div>

          <div className="mt-10 p-4 bg-brand-red-500/5 border border-brand-red-500/10 rounded-lg">
            <div className="flex items-center gap-3 text-brand-red-500 mb-2">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Demo Access</span>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] text-[var(--muted)] leading-relaxed uppercase tracking-widest border-b border-brand-red-500/10 pb-1">
                Admin: <span className="text-[var(--foreground)] font-mono">admin@1doruz.com</span> | <span className="text-[var(--foreground)] font-mono">admin123</span>
              </p>
              <p className="text-[9px] text-[var(--muted)] leading-relaxed uppercase tracking-widest">
                Artist: <span className="text-[var(--foreground)] font-mono">artist@1doruz.com</span> | <span className="text-[var(--foreground)] font-mono">artist123</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-[var(--muted)] uppercase tracking-widest">
            Don't have an account? <Link to="/signup" className="text-brand-red-500 cursor-pointer hover:underline">Create One</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
