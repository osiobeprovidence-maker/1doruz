import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function News() {
  const articles = useQuery(api.news.list) || [];
  return (
    <div className="pb-32">
       <div className="mx-auto max-w-7xl px-6">
         <div className="mb-20">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-brand-red-500">Inside 1DORUZ</span>
           <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-[var(--foreground)]">Latest <span className="text-luxury">News</span></h1>
         </div>

         <div className="grid gap-20">
           {articles.map((article, i) => (
             <motion.article
               key={article._id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="grid gap-12 lg:grid-cols-2 group cursor-pointer"
             >
               <div className="relative h-96 overflow-hidden rounded-2xl">
                 <img
                   src={article.imageUrl}
                   alt={article.title}
                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute top-6 left-6">
                   <span className="bg-brand-red-500 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--background)] rounded-full">
                     Label Update
                   </span>
                 </div>
               </div>
               <div className="flex flex-col justify-center">
                 <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-6 font-bold">
                   <span className="flex items-center gap-2"><Calendar size={12} className="text-brand-red-500" /> {new Date(article.publishedAt).toLocaleDateString()}</span>
                   <span className="flex items-center gap-2"><User size={12} className="text-brand-red-500" /> By {article.author}</span>
                 </div>
                 <h2 className="font-serif text-4xl font-bold text-[var(--foreground)] mb-6 group-hover:text-brand-red-500 transition-colors leading-tight">{article.title}</h2>
                 <p className="text-lg text-[var(--secondary)] font-light leading-relaxed line-clamp-3 mb-8">
                   {article.excerpt}
                 </p>
                 <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-red-500 group-hover:translate-x-2 transition-transform">
                   Read Full Story <ArrowRight size={16} />
                 </button>
               </div>
             </motion.article>
           ))}
         </div>
       </div>
    </div>
  );
}
