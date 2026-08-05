<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

## Convex Deployment

- **Active deployment**: `combative-civet-220` (`CONVEX_DEPLOYMENT=dev:combative-civet-220` in `.env.local`, VITE_CONVEX_URL: `https://combative-civet-220.eu-west-1.convex.cloud`)
- **Live site (1doruz.com)** uses the same deployment above; `VITE_CONVEX_URL` in Vercel env vars must match it
- **Other known deployments (not currently in use)**: `accurate-lark-115` (old `.env.production`), `trustworthy-kiwi-444` (previously listed as production), `third-jellyfish-302`, `impressive-wolverine-125`, `mild-tapir-539`
- **Auth**: Custom magic link auth via Resend (actions in `convex/emails.ts`). Convex env vars needed: `RESEND_API_KEY`, `SITE_URL`
- **Vercel env vars required**: `VITE_CONVEX_URL`, `RESEND_API_KEY`, `SITE_URL`, `AUTH_DOMAIN`

<!-- convex-ai-end -->
