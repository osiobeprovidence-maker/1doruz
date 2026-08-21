import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const GENDERS = ["Electronic", "Soul", "Future Bass", "R&B", "Neo-Soul", "Trap", "Hip-Hop", "Industrial Techno", "Dream Pop", "Dark Ambient", "Retrowave", "Experimental"] as const;
export const RELEASE_TYPES = ["Single", "EP", "Album"] as const;
export const DEMO_STATUSES = ["pending", "reviewed", "accepted", "rejected"] as const;
export const GALLERY_TYPES = ["image", "video"] as const;

export default defineSchema({
  artists: defineTable({
    name: v.string(),
    bio: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.string()),
    genres: v.array(v.string()),
    socialLinks: v.object({
      instagram: v.optional(v.string()),
      twitter: v.optional(v.string()),
      tiktok: v.optional(v.string()),
      facebook: v.optional(v.string()),
      threads: v.optional(v.string()),
      snapchat: v.optional(v.string()),
      discord: v.optional(v.string()),
      spotify: v.optional(v.string()),
      appleMusic: v.optional(v.string()),
      youtubeMusic: v.optional(v.string()),
      audiomack: v.optional(v.string()),
      soundcloud: v.optional(v.string()),
      boomplay: v.optional(v.string()),
      deezer: v.optional(v.string()),
      tidal: v.optional(v.string()),
      youtube: v.optional(v.string()),
      vevo: v.optional(v.string()),
      twitch: v.optional(v.string()),
      website: v.optional(v.string()),
      linktree: v.optional(v.string()),
      bookingEmail: v.optional(v.string()),
      managementEmail: v.optional(v.string()),
      pressEmail: v.optional(v.string()),
    }),
    gallery: v.optional(v.array(v.string())),
    videos: v.optional(v.array(v.object({
      id: v.string(),
      title: v.string(),
      url: v.string(),
    }))),
    featured: v.boolean(),
  })
    .index("by_featured", ["featured"])
    .index("by_name", ["name"]),

  releases: defineTable({
    title: v.string(),
    artistId: v.id("artists"),
    artistName: v.string(),
    releaseDate: v.string(),
    coverArtUrl: v.optional(v.string()),
    coverArtStorageId: v.optional(v.string()),
    type: v.union(v.literal("Single"), v.literal("EP"), v.literal("Album")),
    streamingLinks: v.object({
      spotify: v.optional(v.string()),
      appleMusic: v.optional(v.string()),
      youtube: v.optional(v.string()),
      soundcloud: v.optional(v.string()),
      beatport: v.optional(v.string()),
      bandcamp: v.optional(v.string()),
      tidal: v.optional(v.string()),
      audiomack: v.optional(v.string()),
      boomplay: v.optional(v.string()),
      deezer: v.optional(v.string()),
    }),
    featured: v.boolean(),
  })
    .index("by_artist", ["artistId"])
    .index("by_featured", ["featured"])
    .index("by_date", ["releaseDate"]),

  events: defineTable({
    // Fields from production events
    title: v.optional(v.string()),
    venue: v.optional(v.string()),
    artistIds: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    city: v.optional(v.string()),
    country: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    description: v.optional(v.string()),
    followers: v.optional(v.float64()),
    gallery: v.optional(v.array(v.string())),
    heroImage: v.optional(v.string()),
    heroImageStorageId: v.optional(v.string()),
    officialTicketProvider: v.optional(v.string()),
    officialTicketUrl: v.optional(v.string()),
    published: v.optional(v.boolean()),
    shares: v.optional(v.float64()),
    slug: v.optional(v.string()),
    startDate: v.optional(v.string()),
    status: v.optional(v.string()),
    ticketClicks: v.optional(v.float64()),
    ticketPrice: v.optional(v.string()),
    ticketStatus: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
    views: v.optional(v.float64()),
    // Fields from current frontend schema
    date: v.optional(v.string()),
    location: v.optional(v.string()),
    ticketLink: v.optional(v.string()),
    ticketInfo: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  })
    .index("by_date", ["date"]),

  news: defineTable({
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.string()),
    author: v.string(),
    publishedAt: v.string(),
  })
    .index("by_published", ["publishedAt"]),

  gallery: defineTable({
    type: v.union(v.literal("image"), v.literal("video")),
    url: v.string(),
    caption: v.string(),
  }),

  demos: defineTable({
    artistName: v.string(),
    email: v.string(),
    demoUrl: v.optional(v.string()),
    audioFileUrl: v.optional(v.string()),
    bio: v.string(),
    submittedAt: v.string(),
    approvedAt: v.optional(v.string()),
    approvedBy: v.optional(v.string()),
    rejectedAt: v.optional(v.string()),
    rejectedBy: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("reviewed"),
      v.literal("accepted"),
      v.literal("rejected"),
    ),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
  }),

  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("user"), v.literal("super_admin"), v.literal("fan"), v.literal("manager"))),
    emailVerified: v.optional(v.boolean()),
    passwordHash: v.optional(v.string()),
    passwordSalt: v.optional(v.string()),
    // Legacy Firebase fields
    firebaseUid: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.string()),
    status: v.optional(v.string()),
    verified: v.optional(v.boolean()),
    createdAt: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
  })
    .index("by_email", ["email"]),

  magicLinkTokens: defineTable({
    email: v.string(),
    token: v.string(),
    expiresAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_email", ["email"]),

  siteConfig: defineTable({
    logoUrl: v.optional(v.string()),
    logoStorageId: v.optional(v.string()),
    logoText: v.optional(v.string()),
    primaryColor: v.optional(v.string()),
    siteTitle: v.optional(v.string()),
    siteDescription: v.optional(v.string()),
  }),
});
