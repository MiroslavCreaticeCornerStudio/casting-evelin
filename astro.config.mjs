// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Production domain (used for canonical URL + Open Graph).
  site: 'https://casting.inclusive.bg',

  // Pages stay static (prerendered); the lead API route runs as a Vercel
  // serverless function (it opts in with `export const prerender = false`).
  adapter: vercel(),

  // Honor a port assigned via PORT (lets the preview tool pick a free port).
  server: { port: Number(process.env.PORT) || 4321 },
});
