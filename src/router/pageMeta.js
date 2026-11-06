import { responsiveImage } from '@/content/media';
import { PRACTICE } from '@/content/practice';
import { findService, services } from '@/content/services';
import { serviceSummaries } from '@/content/serviceSummaries';
import { teams } from '@/services/cms';
import { articlePath, findArticleBySlug } from '@/services/news';

export const SITE_URL = 'https://www.physio-bewegungswerk.ch';
const SITE_NAME = 'Physio Bewegungswerk';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const PRACTICE_ID = `${SITE_URL}/#praxis`;
const LONG_TITLE = 34;

export function absoluteUrl(path) {
  if (/^https?:/.test(path)) return path;
  return SITE_URL + (path === '/' ? '/' : path.replace(/\/$/, ''));
}

// Only facts the site itself shows: address, phone, email and the hours in which the
// practice answers questions. The address is spelled as in the Swiss UID register
// (CHE-463.407.674), and the coordinates are those of the building (EGID 9006634)
// in the federal address register.
const practice = {
  '@type': 'Physiotherapy',
  '@id': PRACTICE_ID,
  name: SITE_NAME,
  legalName: PRACTICE.company,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  image: DEFAULT_IMAGE,
  telephone: '+41 44 543 63 68',
  email: PRACTICE.email.label,
  address: {
    '@type': 'PostalAddress',
    streetAddress: PRACTICE.street,
    postalCode: '8625',
    addressLocality: 'Gossau ZH',
    addressRegion: 'ZH',
    addressCountry: 'CH',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 47.30397, longitude: 8.75905 },
  medicalSpecialty: 'https://schema.org/Physiotherapy',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+41 44 543 63 68',
    email: PRACTICE.email.label,
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  },
  sameAs: [PRACTICE.linkedInUrl],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'de-CH',
  publisher: { '@id': PRACTICE_ID },
};

function breadcrumbs(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function plainText(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function summarise(text, limit = 155) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1).replace(/\s+\S*$/, '')}…`;
}

/** Everything a page says about itself in the document head, for the browser and for pre-rendering. */
export function resolvePageMeta(route) {
  const meta = {
    title: route.meta.title ?? SITE_NAME,
    description: route.meta.description ?? '',
    canonical: absoluteUrl(route.path),
    robots: route.meta.noindex ? 'noindex' : 'index, follow',
    image: DEFAULT_IMAGE,
    type: 'website',
    published: null,
    modified: null,
    graph: [],
  };

  switch (route.name) {
    case 'home':
      meta.graph = [practice, website];
      break;
    case 'kontakt':
      meta.graph = [practice];
      break;
    case 'uberuns':
      meta.graph = [
        {
          ...practice,
          employee: teams.map((member) => ({
            '@type': 'Person',
            name: member.name.trim(),
            jobTitle: member.workPosition,
          })),
        },
      ];
      break;
    case 'behandlungstechniken':
      meta.graph = [
        {
          ...practice,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Behandlungstechniken',
            itemListElement: services.map((service) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: service.title, url: absoluteUrl(`/behandlungstechniken/${service.id}`) },
            })),
          },
        },
      ];
      break;
    case 'behandlungstechnikenitem': {
      const service = findService(route.params.serviceid);
      if (!service) break;
      meta.title =
        service.title.length <= LONG_TITLE ? `${service.title} in Gossau ZH | ${SITE_NAME}` : `${service.title} | ${SITE_NAME}`;
      meta.description = serviceSummaries[service.id] ?? meta.description;
      meta.image = absoluteUrl(responsiveImage(service.image).src);
      meta.graph = [
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Behandlungstechniken', path: '/behandlungstechniken' },
          { name: service.title, path: route.path },
        ]),
      ];
      break;
    }
    case 'newsArticle': {
      const article = findArticleBySlug(route.params.article);
      if (!article) break;
      meta.title = `${article.title} | ${SITE_NAME}`;
      meta.description = summarise(article.subtitle || plainText(article.text));
      meta.canonical = absoluteUrl(articlePath(article));
      meta.image = article.img.url;
      meta.type = 'article';
      meta.published = article.date;
      meta.modified = (article.updatedAt ?? article.date).slice(0, 10);
      meta.graph = [
        practice,
        {
          '@type': 'Article',
          headline: article.title,
          description: meta.description,
          image: [article.img.url],
          datePublished: article.date,
          dateModified: meta.modified,
          author: (article.author ?? '')
            .split(',')
            .map((name) => name.trim())
            .filter(Boolean)
            .map((name) => ({ '@type': 'Person', name })),
          publisher: { '@id': PRACTICE_ID },
          mainEntityOfPage: meta.canonical,
          inLanguage: 'de-CH',
        },
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'News', path: '/news' },
          { name: article.title, path: articlePath(article) },
        ]),
      ];
      break;
    }
    default:
      break;
  }
  return meta;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function structuredData(graph) {
  // "</" inside a string would end the script element early.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

const META_TAGS = (meta) => [
  ['name', 'description', meta.description],
  ['name', 'robots', meta.robots],
  ['property', 'og:type', meta.type],
  ['property', 'og:title', meta.title],
  ['property', 'og:description', meta.description],
  ['property', 'og:url', meta.canonical],
  ['property', 'og:image', meta.image],
  ['name', 'twitter:card', 'summary_large_image'],
  ['name', 'twitter:title', meta.title],
  ['name', 'twitter:description', meta.description],
  ['name', 'twitter:image', meta.image],
  ['property', 'article:published_time', meta.published],
  ['property', 'article:modified_time', meta.modified],
];

/** Head markup for a pre-rendered page. */
export function renderHead(meta) {
  const tags = [`<title>${escapeHtml(meta.title)}</title>`, `<link rel="canonical" href="${escapeHtml(meta.canonical)}">`];
  for (const [attribute, key, value] of META_TAGS(meta)) {
    if (value) tags.push(`<meta ${attribute}="${key}" content="${escapeHtml(value)}">`);
  }
  if (meta.graph.length) {
    tags.push(`<script type="application/ld+json" data-page-schema>${structuredData(meta.graph)}</script>`);
  }
  return tags.join('\n    ');
}

function setHeadElement(selector, create, apply) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.append(element);
  }
  apply(element);
}

/** Keeps the document head in step with the page while browsing. */
export function applyPageMeta(route) {
  if (typeof document === 'undefined') return;
  const meta = resolvePageMeta(route);
  document.title = meta.title;

  setHeadElement(
    'link[rel="canonical"]',
    () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
    (link) => link.setAttribute('href', meta.canonical),
  );

  for (const [attribute, key, value] of META_TAGS(meta)) {
    const selector = `meta[${attribute}="${key}"]`;
    if (!value) {
      document.head.querySelector(selector)?.remove();
      continue;
    }
    setHeadElement(
      selector,
      () => {
        const tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        return tag;
      },
      (tag) => tag.setAttribute('content', value),
    );
  }

  const schema = document.head.querySelector('script[data-page-schema]');
  if (!meta.graph.length) {
    schema?.remove();
    return;
  }
  setHeadElement(
    'script[data-page-schema]',
    () => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.pageSchema = '';
      return script;
    },
    (script) => {
      script.textContent = structuredData(meta.graph);
    },
  );
}
