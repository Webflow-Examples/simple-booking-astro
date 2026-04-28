# Astro + React + Webflow Cloud — Simple Booking

A minimal booking engine template built with [Astro](https://astro.build), React islands, and the Cloudflare adapter, set up for [Webflow Cloud](https://webflow.com/cloud). Pick a service, a provider, and a time — with rules for online vs. call-only services, deposit requirements, and post-booking instructions.

[![Deploy to Webflow](https://webflow.com/img/deploy-dark.svg)](https://webflow.com/dashboard/cloud/deploy?repo=https://github.com/Webflow-Examples/simple-booking-astro)


## Project structure

```text
.
├── astro.config.mjs
├── package.json
├── public/
│   └── favicon.svg
├── src/
│   ├── booking/
│   │   ├── BookingFlow.tsx
│   │   ├── booking.css
│   │   ├── data.ts
│   │   ├── slots.ts
│   │   └── types.ts
│   ├── env.d.ts
│   └── pages/
│       └── index.astro
├── tsconfig.json
├── webflow.json
├── worker-configuration.d.ts
└── wrangler.json
```

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts the Astro dev server. The app is served under the `CLOUD_MOUNT_PATH` base — locally this means [http://localhost:4321/CLOUD_MOUNT_PATH/](http://localhost:4321/CLOUD_MOUNT_PATH/). Webflow Cloud rewrites this to the configured mount path at deploy. |
| `npm run build` | Builds the production site |
| `npm run preview` | Runs `astro build` then `wrangler dev` for a local preview |
| `npm run deploy` | Deploys with `webflow cloud deploy` |
| `npm run astro` | Runs the Astro CLI (e.g. `astro add`, `astro check`) |
| `npm run cf-typegen` | Generates Wrangler TypeScript types (`wrangler types`) |

## What's modeled

Inspired by a real agency request for medical-center bookings:

- **30-min Consultation** — bookable online, no deposit
- **60-min Therapeutic Massage** — bookable online, **50% deposit** required, post-booking pre-visit instructions
- **MRI Scan** — **call-only**, full prepayment (online flow blocks and shows the phone number)

The booking UI is a single hydrated React island; the rest of the page is static HTML. State is in-memory (no database) — wire in your DB / payments / email when you adopt it.

## Learn more

- [Astro documentation](https://docs.astro.build)
- [Webflow Cloud](https://webflow.com/cloud)
