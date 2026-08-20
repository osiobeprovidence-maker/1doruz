import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { MapPin, Calendar, Clock, Ticket, Info } from 'lucide-react';
import SafeImage from '../components/SafeImage';

export default function Events() {
  const events = useQuery(api.events.list) || [];

  return (
    <div className="pb-32">
       <div className="mx-auto max-w-7xl px-6">
         <div className="mb-20 text-center">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-brand-red-500">Live Experiences</span>
           <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-[var(--foreground)]">World <span className="text-luxury">Tour</span></h1>
           <p className="mt-6 text-[var(--secondary)] max-w-2xl mx-auto text-lg">
             Catch the 1DORUZ sound live. From intimate club showcases to global festival stages.
           </p>
         </div>

         <div className="space-y-6">
            {events.map((event, i) => (
              <motion.div
                key={event._id}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="group luxury-card grid items-center gap-8 p-6 lg:grid-cols-[200px_1fr_250px_200px] text-center lg:text-left relative overflow-hidden"
             >
               <div className="h-40 overflow-hidden rounded-xl">
                   <SafeImage src={event.imageUrl || event.heroImage} alt={event.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
               </div>
               
               <div className="space-y-4">
                 <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] group-hover:text-brand-red-500 transition-colors">{event.title}</h3>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-[var(--secondary)]">
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-red-500" /> {event.venue}, {event.location || (event.city && event.country ? `${event.city}, ${event.country}` : '')}</div>
                 </div>
                 {event.ticketInfo && (
                   <div className="flex items-start justify-center lg:justify-start gap-2 text-[10px] uppercase tracking-widest text-[var(--muted)] bg-[var(--background)]/50 p-3 rounded border border-[var(--border)] italic">
                     <Info size={12} className="text-brand-red-500 shrink-0 mt-0.5" />
                     <span className="leading-relaxed">{event.ticketInfo}</span>
                   </div>
                 )}
               </div>

               <div className="flex flex-col gap-2 items-center lg:items-start">
                 <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--secondary)]">
                    <Calendar size={14} className="text-brand-red-500" /> {new Date(event.date || event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                 </div>
                 <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--secondary)]">
                   <Clock size={14} className="text-brand-red-500" /> Doors: 8:00 PM
                 </div>
               </div>

               <div className="flex justify-center lg:justify-end">
                 <a 
                    href={event.ticketLink || event.officialTicketUrl} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="luxury-button w-full sm:w-auto px-10 py-4 bg-[var(--foreground)] text-[var(--background)] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-brand-red-500 hover:tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 group/ticket"
                 >
                   Get Tickets <Ticket size={14} className="text-[var(--muted)] group-hover/ticket:text-zinc-950" />
                 </a>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
    </div>
  );
}
