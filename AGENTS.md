# Project: Aashir Siddiqui Portfolio

## Stack
- React + Vite (v5) + Tailwind CSS + Framer Motion
- Deployed on **Vercel** (production: https://aashir-portfolio-self.vercel.app)
- GitHub: `aashirsohail104/new-updated-portfolio-website`

## Key Configuration
- `vite.config.js`: No `base` path (root-relative for Vercel)
- `vercel.json`: SPA rewrites (`/*` → `/index.html`) + `api/chat.js` as serverless function
- `netlify.toml`: Present but unused (Vercel is active)
- Package: `"type": "module"`, `"engines": { "node": ">=18.0.0" }`

## Environment Variables (Vercel)
- `GEMINI_API_KEY`: Production env var for Gemini API access

## AI Portfolio Assistant
- **System prompt**: `src/data/assistant-prompt.js` — contains full profile, skills, services, pricing policy, hiring flow
- **Chat UI**: `src/components/ui/ChatAssistant.jsx` — floating chat bubble with Framer Motion animations
- **API service**: `src/services/chat.js` — sends POST to `/api/chat` with messages array
- **Serverless function**: `api/chat.js` — proxies to Gemini API at `v1beta/models/gemini-3.1-flash-lite:generateContent`
- **Model**: `gemini-3.1-flash-lite` (has active free tier; `gemini-2.0-flash` and `gemini-2.5-flash-lite` are unavailable to new users)
- **Safety settings**: All harm categories set to `BLOCK_NONE` to prevent response blocking
- **Generation config**: temperature 0.7, maxOutputTokens 1024, topP 0.95, topK 40
- **Retry**: Exponential backoff on 429 rate limits (up to 2 retries)
- **Context window**: Last 20 messages (excluding system prompt) sent to Gemini

## Contact
- Email: `aaashirsiddiqui@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/aashirsiddiqui`
- GitHub: `https://github.com/aashirsohail104`

## Build Commands
- `npm run dev` — local dev (Vite)
- `npm run build` — production build
- `vercel --prod` — deploy to Vercel

## Key Fixes Applied (Session History)
1. **GitHub Pages → Vercel migration**: Fixed white page (Pages legacy mode) and redeployed
2. **CV download**: Added `import.meta.env.BASE_URL` to resumeUrl in `profile.js`
3. **Chat 502 error**: Switched from deprecated `gemini-2.0-flash` to `gemini-3.1-flash-lite` (quota was zero on old model)
4. **API bugs fixed**: Duplicate expression in reply extraction (both sides of `||` were identical), added safety settings, generation config, retry logic, proper error propagation
5. **Email update**: Changed `aashirsiddiqui@gmail.com` → `aaashirsiddiqui@gmail.com` across 3 files
7. **Desktop resolution scaling**: Site was locked at `max-w-[1200px]` with no larger breakpoints. Added `2xl:` progressive scaling across layout (container → 1400px), typography (headings +1 step), spacing (section padding 160px, card padding 32px, grid gaps 40px), and hero (orb 420px, gap 20). Used only existing `2xl` (1536px) breakpoint — no new breakpoints needed. Lesson: check which Tailwind default breakpoints are unused before creating custom ones.
6. **Navbar hamburger breakpoint fix**: Default `xl` breakpoint (1280px) was too narrow for logo + 7 nav links + CV button. Added custom `nav: '1400px'` breakpoint in `tailwind.config.js` and replaced `xl:` → `nav:` in all Navbar classes. Kept hamburger visible until actually enough horizontal space exists. Lesson: default breakpoints may not fit custom content — create purpose-built breakpoints instead of fighting defaults.
