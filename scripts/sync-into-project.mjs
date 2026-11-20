#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const BEGIN = '<!-- engineering-guidelines:begin -->';
export const END = '<!-- engineering-guidelines:end -->';

export function extract(text) {
  const starts = text.split(BEGIN).length - 1;
  const ends = text.split(END).length - 1;
  if (starts !== 1 || ends !== 1 || text.indexOf(BEGIN) >= text.indexOf(END)) {
    throw new Error('Expected exactly one ordered pair of engineering-guidelines markers');
  }
  return text.slice(text.indexOf(BEGIN) + BEGIN.length, text.indexOf(END));
}

export function rewriteLinks(text) {
  return text.replaceAll('](docs/', '](vendor/engineering-guidelines/docs/');
}

export function replaceSection(consumer, section) {
  if (!consumer.trim()) return BEGIN + section + END + '\n';
  extract(consumer);
  return consumer.slice(0, consumer.indexOf(BEGIN) + BEGIN.length) +
    section + consumer.slice(consumer.indexOf(END));
}

export async function sync({ cwd = process.cwd(), check = false } = {}) {
  const upstream = resolve(cwd, 'vendor/engineering-guidelines/AGENTS.md');
  const target = resolve(cwd, 'AGENTS.md');
  const section = rewriteLinks(extract(await readFile(upstream, 'utf8')));
  let existing;
  try { existing = await readFile(target, 'utf8'); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    existing = '';
  }
  const next = replaceSection(existing, section);
  if (next === existing) return false;
  if (check) throw new Error('Consumer AGENTS.md is out of date; run sync-into-project.mjs');
  await writeFile(target, next);
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.some(a => a !== '--check')) {
    console.error('Usage: node sync-into-project.mjs [--check]');
    process.exitCode = 2;
  } else {
    sync({ check: args.includes('--check') }).then(
      changed => console.log(changed ? 'Updated AGENTS.md' : 'AGENTS.md is current'),
      error => { console.error(error.message); process.exitCode = 1; }
    );
  }
}
