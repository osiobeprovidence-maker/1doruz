import React from 'react';
import { motion } from 'motion/react';
import { Music4, Download, Send, Trash2, CheckCircle, Radio, User, Calendar } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function AdminDemos() {
  const demos = useQuery(api.demos.list) || [];
  const updateStatus = useMutation(api.demos.updateStatus);
  const remove = useMutation(api.demos.remove);

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-red-500 mb-2 block">A&R Internal</span>
            <h1 className="font-serif text-[28px] sm:text-5xl font-bold text-[var(--foreground)] italic leading-tight">Submission <span className="text-luxury">Vault</span></h1>
            <p className="text-[var(--muted)] text-sm mt-1 uppercase tracking-widest font-mono">Reviewing unreleased talent</p>
          </div>
          <div className="flex gap-4">
             <div className="luxury-card px-8 py-3 flex items-center gap-3 bg-[var(--card)] border-brand-red-500/20">
                <Radio className="text-brand-red-500 animate-pulse" size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]">Live Feed</span>
             </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Demo List */}
          <div className="space-y-4 sm:space-y-6">
            {demos.map((demo, i) => (
              <motion.div
                key={demo._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="luxury-card p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between group gap-6 bg-[var(--card)]"
              >
                <div className="flex items-center gap-5 sm:gap-8">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-brand-red-500 group-hover:bg-brand-red-500 group-hover:text-[var(--background)] transition-all cursor-pointer rounded-sm">
                    <Music4 size={24} />
                  </div>
                  <div>
                    <h3 className="text-[18px] sm:text-xl font-bold text-[var(--foreground)] uppercase tracking-tight">{demo.artistName}</h3>
                    <p className="text-[12px] text-[var(--muted)] uppercase tracking-widest font-mono font-bold mb-2 italic">{demo.email}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[10px] text-[var(--muted)] font-bold tracking-widest uppercase">
                       <span className="flex items-center gap-1.5"><User size={10} className="text-[var(--muted)]" /> {demo.email}</span>
                       <span className="flex items-center gap-1.5"><Calendar size={10} className="text-[var(--muted)]" /> {new Date(demo._creationTime).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto pt-6 md:pt-0 border-t border-[var(--border)] md:border-none">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 md:py-2.5 bg-[var(--background)] text-[10px] font-bold uppercase tracking-widest text-[var(--secondary)] hover:text-brand-red-500 transition-colors border border-[var(--border)] min-h-[44px]" onClick={() => demo.demoUrl && window.open(demo.demoUrl, '_blank')}>Listen</button>
                  <button onClick={() => updateStatus({ id: demo._id, status: 'reviewed' })} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 md:py-2.5 bg-brand-red-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--foreground)] transition-colors min-h-[44px]">Recruit</button>
                  <button onClick={() => remove({ id: demo._id })} className="p-3 text-[var(--muted)] hover:text-red-500 transition-colors active:scale-95 touch-manipulation">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats & Filters */}
          <aside className="space-y-6 sm:space-y-12">
            <div className="luxury-card p-8 sm:p-10 bg-[var(--card)]">
               <h4 className="font-serif text-[22px] font-bold text-[var(--foreground)] mb-8 italic border-b border-[var(--border)] pb-4">Submission Metrics</h4>
               <div className="space-y-8">
                 <div>
                   <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-3">
                     <span className="text-[var(--muted)]">Shortlisted Artists</span>
                     <span className="text-brand-red-500">24%</span>
                   </div>
                   <div className="w-full bg-[var(--card)] h-1 rounded-full overflow-hidden">
                     <div className="bg-brand-red-500 h-full w-[24%]" />
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-3">
                     <span className="text-[var(--foreground)]">Review Throughput</span>
                     <span className="text-[var(--foreground)]">92%</span>
                   </div>
                   <div className="w-full bg-[var(--card)] h-1 rounded-full overflow-hidden">
                     <div className="bg-white h-full w-[92%]" />
                   </div>
                 </div>
               </div>
            </div>

            <div className="luxury-card p-8 sm:p-10 bg-brand-red-500/5 backdrop-blur-md">
              <h4 className="font-serif text-[20px] font-bold text-[var(--foreground)] mb-6 uppercase tracking-tight">Label Reminders</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-brand-red-500 shadow-[0_0_10px_rgba(229,25,34,0.5)]" />
                  <span className="text-xs text-[var(--secondary)] leading-relaxed uppercase tracking-widest">Verify stems for Sonic Phantom.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-brand-red-500 shadow-[0_0_10px_rgba(229,25,34,0.5)]" />
                  <span className="text-xs text-[var(--secondary)] leading-relaxed uppercase tracking-widest">A&R Meeting @ 15:00 GMT.</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
