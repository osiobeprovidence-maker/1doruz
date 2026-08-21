import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Globe, 
  Shield, 
  Bell, 
  Mail, 
  Database,
  Check,
  Save,
  Monitor,
  Cloud,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '../lib/utils';
import { validateImageFile } from '../lib/uploads';
import { useImageUpload } from '../hooks/useImageUpload';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { DEFAULT_LOGO } from '../lib/brand';
import SafeImage from '../components/SafeImage';

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('cosmetic');
  const [typographyPair, setTypographyPair] = useState('heritage');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [siteTitle, setSiteTitle] = useState('1DORUZ RECORDS | Premium Independent Label');
  const [siteDescription, setSiteDescription] = useState('The destination for experimental soul, cinematic techno, and boundary-pushing audio talent.');
  const [primaryColor, setPrimaryColor] = useState('#E51922');
  const [logoText, setLogoText] = useState('1DORUZ');
  const config = useQuery(api.config.get);
  const updateConfig = useMutation(api.config.update);
  const { upload } = useImageUpload();
  const saveLogo = useMutation(api.config.saveLogo);
  const clearLogo = useMutation(api.config.clearLogo);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const callerId = user._id || user.id;
  const logoPreview = config?.logoUrl || null;

  useEffect(() => {
    if (config) {
      if (config.siteTitle) setSiteTitle(config.siteTitle);
      if (config.siteDescription) setSiteDescription(config.siteDescription);
      if (config.primaryColor) setPrimaryColor(config.primaryColor);
      if (config.logoText) setLogoText(config.logoText);
    }
  }, [config]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) { alert(validation.error); return; }
    if (!callerId) {
      alert('Sign in again as admin to upload files.');
      return;
    }
    try {
      const storageId = await upload(file);
      await saveLogo({ callerId, storageId, baseUrl: import.meta.env.VITE_CONVEX_SITE_URL || import.meta.env.VITE_CONVEX_URL });
      e.target.value = '';
    } catch (err) {
      console.error('Logo upload failed:', err);
      alert('Logo upload failed. Check that you are signed in as admin.');
    }
  };

  const resetLogo = async () => {
    if (callerId) {
      try {
        await clearLogo({ callerId });
      } catch (err) {
        console.error('Failed to reset logo:', err);
      }
    }
    localStorage.removeItem('platform_logo');
  };

  const handleDeploy = async () => {
    setIsSaving(true);
    
    try {
      await updateConfig({ callerId, logoText, primaryColor, siteTitle, siteDescription });
      localStorage.setItem('typography_pair', typographyPair);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const SECTIONS = [
    { id: 'cosmetic', label: 'Website Cosmetic', icon: Palette, description: 'Themes, typography, and visual brand identity.' },
    { id: 'general', label: 'General Settings', icon: Globe, description: 'Metadata, SEO, and global site behavior.' },
    { id: 'security', label: 'Security & Access', icon: Shield, description: 'Admin roles, permissions, and session logs.' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email alerts for demos and contact forms.' },
    { id: 'infrastructure', label: 'Data & Engine', icon: Database, description: 'Database links and system health.' },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-8 lg:p-12 overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 sm:mb-16">
           <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-red-500 mb-2 block">Control Panel</span>
           <h1 className="font-serif text-[28px] sm:text-5xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>System Settings</h1>
           <p className="text-[var(--muted)] text-sm mt-1 uppercase tracking-widest font-mono">Configure the 1DORUZ digital ecosystem</p>
        </header>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          {/* Sidebar Nav - Improved for Mobile */}
          <aside className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3 sm:gap-4 pb-4 lg:pb-0">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full text-left p-5 sm:p-6 border transition-all group min-h-[44px] touch-manipulation flex flex-col justify-center",
                  activeSection === section.id 
                    ? "bg-brand-red-500/5 border-brand-red-500/40 shadow-[0_0_20px_rgba(229,25,34,0.05)]" 
                    : "hover:border-[var(--border)]"
                )}
                style={{ 
                  backgroundColor: activeSection === section.id ? undefined : 'var(--card)',
                  borderColor: activeSection === section.id ? undefined : 'var(--border)'
                }}
              >
                <div className="flex items-center gap-4 mb-2">
                   <div className={cn(
                     "p-2 rounded-lg transition-colors",
                     activeSection === section.id ? "bg-brand-red-500 text-[var(--background)]" : "bg-[var(--background)] text-[var(--muted)]"
                   )}>
                     <section.icon size={16} />
                   </div>
                   <span className={cn(
                     "text-[10px] font-bold uppercase tracking-widest",
                     activeSection === section.id ? "text-brand-red-500" : "text-[var(--muted)]"
                   )}>{section.label}</span>
                </div>
                <p className="text-[10px] text-[var(--muted)] uppercase tracking-tight leading-relaxed group-hover:text-[var(--muted)] transition-colors hidden sm:block">
                  {section.description}
                </p>
              </button>
            ))}
          </aside>

          {/* Settings Canvas */}
          <main className="luxury-card p-6 sm:p-12 backdrop-blur-sm" style={{ backgroundColor: 'var(--card)' }}>
             {activeSection === 'cosmetic' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                 <div>
                   <h3 className="font-serif text-[22px] sm:text-2xl font-bold mb-8 italic border-b pb-4" style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}>Brand Aesthetics</h3>
                   <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500">Platform Logo</label>
                        <div className="flex items-center gap-6">
                           <div className="w-20 h-20 bg-[var(--background)] border border-[var(--border)] overflow-hidden rounded-lg flex items-center justify-center group relative">
                                <SafeImage src={logoPreview || DEFAULT_LOGO} storageId={config?.logoStorageId} alt="Platform Logo" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                              <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                 <Monitor size={16} className="text-white" />
                                 <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handleLogoUpload} />
                              </label>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[10px] text-[var(--foreground)] font-bold uppercase tracking-widest">Master Branding</p>
                              <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest leading-relaxed">Square ratio recommended.<br />Visible across all navigation rails.</p>
                              <button 
                                onClick={resetLogo}
                                className="text-[9px] font-bold uppercase tracking-widest text-brand-red-500 hover:text-[var(--foreground)] transition-colors mt-2 block"
                              >
                                Revert to Default
                              </button>
                           </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500">Primary Color</label>
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 bg-brand-red-500 border border-brand-red-500/20 shadow-xl" />
                            <input 
                            type="text" 
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="border px-4 py-4 text-sm font-mono w-full focus:outline-none focus:border-brand-red-500 transition-colors min-h-[44px]" 
                            style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                           />
                        </div>
                      </div>
                   </div>
                 </div>

                 <div className="pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8" style={{ color: 'var(--foreground)' }}>Typography Pairs</h4>
                    <div className="grid gap-4 sm:gap-6">
                      <div 
                        onClick={() => setTypographyPair('heritage')}
                        className={cn(
                          "luxury-card p-6 sm:p-8 border transition-all flex justify-between items-center group cursor-pointer hover:bg-brand-red-500/5 touch-manipulation",
                          typographyPair === 'heritage' ? "border-brand-red-500/40 bg-brand-red-500/5" : "opacity-50 hover:opacity-100"
                        )}
                        style={{ borderColor: typographyPair === 'heritage' ? undefined : 'var(--border)' }}
                      >
                         <div>
                           <div className="font-serif text-lg sm:text-xl" style={{ color: 'var(--foreground)' }}>Playfair Display / Inter</div>
                           <div className="text-[10px] text-[var(--muted)] uppercase tracking-widest mt-1">Heritage & Modernity {typographyPair === 'heritage' && "(Active)"}</div>
                         </div>
                         {typographyPair === 'heritage' && <Check className="text-brand-red-500" size={20} />}
                      </div>
                      <div 
                        onClick={() => setTypographyPair('brutalist')}
                        className={cn(
                          "luxury-card p-6 sm:p-8 border transition-all flex justify-between items-center group cursor-pointer hover:bg-brand-red-500/5 touch-manipulation",
                          typographyPair === 'brutalist' ? "border-brand-red-500/40 bg-brand-red-500/5" : "opacity-50 hover:opacity-100"
                        )}
                        style={{ borderColor: typographyPair === 'brutalist' ? undefined : 'var(--border)' }}
                      >
                         <div>
                           <div className="font-mono text-lg sm:text-xl" style={{ color: 'var(--foreground)' }}>Space Grotesk / JetBrains</div>
                           <div className="text-[10px] text-[var(--muted)] uppercase tracking-widest mt-1">Brutalist / Technical {typographyPair === 'brutalist' && "(Active)"}</div>
                         </div>
                         {typographyPair === 'brutalist' && <Check className="text-brand-red-500" size={20} />}
                      </div>
                    </div>
                 </div>

                 <div className="pt-12 border-t flex justify-end" style={{ borderColor: 'var(--border)' }}>
                    <button 
                      onClick={handleDeploy}
                      disabled={isSaving}
                      className={cn(
                        "w-full sm:w-auto px-12 py-5 sm:py-4 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 min-w-[200px] justify-center transition-all duration-500 shadow-xl touch-manipulation",
                        saveSuccess ? "bg-green-500 text-black border-green-500 shadow-green-500/20" : "bg-brand-red-500 text-black border-brand-red-500 hover:opacity-90",
                        isSaving && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isSaving ? (
                        <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : saveSuccess ? (
                        <><Check size={16} /> Deployed Successfully</>
                      ) : (
                        <><Save size={16} /> Deploy Changes</>
                      )}
                    </button>
                 </div>
               </motion.div>
             )}

             {activeSection === 'general' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                 <h3 className="font-serif text-[22px] sm:text-2xl font-bold mb-8 italic border-b pb-4" style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}>Global Parameters</h3>
                 <div className="space-y-10">
                    <div className="grid gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500">Site Title</label>
                        <input 
                        type="text" 
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                        className="border p-5 text-sm focus:outline-none focus:border-brand-red-500 transition-colors" 
                        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                       />
                    </div>
                    <div className="grid gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500">SEO Description</label>
                        <textarea 
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        className="border p-5 text-sm h-40 focus:outline-none focus:border-brand-red-500 resize-none transition-colors leading-relaxed"
                        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                       />
                    </div>
                 </div>
               </motion.div>
             )}

             {activeSection !== 'cosmetic' && activeSection !== 'general' && (
                <div className="py-24 flex flex-col items-center justify-center text-[var(--muted)] italic border-2 border-dashed rounded-xl" style={{ borderColor: 'var(--border)' }}>
                   <SettingsIcon size={40} className="mb-6 opacity-20" />
                   <p className="text-[10px] uppercase tracking-widest font-bold">Standard Config Mode</p>
                   <p className="text-[10px] uppercase tracking-[0.2em] mt-2 opacity-50">Under Architecture Update</p>
                </div>
             )}
          </main>
        </div>
      </div>
    </div>
  );
}
