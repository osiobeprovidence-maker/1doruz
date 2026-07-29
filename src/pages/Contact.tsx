import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Youtube } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const submitContact = useMutation(api.contact.submit);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContact({ name, email, subject, message });
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('General Inquiry');
      setMessage('');
    } catch (error) {
      console.error('Contact error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-32">
       <div className="mx-auto max-w-7xl px-6">
         <div className="mb-20">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-brand-red-500">Get In Touch</span>
           <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-[var(--foreground)]">Contact <span className="text-luxury italic">Us</span></h1>
         </div>

         <div className="grid gap-20 lg:grid-cols-2">
           {/* Contact Info */}
           <div className="space-y-12">
             <div className="space-y-6">
               <h2 className="font-serif text-3xl font-bold text-[var(--foreground)]">Let's connect</h2>
               <p className="max-w-md text-[var(--secondary)] font-light text-lg">
                 Whether you're looking for distribution, booking information, or have general inquiries, our team is here to help.
               </p>
             </div>

             <div className="space-y-8">
               <div className="flex items-start gap-6">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--background)] text-brand-red-500">
                    <MapPin size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-[var(--foreground)] uppercase text-xs tracking-widest mb-2">Our Locations</h4>
                   <p className="text-[var(--muted)] text-sm">New York City, NY</p>
                   <p className="text-[var(--muted)] text-sm">London, United Kingdom</p>
                 </div>
               </div>

               <div className="flex items-start gap-6">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--background)] text-brand-red-500">
                    <Mail size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-[var(--foreground)] uppercase text-xs tracking-widest mb-2">Email Us</h4>
                   <p className="text-[var(--muted)] text-sm">info@1doruz.com</p>
                   <p className="text-[var(--muted)] text-sm">bookings@1doruz.com</p>
                 </div>
               </div>

               <div className="flex items-start gap-6">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--card)] text-brand-red-500">
                    <Phone size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-[var(--foreground)] uppercase text-xs tracking-widest mb-2">Call Us</h4>
                   <p className="text-[var(--foreground)] text-sm">+1 (555) 123-4567</p>
                 </div>
               </div>
             </div>

             <div className="pt-12 border-t border-[var(--border)]">
               <h4 className="font-bold text-[var(--foreground)] uppercase text-[10px] tracking-[0.3em] mb-6">Follow the Journey</h4>
               <div className="flex gap-6">
                 <a href="#" className="text-[var(--muted)] hover:text-brand-red-500 transition-colors"><Instagram size={24} /></a>
                 <a href="#" className="text-[var(--muted)] hover:text-brand-red-500 transition-colors"><Twitter size={24} /></a>
                 <a href="#" className="text-[var(--muted)] hover:text-brand-red-500 transition-colors"><Youtube size={24} /></a>
               </div>
             </div>
           </div>

           {/* Contact Form */}
           <div className="luxury-card p-6 sm:p-12 rounded-3xl">
             {submitted ? (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center h-full flex flex-col justify-center py-12"
               >
                 <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-brand-red-500 text-[var(--background)] mb-6 font-bold">
                    <Send size={32} />
                 </div>
                 <h3 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-4">Message Sent</h3>
                 <p className="text-[var(--secondary)]">Our team will get back to you within 48 hours. Thank you for reaching out.</p>
                 <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-brand-red-500 font-bold uppercase tracking-widest text-xs hover:text-brand-red-400"
                 >
                   Send another message
                 </button>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Full Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-[var(--card)] border border-[var(--border)] px-6 py-4 text-[var(--foreground)] focus:border-brand-red-500 focus:outline-none transition-colors rounded-xl"
                    />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-[var(--background)] border border-[var(--border)] px-6 py-4 text-[var(--foreground)] focus:border-brand-red-500 focus:outline-none transition-colors rounded-xl"
                    />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Subject</label>
                    <select
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[var(--card)] border border-[var(--border)] px-6 py-4 text-[var(--foreground)] focus:border-brand-red-500 focus:outline-none transition-colors rounded-xl appearance-none"
                    >
                      <option>General Inquiry</option>
                      <option>Booking Request</option>
                      <option>Distribution Inquiry</option>
                      <option>Press & Media</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Your Message</label>
                    <textarea
                      required
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full bg-[var(--card)] border border-[var(--border)] px-6 py-4 text-[var(--foreground)] focus:border-brand-red-500 focus:outline-none transition-colors rounded-xl resize-none"
                    />
                 </div>
                 <button
                   disabled={isSubmitting}
                   className="luxury-button w-full bg-brand-red-500 text-[var(--background)] hover:opacity-90 disabled:opacity-50 mt-4 rounded-xl"
                 >
                   <span className="flex items-center justify-center gap-2">
                     {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                   </span>
                 </button>
               </form>
             )}
           </div>
         </div>
       </div>
    </div>
  );
}
