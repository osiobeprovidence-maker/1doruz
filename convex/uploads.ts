import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {
    callerId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    if (args.callerId) {
      const caller = await ctx.db.get(args.callerId);
      if (!caller || caller.role !== "admin") {
        throw new Error("Only admins can upload files.");
      }
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const getUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const backfillStorageUrls = mutation({
  args: { baseUrl: v.string() },
  handler: async (ctx, args) => {
    const base = args.baseUrl.replace(/\/$/, "");
    let updated = 0;

    const artists = await ctx.db.query("artists").collect();
    for (const artist of artists) {
      if (artist.imageStorageId && !artist.imageUrl) {
        await ctx.db.patch(artist._id, {
          imageUrl: `${base}/api/storage/${artist.imageStorageId}`,
        });
        updated++;
      }
    }

    const releases = await ctx.db.query("releases").collect();
    for (const release of releases) {
      if (release.coverArtStorageId && !release.coverArtUrl) {
        await ctx.db.patch(release._id, {
          coverArtUrl: `${base}/api/storage/${release.coverArtStorageId}`,
        });
        updated++;
      }
    }

    const events = await ctx.db.query("events").collect();
    for (const event of events) {
      if (event.heroImageStorageId) {
        const url = `${base}/api/storage/${event.heroImageStorageId}`;
        const updates: Record<string, string> = {};
        if (!event.heroImage) updates.heroImage = url;
        if (!event.imageUrl) updates.imageUrl = url;
        if (Object.keys(updates).length > 0) {
          await ctx.db.patch(event._id, updates);
          updated++;
        }
      }
    }

    const configs = await ctx.db.query("siteConfig").collect();
    for (const config of configs) {
      if (config.logoStorageId && !config.logoUrl) {
        await ctx.db.patch(config._id, {
          logoUrl: `${base}/api/storage/${config.logoStorageId}`,
        });
        updated++;
      }
    }

    return { updated };
  },
});
