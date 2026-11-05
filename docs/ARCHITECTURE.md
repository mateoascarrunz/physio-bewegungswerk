# Architecture

```text
Editor -> Strapi (Render) -> PostgreSQL (Render) + Cloudinary (media)
              |
              | publish webhook triggers a Vercel build
              v
Vercel build -> scripts/fetch-cms-content.mjs -> src/content/cms-snapshot.json -> static site
                                                                                      |
                                                                  Visitors <----------+
```

## Decisions

**Content is built into the site.** Browsers never call Strapi, so a CMS outage cannot empty the website. The build fetches, flattens and validates all collections. If that fails, the last valid snapshot in Git is used and the build still succeeds.

**Banners and jobs follow the same rule.** They have no expiry field, so an entry is removed by unpublishing it, which triggers a rebuild. If a rebuild fails, the previous deployment stays live and an unpublished item stays visible until a build succeeds.

**One content format.** `src/services/cmsMapper.js` is the only code that knows Strapi's response shape. It accepts Strapi 4 and 5 and adds Cloudinary format and size optimisation.

**The intro never blocks the site.** The page renders behind it. It plays once per browser session, can be skipped, respects reduced motion, and clears itself if the player fails.

**Libraries load on demand.** Routes, Swiper, the Lottie player and Markdown rendering are separate chunks.
