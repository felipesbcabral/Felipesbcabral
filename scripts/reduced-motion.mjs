import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const rule = '<style>@media (prefers-reduced-motion: reduce){*{animation:none!important}}</style>';

export function addReducedMotion(svg) {
  if (!svg.startsWith('<svg') || !svg.trimEnd().endsWith('</svg>')) {
    throw new Error('Expected an SVG document; refusing to overwrite output.');
  }
  return svg.includes(rule) ? svg : svg.replace('</svg>', `${rule}</svg>`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const file of ['assets/contributions.svg', 'assets/contributions-dark.svg']) {
    const svg = await readFile(file, 'utf8');
    await writeFile(file, addReducedMotion(svg));
  }
}
