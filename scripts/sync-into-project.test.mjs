import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { extract, rewriteLinks, replaceSection, sync, BEGIN, END } from './sync-into-project.mjs';

test('extracts one ordered section and rejects malformed markers', () => {
  assert.equal(extract('head'+BEGIN+'body'+END+'tail'), 'body');
  assert.throws(() => extract(BEGIN+'x'+BEGIN+END), /exactly one/);
  assert.throws(() => extract(END+BEGIN), /ordered/);
});
test('rewrites links without touching unrelated links', () => {
  assert.equal(rewriteLinks('[a](docs/X.md) [b](other/X.md)'), '[a](vendor/engineering-guidelines/docs/X.md) [b](other/X.md)');
});
test('replaces only marked content', () => {
  assert.equal(replaceSection('before'+BEGIN+'old'+END+'after', 'new'), 'before'+BEGIN+'new'+END+'after');
});
test('sync and check detect drift and accept current state', async () => {
  const cwd = await mkdtemp(join(tmpdir(), 'engineering-guidelines-'));
  try {
    await mkdir(join(cwd, 'vendor/engineering-guidelines'), { recursive: true });
    await writeFile(join(cwd, 'vendor/engineering-guidelines/AGENTS.md'), BEGIN+'\n[a](docs/A.md)\n'+END);
    await writeFile(join(cwd, 'AGENTS.md'), 'project\n'+BEGIN+'\nold\n'+END+'\nlocal\n');
    await assert.rejects(sync({ cwd, check: true }), /out of date/);
    assert.equal(await sync({ cwd }), true);
    assert.equal(await sync({ cwd, check: true }), false);
    const result = await readFile(join(cwd, 'AGENTS.md'), 'utf8');
    assert.match(result, /project/);
    assert.match(result, /local/);
    assert.match(result, /vendor\/engineering-guidelines\/docs\/A.md/);
  } finally { await rm(cwd, { recursive: true, force: true }); }
});
