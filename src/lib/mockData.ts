import { Artist, Release, LabelEvent, NewsArticle, GalleryItem } from '../types';

export const ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'ZEPHYR',
    bio: 'Pushing the boundaries of electronic soul, Zephyr brings a cinematic soundscape to every performance.',
    imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=1200',
    genres: ['Electronic', 'Soul', 'Future Bass'],
    socialLinks: {
      spotify: 'https://open.spotify.com/artist/zephyr',
      instagram: 'https://instagram.com/zephyr_sonic',
      youtube: 'https://youtube.com/zephyr_official',
      soundcloud: 'https://soundcloud.com/zephyr-music',
      tiktok: 'https://tiktok.com/@zephyr_sonic',
      twitter: 'https://twitter.com/zephyr_sonic',
      facebook: 'https://facebook.com/zephyrmusic',
      discord: 'https://discord.gg/zephyr',
      appleMusic: 'https://music.apple.com/artist/zephyr',
      website: 'https://zephyrmusic.com',
      bookingEmail: 'bookings@1doruz.com',
      managementEmail: 'mgmt@1doruz.com',
      pressEmail: 'press@1doruz.com'
    },
    videos: [
      { id: 'v1', title: 'Neon Nights (Official Video)', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 'v2', title: 'Live at 1DORUZ Showcase', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1598387181032-f35192a0638c?q=80&w=2072&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253361-bee87184919a?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop'
    ],
    featured: true
  },
  {
    id: '2',
    name: 'MARA LUNA',
    bio: 'With a voice that cuts through the noise, Mara Luna is the new face of contemporary R&B.',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200',
    genres: ['R&B', 'Neo-Soul'],
    socialLinks: {
      spotify: 'https://open.spotify.com/artist/maraluna',
      instagram: 'https://instagram.com/maraluna_orb',
      facebook: 'https://facebook.com/maralunamusic',
      soundcloud: 'https://soundcloud.com/mara-luna',
      appleMusic: 'https://music.apple.com/artist/maraluna',
      tiktok: 'https://tiktok.com/@maraluna_rnb',
      youtube: 'https://youtube.com/maraluna_official',
      vevo: 'https://vevo.com/maraluna',
      linktree: 'https://linktr.ee/maraluna',
      bookingEmail: 'bookings@1doruz.com',
      pressEmail: 'press@1doruz.com'
    },
    videos: [
      { id: 'v3', title: 'Midnight Whispers (Official Video)', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
    ],
    featured: true
  },
  {
    id: '3',
    name: 'DRIP LORD',
    bio: 'Hailing from the underground, Drip Lord is redefining trap with intricate melodies and heavy bass.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee237cb45d0?auto=format&fit=crop&q=80&w=1200',
    genres: ['Trap', 'Hip-Hop'],
    socialLinks: {
      spotify: 'https://open.spotify.com/artist/driplord',
      youtube: 'https://youtube.com/driplord_trap',
      tiktok: 'https://tiktok.com/@driplord_bass',
      discord: 'https://discord.gg/driplord',
      twitch: 'https://twitch.tv/driplord_live',
      tidal: 'https://tidal.com/artist/driplord',
      bookingEmail: 'bookings@1doruz.com',
      managementEmail: 'mgmt@driplord.com'
    },
    featured: false
  }
];

export const RELEASES: Release[] = [
  {
    id: 'r1',
    title: 'Neon Nights',
    artistId: '1',
    artistName: 'ZEPHYR',
    releaseDate: '2024-05-15',
    coverArtUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200',
    type: 'Album',
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/neon-nights',
      appleMusic: 'https://music.apple.com/album/neon-nights',
      beatport: 'https://beatport.com/release/neon-nights',
      soundcloud: 'https://soundcloud.com/zephyr-music/sets/neon-nights'
    },
    featured: true
  },
  {
    id: 'r2',
    title: 'Midnight Whispers',
    artistId: '2',
    artistName: 'MARA LUNA',
    releaseDate: '2024-04-10',
    coverArtUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    type: 'Single',
    streamingLinks: {
      spotify: 'https://open.spotify.com/track/midnight-whispers',
      tidal: 'https://tidal.com/track/midnight-whispers',
      bandcamp: 'https://maraluna.bandcamp.com/track/midnight-whispers'
    },
    featured: true
  },
  {
    id: 'r3',
    title: 'High Tide',
    artistId: '3',
    artistName: 'DRIP LORD',
    releaseDate: '2024-03-22',
    coverArtUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1200',
    type: 'EP',
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/high-tide',
      youtube: 'https://youtube.com/watch?v=hightide',
      soundcloud: 'https://soundcloud.com/driplord/high-tide'
    },
    featured: false
  }
];

export const EVENTS: LabelEvent[] = [
  {
    id: 'e1',
    title: '1DORUZ Showcase London',
    date: '2024-07-20T20:00:00Z',
    location: 'London, UK',
    venue: 'The Printworks',
    ticketLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'e2',
    title: 'Midnight Festival',
    date: '2024-08-15T18:00:00Z',
    location: 'Berlin, Germany',
    venue: 'Tempelhof',
    ticketLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200'
  }
];

export const NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Zephyr Signs Exclusive Global Distribution Deal',
    excerpt: 'We are thrilled to announce a new partnership with Zephyr for his upcoming world tour...',
    content: 'Full article text here...',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    author: 'Admin',
    publishedAt: '2024-05-01T10:00:00Z'
  },
  {
    id: 'n2',
    title: '1DORUZ Records nominated for Label of the Year',
    excerpt: 'The annual Music Awards have recognized our commitment to artistic excellence...',
    content: 'Full article text here...',
    imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=800',
    author: 'Admin',
    publishedAt: '2024-04-15T12:00:00Z'
  }
];

export const GALLERY: GalleryItem[] = [
  { id: 'g1', type: 'image', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200', caption: 'State-of-the-Art Production' },
  { id: 'g2', type: 'image', url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200', caption: 'Vocal Sessions with Mara Luna' },
  { id: 'g3', type: 'image', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', caption: 'Sold Out Showcase' },
  { id: 'g4', type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200', caption: 'Vinyl Mastering' }
];

export const LABEL_STATS = [
  { label: 'Artists', value: '15+' },
  { label: 'Releases', value: '250+' },
  { label: 'Monthly Listeners', value: '12M' },
  { label: 'Countries', value: '45' }
];
