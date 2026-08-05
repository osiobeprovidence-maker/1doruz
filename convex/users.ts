import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { ADMIN_EMAILS } from "./auth";

export const getById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const create = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user"), v.literal("super_admin"), v.literal("fan"), v.literal("manager")),
    emailVerified: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

export const updateProfile = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const verifyEmail = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (user) {
      await ctx.db.patch(user._id, { emailVerified: true });
    }
  },
});

export const upsertUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    firebaseUid: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      const isAdmin = ADMIN_EMAILS.includes(args.email);
      await ctx.db.patch(existing._id, {
        name: args.name ?? existing.name,
        imageUrl: args.imageUrl ?? existing.imageUrl,
        firebaseUid: args.firebaseUid,
        emailVerified: true,
        status: existing.status ?? "active",
        role: isAdmin ? "admin" : existing.role,
        updatedAt: now,
      });
      const user = await ctx.db.get(existing._id);
      return { id: user!._id, email: user!.email, role: user!.role ?? "user", name: user!.name };
    }

    const isAdmin = ADMIN_EMAILS.includes(args.email);
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
      firebaseUid: args.firebaseUid,
      role: isAdmin ? "admin" : "user",
      emailVerified: true,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    const user = await ctx.db.get(userId);
    return { id: user!._id, email: user!.email, role: user!.role ?? "user", name: user!.name };
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
