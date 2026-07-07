import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Box, 
  Upload, 
  File, 
  Link as LinkIcon, 
  Tag, 
  Layers,
  Save,
  Globe,
  Check,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminNewAsset() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{name: string, size: string} | null>(null);
  const [preview, setPreview] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadedFile({ name: file.name, size: `${sizeMB} MB` });
      setPreview(`📄 ${file.name}`);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/admin');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] hover:text-brand-red-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Overview
        </button>

        <header className="mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--foreground)] mb-4 italic">Resource Asset Registry</h1>
          <p className="text-[var(--muted)] text-sm uppercase tracking-widest font-mono">Archive and manage digital properties for the label</p>
        </header>

        <form onSubmit={handleSave} className="space-y-12">
          {/* File Upload Section */}
          <section className="luxury-card p-6 sm:p-10">
            <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-[var(--border)] bg-[var(--card)] group hover:border-brand-red-500 transition-all rounded-lg cursor-pointer relative overflow-hidden">
              {uploadedFile ? (
                <div className="text-center space-y-6 z-10">
                  <div className="h-20 w-20 rounded-full bg-brand-red-500/20 flex items-center justify-center mx-auto">
                    <File className="h-10 w-10 text-brand-red-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-[0.3em] mb-2">File Ready to Upload</h3>
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-4">{uploadedFile.name}</p>
                    <p className="text-[9px] text-brand-red-500 font-bold uppercase">{uploadedFile.size}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFile(null);
                      setPreview('');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red-500/10 border border-brand-red-500 text-brand-red-500 text-[9px] font-bold uppercase tracking-widest hover:bg-brand-red-500 hover:text-black transition-colors rounded"
                  >
                    <X size={12} /> Change File
                  </button>
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    accept=".wav,.flac,.aiff,.pdf,.zip"
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
              ) : (
                <>
                  <div className="h-20 w-20 rounded-full bg-[var(--background)] flex items-center justify-center mb-6 group-hover:bg-brand-red-500 group-hover:text-[var(--background)] transition-colors">
                    <Upload size={32} />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-[0.3em] mb-2">Drop Electronic Files</h3>
                  <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-4">WAV, FLAC, AIFF, PDF, OR ZIP (Max 2GB)</p>
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    accept=".wav,.flac,.aiff,.pdf,.zip"
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </>
              )}
            </div>
          </section>

          {/* Metadata */}
          <section className="grid md:grid-cols-2 gap-12">
             <div className="luxury-card p-6 sm:p-10 space-y-8">
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-red-500">Asset Title</label>
                  <input type="text" placeholder="Internal Master Stem_01" className="bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" />
                </div>
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Asset Type</label>
                  <div className="grid grid-cols-2 gap-2">
                     <button type="button" className="py-3 border border-brand-red-500 text-[9px] font-bold uppercase tracking-widest text-brand-red-500 bg-brand-red-500/5">Master Tape</button>
                     <button type="button" className="py-3 border border-[var(--border)] text-[9px] font-bold uppercase tracking-widest text-[var(--foreground)]">Legal Document</button>
                     <button type="button" className="py-3 border border-[var(--border)] text-[9px] font-bold uppercase tracking-widest text-[var(--muted)]">Brand Kit</button>
                     <button type="button" className="py-3 border border-[var(--border)] text-[9px] font-bold uppercase tracking-widest text-[var(--muted)]">Technical Rider</button>
                  </div>
                </div>
             </div>

             <div className="luxury-card p-6 sm:p-10 space-y-8">
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Global Association</label>
                  <select className="bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--muted)] focus:outline-none focus:border-brand-red-500 appearance-none">
                     <option>Not Associated</option>
                     <option>MARA LUNA - Project X</option>
                     <option>ZEPHYR - Cinematic Soul EP</option>
                  </select>
                </div>
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Accessibility Access</label>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 text-[var(--foreground)] text-xs">
                        <input type="checkbox" className="w-4 h-4 rounded-none bg-[var(--background)] border-[var(--border)] accent-brand-red-500" />
                        <span className="uppercase tracking-widest">Public Domain Asset</span>
                     </div>
                     <div className="flex items-center gap-4 text-[var(--foreground)] text-xs">
                        <input type="checkbox" className="w-4 h-4 rounded-none bg-[var(--card)] border-[var(--border)] accent-brand-red-500" defaultChecked />
                        <span className="uppercase tracking-widest">Admin Authorization Required</span>
                     </div>
                  </div>
                </div>
             </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-end gap-6 pt-10 border-t border-[var(--border)]">
             <button 
              disabled={isSaving}
              className={cn(
                "luxury-button px-12 py-4 flex items-center justify-center gap-3 font-bold transition-all duration-500 min-w-[220px]",
                saveSuccess ? "bg-green-500 text-black border-green-500" : "bg-brand-red-500 text-black border-brand-red-500",
                isSaving && "opacity-70 cursor-not-allowed"
              )}
             >
                {isSaving ? (
                  <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : saveSuccess ? (
                   <><Check size={18} /> Asset Archived</>
                ) : (
                  <><Box size={18} /> Archive Asset</>
                )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
