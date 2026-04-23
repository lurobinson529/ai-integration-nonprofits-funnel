# AI Integration for Nonprofits · Webinar Funnel

Static HTML/CSS/JS prototype funnel for the **Calm Infrastructure Intensive** — a 90-minute live webinar for nonprofit leaders integrating AI with care. Built in the house style of the AI Integration Webinar deck.

Live review URL lives on Netlify; share the index with the team so they can click through every stage.

## Pages

| File | Stage | Purpose |
|---|---|---|
| `index.html` | Review hub | Click-through index for team review (prospects never see it) |
| `01-landing.html` | Registration | Top-of-funnel opt-in. Hero, VSL, framework preview, host bio, who-it's-for, FAQ, exit intent |
| `02-thank-you.html` | Confirmation | Registration confirmed. Calendar links, pre-work, share-the-link, countdown |
| `03-reminders.html` | Nurture | Five-email warm-up preview in an inbox UI |
| `04-lobby.html` | Live | Pre-webinar lobby with countdown to zero |
| `05-sales.html` | Conversion | Replay + full value stack, bonuses, guarantee, testimonials, pricing |
| `06-checkout.html` | Transaction | Main checkout ($1,997 / 3 × $699) |
| `06b-checkout-course.html` | Downsell A | AI Integration standalone course ($1,297) |
| `06c-checkout-storm.html` | Downsell B | Lead Through the Storm standalone ($797) |
| `06d-checkout-skool.html` | Downsell C | The Calm Infrastructure Lab community ($97/mo) |
| `07-welcome.html` | Onboarding | Post-purchase welcome and Day 1 |

## Target

- **Webinar:** Thursday, May 21, 2026 · 12 PM ET · 90 min
- **Offer:** Calm Infrastructure Intensive · $1,997 or 3 × $699
- **Guarantee:** 30-day "implement or refund"

## Structure

```
.
├── index.html                ← review hub
├── 01-landing.html           … 07-welcome.html
├── styles/
│   ├── funnel.css            ← shared design system (colors, chrome, buttons, forms, countdown, tweaks panel)
│   └── funnel.js             ← startCountdown, wireForm, wireTweaks, showToast
├── assets/
│   ├── lur-puzzle.svg        ← LUR Growth logo (4-piece puzzle in brand colors)
│   └── latoya-headshot.jpg   ← placeholder · swap in the real photo before going live
└── netlify.toml              ← caching + pretty-URL redirects (/landing, /sales, /welcome, etc.)
```

## Local preview

```sh
cd site
python3 -m http.server 8080
# open http://localhost:8080/
```

## Deploy

Netlify is wired up — `netlify deploy --prod` from this directory publishes the latest. The review team can click through every stage from the live index.

## Swap before launch

- `assets/latoya-headshot.jpg` — drop in the final professional headshot (900×1200 or larger, portrait, JPEG).
- VSL on landing page — replace the placeholder in `01-landing.html` `#vsl-modal` with a real Wistia/Mux/Vimeo embed or local `<video>`.
- Form posts — `wireForm` currently routes to `02-thank-you.html` with no backend. Wire to your CRM/ESP (GHL, ConvertKit, Mailchimp) before launch.
- Stripe — checkout pages are UI only. Connect Stripe Elements/Checkout before going live.
