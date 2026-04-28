# Project: AI Integration for Nonprofits — Webinar Funnel

Static HTML/CSS/JS funnel for the **Calm Infrastructure Intensive** — a 90-minute live webinar for nonprofit leaders integrating AI with care. Built from a Claude Design (claude.ai/design) handoff bundle on 2026-04-23. House style mirrors the AI Integration Webinar deck.

## Live + repo

- **Live (Netlify):** https://ai-integration-nonprofits-funnel.netlify.app
- **Netlify project ID:** `e5141c32-8a80-4b96-ae25-75cd1e02a168` (team: CapacityFlow)
- **GitHub:** https://github.com/lurobinson529/ai-integration-nonprofits-funnel
- **Local path:** `~/ai-integration-nonprofits-funnel/site/`
- **Original handoff bundle:** `~/ai-integration-nonprofits-funnel/project/` (read-only reference; do not edit)

## Webinar / offer facts (don't drift)

- **Date:** Thursday, May 21, 2026 · 12 PM ET · 90 min · Free
- **Countdown target (UTC):** `2026-05-21T16:00:00Z` — hard-coded in `styles/funnel.js`. If the date moves, update `WEBINAR_TARGET` there.
- **Main offer:** Calm Infrastructure Intensive · $1,997 or 3 × $699
- **Downsells:** AI Integration course $1,297 · Lead Through the Storm $797 · Calm Infrastructure Lab $97/mo
- **Guarantee:** 30-day "implement or refund"
- **Host email shown on pages:** latoya@lurgrowth.com (different from the user's primary `latoya@lurobinson.com`)

## Page map

| File | Stage | URL alias |
|---|---|---|
| `index.html` | Review hub (team only, prospects never see) | `/` |
| `01-landing.html` | Registration (hero, VSL, framework, host bio, FAQ, exit intent) | `/landing` |
| `02-thank-you.html` | Confirmation + pre-work + share | `/thank-you` |
| `03-reminders.html` | 5-email warm-up preview in inbox UI | `/reminders` |
| `04-lobby.html` | Pre-webinar lobby with countdown to zero | `/lobby` |
| `05-sales.html` | Replay + value stack + bonuses + pricing | `/sales` |
| `06-checkout.html` | Main Intensive checkout | `/checkout` |
| `06b-checkout-course.html` | Downsell A · AI course standalone | `/checkout/course` |
| `06c-checkout-storm.html` | Downsell B · Lead Through the Storm | `/checkout/storm` |
| `06d-checkout-skool.html` | Downsell C · Skool community | `/checkout/lab` |
| `07-welcome.html` | Post-purchase Day 1 onboarding | `/welcome` |

URL aliases are wired in `netlify.toml` as 200-status redirects.

## Shared design system

All pages link `styles/funnel.css?v=2` and selectively load `styles/funnel.js`. Pages are HTML-first prototypes — most page-specific styling lives in each file's `<style>` block. The shared CSS only defines the cross-page chrome and primitives.

### CSS variables (defined in `funnel.css` `:root`)

```
--paper      #f6f1ea   page background (warm cream)
--off        #faf7f2   off-white tile background
--navy       #0f2337   primary text + dark sections
--navy-dark  #081420   deepest navy (button text on coral)
--coral      #fd9d7d   primary accent (italic emphasis, primary buttons)
--coral-deep #d06a4a   coral hover/error
--teal       #5bb9b0   secondary accent (trust, "yes" column)
--teal-deep  #2e837b   teal label color
--green      #7fae6f   tertiary accent (third tier)
--rule       #e2d9cb   1px borders
--ink        #1a2a3a   darker text on light bg
--ink-mute   #8b8275   muted labels, eyebrow text
--slate      #4b5b6b   body copy on light
--shadow-lift  drop shadow for hover lift
```

When changing brand colors, update both this file and `lur-puzzle.svg` (which has hex values baked in for the four pieces).

### Shared classes

- **Chrome:** `.topbar`, `.bar-inner`, `.brand` (logo + wordmark), `.mark`, `.name`, `.bar-meta`, `.live`, `.dot`, `.foot-chrome`, `.foot-inner`, `.foot-brand`, `.foot-mark`, `.wm`, `.foot-links`, `.foot-note`
- **Type helpers:** `.italic` (coral italic emphasis — `<span class="italic">word</span>` is the brand voice signature), `.eyebrow`
- **Buttons:** `.btn` + modifiers `.btn-primary`, `.btn-lg`, `.btn-block`, `.btn-ghost-dark`, with `.arrow` for the trailing →
- **Forms:** `.field`, `.field-group`, `.field-label`
- **Countdown:** `.countdown` containing `.unit` blocks with `.n` (number, has `data-c="d|h|m|s"`) and `.l` (label)
- **Tweaks panel:** `.tweaks` with `.row`, `.swatches/.swatch`, `.options/.opt[data-opt-group][data-opt]`, `.toggle/.switch[data-switch]` — design-review utility, only on `01-landing.html`
- **Toasts:** `.toast-layer/.toast-item` injected by `showToast(msg)`

### Shared JS functions (`funnel.js`)

- `startCountdown(selector, target?)` — wires up `[data-c="d|h|m|s"]` slots inside the selector. Defaults to `WEBINAR_TARGET`. Fires `countdown-zero` event when complete.
- `wireForm(selector, onSubmit)` — runs `[data-validate="required|email"]` on submit; calls `onSubmit(form)` only if valid. Adds `.invalid` class to bad fields.
- `wireTweaks(defaults)` — drives the on-page design tweaks panel (accent swatch, headline variant via `[data-headline]`, urgency toggle via `[data-urgency-only]`).
- `showToast(msg)` — top-right transient toast. Used by share/copy buttons and 07-welcome step CTAs.

## Assets

- `assets/lur-puzzle.svg` — LUR Growth logo. Four interlocking puzzle pieces (navy top-left, coral top-right, teal bottom-left, green bottom-right). Tabs and slots are paired cubic-bezier semicircles — if you regenerate, keep the matching pairs symmetric or the pieces will gap visually.
- `assets/latoya-headshot.jpg` — **PLACEHOLDER**. 900×1200 generated stand-in with a clear "replace before launch" caption baked in. Drop in the real headshot at the same path/dimensions before going live. Used as the host photo in `01-landing.html` host section AND as the VSL poster background (in two places: the inline player and the modal frame).

## Local preview

```sh
cd ~/ai-integration-nonprofits-funnel/site
python3 -m http.server 8080
# open http://localhost:8080/
```

## Deploy

```sh
cd ~/ai-integration-nonprofits-funnel/site
netlify deploy --prod --dir .
```

The site is already linked to the Netlify project (`netlify.toml` is committed; `.netlify/state.json` is git-ignored).

## Must-swap before launch

- [ ] `assets/latoya-headshot.jpg` — drop in real photo
- [ ] `01-landing.html` `#vsl-modal .vsl-modal-frame` — replace placeholder with Wistia/Mux/Vimeo embed or `<video>`
- [ ] `wireForm` in `01-landing.html` — currently routes to `02-thank-you.html` only; wire to ESP/CRM (GHL/ConvertKit/Mailchimp) and POST registration
- [ ] All checkout pages (`06*.html`) — UI only, no payment processing. Connect Stripe Elements/Checkout
- [ ] `03-reminders.html` "Add to calendar" links — currently `#`, hook to real `.ics`/Google/Apple/Outlook URLs
- [ ] `02-thank-you.html` Zoom link — currently the placeholder `zoom.us/j/calm-infra-may21`

## House voice signatures (preserve when editing copy)

- "calm infrastructure" — primary brand phrase, almost always rendered as `<span class="italic">calm infrastructure</span>`
- "no-pitch for 60 minutes" — repeated promise on landing + final CTA
- "156 hours returned" — flagship stat (year-one compound from one designed workflow)
- "the workflow's job is to protect [voice], not flatten it" — landing framework section
- Hosts use comma instead of em-dash in some places (e.g., "This is for you if , ") — that's intentional in the design copy, not a typo

## Conventions

- Every page links `styles/funnel.css?v=2` and uses `index.html` as the brand-link target in the topbar.
- Inline page-specific CSS lives in `<style>` in `<head>` — keep it there rather than promoting to `funnel.css` unless three-or-more pages share the rule.
- Each footer uses the same 64×64 puzzle mark and the `.italic` modifier on "Growth" (`<span class="wm">LUR <span class="italic">Growth</span></span>`).
- Date format on user-facing copy: "Thursday, May 21" or "May 21 · 12 PM ET". Don't use ISO dates in copy.
- Countdown UI assumes ET timezone for the user-facing label; the math is UTC-anchored.
