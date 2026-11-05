/*
 * Serves dist the way Vercel does: the rewrites and security headers from
 * vercel.json, and the 404 page with a real 404 status. Used for browser tests
 * and local previews, so both meet the same rules as production.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.join(process.cwd(), 'dist');
const portIndex = process.argv.indexOf('--port');
const port = portIndex > -1 ? Number(process.argv[portIndex + 1]) : 4173;
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json',
};

// vercel.json sources use path-to-regexp: ":name" for one segment, "(.*)" for the rest.
function compile(source) {
  const pattern = source
    .replace(/[.+?^${}[\]\\]/g, '\\$&')
    .replace(/\\\(\.\*\\\)|\(\.\*\)/g, '(.*)')
    .replace(/:(\w+)/g, '(?<$1>[^/]+)');
  return new RegExp(`^${pattern}$`);
}

const rewrites = config.rewrites.map((rule) => ({ match: compile(rule.source), destination: rule.destination }));
const headerRules = config.headers.map((rule) => ({ match: compile(rule.source), headers: rule.headers }));

function resolveFile(pathname) {
  for (const { match, destination } of rewrites) {
    const found = pathname.match(match);
    if (found) return destination.replace(/:(\w+)/g, (_, name) => found.groups?.[name] ?? '');
  }
  return pathname.endsWith('/') ? `${pathname}index.html` : pathname;
}

http
  .createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = path.join(root, resolveFile(pathname));
    let status = 200;
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(root, '404.html');
      status = 404;
    }
    const headers = { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' };
    for (const rule of headerRules) {
      if (rule.match.test(pathname)) for (const { key, value } of rule.headers) headers[key.toLowerCase()] = value;
    }
    response.writeHead(status, headers);
    fs.createReadStream(file).pipe(response);
  })
  .listen(port, () => console.log(`Serving dist on http://localhost:${port}`));
