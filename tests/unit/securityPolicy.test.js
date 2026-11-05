import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const config = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));

function contentSecurityPolicy() {
  const rule = config.headers.find((entry) => entry.source === '/(.*)');
  return rule.headers.find((header) => header.key === 'Content-Security-Policy').value;
}

describe('content security policy', () => {
  it('allows each inline script in index.html by its exact hash', () => {
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
    expect(scripts.length).toBeGreaterThan(0);
    for (const script of scripts) {
      const hash = createHash('sha256').update(script).digest('base64');
      expect(contentSecurityPolicy()).toContain(`'sha256-${hash}'`);
    }
  });

  it('keeps every other script source to the site itself', () => {
    const scriptSources = contentSecurityPolicy().match(/script-src ([^;]+)/)[1].split(' ');
    expect(scriptSources.filter((source) => !source.startsWith("'sha256-"))).toEqual(["'self'"]);
  });
});
