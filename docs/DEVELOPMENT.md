# Development

Requires Node 22.

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Refreshes the CMS snapshot, then runs `build:site` |
| `npm run build:site` | Client build, server build and pre-rendering from the current snapshot, without contacting the CMS |
| `npm run preview` | Serves `dist` with the rewrites and headers of `vercel.json`, as production does |
| `npm run lint` | ESLint |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke, interaction and SEO tests against `npm run preview` (build first). EmailJS and Google are intercepted, so tests never send a message |

`CMS_URL` selects the CMS used by the build. It defaults to production and is read-only.

CSS is minified with esbuild because Lightning CSS dropped `backdrop-filter` and rewrote invalid values, which visibly changed the site. Compare screenshots before changing this.

The design system is documented in `DESIGN_SYSTEM.md`.

`index.html` contains one inline script, which decides before the first paint whether the logo intro plays. The CSP allows it by its exact hash; if you change the script, update the hash in `vercel.json` (the unit tests fail until you do).

Code that runs while a component is set up must also work during pre-rendering, where there is no `window` or `document`. Browser-only work belongs in `onMounted` or in event handlers.

`docs/internal/` holds private working notes and is ignored by Git. This repository is public, so never commit secrets, database dumps or internal infrastructure notes.
