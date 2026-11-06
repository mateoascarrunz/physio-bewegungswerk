# Design system

Swiss clinical clarity, warm photography of the real team, confident type. The palette, the logo and Montserrat are unchanged; everything else is built from the tokens below.

## Tokens

All values live in `src/assets/styles/tokens.css`. Components use the semantic names (`--color-brand`, `--color-text-soft`) rather than raw colours.

| Group | Values |
|---|---|
| Brand | Blue `#3F63A7` for the brand and primary actions, light blue `#D6E3FF`, navy `#001C54` for headings |
| Accent | Magenta `#E2097F`, kept for booking and small emphasis. Use `--color-accent-text` (`#B8096A`) for small magenta text on grey |
| Neutrals | Ink `#0E1A3A`, soft ink `#454F6B`, faint ink `#5D6680`, surface `#F4F5F8`, lines `#E1E5EE` and `#BFC7D8` |
| Type | Fluid `clamp()` steps from `--text-display` to `--text-label`. Headings use negative tracking and balanced wrapping |
| Space | `--space-1` to `--space-8`, plus fluid `--gutter`, `--gap`, `--card-pad` and `--section-gap` |
| Shape | `--radius-xl`, `--radius-lg`, `--radius-md`, `--radius-sm`, `--radius-pill` |
| Motion | `--ease-out`, `--ease-out-expo`, `--ease-in-out`; 120, 160, 240, 420, 700 and 900 ms; `--stagger` 70 ms |

Breakpoints are written in rem so they follow the reader's text size: 30rem, 40rem, 48rem, 60rem and 75rem. Media queries cannot read custom properties, so `tokens.css` lists them for reference only.

## Layout

- `.shell` sets the page width (`--container`, 105rem) and the side gutter.
- `.bento` is the 12-column grid. Modules span 12 on phones, usually 6 on tablets, and pair as 5 + 7 or 4 + 4 + 4 on desktops.
- `.card`, `.card--blue`, `.card--brand` and `.card--line` are the only module surfaces. Shadows are reserved for floating things: the scrolled header, modals and the map panel.
- Grids that can hold long words or scrolling rows use `minmax(0, 1fr)` columns, so content never widens the page.

## Components

| Component | Use |
|---|---|
| `BaseButton` | Variants `primary`, `secondary`, `accent` (booking only), `inverse` (on blue) and `text`. Renders a `RouterLink`, an anchor or a button from its props, never one inside another |
| `BaseIconButton` | Icon-only control with a required accessible label |
| `BaseIcon` | The single outline icon set (24 px grid, 1.75 stroke) |
| `BaseModal` | Every dialog on the site, built on the native `<dialog>` |
| `BaseCarousel` | Native scroll-snap row with previous and next buttons. Nothing moves on its own |
| `ServiceCard`, `NewsCard`, `TeamModal` | Content patterns shared between pages |

## Interaction rules

- Hover effects only apply to devices that can hover (`@media (hover: hover) and (pointer: fine)`). Touch gets `:active` feedback, and nothing is reachable only by hover.
- Every interactive element shows a 2 px focus ring in `--focus-color`, which turns white on blue surfaces.
- Modals take focus, contain it, close on Escape, the close button or the backdrop, return focus on close, and lock page scrolling. Team profiles are tied to `?team=`; articles opened from the news grid show their own address `/news/<id>-<title>`. Either way the back button closes them and the link can be shared.
- Motion uses opacity and transform only. Content is visible before any script runs; `v-reveal` only hides an element once its observer is attached. `prefers-reduced-motion` turns animation off globally.
- The home page entrance waits for the logo intro (`html.intro-pending`) and then plays in a little over a second, without blocking anything.

## Motion

One family of curves (`--ease-out`, `--ease-out-expo`, `--ease-in-out`) and a few durations from `tokens.css`. Native platform features only, no animation library:

| Pattern | How | Used for |
|---|---|---|
| Reveal | `v-reveal` with `rise`, `mask`, `title`, `assemble` or `expand`; IntersectionObserver, once per element | Cards, photos, headings, compositions, the booking banner |
| Drift | `.drift` on a photo frame; CSS scroll-driven animation where supported | Large editorial photos |
| Attention | `.attention` grid with `.attention__item` cards; transforms only | News, team and treatment cards |
| Continuity | View Transitions API, named elements chosen by `sharedElement` | Page changes, cards growing into dialogs and detail pages |
| Disclosure | `BaseDisclosure`, measured height animation | Team details, FAQ |

Rules: content is visible before any script runs, elements already on screen when a pre-rendered page hydrates are never hidden, nothing animates layout properties of the page, reduced motion turns it all off, and browsers without the View Transitions API keep a short fade.

What enters with the first screen (the header after the logo intro, the home hero) moves or unmasks with `clip-path` instead of fading. Its colours, and so its contrast, are then true on every frame, for readers and for automated checks alike. The header only enters after the intro; on every other load it is simply there.

Text set in the fallback font runs within about half a percent of Montserrat's width at every weight the site uses (400, 500, 550, 600, 700). Compared with a single fallback face, that cuts the layout shift from the font swap to about a third, although a paragraph can still gain or lose a line. A new weight needs its own `Montserrat Fallback` face in `base.css`.

## Images

- Local photos are generated at 640, 1024 and 1600 px in `src/assets/images/{services,places}` and used through `responsiveImage()` in `src/content/media.js`.
- CMS photos get a Cloudinary `srcset` from `cmsSrcset()` in `src/services/cms.js`.
- Every image has fixed dimensions or an aspect ratio, so nothing shifts while loading.

## Copy

Treatment texts live in `src/content/services.js` and `src/content/serviceDescriptions.js`; practice details and navigation in `src/content/practice.js`. Long German compounds in card titles get controlled soft hyphens from `withSoftHyphens()`.
