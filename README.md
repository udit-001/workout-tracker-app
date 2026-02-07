# Lift

A minimal PWA workout tracker. Manage routines via a built-in CMS, track sets/reps, and use rest timers — on any device.

## Features

- **PWA** — installable, works offline
- **Built-in CMS** — manage workouts and exercises via Decap CMS
- **Rest Timer** — configurable duration with sound notification
- **Customizable Defaults** — default reps, sets, and rest duration

## Quick Start

1. Click **"Use this template"** on GitHub
2. Deploy to Cloudflare Pages (or any static host)
3. Open the app → **Manage Workouts** to add exercises

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/udit-001/workout-tracker)

## Staying Updated

Enable the included GitHub Actions workflows (**Actions → Enable workflow**):

- **Sync from Template** — pulls upstream updates weekly (Sundays) via PR
- **Sync CMS Defaults** — updates CMS config when preferences change

Your `content/` data won't conflict. Manual trigger: **Actions → Sync from Template → Run workflow**.

## Development

```bash
pnpm install
pnpm dev        # dev server
pnpm build      # production build
pnpm preview    # preview build
```

## Tech Stack

[Vite](https://vite.dev/) · [Tailwind CSS](https://tailwindcss.com/) v4 · [Vite PWA](https://vite-pwa-org.netlify.app/) · [Decap CMS](https://decapcms.org/)
