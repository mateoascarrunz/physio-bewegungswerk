import { spawn, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { afterEach, describe, expect, it } from 'vitest';
import { assertCollectionHasEntries } from '../../src/services/cmsMapper.js';

const SNAPSHOT_PATH = 'src/content/cms-snapshot.json';
const UNREACHABLE_CMS = 'http://127.0.0.1:9';

function runScript(env) {
  return spawnSync('node', ['scripts/fetch-cms-content.mjs'], {
    env: { ...process.env, VERCEL_ENV: '', ...env },
    encoding: 'utf8',
  });
}

describe('fetch-cms-content', () => {
  const snapshotBefore = readFileSync(SNAPSHOT_PATH, 'utf8');

  afterEach(() => {
    expect(readFileSync(SNAPSHOT_PATH, 'utf8')).toBe(snapshotBefore);
  });

  it('fails production builds when the CMS is unreachable', () => {
    const result = runScript({ CMS_URL: UNREACHABLE_CMS, VERCEL_ENV: 'production' });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Production build stopped');
  });

  it('keeps the stored snapshot for preview builds when the CMS is unreachable', () => {
    const result = runScript({ CMS_URL: UNREACHABLE_CMS, VERCEL_ENV: 'preview' });
    expect(result.status).toBe(0);
    expect(result.stderr).toContain('keeping snapshot');
  });

  it('fails production builds when the CMS returns no team', async () => {
    const server = createServer((request, response) => {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ data: [] }));
    });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const url = `http://127.0.0.1:${server.address().port}`;

    const result = await new Promise((resolve) => {
      const child = spawn('node', ['scripts/fetch-cms-content.mjs'], {
        env: { ...process.env, CMS_URL: url, VERCEL_ENV: 'production' },
        stdio: 'ignore',
      });
      child.on('close', resolve);
    });
    server.close();
    expect(result).toBe(1);
  });
});

describe('assertCollectionHasEntries', () => {
  it('rejects an empty team and allows empty optional collections', () => {
    expect(() => assertCollectionHasEntries('teams', [])).toThrow();
    expect(() => assertCollectionHasEntries('jobs', [])).not.toThrow();
  });
});
