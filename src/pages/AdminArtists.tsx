import React from 'react';
import { motion } from 'motion/react';
import { ARTISTS } from '../lib/mockData';
import { Plus, Search, MoreHorizontal, Edit, Trash2, ExternalLink } from 'lucide-react';

import { Link } from 'react-router-dom';

export default function AdminArtists() {
  const dynamicArtists = JSON.parse(localStorage.getItem('dynamic_artists') || '[]');
  const allArtists = [...ARTISTS, ...dynamicArtists];

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8 lg:p-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-red-500 mb-2 block">Roster Management</span>
            <h1 className="font-serif text-[28px] sm:text-5xl font-bold text-[var(--foreground)] leading-tight">Artist <span className="text-luxury">Catalog</span></h1>
            <p className="text-[var(--muted)] text-sm mt-1 uppercase tracking-widest font-mono italic">Curating and managing signees</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
              <input 
                placeholder="Find artist..."
                className="w-full bg-[var(--background)] border border-[var(--border)] pl-11 pr-4 py-4 md:py-3 text-sm focus:border-brand-red-500 focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
            <Link to="/admin/artists/new" className="w-full md:w-auto bg-brand-red-500 text-[var(--background)] px-8 py-4 md:py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--foreground)] transition-colors flex items-center justify-center gap-2 min-h-[44px] shadow-lg shadow-brand-red-500/10">
              <Plus size={16} /> Add Artist
            </Link>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-6">
          {allArtists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="luxury-card p-5 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 group bg-[var(--card)]/50 backdrop-blur-sm"
            >
              <div className="h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden rounded-sm border border-[var(--border)]">
                <img src={artist.imageUrl} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] uppercase tracking-tight">{artist.name}</h3>
                  <div className="flex justify-center md:justify-start">
                    <span className="inline-flex items-center px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-bold uppercase tracking-widest border border-green-500/20">
                      Active
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                  {artist.genres.map(g => (
                    <span key={g} className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-mono italic">{g}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto pt-6 md:pt-0 border-t border-[var(--border)] md:border-none">
                <div className="text-center md:px-8 md:border-r border-[var(--border)] hidden lg:block">
                  <div className="text-lg font-bold text-[var(--foreground)]">2.4M</div>
                  <div className="text-[9px] uppercase tracking-widest text-[var(--muted)]">Monthly Listeners</div>
                </div>
                <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
                  <Link 
                    to={`/artists/${artist.id}`}
                    target="_blank"
                    className="flex-1 sm:flex-none p-4 text-[var(--foreground)] hover:text-brand-red-500 transition-colors bg-[var(--card)] border border-[var(--border)] min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                    title="View Public Profile"
                  >
                    <ExternalLink size={18} />
                  </Link>
                  <button className="flex-1 sm:flex-none p-4 text-[var(--muted)] hover:text-brand-red-500 transition-colors bg-[var(--background)] border border-[var(--border)] min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation">
                    <Edit size={18} />
                  </button>
                  <button className="flex-1 sm:flex-none p-4 text-[var(--muted)] hover:text-red-500 transition-colors bg-[var(--card)] border border-[var(--border)] min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
