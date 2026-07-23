# AskRoo — marketing website

The public marketing site for **AskRoo**, an AI customer-support agent for
Shopify merchants that answers shoppers from live store data and shows the
source for every answer.

Built to make a skeptical merchant believe it won't make things up — so the
copy doesn't make things up about the product either (the site is pre-launch,
and says so).

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/app/globals.css` (no `tailwind.config.js`)
- **motion** (`motion/react`) for animation
- **@react-three/fiber + three** for the WebGL hero
- **resend** for the contact form email
- **Geist Sans + Geist Mono** via `next/font/google`

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in the values below
pnpm dev                     # http://localhost:3000
```

Requires Node 20.9+ and pnpm 9.

### Environment variables

See [.env.example](.env.example). The contact form needs a Resend key and
from/to addresses; everything else runs without configuration.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, OG, JSON-LD |
| `RESEND_API_KEY` | Resend API key for the contact form |
| `CONTACT_FROM_EMAIL` | Verified sender address |
| `CONTACT_TO_EMAIL` | Where enquiries are delivered |

## Content is data

Everything that changes copy or structure lives in `src/lib/`:

- `site.ts` — identity, nav, contact, social (single source of truth)
- `capabilities.ts` — the six capabilities + channel roadmap
- `pricing.ts`, `metrics.ts`, `how-it-works.ts`, `faq.ts`, `sources.ts`, `brand-marks.ts`

Change the domain in `site.ts` (or `NEXT_PUBLIC_SITE_URL`) and every canonical
URL, OG tag and JSON-LD block re-points.

## Before launch

Placeholders marked `// confirm before launch` in `src/lib/site.ts`: legal name,
domain, registered address, ABN, and social handles. The legal pages
(`/legal/privacy`, `/legal/terms`) are drafts to review with counsel.

## Scripts

```bash
pnpm dev         # dev server
pnpm build       # production build
pnpm start       # serve the production build
pnpm typecheck   # tsc --noEmit
```
