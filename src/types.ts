export interface ArtistVideo {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  gallery?: string[];
  genres: string[];
  videos?: ArtistVideo[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    facebook?: string;
    threads?: string;
    snapchat?: string;
    discord?: string;
    spotify?: string;
    appleMusic?: string;
    youtubeMusic?: string;
    audiomack?: string;
    soundcloud?: string;
    boomplay?: string;
    deezer?: string;
    tidal?: string;
    youtube?: string;
    vevo?: string;
    twitch?: string;
    website?: string;
    linktree?: string;
    bookingEmail?: string;
    managementEmail?: string;
    pressEmail?: string;
  };
  featured: boolean;
}

export interface Release {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  releaseDate: string;
  coverArtUrl: string;
  type: 'Single' | 'EP' | 'Album';
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    soundcloud?: string;
    beatport?: string;
    bandcamp?: string;
    tidal?: string;
    audiomack?: string;
    boomplay?: string;
    deezer?: string;
  };
  featured: boolean;
}

export interface LabelEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  ticketLink: string;
  ticketInfo?: string;
  imageUrl: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
}

export interface DemoSubmission {
  id: string;
  artistName: string;
  email: string;
  demoUrl?: string;
  audioFileUrl?: string;
  bio: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  submittedAt: string;
}
