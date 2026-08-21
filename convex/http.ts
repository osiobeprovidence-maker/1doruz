import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/api/storage/:storageId",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const storageId = url.pathname.split("/").pop()!;
    const blob = await ctx.storage.get(storageId as any);
    if (!blob) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(blob, {
      headers: {
        "Content-Type": blob.type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }),
});

export default http;
