# Pollen Season, audience pass

## The evangelist

Maya, a 31 year old with seasonal allergic rhinitis who lurks r/Allergies and the
NYC subreddits and follows a few "is it ragweed season yet" accounts. Today she
checks her phone weather app's pollen tile or Pollen.com, which feel generic and
ad heavy. She would screenshot a clean, NYC specific severity card with a borough
breakdown and a "vs. last year" line that confirms what her sinuses already told
her, and drop it in a group chat with a "see, it IS worse this year" caption. She
bounces in 5 seconds if the numbers feel fake or contradict her lived experience,
or if the app claims "live" data she suspects is invented, because the allergy
community is sharp about fake health data and will call it out.

## Ground truth, repo HEAD

Stack is Vite, React 19, Tailwind 4, framer-motion, react-router. Builds clean
(`vite build`, 464 modules, no errors). Live URL is a client rendered SPA, so a
plain fetch sees only the title shell, expected.

Honest after prior pass, confirmed in HEAD:
- `src/pages/Settings.jsx` now discloses: "Pollen levels shown are seasonal
  estimates based on historical NYC patterns, not live sensor measurements.
  Weather data is real-time via Open-Meteo." Correct and present.
- `src/components/SeverityHero.jsx` label reads "Seasonal Estimate", not
  "Current Severity". Correct and present.

Real vs modeled, current state:
- `src/services/pollenData.js` is a deterministic seasonal model (month keyed
  baselines plus seeded noise). It is NOT a real pollen feed, and the app no
  longer claims it is. `PollenContext.jsx` reads this model, not `/api/pollen`.
- `api/pollen.js` does proxy the real Google Pollen API but returns 403
  BILLING_DISABLED, and nothing in the client calls it.
- `api/weather.js` (Open-Meteo) is real, and only the weather copy claims real time.

Remaining integrity gap fixed this pass:
- `src/components/SeasonalChart.jsx` rendered a "vs. last year" chart with a
  specific delta ("X% worse than last year"). Both the this year and last year
  series are model output (last year is seeded noise, see `getSeasonalComparison`
  in `pollenData.js`), but the framing read as a recorded year over year
  measurement with no disclosure. Added an "(estimated)" header tag and a footnote
  clarifying both lines are seasonal estimates, not recorded measurements. This is
  the same honest disclosure pattern the prior pass applied elsewhere.

No other false authoritative claims found, no example.com links, no fake citations
of Census, OSM, SEC, or named people or places.

## Deploy gap to FLAG

Repo HEAD carries the prior pass integrity fixes (commit 70796d1) plus this pass.
The live Vercel build may still serve the pre fix bundle. Needs a deploy to verify
that the corrected disclosures are actually live. No deploy performed in this pass.

## Plan

### Number 1 highest leverage (done this pass)
Disclose the "vs. last year" comparison as estimated. File:
`src/components/SeasonalChart.jsx`. Why it matters: the delta callout was the last
place the app presented invented numbers as a factual historical comparison, the
exact thing Maya's community would call out. Effort S. Deploy needed to verify live.

### Quick wins
1. Replace the default Vite README with a real project README (what it is, that
   pollen is a seasonal estimate model and weather is real via Open-Meteo, how to
   run). File: `README.md`. Why: anyone who finds the repo currently sees boilerplate.
   Effort S. No deploy needed.
2. Soften the "Manhattan, NY" hardcoded location label or make it reflect that the
   model is NYC wide, since borough offsets in `getBoroughData` are also estimates.
   Files: `SeverityHero.jsx`, `Forecast.jsx`. Effort S. Deploy to verify.
3. Add a short tooltip or caption on the borough map noting borough differences are
   modeled, not measured. File: `BoroughMap.jsx`. Effort S. Deploy to verify.
4. Make the SMS "Join" button either functional or clearly labeled as a waitlist
   placeholder, currently it does nothing on click. File: `Settings.jsx`. Effort S.

### Bigger bets
5. Enable billing on the Google Cloud project (#995174121485) and wire
   `PollenContext.jsx` to `/api/pollen`, with the seasonal model as an explicit
   labeled fallback ("showing estimates, live data unavailable"). This is the only
   path to genuinely real pollen data and would let the app drop the estimate
   framing on the main number. Files: `PollenContext.jsx`, `api/pollen.js`,
   plus a normalizer to map Google's UPI shape to the app's type model. Effort L.
   Needs Google billing and deploy. Michael decision required.
6. Geolocation or borough picker so the app is not Manhattan only, which broadens
   the NYC audience beyond Manhattan. Effort M. Depends on real data (#5) to be
   meaningful per location.
7. Shareable severity card (download or copy image of today's card) to turn the
   "screenshot and send to group chat" behavior into a built in share action. This
   directly serves the evangelist's sharing loop. Effort M. Deploy to verify.
