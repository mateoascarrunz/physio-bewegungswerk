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

**Content is built into the site.** Browsers never call Strapi, so a CMS outage cannot empty the website. The build fetches, flattens and validates all collections.

**Production builds require fresh content.** If the CMS is unreachable, returns invalid entries or returns no team, a production build fails and Vercel keeps the last successful deployment live. The snapshot in Git can be older than the live site, so only local and preview builds may fall back to it.

**Banners and jobs follow the same rule.** They have no expiry field, so an entry is removed by unpublishing it, which triggers a rebuild. If a rebuild fails, the previous deployment stays live, so an item just unpublished stays visible until a build succeeds. Vercel reports failed builds by email.

**One content format.** `src/services/cmsMapper.js` is the only code that knows Strapi's response shape. It accepts Strapi 4 and 5 and adds Cloudinary format and size optimisation.

**The intro never blocks the site.** The page renders behind it. It plays once per browser session, can be skipped, respects reduced motion, and clears itself if the player fails.

**Libraries load on demand.** Routes, Swiper, the Lottie player and Markdown rendering are separate chunks.
