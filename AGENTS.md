# AGENTS.md

## Cursor Cloud specific instructions

### Product
Single frontend product: a React + Vite + TypeScript developer portfolio SPA ("Malik Portfolio"), styled with Tailwind v3 + shadcn/ui, using Three.js (`@react-three/fiber`), GSAP, and Framer Motion. There is no backend; the contact form is front-end only.

### Run / build / lint / test
Standard scripts live in `package.json`:
- Dev server: `npm run dev` — serves on **port 3000** (set in `vite.config.ts`, not the Vite default 5173).
- Build: `npm run build` — runs `tsc -b` then `vite build`. TypeScript currently compiles cleanly.
- Lint: `npm run lint` — ESLint flat config. NOTE: the codebase currently has pre-existing lint errors (e.g. `react-hooks/set-state-in-effect`, `react-refresh/only-export-components`); these are existing code state, not an environment problem. There is no automated test suite.

### Non-obvious gotchas
- The top-level `loading-screen/` directory is a **separate, standalone Next.js project** (its own `package.json`, `bun.lock`, `prisma/`). It is NOT part of the running portfolio app and is not installed/built/run by the root scripts — it is a reference source for a loading-screen design. Do not `npm install` or run it when working on the main app.
- `public/Sertifikat` is a symlink to the repo-root `Sertifikat/` folder; certificate images are served at `/Sertifikat/...`. Keep both in sync.
- Node 22 works fine despite `info.md` mentioning Node 20 (Vite 7 requires Node 20.19+ / 22.12+).
