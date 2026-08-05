import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("artists").order("desc").collect();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("artists")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("artists") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    bio: v.string(),
    imageUrl: v.string(),
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("artists", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("artists"),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.string()),
    genres: v.optional(v.array(v.string())),
    socialLinks: v.optional(v.object({
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
    })),
    gallery: v.optional(v.array(v.string())),
    videos: v.optional(v.array(v.object({
      id: v.string(),
      title: v.string(),
      url: v.string(),
    }))),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("artists") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
