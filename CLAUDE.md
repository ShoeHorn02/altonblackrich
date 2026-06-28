# altonblackrich

React fitness/workout dashboard application deployed to Cloudflare Pages.

## Deployment

**Live:** https://altonblackrich.com

**Architecture:**
- GitHub: Source code (ShoeHorn02/altonblackrich)
- GitHub Actions: CI/CD pipeline (build & deploy on push)
- Cloudflare Pages: Hosting (altonblackrich.pages.dev)
- DigitalOcean: DNS management (altonblackrich.com)

## Build & Development

**Local setup:**
```bash
npm install
npm start          # Dev server on localhost:3000
npm run build      # Production build
npm run build      # Builds to /build folder
```

**Build stack:**
- Node.js v22+
- npm v10+
- React 16 (Create React App)
- Sass for stylesheets (sass v1.68.0)
- Bootstrap 4 for UI

**Build requirements:**
- `NODE_OPTIONS=--openssl-legacy-provider` for Node 22+ compatibility with older deps
- `sass --load-path=./node_modules` for Bootstrap SCSS imports

## Deployment Pipeline

**Trigger:** Push to `master` branch

**CI/CD Flow:**
1. GitHub Actions checkout code
2. Install dependencies: `npm install`
3. Build app: `npm run build`
4. Deploy to Cloudflare Pages (via `cloudflare/pages-action@v1`)

**Required GitHub Secrets:**
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token (Pages:Write scope)
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID (cb83123b84c48428482bb312fd50632d)

**Deployment file:** `.github/workflows/deploy.yml`

## DNS Setup

**Domain:** altonblackrich.com (registered on Namecheap)

**DNS Provider:** DigitalOcean

**DNS Records:**
- Root domain (@) → A records (DigitalOcean legacy)
- www subdomain → CNAME → altonblackrich.pages.dev

**Note:** Custom domains in Cloudflare Pages require Cloudflare DNS. Root domain (altonblackrich.com) works with DigitalOcean DNS via CNAME routing.

## Testing

**Test page:** `/guidance` route
- Black page with success message
- Used to verify deployments are working

**Check deployment:**
```bash
curl https://altonblackrich.com/guidance
```

## ESLint & Code Quality

**Status:** Zero ESLint warnings ✅

**Recent cleanup:**
- Removed 100+ unused imports
- Fixed all security issues (target="_blank")
- Removed dead code/components
- Fixed duplicate props/keys

## Migration History

- **Original:** Firebase hosting with GitLab CI/CD
- **Migrated to:** Cloudflare Pages with GitHub Actions (2026-06-28)
- **Removed:** .gitlab-ci.yml, firebase.json, Firebase configuration

## Troubleshooting

**Build fails on GitHub Actions:**
- Check Node.js version compatibility (must be v18+)
- Verify package-lock.json is in sync with package.json
- Check SASS compilation: `npm run build:css`

**Deployment fails:**
- Verify GitHub secrets are set correctly
- Check Cloudflare Pages project exists
- Verify build output is in `/build` folder

**SSL issues:**
- Root domain (altonblackrich.com) uses DigitalOcean DNS
- www subdomain requires Cloudflare DNS for custom domain support
- Consider migrating to Cloudflare DNS if custom domain SSL needed
