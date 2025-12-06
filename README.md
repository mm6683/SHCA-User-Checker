# SHCA User Checker

A static, single-page tool for checking Stone-Haven County Asylum user details on Roblox. The page fetches public Roblox APIs to
 surface profile basics, group membership highlights, and quick links.

## Running locally

Use the built-in Worker to avoid CORS errors when calling Roblox APIs:

```bash
npm install
npm run dev
```

Wrangler will serve the static assets and forward `/proxy/...` requests to Roblox with permissive CORS headers.

## Deploying to Cloudflare Pages

1. Create a new Cloudflare Pages project and connect it to this repository.
2. Use **No build command** or leave it empty.
3. Set the **Output directory** to `public` (where `index.html` lives).
4. Save and deploy. Cloudflare Pages will host the static HTML for you.

## Deploying with Wrangler (if using the existing deploy command)

The included `wrangler.jsonc` points to the `public/` folder as the assets directory and enables a Worker proxy for Roblox requests. Running `npm run deploy` (or `npx wrangler deploy`) will deploy the static assets and the proxy Worker using that configuration.

## Notes

- The favicon is dynamically set from the SHCA group icon when the page loads.
- Username lookups accept either a Roblox username (with or without leading `@`) or a numeric user ID.
