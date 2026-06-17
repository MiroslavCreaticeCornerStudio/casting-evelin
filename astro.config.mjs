// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // Production domain (used for canonical URL + Open Graph).
  site: 'https://casting.inclusive.bg',

  adapter: cloudflare(),

  // Honor a port assigned via PORT (lets the preview tool pick a free port).
  server: { port: Number(process.env.PORT) || 4321 },
});