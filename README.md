# Pollen Season

A clean, NYC focused pollen severity app. It shows a daily overall severity card,
a per type breakdown (tree, grass, weed, mold), a 7 day forecast, a borough
heat map, and a week over week seasonal comparison.

## What is real and what is estimated

Honesty matters here, the allergy community is sharp about fake health data.

- Pollen levels are seasonal estimates based on historical NYC patterns, not live
  sensor measurements. The model lives in `src/services/pollenData.js` and is keyed
  by month with deterministic per day variation. The UI labels these as
  "Seasonal Estimate" rather than live readings.
- Borough differences on the map are also modeled offsets from the citywide
  estimate, not separate per borough measurements.
- The seasonal comparison chart shows two estimated series, this year and a modeled
  last year, and is labeled estimated, not a recorded year over year measurement.
- Weather data (temperature, humidity, wind) is real time via the Open-Meteo API,
  proxied through `api/weather.js`.
- `api/pollen.js` proxies the real Google Pollen API but is not currently wired into
  the client, and returns a billing error until billing is enabled on the Google
  Cloud project. Enabling it is the path to genuinely live pollen numbers.

## Stack

Vite, React 19, Tailwind 4, Motion (framer-motion), React Router.

## Run locally

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # eslint
```

## Deploy

Configured for Vercel. The serverless functions in `api/` proxy Open-Meteo (live)
and the Google Pollen API (not yet wired into the client).
