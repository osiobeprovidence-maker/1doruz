import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Image as ImageIcon, 
  Plus, 
  X, 
  ArrowLeft,
  Clock,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminAddEvent() {
  const navigate = useNavigate();
  const createEvent = useMutation(api.events.create);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [venue, setVenue] = useState('');
  const [ticketLink, setTicketLink] = useState('');
  const [ticketInfo, setTicketInfo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await createEvent({
      title,
      date,
      location,
      venue,
      ticketLink,
      ticketInfo: ticketInfo || undefined,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    });

    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => navigate('/admin/events'), 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/admin/events" 
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] hover:text-brand-red-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Events
        </Link>

        <header className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-red-500 mb-2 block">Live Management</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[var(--foreground)]">Post <span className="text-luxury">New Event</span></h1>
          <p className="text-[var(--muted)] text-sm mt-4 uppercase tracking-widest font-mono">Configure show details & ticketing</p>
        </header>

        <form onSubmit={handleSave} className="space-y-12">
          {/* Main Info */}
          <section className="luxury-card p-6 sm:p-10 space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)] border-b border-[var(--border)] pb-4">01. Show Information</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Event Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 1DORUZ Showcase London" 
                  className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Venue Name</label>
                  <input 
                    type="text" 
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Printworks" 
                    className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Location (City, Country)</label>
                  <input 
                    type="text" 
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. London, UK" 
                    className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                    />
                    <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Featured Image</label>
                  <div className="relative">
                    {imageUrl ? (
                      <div className="relative w-full h-64 border-2 border-[var(--border)] overflow-hidden group">
                        <img src={imageUrl} alt="Event Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <ImageIcon className="text-white mr-2" size={20} />
                          <span className="text-white text-sm font-bold">Click to change</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) setImageUrl(URL.createObjectURL(file));
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full border-2 border-dashed border-[var(--border)] p-12 flex flex-col items-center justify-center rounded-lg hover:border-brand-red-500 transition-colors group cursor-pointer">
                        <ImageIcon className="text-[var(--muted)] group-hover:text-brand-red-500 mb-4" size={40} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] group-hover:text-brand-red-500">Drop Image or Click to Upload</span>
                        <span className="text-[8px] text-[var(--muted)] mt-2">Recommended: 1200x600px</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setImageUrl(URL.createObjectURL(file));
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ticketing */}
          <section className="luxury-card p-6 sm:p-10 space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)] border-b border-[var(--border)] pb-4">02. Ticketing & Access</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Ticket Purchase Link</label>
                <div className="relative">
                  <input 
                    type="url" 
                    required
                    value={ticketLink}
                    onChange={(e) => setTicketLink(e.target.value)}
                    placeholder="https://tickets.example.com/..." 
                    className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 pl-12" 
                  />
                  <Ticket size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red-500" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Ticket Information / Notes</label>
                <div className="relative">
                  <textarea 
                    value={ticketInfo}
                    onChange={(e) => setTicketInfo(e.target.value)}
                    placeholder="e.g. 18+ only. ID required at entry. VIP upgrades available at the venue." 
                    className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] h-32 focus:outline-none focus:border-brand-red-500 resize-none pl-12" 
                  />
                  <Info size={18} className="absolute left-4 top-4 text-brand-red-500" />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end items-center gap-6 pt-10">
            <button 
              type="button" 
              onClick={() => navigate('/admin/events')}
              className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="luxury-button bg-brand-red-500 text-black px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  Publish Event <Plus size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-12 right-12 bg-green-500 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-bold uppercase tracking-widest text-xs z-50"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Event Published Successfully
          </motion.div>
        )}
      </div>
    </div>
  );
}
