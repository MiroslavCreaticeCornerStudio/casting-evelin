// After `astro build`, tell Cloudflare Workers' static-assets uploader NOT to
// serve the server worker (and the Pages routing file) as public assets.
// Without this, `wrangler deploy` errors: "Uploading a Pages _worker.js
// directory as an asset" (it would expose server-side code).
import { writeFileSync } from 'node:fs';

writeFileSync('dist/.assetsignore', '_worker.js\n_routes.json\n');
console.log('postbuild: wrote dist/.assetsignore');
