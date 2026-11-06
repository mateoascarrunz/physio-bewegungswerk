# Deployment and recovery

## Website (Vercel)

Pushes to `main` deploy to production, and other branches create preview deployments. To roll back, promote an earlier deployment in the Vercel dashboard.

### Publishing webhook

1. In Vercel, create a Deploy Hook for `main`.
2. In Strapi, go to Settings > Webhooks and add that URL with the events below.

| Strapi version | Events | Why |
|---|---|---|
| 4 (production now) | entry create, update, delete, publish, unpublish; media create, update, delete | Editing a published entry changes it immediately, with no publish event. Replacing or deleting a photo is a media event |
| 5 (migration branch) | entry publish, unpublish, delete; media create, update, delete | `entry.update` also fires on draft saves, which do not change the public site |

Every build reads the published content only, so unpublishing or deleting an entry removes it from the next build. Production builds stop if the CMS is unreachable or answers with invalid or empty content, and the previous deployment stays live; they never fall back to the stored snapshot, which could bring back removed content.

One edit can fire two events (for example update and publish). Each starts a build, which is harmless: builds only read from Strapi, so they cannot trigger each other.

#### Checking that it works

1. In Strapi, open the webhook and use **Trigger**. It should answer 201. Strapi lists failed calls on the webhook page.
2. In Vercel, a new production deployment appears with the source "Deploy Hook" and finishes in one to two minutes. Its build log ends the CMS step with `CMS snapshot updated: … teams 4 …; content <fingerprint>`. The fingerprint changes only when published content changed.
3. On the live site, `document.documentElement.dataset.contentFetchedAt` shows when the deployed content was read.

#### Without a webhook

Publishing in Strapi changes nothing until the next build. Until the hook works, rebuild by hand: Vercel > Deployments > the current production deployment > **Redeploy**. The build cache can stay on: every build reads the CMS afresh.

Strapi 5 only accepts public webhook URLs, so a local address is rejected. Treat the hook URL as a secret, and update the events during the Strapi 5 migration.

A rebuild takes one to two minutes. If it fails, the previous deployment stays live.

### Preview differences

Previews send `x-robots-tag: noindex` and try to load Vercel's feedback toolbar, which the Content Security Policy blocks. Lighthouse reports both on previews. Re-check SEO and console results on production after each release.

## CMS (Render)

Service `strapi-physio-app`, database `Strapy-Physio_CH`, repository `Strapi-physio-CH`. Keep Auto-Deploy off until CI is validated.

Database settings come from the environment. A deploy with no database settings now fails at startup.

## Back up the database

Render's dashboard export is unavailable on the current legacy plan. Use `pg_dump` 15 or newer with the External Database URL, and keep the dump outside Git:

```sh
pg_dump --format=custom --no-owner --no-privileges --file=strapi-physio-$(date -u +%Y%m%dT%H%M%SZ).dump "$DB_URL"
```

## Restore into PostgreSQL 15 with newer client tools

Newer tools add a setting PostgreSQL 15 rejects, so filter it out:

```sh
pg_restore --no-owner --no-privileges -f - backup.dump | grep -v '^SET transaction_timeout' | psql -v ON_ERROR_STOP=1 -d target
```

## After a billing suspension

If the service reports Live but returns 502 with 0 instances, Restart does nothing. Trigger a new deploy, or roll back to a retained deploy if GitHub access is broken.
