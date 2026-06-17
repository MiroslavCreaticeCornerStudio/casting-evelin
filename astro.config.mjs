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

  // Disable Astro's CSRF origin check: behind Vercel's proxy the request's
  // internal origin doesn't match the public https origin, so it false-blocks
  // legit form POSTs with "Cross-site POST form submissions are forbidden".
  // Safe here — this is a public lead form with no auth/session to protect.
  security: { checkOrigin: false },

  // Honor a port assigned via PORT (lets the preview tool pick a free port).
  server: { port: Number(process.env.PORT) || 4321 },
});
