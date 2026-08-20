import React from 'react';
import { motion } from 'motion/react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Ticket, 
  Edit, 
  Trash2, 
  ExternalLink,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SafeImage from '../components/SafeImage';

export default function AdminEvents() {
  const events = useQuery(api.events.list) || [];
  const removeEvent = useMutation(api.events.remove);

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-red-500 mb-2 block">Global Roster</span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[var(--foreground)]">World <span className="text-luxury">Tour</span></h1>
            <p className="text-[var(--muted)] text-sm mt-4 uppercase tracking-widest font-mono">Manage live performances & ticketing</p>
          </div>
          <Link to="/admin/events/new" className="luxury-button bg-[var(--foreground)] text-[var(--background)] font-bold flex items-center gap-2 px-8 py-4 text-[10px] uppercase tracking-widest hover:bg-brand-red-500 transition-colors">
             <Plus size={16} /> New Event
          </Link>
        </header>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-brand-red-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search by city, venue or tour name..." 
              className="w-full bg-[var(--background)] border border-[var(--border)] p-4 pl-12 text-xs uppercase tracking-widest text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 transition-all"
            />
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-4 border border-[var(--border)] text-[9px] font-bold uppercase tracking-widest text-brand-red-500 bg-[var(--background)]">Upcoming</button>
             <button className="px-6 py-4 border border-[var(--border)] text-[9px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-brand-red-500 transition-colors">Past Shows</button>
          </div>
        </div>

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="luxury-card overflow-hidden group"
            >
              <div className="p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-10">
                <div className="w-full lg:w-48 h-32 overflow-hidden rounded-lg shrink-0">
                   <SafeImage src={event.imageUrl || event.heroImage} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-red-500 text-black px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest">Live</span>
                    <h3 className="font-serif text-2xl font-bold text-[var(--foreground)]">{event.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                      <Calendar size={14} className="text-brand-red-500" /> 
                      {new Date(event.date || event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                      <MapPin size={14} className="text-brand-red-500" /> 
                      {event.venue}, {event.location || (event.city && event.country ? `${event.city}, ${event.country}` : '')}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                      <Ticket size={14} className="text-brand-red-500" /> 
                      <span className="truncate max-w-[150px]">{event.ticketLink || event.officialTicketUrl}</span>
                    </div>
                  </div>

                  {event.ticketInfo && (
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest italic line-clamp-1 border-l-2 border-brand-red-500/30 pl-4 mt-4">
                      {event.ticketInfo}
                    </p>
                  )}
                </div>

                <div className="flex lg:flex-col gap-3 shrink-0">
                  <button className="flex-1 lg:w-32 bg-[var(--background)] border border-[var(--border)] text-[9px] font-bold uppercase tracking-widest py-3 px-6 hover:bg-brand-red-500 hover:text-black transition-all flex items-center justify-center gap-2">
                    <Edit size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => { if (window.confirm('Remove this event?')) removeEvent({ id: event._id as any }); }}
                    className="flex-1 lg:w-32 bg-[var(--background)] border border-red-500/20 text-[9px] font-bold uppercase tracking-widest py-3 px-6 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={14} /> Remove
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
