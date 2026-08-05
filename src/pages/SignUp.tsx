import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, UserPlus, Chrome, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { api } from '../../convex/_generated/api';
import { auth } from '../lib/firebase';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const createUser = useMutation(api.users.create);
  const sendMagicLink = useMutation(api.auth.sendMagicLink);
  const upsertUser = useMutation(api.users.upsertUser);
  const config = useQuery(api.config.get);
  const customLogo = config?.logoUrl || null;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createUser({ email, name: email.split('@')[0], role: 'user', emailVerified: false });
      await sendMagicLink({ email });
      localStorage.setItem('pendingMagicLinkEmail', email);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const { user: fbUser } = await signInWithPopup(auth, provider);
      const result = await upsertUser({
        email: fbUser.email ?? '',
        name: fbUser.displayName ?? undefined,
        imageUrl: fbUser.photoURL ?? undefined,
        firebaseUid: fbUser.uid,
      });
      localStorage.setItem('user', JSON.stringify({ id: result.id, email: result.email, role: result.role, name: result.name }));
      localStorage.setItem('isAdmin', result.role === 'admin' ? 'true' : 'false');
      navigate(result.role === 'admin' ? '/admin' : '/profile');
    } catch (err) {
      setError('Google sign-in failed. Check the Firebase Auth domain or try again.');
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
            <h1 className="font-serif text-3xl font-bold text-[var(--foreground)] uppercase tracking-wider">Join 1DORUZ</h1>
            <p className="text-[var(--muted)] mt-2 text-sm uppercase tracking-widest font-mono">Create your account to join the roster</p>
          </div>

          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={24} className="text-green-500" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] uppercase tracking-wider mb-4">Check Your Email</h3>
              <p className="text-[var(--muted)] text-sm uppercase tracking-widest font-mono leading-relaxed">
                We've sent a magic link to <strong className="text-[var(--foreground)]">{email}</strong>. Click it to sign in.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="mt-8 text-[10px] font-bold uppercase tracking-widest text-brand-red-500 hover:text-[var(--foreground)] transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
                    <input 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full border pl-12 pr-4 py-4 focus:border-brand-red-500 focus:outline-none transition-colors rounded-none text-sm"
                      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                  </div>
                </div>

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
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)] block">Password</label>
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

                <button 
                  disabled={isSubmitting}
                  className="luxury-button w-full bg-brand-red-500 text-black hover:bg-[var(--foreground)] disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'} <UserPlus size={18} />
                </button>
              </form>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted)]">Or join with</span>
                <div className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4">
                <button 
                  onClick={handleGoogle}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-3 px-4 py-4 border hover:border-brand-red-500 transition-colors text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  <Chrome size={18} /> Google
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-[var(--muted)] uppercase tracking-widest">
            Already have an account? <Link to="/login" className="text-brand-red-500 cursor-pointer hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
