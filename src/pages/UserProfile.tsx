import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  Music4, 
  History, 
  Bell, 
  LogOut, 
  Mail, 
  Shield,
  Camera,
  ExternalLink,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function UserProfile() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('user') || 'Member';
  const userEmail = userName;
  const userDemos = useQuery(api.demos.getByEmail, userEmail ? { email: userEmail } : 'skip') || [];
  const [activeView, setActiveView] = useState('overview'); // 'overview' or 'settings'
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [preferences, setPreferences] = useState({
    newsletter: true,
    newReleases: false
  });

  const [accountData, setAccountData] = useState({
    name: userName.split('@')[0],
    email: userName,
    age: '24',
    distributionAreas: 'Global, North America, Europe',
    bio: 'Visionary artist focused on melodic techno and cinematic soundscapes.',
    twoFactor: true
  });



  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 sm:pt-32 pb-24 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          
          {/* Sidebar / Profile Card */}
          <aside className="space-y-6 lg:space-y-8">
            <div className="luxury-card p-6 sm:p-10 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--background)] rounded-full flex items-center justify-center border border-[var(--border)] overflow-hidden">
                  <User size={32} className="text-[var(--muted)]" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-brand-red-500 rounded-full text-[var(--background)] hover:bg-brand-red-400 transition-colors shadow-xl">
                  <Camera size={12} />
                </button>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[var(--foreground)] uppercase tracking-tight">{accountData.name}</h2>
              <p className="text-[9px] sm:text-[10px] text-[var(--muted)] uppercase tracking-widest font-mono mt-1 italic">Verified 1DORUZ Artist</p>
              
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[var(--border)] space-y-3 sm:space-y-4">
                <button 
                  onClick={() => setActiveView(activeView === 'overview' ? 'settings' : 'overview')}
                  className={cn(
                    "w-full py-4 sm:py-3 border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 touch-manipulation",
                    activeView === 'settings' 
                      ? "bg-brand-red-500 text-black border-brand-red-500" 
                      : "bg-[var(--background)]/50 border-[var(--border)] text-[var(--secondary)] hover:text-[var(--foreground)]"
                  )}
                >
                  <Settings size={14} /> {activeView === 'settings' ? 'Back to Overview' : 'Account Settings'}
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full py-4 sm:py-3 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all flex items-center justify-center gap-2 touch-manipulation"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>

            <div className="luxury-card p-6 sm:p-8 bg-brand-red-500/5 border-brand-red-500/10 hidden lg:block">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red-500 mb-4">Member Perk</h4>
              <p className="text-xs text-[var(--secondary)] leading-relaxed italic">
                "Early access to vinyl drops and exclusive artist mastering workshops."
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-12">
            <AnimatePresence mode="wait">
              {activeView === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <section className="luxury-card p-5 sm:p-12">
                    <div className="flex items-center gap-3 mb-8 sm:mb-10">
                      <Music4 className="text-brand-red-500" size={20} />
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--foreground)]">Your Demo Vault</h3>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      {userDemos.map((submission) => (
                        <div key={submission._id} className="flex flex-col md:flex-row md:items-center justify-between p-5 sm:p-6 bg-[var(--card)]/30 border border-[var(--border)] hover:border-[var(--border)] transition-colors gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 flex-shrink-0 bg-[var(--card)] flex items-center justify-center border border-[var(--border)] text-[var(--muted)]">
                              <History size={18} />
                            </div>
                            <div>
                              <h4 className="font-bold text-[var(--foreground)] text-xs sm:text-sm uppercase tracking-tight">{submission.artistName}</h4>
                              <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest">Submitted on {new Date(submission._creationTime).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between md:justify-end gap-6">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-brand-red-500 px-3 py-1 bg-brand-red-500/10 border border-brand-red-500/20">
                              {submission.status}
                            </span>
                            <button className="h-10 w-10 flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors border border-transparent active:bg-[var(--card)] rounded-full">
                              <ExternalLink size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => navigate('/submit-demo')}
                        className="w-full py-5 border-2 border-dashed border-[var(--border)] text-[var(--muted)] hover:border-brand-red-500 hover:text-brand-red-500 transition-all text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 min-h-[50px] touch-manipulation"
                      >
                        Submit New Audio Asset
                      </button>
                    </div>
                  </section>

                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="luxury-card p-6 sm:p-10">
                      <div className="flex items-center gap-3 mb-8">
                        <User className="text-brand-red-500" size={18} />
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--foreground)] uppercase tracking-tight">Demographics</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Member Age</p>
                          <p className="text-sm text-[var(--foreground)] mt-1">{accountData.age || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Active Distribution</p>
                          <p className="text-sm text-[var(--foreground)] mt-1">{accountData.distributionAreas || 'Global Roster'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="luxury-card p-6 sm:p-10">
                      <div className="flex items-center gap-3 mb-8">
                        <Mail className="text-[var(--muted)]" size={18} />
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--foreground)] uppercase tracking-tight">Preferences</h3>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] sm:text-xs text-[var(--foreground)] uppercase tracking-widest">Newsletter</span>
                          <button 
                            onClick={() => setPreferences(prev => ({ ...prev, newsletter: !prev.newsletter }))}
                            className={cn(
                              "w-12 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 touch-manipulation",
                              preferences.newsletter ? "bg-brand-red-500" : "bg-[var(--card)]"
                            )}
                          >
                            <motion.div 
                              initial={false}
                              animate={{ x: preferences.newsletter ? 26 : 6 }}
                              className="absolute top-1 h-4 w-4 bg-black rounded-full shadow-sm" 
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] sm:text-xs text-[var(--muted)] uppercase tracking-widest">New Releases</span>
                          <button 
                            onClick={() => setPreferences(prev => ({ ...prev, newReleases: !prev.newReleases }))}
                            className={cn(
                              "w-12 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 touch-manipulation",
                              preferences.newReleases ? "bg-brand-red-500" : "bg-[var(--card)]"
                            )}
                          >
                            <motion.div 
                              initial={false}
                              animate={{ x: preferences.newReleases ? 26 : 6 }}
                              className="absolute top-1 h-4 w-4 bg-black rounded-full shadow-sm" 
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="luxury-card p-6 sm:p-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Shield className="text-[var(--muted)]" size={18} />
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--foreground)] uppercase tracking-tight">Security</h3>
                      </div>
                      <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-8 leading-relaxed">Last login: Today from Berlin, DE</p>
                      <button 
                        onClick={() => setActiveView('settings')}
                        className="w-full sm:w-auto py-3 sm:py-0 text-[10px] font-bold uppercase tracking-widest text-brand-red-500 hover:underline active:bg-brand-red-500/5 transition-colors border border-brand-red-500/20 sm:border-none inline-flex items-center justify-center"
                      >
                        Manage Security
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <section className="luxury-card p-6 sm:p-12 bg-[var(--card)]/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-10 border-b border-[var(--border)] pb-6 uppercase tracking-wider">
                      <Settings className="text-brand-red-500" size={20} />
                      <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-[var(--foreground)]">Identity & Access</h3>
                    </div>

                    <form onSubmit={handleSaveSettings} className="space-y-10">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red-500">Display Name</label>
                          <input 
                            type="text" 
                            value={accountData.name} 
                            onChange={e => setAccountData({...accountData, name: e.target.value})}
                            className="w-full bg-[var(--background)] border border-[var(--border)] p-5 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 transition-colors min-h-[44px]" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Email Address</label>
                          <input 
                            type="email" 
                            value={accountData.email} 
                            disabled
                            className="w-full bg-[var(--background)]/50 border border-[var(--border)] p-5 text-sm text-[var(--muted)] cursor-not-allowed min-h-[44px]" 
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Age</label>
                          <input 
                            type="number" 
                            value={accountData.age} 
                            onChange={e => setAccountData({...accountData, age: e.target.value})}
                            className="w-full bg-[var(--background)] border border-[var(--border)] p-5 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 transition-colors min-h-[44px]" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Distribution Areas</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Worldwide, Africa, UK"
                            value={accountData.distributionAreas} 
                            onChange={e => setAccountData({...accountData, distributionAreas: e.target.value})}
                            className="w-full bg-[var(--background)] border border-[var(--border)] p-5 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 transition-colors min-h-[44px]" 
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Public Bio</label>
                        <textarea 
                          rows={4}
                          value={accountData.bio}
                          onChange={e => setAccountData({...accountData, bio: e.target.value})}
                          className="w-full bg-[var(--background)] border border-[var(--border)] p-5 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 transition-colors resize-none leading-relaxed min-h-[120px]" 
                        />
                      </div>

                      <div className="pt-8 border-t border-[var(--border)]">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--foreground)] mb-6">Security Shield</h4>
                        <div className="bg-[var(--background)]/40 border border-[var(--border)] p-6 flex items-center justify-between gap-4 rounded-sm">
                          <div>
                            <div className="text-[11px] font-bold text-[var(--foreground)] uppercase tracking-wider">Two-Factor Authentication</div>
                            <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mt-1">Enhance account security via app notifications</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setAccountData(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                            className={cn(
                              "w-12 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 touch-manipulation",
                              accountData.twoFactor ? "bg-brand-red-500" : "bg-[var(--card)]"
                            )}
                          >
                            <motion.div 
                              initial={false}
                              animate={{ x: accountData.twoFactor ? 26 : 6 }}
                              className="absolute top-1 h-4 w-4 bg-black rounded-full shadow-md" 
                            />
                          </button>
                        </div>
                      </div>

                      <div className="pt-12 flex flex-col sm:flex-row justify-end items-center gap-6">
                        <button 
                          type="button" 
                          onClick={() => setActiveView('overview')}
                          className="w-full sm:w-auto text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors py-4 sm:py-0 border border-[var(--border)] sm:border-none inline-flex items-center justify-center touch-manipulation"
                        >
                          Discard Changes
                        </button>
                        <button 
                          disabled={isSaving}
                          className={cn(
                            "w-full sm:w-auto px-16 py-5 sm:py-4 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 transition-all duration-500 min-w-[220px] justify-center shadow-lg touch-manipulation",
                            saveSuccess ? "bg-green-500 text-black border-green-500 shadow-green-500/20" : "bg-brand-red-500 text-black border-brand-red-500 hover:bg-[var(--foreground)] hover:text-[var(--background)]",
                            isSaving && "opacity-70 cursor-not-allowed"
                          )}
                        >
                          {isSaving ? (
                            <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          ) : saveSuccess ? (
                            <><motion.div initial={{scale:0}} animate={{scale:1}} className="flex items-center"><Check size={18} /></motion.div> Profile Updated</>
                          ) : (
                            <>Update Account Data</>
                          )}
                        </button>
                      </div>
                    </form>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
