import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Music4, User, Mail, Link as LinkIcon, FileText, Upload, X, Music } from 'lucide-react';
import { cn } from '../lib/utils';
import { storageUrl, uploadFile } from '../lib/uploads';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function DemoSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [email, setEmail] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [bio, setBio] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitDemo = useMutation(api.demos.create);
  const generateUploadUrl = useMutation(api.uploads.generatePublicUploadUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let audioFileUrl: string | undefined;
      if (file) {
        const uploadUrl = await generateUploadUrl({});
        const storageId = await uploadFile(file, uploadUrl);
        audioFileUrl = storageUrl(storageId);
      }

      await submitDemo({ artistName, email, demoUrl: demoUrl || undefined, audioFileUrl, bio });
      setSubmitted(true);
      setArtistName('');
      setEmail('');
      setDemoUrl('');
      setBio('');
      setFile(null);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--foreground)] md:text-7xl">Submit Your <span className="text-luxury">Demo</span></h1>
          <p className="mt-6 text-[var(--secondary)] max-w-2xl mx-auto text-lg">
            We are looking for original voices and innovative sounds. Please provide high-quality links (SoundCloud, Dropbox, etc.) and a brief introduction.
          </p>
        </motion.div>

        <div className="mt-20">
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[var(--background)] border border-brand-red-500/30 p-12 text-center rounded-2xl"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-red-500 text-[var(--background)] mb-6">
                <Send size={32} />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-4">Submission Received</h2>
              <p className="text-[var(--secondary)]">
                Our A&R team will carefully review your music. Due to high volumes, we only respond to selected submissions. Keep creating.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-brand-red-500 font-bold uppercase tracking-widest text-xs hover:text-brand-red-400"
              >
                Submit Another Demo
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-8 bg-[var(--card)]/50 border border-[var(--border)] p-6 md:p-12 rounded-2xl backdrop-blur-sm"
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] flex items-center gap-2">
                    <User size={14} /> Artist / Band Name
                  </label>
                  <input
                    required
                    name="artistName"
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Enter your artist name"
                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-4 text-[var(--foreground)] focus:border-brand-red-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-4 text-[var(--foreground)] focus:border-brand-red-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] flex items-center gap-2 mb-4">
                    <Music size={14} /> Upload Audio File
                  </label>
                  
                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={cn(
                      "relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center cursor-pointer group",
                      isDragging ? "border-brand-red-500 bg-brand-red-500/5" : "border-[var(--border)] bg-[var(--background)]/50 hover:border-brand-red-500/50",
                      file ? "border-brand-red-500/50 bg-brand-red-500/5" : ""
                    )}
                    onClick={() => !file && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept="audio/*"
                      className="hidden"
                    />

                    {file ? (
                      <div className="flex items-center gap-4 w-full">
                        <div className="h-12 w-12 rounded-full bg-brand-red-500 flex items-center justify-center text-black shrink-0">
                          <Music4 size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[var(--foreground)] truncate">{file.name}</p>
                          <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for submission
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeFile(); }}
                          className="p-2 text-[var(--muted)] hover:text-brand-red-500 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="h-14 w-14 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-brand-red-500 group-hover:border-brand-red-500/50 transition-all mb-4">
                          <Upload size={24} />
                        </div>
                        <p className="text-sm font-bold text-[var(--foreground)] mb-1 uppercase tracking-tight">Drop your demo here</p>
                        <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest">MP3, WAV, AIFF (MAX 50MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-[var(--border)]/50"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em]">
                    <span className="bg-[var(--background)] px-4 text-[var(--muted)]">OR PROVIDE LINK</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] flex items-center gap-2">
                    <LinkIcon size={14} /> Streaming Link (Optional)
                  </label>
                  <input
                    name="demoUrl"
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://soundcloud.com/you/demo"
                    className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-4 text-[var(--foreground)] focus:border-brand-red-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] flex items-center gap-2">
                  <FileText size={14} /> Brief Biography
                </label>
                <textarea
                  required
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder="Tell us about yourself and your musical journey..."
                  className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-4 text-[var(--foreground)] focus:border-brand-red-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  disabled={isSubmitting}
                  className="luxury-button w-full bg-brand-red-500 text-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Processing Submission...' : 'Send Demo'} <Music4 size={18} />
                  </span>
                </button>
              </div>
            </motion.form>
          )}
        </div>

        <div className="mt-20 border-t border-[var(--border)] pt-12 text-center">
           <h3 className="font-serif text-2xl text-[var(--foreground)] mb-4">Submission Guidelines</h3>
           <div className="grid gap-6 md:grid-cols-3 text-sm text-[var(--secondary)]">
             <div className="p-4 border border-[var(--border)] rounded-lg">
               <span className="text-brand-red-500 font-bold block mb-2">Originality</span>
               Only submitted original tracks. No remixes or samples unless cleared.
             </div>
             <div className="p-4 border border-[var(--border)] rounded-lg">
               <span className="text-brand-red-500 font-bold block mb-2">Quality</span>
               High quality MP3 (320kbps) or WAV formats only.
             </div>
             <div className="p-4 border border-[var(--border)] rounded-lg">
               <span className="text-brand-red-500 font-bold block mb-2">Unreleased</span>
               We prioritize unreleased material for signing consideration.
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
