import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  User, 
  Save, 
  Eye,
  Type,
  AlignLeft,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminWriteArticle() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/admin/news');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/admin/news')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] hover:text-brand-red-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Press
        </button>

        <header className="mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">Editorial Studio</h1>
          <p className="text-[var(--muted)] text-sm uppercase tracking-widest font-mono text-balance">Craft compelling narratives for the label's global audience</p>
        </header>

        <form onSubmit={handleSave} className="space-y-12">
          {/* Cover Image & Basic Info */}
          <section className="grid lg:grid-cols-[1fr_350px] gap-12">
             <div className="luxury-card p-6 sm:p-10 space-y-8">
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500">Article Title</label>
                  <input type="text" placeholder="The Future of 1DORUZ: A New Chapter Begins" className="bg-[var(--card)] border border-[var(--border)] p-6 text-xl font-serif font-bold text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 italic" />
                </div>
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Short Excerpt</label>
                  <textarea placeholder="Summarize the article in 2-3 sentences..." className="bg-[var(--card)] border border-[var(--border)] p-6 text-sm text-[var(--foreground)] h-24 focus:outline-none focus:border-brand-red-500 resize-none" />
                </div>
             </div>

             <div className="space-y-8">
                <div className="aspect-video luxury-card border-dashed flex flex-col items-center justify-center group hover:border-brand-red-500 transition-colors cursor-pointer bg-[var(--card)]">
                    <ImageIcon size={32} className="text-[var(--muted)] group-hover:text-brand-red-500 mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] group-hover:text-brand-red-500">Feature Image</span>
                </div>
                <div className="luxury-card p-8 space-y-6">
                   <div className="flex items-center gap-4 text-[var(--foreground)]">
                      <User size={16} />
                      <input type="text" placeholder="Author Name" className="bg-transparent border-none focus:outline-none text-xs text-[var(--foreground)]" defaultValue="1DORUZ Media" />
                   </div>
                   <div className="flex items-center gap-4 text-[var(--muted)]">
                      <Calendar size={16} />
                      <input type="date" className="bg-transparent border-none focus:outline-none text-xs text-[var(--foreground)]" />
                   </div>
                </div>
             </div>
          </section>

          {/* Content Editor */}
          <section className="luxury-card p-6 sm:p-12 min-h-[600px] flex flex-col">
             <div className="flex gap-4 border-b border-[var(--border)] pb-6 mb-8 text-[var(--muted)]">
                <button type="button" className="p-2 hover:text-brand-red-500 transition-colors" title="Bold"><Type size={18} /></button>
                <button type="button" className="p-2 hover:text-brand-red-500 transition-colors" title="Alignment"><AlignLeft size={18} /></button>
                <div className="w-[1px] h-6 bg-[var(--card)] mx-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center">Rich Text Editor Active</span>
             </div>
             <textarea 
               placeholder="Begin writing your story here..." 
               className="flex-1 bg-transparent border-none focus:outline-none text-[var(--secondary)] leading-relaxed font-serif text-lg resize-none"
             />
          </section>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-8">
             <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-[var(--muted)]">
                <span className="flex items-center gap-2 italic"><div className="h-1.5 w-1.5 bg-green-500 rounded-full" /> Auto-saved at 10:14 AM</span>
             </div>
             <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
               <button 
                type="button" 
                disabled={isSaving}
                className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-30"
               >
                  <Eye size={16} /> Preview
               </button>
               <button 
                disabled={isSaving}
                className={cn(
                  "luxury-button bg-brand-red-500 text-black px-12 py-4 flex items-center justify-center gap-3 w-full sm:w-auto transition-all duration-500 min-w-[200px]",
                  saveSuccess ? "bg-green-500 border-green-500" : "bg-brand-red-500 border-brand-red-500",
                  isSaving && "opacity-70 cursor-not-allowed"
                )}
               >
                  {isSaving ? (
                    <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : saveSuccess ? (
                    <><Check size={18} /> Published</>
                  ) : (
                    <><Save size={18} /> Publish Story</>
                  )}
               </button>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
}
