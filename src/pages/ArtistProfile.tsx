import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { 
  Instagram, 
  Twitter, 
  Music2, 
  Youtube, 
  Mail, 
  ArrowLeft, 
  Disc, 
  Facebook, 
  MessageCircle, 
  Radio, 
  Music,
  ExternalLink,
  Globe,
  Video,
  Mic2,
  Briefcase,
  Link as LinkIcon
} from 'lucide-react';
import SafeImage from '../components/SafeImage';

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram size={18} />,
  twitter: <Twitter size={18} />,
  tiktok: <Music2 size={18} />,
  facebook: <Facebook size={18} />,
  threads: <MessageCircle size={18} />,
  snapchat: <MessageCircle size={18} />,
  discord: <MessageCircle size={18} />,
  spotify: <Music2 size={18} />,
  appleMusic: <Music size={18} />,
  youtubeMusic: <Youtube size={18} />,
  audiomack: <Mic2 size={18} />,
  soundcloud: <Disc size={18} />,
  boomplay: <Music size={18} />,
  deezer: <Music2 size={18} />,
  tidal: <Radio size={18} />,
  youtube: <Youtube size={18} />,
  vevo: <Video size={18} />,
  twitch: <Radio size={18} />,
  website: <Globe size={18} />,
  linktree: <LinkIcon size={18} />,
  bookingEmail: <Mail size={18} />,
  managementEmail: <Mail size={18} />,
  pressEmail: <Mail size={18} />
};

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function ArtistProfile() {
  const { id } = useParams();
  const convexArtists = useQuery(api.artists.list) || [];
  const dynamicArtists = JSON.parse(localStorage.getItem('dynamic_artists') || '[]');
  const artist = convexArtists.find((a: any) => a._id === id) || dynamicArtists.find((a: any) => a.id === id);
  const artistReleases = useQuery(api.releases.getByArtist, id ? { artistId: id as any } : 'skip') || [];

  if (!artist) {
    return (
      <div className="pt-40 text-center space-y-8 px-6">
        <div className="mx-auto w-24 h-24 bg-brand-red-500/10 rounded-full flex items-center justify-center text-brand-red-500 mb-6">
          <Disc size={40} className="animate-spin-slow" />
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--foreground)] uppercase italic">Artist Not <span className="text-luxury">Found</span></h2>
        <p className="text-[var(--muted)] max-w-md mx-auto text-sm uppercase tracking-widest leading-loose">
          The sound signature you are seeking is currently unavailable in our active frequency roster.
        </p>
        <Link to="/artists" className="luxury-button inline-block bg-brand-red-500 text-black px-12 py-4 uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">
          Back to Roster
        </Link>
      </div>
    );
  }

  const socialLinks = artist.socialLinks || {};
  const genres = artist.genres || [];

  return (
    <div className="pb-32">
      {/* Header Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <SafeImage
          src={artist.imageUrl}
          alt={artist.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <Link to="/artists" className="absolute top-12 left-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--foreground)] hover:text-brand-red-500 transition-colors">
          <ArrowLeft size={16} /> All Artists
        </Link>
        <div className="absolute bottom-12 left-0 w-full px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-serif text-6xl font-bold md:text-8xl" style={{ color: 'var(--foreground)' }}>{artist.name}</h1>
              <div className="mt-4 flex flex-wrap gap-3">
                {genres.map(g => (
                  <span key={g} className="rounded-full bg-brand-red-500/10 border border-brand-red-500/30 px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest text-brand-red-500">
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-8 mt-20">
        <div className="grid gap-20 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-20">
            <section>
              <h2 className="mb-8 font-serif text-3xl font-bold" style={{ color: 'var(--foreground)' }}>The Journey</h2>
              <p className="text-xl leading-relaxed text-[var(--secondary)] font-light italic">
                {artist.bio}
              </p>
              <p className="mt-8 text-[var(--secondary)] leading-relaxed">
                As a visionary in the contemporary scene, {artist.name} has consistently redefined the boundaries of their craft. Through a blend of technical precision and raw emotional honesty, they have captured the imagination of global audiences and critics alike.
              </p>
            </section>

            {/* Gallery Section */}
            {artist.gallery && artist.gallery.length > 0 && (
              <section className="mb-24">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="font-serif text-3xl font-bold uppercase italic" style={{ color: 'var(--foreground)' }}>The <span className="text-luxury">Visuals</span></h2>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red-500">{artist.gallery.length} Frames</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {artist.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="aspect-square bg-[var(--card)] rounded-xl overflow-hidden border border-[var(--border)] cursor-pointer group"
                    >
                      <SafeImage 
                        src={img} 
                        alt={`${artist.name} Gallery ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="mb-12 font-serif text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Discography</h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {artistReleases.map(release => (
                  <div key={release._id} className="luxury-card flex gap-6 p-6">
                    <SafeImage src={release.coverArtUrl} alt={release.title} className="h-32 w-32 rounded-lg object-cover" />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-serif text-xl font-bold text-[var(--foreground)]">{release.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-[var(--muted)] mt-1">{release.type} | {new Date(release.releaseDate).getFullYear()}</p>
                      <div className="mt-4 flex flex-wrap gap-4">
                        {Object.entries(release.streamingLinks).map(([platform, url]) => {
                          if (!url || url === '#') return null;
                          
                          const releaseIcons: Record<string, any> = {
                            spotify: <Music2 size={16} />,
                            appleMusic: <Music size={16} />,
                            soundcloud: <Disc size={16} />,
                            youtube: <Youtube size={16} />,
                            beatport: <Radio size={16} />,
                            bandcamp: <ExternalLink size={16} />,
                            tidal: <Radio size={16} />
                          };

                          return (
                            <a 
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[var(--muted)] hover:text-brand-red-500 transition-all flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest bg-[var(--card)]/50 px-2 py-1 border border-[var(--border)]/50 hover:border-brand-red-500/50"
                              title={platform}
                            >
                              {releaseIcons[platform] || <ExternalLink size={14} />}
                              <span className="hidden sm:inline">{platform}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {artist.videos && artist.videos.length > 0 && (
              <section>
                <h2 className="mb-12 font-serif text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Visuals</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {artist.videos.map(video => {
                    const videoId = getYouTubeId(video.url);
                    return (
                      <div key={video.id} className="space-y-4">
                        <div className="aspect-video bg-[var(--card)] overflow-hidden rounded-xl border border-[var(--border)]">
                          {videoId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={video.title}
                              className="h-full w-full"
                              allowFullScreen
                            />
                          ) : video.url ? (
                            <video 
                              src={video.url} 
                              controls 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[var(--muted)] text-xs uppercase tracking-widest">
                              Video unavailable
                            </div>
                          )}
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]">{video.title}</h4>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div className="luxury-card p-8 rounded-2xl">
              <h4 className="mb-6 font-serif text-xl font-bold" style={{ color: 'var(--foreground)' }}>Connect</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(socialLinks).map(([platform, url]) => {
                  if (!url || url === '#' || platform.toLowerCase().includes('email')) return null;

                  return (
                    <a 
                      key={platform}
                      href={url} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 border rounded-lg transition-all group overflow-hidden"
                      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--muted)' }}
                    >
                      <div className="transition-transform group-hover:scale-110 flex-shrink-0">
                        {socialIcons[platform] || <ExternalLink size={18} />}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest truncate">{platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="luxury-card p-8 rounded-2xl border-brand-red-500/20">
              <h4 className="mb-6 font-serif text-xl font-bold" style={{ color: 'var(--foreground)' }}>Book Artist</h4>
              <p className="mb-8 text-sm text-[var(--muted)]">For world tour bookings, collaborations, or private inquiries.</p>
              <div className="space-y-3">
                {socialLinks.bookingEmail && (
                  <a 
                    href={`mailto:${socialLinks.bookingEmail}`}
                    className="luxury-button block w-full text-center bg-brand-red-500 text-black font-bold uppercase tracking-widest text-xs py-3"
                  >
                    Inquire Now
                  </a>
                )}
                {socialLinks.managementEmail && (
                  <a 
                    href={`mailto:${socialLinks.managementEmail}`}
                    className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-brand-red-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Briefcase size={12} /> Management
                  </a>
                )}
                {socialLinks.pressEmail && (
                  <a 
                    href={`mailto:${socialLinks.pressEmail}`}
                    className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-brand-red-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={12} /> Press Contact
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
