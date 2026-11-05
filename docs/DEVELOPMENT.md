# Development

Requires Node 22.

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Refreshes the CMS snapshot, then builds |
| `npm run lint` | ESLint |
| `npm run test:unit` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke tests against a preview of `dist` (build first) |

`CMS_URL` selects the CMS used by the build. It defaults to production and is read-only.

`docs/internal/` holds private working notes and is ignored by Git. This repository is public, so never commit secrets, database dumps or internal infrastructure notes.
