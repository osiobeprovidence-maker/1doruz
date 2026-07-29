import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").collect();
  },
});

export const getUpcoming = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    const now = new Date().toISOString();
    return events
      .filter((e) => (e.date || e.startDate || "") >= now)
      .sort((a, b) => (a.date || a.startDate || "").localeCompare(b.date || b.startDate || ""));
  },
});

export const getById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    // Simplified fields
    title: v.optional(v.string()),
    date: v.optional(v.string()),
    location: v.optional(v.string()),
    venue: v.optional(v.string()),
    ticketLink: v.optional(v.string()),
    ticketInfo: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    // Production fields
    startDate: v.optional(v.string()),
    city: v.optional(v.string()),
    country: v.optional(v.string()),
    officialTicketUrl: v.optional(v.string()),
    heroImage: v.optional(v.string()),
    slug: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
    artistIds: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    followers: v.optional(v.float64()),
    gallery: v.optional(v.array(v.string())),
    heroImageStorageId: v.optional(v.string()),
    officialTicketProvider: v.optional(v.string()),
    published: v.optional(v.boolean()),
    shares: v.optional(v.float64()),
    status: v.optional(v.string()),
    ticketClicks: v.optional(v.float64()),
    ticketPrice: v.optional(v.string()),
    ticketStatus: v.optional(v.string()),
    views: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("events"),
    title: v.optional(v.string()),
    date: v.optional(v.string()),
    location: v.optional(v.string()),
    venue: v.optional(v.string()),
    ticketLink: v.optional(v.string()),
    ticketInfo: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    startDate: v.optional(v.string()),
    city: v.optional(v.string()),
    country: v.optional(v.string()),
    officialTicketUrl: v.optional(v.string()),
    heroImage: v.optional(v.string()),
    slug: v.optional(v.string()),
    createdAt: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
    artistIds: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    followers: v.optional(v.float64()),
    gallery: v.optional(v.array(v.string())),
    heroImageStorageId: v.optional(v.string()),
    officialTicketProvider: v.optional(v.string()),
    published: v.optional(v.boolean()),
    shares: v.optional(v.float64()),
    status: v.optional(v.string()),
    ticketClicks: v.optional(v.float64()),
    ticketPrice: v.optional(v.string()),
    ticketStatus: v.optional(v.string()),
    views: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
