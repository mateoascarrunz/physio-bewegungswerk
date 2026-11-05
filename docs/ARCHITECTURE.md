# Architecture

```text
Editor -> Strapi (Render) -> PostgreSQL (Render) + Cloudinary (media)
              |
              | publish webhook triggers a Vercel build
              v
Vercel build -> scripts/fetch-cms-content.mjs -> src/content/cms-snapshot.json -> client + server build
                                                                                -> scripts/prerender.mjs -> one HTML file per page
                                                                                      |
                                                                  Visitors <----------+
```

## Decisions

**Content is built into the site.** Browsers never call Strapi, so a CMS outage cannot empty the website. The build fetches, flattens and validates all collections.

**Production builds require fresh content.** If the CMS is unreachable, returns invalid entries or returns no team, a production build fails and Vercel keeps the last successful deployment live. The snapshot in Git can be older than the live site, so only local and preview builds may fall back to it.

**Banners and jobs follow the same rule.** They have no expiry field, so an entry is removed by unpublishing it, which triggers a rebuild. If a rebuild fails, the previous deployment stays live, so an item just unpublished stays visible until a build succeeds. Vercel reports failed builds by email.

**One content format.** `src/services/cmsMapper.js` is the only code that knows Strapi's response shape. It accepts Strapi 4 and 5 and adds Cloudinary format and size optimisation.

**The intro never blocks the site.** The page renders behind it. It plays once per browser session, can be skipped, respects reduced motion, and clears itself if the player fails.

**Every page is pre-rendered.** The build renders each indexable address (pages, the 14 treatments and every published article) into its own HTML file from the same snapshot, with its title, description, canonical, Open Graph tags and schema.org data, then writes the sitemap and a real 404 page. Crawlers that do not run JavaScript see the content, and the browser takes the markup over (hydration) instead of rebuilding it. `vercel.json` rewrites each address to its file, so unknown treatments or articles answer with a real 404 status. `/admin` uses an unrendered shell.

**Articles have their own addresses.** `/news/<id>-<title>` is the article page. From the news grid the same address opens as a dialog over the grid; loaded directly, it is the full page. Old `?artikel=` links redirect.

**Libraries load on demand.** Routes, the Lottie player, Markdown rendering and EmailJS are separate chunks. There is no CSS framework or carousel library; the interface is built from the components described in `DESIGN_SYSTEM.md`.

**Third parties wait for consent.** Google Maps only loads after the visitor asks for the map on the contact page.
