import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Disc, 
  Upload, 
  Calendar, 
  Music, 
  Save, 
  Link as LinkIcon,
  Tag,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminAddRelease() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [releaseType, setReleaseType] = useState('Single');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/admin/releases');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/admin/releases')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] hover:text-brand-red-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </button>

        <header className="mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">New Release</h1>
          <p className="text-[var(--muted)] text-sm uppercase tracking-widest font-mono">Publish sonic content to global platforms</p>
        </header>

        <form onSubmit={handleSave} className="space-y-12">
          {/* Release Metadata */}
          <section className="luxury-card p-6 sm:p-10 grid md:grid-cols-[300px_1fr] gap-12">
            <div className="space-y-6">
               <div className="aspect-square bg-[var(--background)] border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center group hover:border-brand-red-500 transition-colors cursor-pointer overflow-hidden">
                  <Upload size={32} className="text-[var(--muted)] group-hover:text-brand-red-500 mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] group-hover:text-brand-red-500">Cover Art</span>
                  <p className="text-[8px] text-[var(--muted)] mt-2">3000 x 3000px Minimum</p>
               </div>
               <div className="flex gap-2">
                   <button 
                    type="button"
                    onClick={() => setReleaseType('Single')}
                    className={cn(
                      "flex-1 py-3 border text-[9px] font-bold uppercase tracking-widest transition-all",
                      releaseType === 'Single' ? "text-brand-red-500 bg-brand-red-500/5 border-brand-red-500/40 shadow-[0_0_15px_rgba(229,25,34,0.1)]" : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                    )}
                  >Single</button>
                  <button 
                    type="button"
                    onClick={() => setReleaseType('EP')}
                    className={cn(
                      "flex-1 py-3 border text-[9px] font-bold uppercase tracking-widest transition-all",
                      releaseType === 'EP' ? "text-brand-red-500 bg-brand-red-500/5 border-brand-red-500/40 shadow-[0_0_15px_rgba(229,25,34,0.1)]" : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                    )}
                  >EP</button>
                  <button 
                    type="button"
                    onClick={() => setReleaseType('Album')}
                    className={cn(
                      "flex-1 py-3 border text-[9px] font-bold uppercase tracking-widest transition-all",
                      releaseType === 'Album' ? "text-brand-red-500 bg-brand-red-500/5 border-brand-red-500/40 shadow-[0_0_15px_rgba(229,25,34,0.1)]" : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                    )}
                  >Album</button>
               </div>
            </div>

            <div className="space-y-8">
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Release Title</label>
                  <input type="text" placeholder="Sonic Echoes" className="bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" />
               </div>
               <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Artist</label>
                  <select className="bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 appearance-none">
                     <option>Select Artist...</option>
                     <option>ZEPHYR</option>
                     <option>MARA LUNA</option>
                     <option>DRIP LORD</option>
                  </select>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="grid gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Release Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
                      <input type="date" className="w-full bg-[var(--card)] border border-[var(--border)] pl-12 pr-4 py-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" />
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">UPC / EAN Code</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
                      <input type="text" placeholder="Auto-generate" className="w-full bg-[var(--card)] border border-[var(--border)] pl-12 pr-4 py-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" />
                    </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Streaming Links */}
          <section className="luxury-card p-6 sm:p-10 space-y-10">
             <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)] border-b border-[var(--border)] pb-4">Digital Distribution</h3>
             <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#1DB954]" />
                   <input type="text" placeholder="Spotify Link" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#FC3C44]" />
                   <input type="text" placeholder="Apple Music Link" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#FF0000]" />
                   <input type="text" placeholder="YouTube Music" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#000000] dark:text-white" />
                   <input type="text" placeholder="Tidal Link" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#FF3300]" />
                   <input type="text" placeholder="SoundCloud" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#FFA200]" />
                   <input type="text" placeholder="Audiomack" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#00A0E9]" />
                   <input type="text" placeholder="Boomplay" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#00A8E1]" />
                   <input type="text" placeholder="Amazon Music" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#A2AAAD]" />
                   <input type="text" placeholder="Deezer" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
                <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] p-4">
                   <LinkIcon size={16} className="text-[#9146FF]" />
                   <input type="text" placeholder="Twitch / Soundtrack" className="bg-transparent border-none focus:outline-none text-[11px] text-[var(--foreground)] w-full font-mono" />
                </div>
             </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-end items-center gap-6 pt-10">
             <button 
              type="button" 
              onClick={() => navigate('/admin/releases')} 
              disabled={isSaving}
              className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-30"
             >
              Save as Draft
             </button>
             <button 
              disabled={isSaving}
              className={cn(
                "luxury-button px-12 py-4 flex items-center justify-center gap-3 font-bold transition-all duration-500 min-w-[240px]",
                saveSuccess ? "bg-green-500 text-black border-green-500" : "bg-brand-red-500 text-black border-brand-red-500",
                isSaving && "opacity-70 cursor-not-allowed"
              )}
             >
                {isSaving ? (
                  <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : saveSuccess ? (
                  <><Check size={18} /> Scheduled Successfully</>
                ) : (
                  <><Save size={18} /> Schedule Deployment</>
                )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
