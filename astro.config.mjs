// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // TODO: set the real production domain (used for canonical URL + Open Graph).
  site: 'https://inclusive.example.com',

  // Pages stay static (prerendered); only the lead API + file routes run on the
  // Worker — they opt in with `export const prerender = false`.
  adapter: cloudflare({
    // Provides the wrangler.jsonc bindings (R2) locally via Miniflare during
    // `astro dev`, so the upload flow can be tested without deploying.
    platformProxy: { enabled: true },
    imageService: 'passthrough',
  }),

  // We don't use Astro sessions; a non-KV driver avoids requiring a SESSION KV
  // namespace at deploy time.
  session: { driver: 'memory' },

  // Honor a port assigned via PORT (lets the preview tool pick a free port).
  server: { port: Number(process.env.PORT) || 4321 },
});
