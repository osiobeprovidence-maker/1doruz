import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Instagram, 
  Twitter, 
  Globe, 
  Music2, 
  Save,
  Check,
  Facebook,
  Youtube,
  Twitch,
  Mail,
  Link as LinkIcon,
  MessageSquare,
  ChevronDown,
  Music4,
  ExternalLink,
  Mic2,
  Video,
  Image,
  Briefcase
} from 'lucide-react';
import { cn } from '../lib/utils';
import { storageUrl, uploadFile, validateImageFile } from '../lib/uploads';

interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
  placeholder: string;
}

interface PlatformCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  platforms: Platform[];
}

const DIGITAL_PLATFORMS: PlatformCategory[] = [
  {
    id: 'social',
    name: 'Social Media',
    icon: Instagram,
    platforms: [
      { id: 'instagram', name: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/...' },
      { id: 'tiktok', name: 'TikTok', icon: Music2, placeholder: 'https://tiktok.com/@...' },
      { id: 'twitter', name: 'X / Twitter', icon: Twitter, placeholder: 'https://twitter.com/...' },
      { id: 'facebook', name: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/...' },
      { id: 'threads', name: 'Threads', icon: MessageSquare, placeholder: 'https://threads.net/@...' },
      { id: 'snapchat', name: 'Snapchat', icon: MessageSquare, placeholder: 'https://snapchat.com/add/...' },
      { id: 'discord', name: 'Discord', icon: MessageSquare, placeholder: 'Discord Invite Link' },
    ]
  },
  {
    id: 'streaming',
    name: 'Streaming Platforms',
    icon: Music4,
    platforms: [
      { id: 'spotify', name: 'Spotify', icon: Music2, placeholder: 'Spotify Artist URL' },
      { id: 'appleMusic', name: 'Apple Music', icon: Music4, placeholder: 'Apple Music Artist URL' },
      { id: 'youtubeMusic', name: 'YouTube Music', icon: Youtube, placeholder: 'YouTube Music URL' },
      { id: 'audiomack', name: 'Audiomack', icon: Mic2, placeholder: 'Audiomack URL' },
      { id: 'soundcloud', name: 'SoundCloud', icon: Music2, placeholder: 'SoundCloud URL' },
      { id: 'boomplay', name: 'Boomplay', icon: Music4, placeholder: 'Boomplay URL' },
      { id: 'deezer', name: 'Deezer', icon: Music2, placeholder: 'Deezer URL' },
      { id: 'tidal', name: 'Tidal', icon: Music4, placeholder: 'Tidal URL' },
    ]
  },
  {
    id: 'video',
    name: 'Video Platforms',
    icon: Video,
    platforms: [
      { id: 'youtube', name: 'YouTube Channel', icon: Youtube, placeholder: 'YouTube Channel URL' },
      { id: 'vevo', name: 'Vevo', icon: Video, placeholder: 'Vevo Channel URL' },
      { id: 'twitch', name: 'Twitch', icon: Twitch, placeholder: 'https://twitch.tv/...' },
    ]
  },
  {
    id: 'professional',
    name: 'Professional Links',
    icon: Briefcase,
    platforms: [
      { id: 'website', name: 'Official Website', icon: Globe, placeholder: 'https://...' },
      { id: 'linktree', name: 'Linktree / Songwhip', icon: LinkIcon, placeholder: 'https://linktr.ee/...' },
      { id: 'bookingEmail', name: 'Booking Email', icon: Mail, placeholder: 'bookings@...' },
      { id: 'managementEmail', name: 'Management Email', icon: Mail, placeholder: 'mgmt@...' },
      { id: 'pressEmail', name: 'Press Contact Email', icon: Mail, placeholder: 'press@...' },
    ]
  }
];

export default function AdminAddArtist() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<string[]>([]);
  const [newGenre, setNewGenre] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [age, setAge] = useState('');
  const [distribution, setDistribution] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const createArtist = useMutation(api.artists.create);
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const callerId = user._id || user.id;
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState<string[]>(['social']);
  const [videos, setVideos] = useState<{title: string, url: string}[]>([{title: '', url: ''}]);
  const [gallery, setGallery] = useState<string[]>([]);

  const addVideoField = () => setVideos([...videos, {title: '', url: ''}]);
  const removeVideoField = (index: number) => {
    if (videos.length > 1) {
      setVideos(videos.filter((_, i) => i !== index));
    } else {
      setVideos([{title: '', url: ''}]);
    }
  };
  const updateVideo = (index: number, field: 'title' | 'url', value: string) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'gallery' | 'video' | 'profile') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'profile') {
        const validation = validateImageFile(file);
        if (!validation.valid) { alert(validation.error); return; }
        setProfileFile(file);
        setImageUrl(URL.createObjectURL(file));
      } else if (type === 'gallery') {
        const validation = validateImageFile(file);
        if (!validation.valid) { alert(validation.error); return; }
        setGalleryFiles([...galleryFiles, file]);
        setGallery([...gallery, URL.createObjectURL(file)]);
      } else if (type === 'video') {
        setVideos([...videos.filter(v => v.title || v.url), { title: file.name.split('.')[0], url: '' }]);
      }
    }
  };

  const addGenre = () => {
    if (newGenre && !genres.includes(newGenre)) {
      setGenres([...genres, newGenre]);
      setNewGenre('');
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLinkChange = (id: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let resolvedImageUrl = imageUrl;
      let resolvedImageStorageId: string | undefined;
      let resolvedGallery: string[] | undefined;

      if (profileFile) {
        const uploadUrl = await generateUploadUrl({ callerId });
        const storageId = await uploadFile(profileFile, uploadUrl);
        resolvedImageStorageId = storageId;
        resolvedImageUrl = storageUrl(storageId);
      }

      if (galleryFiles.length > 0) {
        const urls: string[] = [];
        for (const galleryFile of galleryFiles) {
          const uploadUrl = await generateUploadUrl({ callerId });
          const storageId = await uploadFile(galleryFile, uploadUrl);
          urls.push(storageUrl(storageId));
        }
        resolvedGallery = urls;
      }

      await createArtist({
        name,
        bio,
        imageUrl: resolvedImageUrl || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=1200',
        imageStorageId: resolvedImageStorageId,
        genres,
        socialLinks,
        videos: videos.filter(v => v.title && v.url).map((v, i) => ({ id: `v-${Date.now()}-${i}`, title: v.title, url: v.url })),
        gallery: resolvedGallery,
        featured: false,
      });

      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/admin/artists');
      }, 1500);
    } catch (err) {
      console.error('Failed to create artist:', err);
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/admin/artists')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] hover:text-brand-red-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Roster
        </button>

        <header className="mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">Onboard Artist</h1>
          <p className="text-[var(--muted)] text-sm uppercase tracking-widest font-mono">Register new talent to the 1DORUZ catalog</p>
        </header>

        <form onSubmit={handleSave} className="space-y-12">
          {/* Visual Identity Section */}
          <section className="luxury-card p-6 sm:p-10 space-y-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)] border-b border-[var(--border)] pb-4">01. Visual Identity</h3>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-48 h-48 bg-[var(--background)] border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center group hover:border-brand-red-500 transition-colors cursor-pointer overflow-hidden">
                 {imageUrl ? (
                    <div className="relative w-full h-full">
                       <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload size={20} className="text-white" />
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleFileUpload(e, 'profile')} />
                       </div>
                    </div>
                 ) : (
                    <>
                       <Upload size={24} className="text-[var(--muted)] group-hover:text-brand-red-500 mb-2" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] group-hover:text-brand-red-500">Press Photo</span>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleFileUpload(e, 'profile')} />
                     </>
                  )}
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Stage Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. SONIC PHANTOM" 
                    className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] block mb-2">Artist Bio</label>
                  <textarea 
                    required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe the artist's sound and journey..." 
                    className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] h-32 focus:outline-none focus:border-brand-red-500 resize-none" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sonic Profile Section */}
          <section className="luxury-card p-6 sm:p-10 space-y-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)] border-b border-[var(--border)] pb-4">02. Sonic Profile</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block">Artist Age</label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 24" 
                  className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block">Primary Distribution Areas</label>
                <input 
                  type="text" 
                  value={distribution}
                  onChange={(e) => setDistribution(e.target.value)}
                  placeholder="e.g. Worldwide, UK, USA" 
                  className="w-full bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                />
              </div>
            </div>
            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] block mb-2">Genres & Tags</label>
              <div className="flex flex-col sm:flex-row gap-4">
                 <input 
                  type="text" 
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
                  placeholder="Techno, Soul, etc." 
                  className="flex-1 bg-[var(--card)] border border-[var(--border)] p-4 text-sm text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                 />
                 <button 
                  type="button"
                  onClick={addGenre}
                  className="bg-[var(--foreground)] text-[var(--background)] px-8 py-4 sm:py-0 font-bold text-[10px] uppercase tracking-widest hover:bg-brand-red-500 transition-colors"
                 >
                   Add Tag
                 </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                 {genres.map(genre => (
                   <span key={genre} className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[var(--secondary)]">
                     {genre} <X size={12} className="cursor-pointer hover:text-brand-red-500" onClick={() => setGenres(genres.filter(g => g !== genre))} />
                   </span>
                 ))}
                 {genres.length === 0 && <span className="text-[10px] italic text-[var(--muted)]">No genres added yet...</span>}
              </div>
            </div>
          </section>

          {/* Expanded Digital Presence Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)]">03. Digital Presence</h3>
              <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-mono">Categorized Network</span>
            </div>
            
            <div className="grid gap-6">
              {DIGITAL_PLATFORMS.map((category) => (
                <div key={category.id} className="luxury-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(category.id)}
                    className="w-full flex items-center justify-between p-6 hover:bg-[var(--card)] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-brand-red-500 group-hover:scale-110 transition-transform">
                        <category.icon size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]">{category.name}</p>
                        <p className="text-[9px] text-[var(--muted)] uppercase tracking-widest mt-1">
                          {category.platforms.length} Platforms available
                        </p>
                      </div>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={cn(
                        "text-[var(--muted)] transition-transform duration-300",
                        openSections.includes(category.id) ? "rotate-180" : ""
                      )} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openSections.includes(category.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="border-t border-[var(--border)]"
                      >
                        <div className="p-8 grid sm:grid-cols-2 gap-6 bg-[var(--card)]/30">
                          {category.platforms.map((platform) => (
                            <div key={platform.id} className="space-y-2">
                              <div className="flex items-center justify-between px-1">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted)] flex items-center gap-2">
                                  <platform.icon size={12} /> {platform.name}
                                </label>
                                {socialLinks[platform.id] && (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <Check size={10} className="text-green-500" />
                                  </motion.div>
                                )}
                              </div>
                              <div className="relative group">
                                <input 
                                  type={platform.id.toLowerCase().includes('email') ? 'email' : 'text'}
                                  value={socialLinks[platform.id] || ''}
                                  onChange={(e) => handleLinkChange(platform.id, e.target.value)}
                                  placeholder={platform.placeholder}
                                  className="w-full bg-[var(--background)] border border-[var(--border)] p-4 text-xs text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 transition-colors pl-12" 
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-brand-red-500 transition-colors">
                                  <platform.icon size={16} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Videos & Visuals Section */}
          <section className="luxury-card p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)]">04. Visuals & Videos</h3>
              <div className="flex gap-4">
                <label className="cursor-pointer text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] hover:text-brand-red-500 transition-colors flex items-center gap-2">
                  <Upload size={14} /> Upload Video
                  <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} />
                </label>
                <button 
                  type="button" 
                  onClick={addVideoField}
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-red-500 hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
                >
                  <Plus size={14} /> Add Link
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {videos.map((video, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-4 items-start p-6 bg-[var(--background)] border border-[var(--border)] group relative">
                  <button 
                    type="button"
                    onClick={() => removeVideoField(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X size={12} />
                  </button>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted)]">Video Title</label>
                    <input 
                      type="text" 
                      value={video.title}
                      onChange={(e) => updateVideo(index, 'title', e.target.value)}
                      placeholder="e.g. Official Music Video"
                      className="w-full bg-[var(--card)] border border-[var(--border)] p-3 text-xs text-[var(--foreground)] focus:outline-none focus:border-brand-red-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted)]">YouTube / Vimeo URL</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={video.url}
                        onChange={(e) => updateVideo(index, 'url', e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full bg-[var(--card)] border border-[var(--border)] p-3 text-xs text-[var(--foreground)] focus:outline-none focus:border-brand-red-500 pl-10" 
                      />
                      <Video size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section className="luxury-card p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--foreground)]">05. Photo Gallery</h3>
              <label className="cursor-pointer text-[9px] font-bold uppercase tracking-[0.2em] text-brand-red-500 hover:text-[var(--foreground)] transition-colors flex items-center gap-2">
                <Plus size={14} /> Add Image
                <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => {
                  const files = Array.from(e.target.files || []) as File[];
                  const valid = files.filter(f => {
                    const v = validateImageFile(f);
                    if (!v.valid) alert(v.error);
                    return v.valid;
                  });
                  setGalleryFiles([...galleryFiles, ...valid]);
                  setGallery([...gallery, ...valid.map(f => URL.createObjectURL(f))]);
                  e.target.value = '';
                }} />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {gallery.map((url, index) => (
                <div key={index} className="aspect-square bg-[var(--background)] border border-[var(--border)] relative group overflow-hidden rounded-lg">
                  <img src={url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <button 
                    type="button"
                    onClick={() => setGallery(gallery.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <div className="aspect-square border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center text-[var(--muted)] hover:border-brand-red-500 hover:text-brand-red-500 transition-all cursor-pointer rounded-lg relative">
                <Upload size={20} className="mb-2" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Drop Image</span>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleFileUpload(e, 'gallery')} />
              </div>
            </div>
          </section>

          <div className="flex justify-end items-center gap-6 pt-10">
             <button 
              type="button" 
              onClick={() => navigate('/admin/artists')} 
              disabled={isSaving}
              className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-brand-red-500 transition-colors disabled:opacity-30"
             >
              Discard Draft
             </button>
             <button 
              disabled={isSaving}
              className={cn(
                "luxury-button px-12 py-4 flex items-center gap-3 transition-all duration-500 min-w-[200px] justify-center",
                saveSuccess ? "bg-green-500 text-black border-green-500" : "bg-brand-red-500 text-black border-brand-red-500",
                isSaving && "opacity-70 cursor-not-allowed"
              )}
             >
                {isSaving ? (
                   <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : saveSuccess ? (
                  <><Check size={18} /> Artist Signed</>
                ) : (
                  <><Save size={18} /> Sign Artist</>
                )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

