import React from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion } from 'motion/react';
import { Edit, Trash2, Calendar, User, Eye, FilePlus } from 'lucide-react';
import SafeImage from '../components/SafeImage';

import { Link } from 'react-router-dom';

export default function AdminNews() {
  const articles = useQuery(api.news.list) || [];
  const removeArticle = useMutation(api.news.remove);

  const handleDelete = async (id: any) => {
    if (window.confirm('Are you sure you want to remove this article?')) {
      await removeArticle({ id });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[var(--foreground)]">Press & News</h1>
            <p className="text-[var(--muted)] text-sm mt-1 uppercase tracking-widest font-mono">Manage label announcements & blog</p>
          </div>
          <Link to="/admin/news/new" className="luxury-button bg-[var(--foreground)] text-[var(--background)] font-bold flex items-center gap-2">
             <FilePlus size={16} /> Write Article
          </Link>
        </header>

        <div className="grid gap-12">
          {articles.map((article, i) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="luxury-card overflow-hidden grid lg:grid-cols-[400px_1fr] group"
            >
              <div className="h-64 lg:h-full relative overflow-hidden">
                 <SafeImage src={article.imageUrl} storageId={(article as any).imageStorageId} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 flex gap-2">
                   <span className="bg-brand-red-500 text-black px-3 py-1 text-[9px] font-bold uppercase tracking-widest">Live</span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col justify-center">
                <div className="flex gap-6 mb-6">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--muted)] group-hover:text-brand-red-500 transition-colors">
                    <Calendar size={12} /> {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--muted)]">
                    <User size={12} /> {article.author}
                  </div>
                </div>
                
                <h3 className="text-3xl font-serif font-bold text-[var(--foreground)] mb-6 italic leading-snug group-hover:text-brand-red-500 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-[var(--foreground)] text-sm leading-relaxed line-clamp-2 max-w-2xl mb-8">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-6 pt-6 border-t border-[var(--border)]">
                   <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] hover:text-brand-red-500 transition-colors">
                     <Edit size={14} /> Edit Content
                   </button>
                   <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-brand-red-500 transition-colors">
                     <Eye size={14} /> Preview
                   </button>
                   <button onClick={() => handleDelete(article._id)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-red-500 transition-colors">
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
