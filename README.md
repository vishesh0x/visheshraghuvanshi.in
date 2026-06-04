# visheshraghuvanshi.in

Personal website and portfolio — a warm, interactive "desk" built with Next.js and Framer Motion. Designed to blend professional work with personal touches: a 3D desk you actually click around, a sketchbook gallery, a coffee widget, and a `/now` page that stays honest about what I'm up to.

Live at **[visheshraghuvanshi.in](https://visheshraghuvanshi.in)**

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Theming | next-themes (dark / light) |
| Fonts | Inter · JetBrains Mono · Caveat (Google Fonts) |

---

## Project Structure

```
prsnl/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — fonts, metadata, NavBar, providers
│   ├── page.tsx            # Home → interactive 3D desk
│   ├── projects/           # /projects — card grid with images
│   ├── resume/             # /resume — timeline, projects, skills
│   └── now/                # /now — what I'm up to right now
│
├── components/
│   ├── desk/               # 3D desk scene
│   │   ├── Desk.tsx        # Main scene — layout, ambient glow, 3D illusion
│   │   ├── DeskItem.tsx    # Individual clickable item with hover/tap physics
│   │   ├── CoffeeMug.tsx   # Animated SVG coffee mug
│   │   └── StickyNote.tsx  # Hand-written sticky note SVG
│   ├── modals/
│   │   ├── GalleryModal.tsx  # Sketchbook / artwork gallery overlay
│   │   └── BrewWidget.tsx    # Daily brew / coffee drawer
│   ├── ContactDrawer.tsx   # Contact form + social links (email obfuscated)
│   ├── NavBar.tsx          # Fixed nav — fades out when a modal is open
│   ├── DrawingCanvas.tsx   # Hidden easter egg — draw on any page with pencil tool
│   ├── ThemeProvider.tsx   # next-themes wrapper
│   └── ThemeToggle.tsx     # Dark / light toggle button
│
├── lib/
│   ├── app-state.tsx       # React context — tracks modal-open state site-wide
│   ├── animations.ts       # Shared Framer Motion variants
│   └── content/            # ← ALL your site data lives here
│       ├── site.ts         # Name, bio, tagline, social links, contact
│       ├── projects.ts     # Projects list with images, tags, URLs
│       ├── resume.ts       # Work timeline, education, skills
│       ├── now.ts          # /now page sections
│       ├── brew.ts         # Daily brew config (drink, note, enabled flag)
│       └── gallery.ts      # Sketchbook images
│
├── public/
│   ├── gallery/            # Project preview images + sketchbook artwork
│   ├── favicon.ico         # Multi-size ICO (16 + 32px)
│   ├── favicon-{16,32}x{16,32}.png
│   ├── apple-touch-icon.png
│   ├── icon-{192,512}.png  # PWA icons
│   ├── og-image.png        # Open Graph / social share image (1200×630)
│   ├── site.webmanifest    # PWA manifest
│   └── resume.pdf          # Downloadable résumé
│
├── next.config.ts
├── tailwind.config (via PostCSS)
└── tsconfig.json
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:3000
```

```bash
# Build for production
npm run build
npm start
```

> **Note:** If you're accessing the dev server from another device on the same network, the `allowedDevOrigins` in `next.config.ts` is pre-configured for `192.168.1.7`. Update it to match your machine's local IP if needed.

---

## Customising Your Content

Everything personal is isolated in `lib/content/`. You never need to touch component code to update your site.

### `lib/content/site.ts`
Your name, tagline, bio, and social links. This feeds the hero, navbar, and contact drawer.

### `lib/content/projects.ts`
Add a `Project` object to the array. Drop the preview image in `public/gallery/` and set `imageUrl`. Leave `imageUrl: ""` for a gradient placeholder. Set `liveUrl: ""` to hide the Live link.

### `lib/content/resume.ts`
`timeline` — ordered array of work and education entries. `type` controls the icon and colour: `"work"` | `"education"` | `"freelance"`.  
`skills` — set `level` 1–5 for the proficiency dots.

### `lib/content/now.ts`
Add or remove sections freely. A section with `items: []` is automatically hidden — you don't need to delete it.

### `lib/content/brew.ts`
Set `enabled: false` to hide the coffee mug from the desk entirely.

### `lib/content/gallery.ts`
Array of image paths served from `public/gallery/`. Empty array hides the sketchbook from the desk.

---

## Features

- **Interactive 3D desk** — each item on the desk is a clickable portal to a different section (gallery, coffee, projects, now, contact, résumé). Spring-physics hover + tap animations via Framer Motion.
- **Navbar-aware modals** — when a modal opens, the navbar smoothly slides up and becomes non-interactive. No z-index fights.
- **Dark / light mode** — persistent via `next-themes`. Warm amber accent on dark; ink on cream for light.
- **Drawing canvas easter egg** — `Shift + D` (or pencil button) activates a full-page freehand drawing layer on any page.
- **Obfuscated contact details** — email and phone are base64-encoded and decoded client-side only. Invisible to crawlers and email harvesters.
- **Data-driven empty states** — every section checks its data before rendering. Add nothing → section doesn't appear.
- **Full SEO + Open Graph** — per-page metadata, Twitter card, canonical URLs, robots directives, PWA manifest.
- **Responsive** — mobile-first grid, hamburger nav, all modals scroll cleanly on small screens.

---

## Adding a New Desk Item

1. Add a new `<DeskItem>` to `components/desk/Desk.tsx` with an `onClick` handler.
2. Create a new modal component in `components/modals/` if needed.
3. Wire the modal into the `AnimatePresence` block at the bottom of `Desk.tsx`.
4. The `AppStateProvider` context will automatically signal the NavBar to hide.

---

## Licence

Personal use. Not a template — but feel free to draw inspiration.  
Built by [Vishesh Kumar](https://visheshraghuvanshi.in).
