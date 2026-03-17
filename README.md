# Lalith Karthik — Portfolio

A modern, dark-themed portfolio website built with Next.js. Deployable on Vercel in under 2 minutes.

## Tech Stack
- **Framework**: Next.js 14
- **Styling**: Pure CSS with custom properties (no Tailwind needed)
- **Fonts**: Bricolage Grotesque + DM Mono + Instrument Serif (Google Fonts)
- **Animations**: CSS keyframes + IntersectionObserver

## Features
- 🎨 Custom animated cursor
- ✨ Scroll-triggered reveal animations
- ⌨️ Typewriter effect for roles
- 🌌 Floating orb background with grid overlay
- 📱 Fully responsive with mobile hamburger menu
- 🎯 Smooth scroll navigation
- 🖤 Dark theme with gradient accents

## Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel (Recommended)
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Done! ✅

### Option 3: Drag & Drop
1. Run `npm run build` locally
2. Drag the project folder to [vercel.com/new](https://vercel.com/new)

## Customization
- Update personal info in `pages/index.js`
- Adjust colors in `styles/globals.css` (CSS variables at the top)
- Add project GitHub links in the Projects section
