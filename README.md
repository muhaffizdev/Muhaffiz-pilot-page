# Muhaffiz website

The landing page for [Muhaffiz](https://muhaffiz.app), an offline-first safety app for women and children in Pakistan.

Built with Next.js 16 (App Router, static export), Tailwind CSS 4 and Motion.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The static site is written to `out/`. `public/CNAME` is copied into it, so the custom domain travels with every build.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) lints and builds every pull request. Every push to `main` builds the site and deploys `out/` to GitHub Pages, which serves it at https://muhaffiz.app.

Pages is set to deploy from **GitHub Actions** (Settings › Pages › Source), with the custom domain `muhaffiz.app` and HTTPS enforced.

## Where things are

- `src/app/` holds the layout, global styles and theme tokens (`globals.css`), and the page.
- `src/components/` holds one component per section of the page.
- `public/` holds files copied as-is (`CNAME`, `.nojekyll`)..
