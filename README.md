# मुंबई व उपनगर महानुभाव पंथीय संस्था

Official website for **Mumbai v Upanagar Mahanubhav Panthiya Sanstha (Proposed)**.

Built with React + Vite + TypeScript (frontend) and Google Apps Script + Google Sheets (backend).

---

## Project Structure

```
mahanubhav-sanstha/
├── frontend/                  ← React + Vite app (deploy to Cloudflare Pages)
│   ├── src/
│   │   ├── admin/             ← Admin panel pages & auth
│   │   ├── components/        ← Reusable UI components
│   │   ├── data/              ← Language context & translations
│   │   ├── hooks/             ← Custom React hooks
│   │   ├── pages/             ← Route-level page components
│   │   ├── services/          ← API layer (api.ts ← set SCRIPT_URL here)
│   │   └── styles/            ← CSS modules
│   ├── public/
│   │   ├── assets/            ← Images (saint, diya, skyline, etc.)
│   │   └── _redirects         ← Cloudflare Pages SPA redirect rule
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig*.json
│
├── backend/
│   └── GOOGLE_APPS_SCRIPT.js  ← Paste into Google Apps Script editor
│
├── docs/
│   ├── deployment-guide.md    ← Full deploy walkthrough
│   └── google-sheet-setup.md  ← Google Sheets column structure
│
└── README.md                  ← You are here
```

---

## Quick Start (local development)

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173
```

No environment variables are needed for local development — the Google Apps Script URL is hardcoded in `frontend/src/services/api.ts`.

---

## Routes

### Public

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About the Sanstha |
| `/mandal` | Mandal list & map |
| `/events` | Upcoming events |
| `/all-events` | Events listing (dynamic, from Sheets) |
| `/gallery` | Photo gallery (dynamic, from Sheets) |
| `/registration` | Registration form (writes to Sheets) |
| `/services` | Services |
| `/contact` | Contact page |

### Admin (password protected)

| Route | Page |
|---|---|
| `/admin/login` | Admin login |
| `/admin/dashboard` | Dashboard |
| `/admin/events` | Manage events |
| `/admin/registrations` | View registrations |
| `/admin/gallery` | Manage gallery |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite 6 |
| Routing | React Router v6 |
| Animations | CSS keyframes + Framer Motion |
| Hosting | Cloudflare Pages (free) |
| Backend | Google Apps Script |
| Database | Google Sheets |

---

## Deployment

See full instructions in:

- **`docs/deployment-guide.md`** — Cloudflare Pages + Apps Script step-by-step
- **`docs/google-sheet-setup.md`** — Google Sheets tab & column structure

### TL;DR

1. Paste `backend/GOOGLE_APPS_SCRIPT.js` into your Google Sheets' Apps Script editor.
2. Deploy it as a Web App and copy the URL.
3. Paste the URL into `frontend/src/services/api.ts` → `SCRIPT_URL`.
4. Push the repo to GitHub and connect `frontend/` to Cloudflare Pages.
5. Set build command: `npm run build`, output dir: `dist`, root: `frontend`.

---

## Admin Setup

1. Open `frontend/src/services/api.ts`.
2. Change `ADMIN_USER` and `ADMIN_PASS` to your own credentials.
3. Set `ADMIN_TOKEN` in `backend/GOOGLE_APPS_SCRIPT.js` to the same password.
4. Redeploy both.

Default admin URL: `https://your-site.pages.dev/admin/login`

---

## Festival Mode 🪔

The site includes an optional **festival mode** (flower petals + golden glow) for major events like **Bhagwan Shri Chakradhar Swami Jayanti**.

A toggle button appears in the bottom-right corner of the site. It can also be enabled programmatically:

```ts
import { useFestival } from "./components/FestivalMode";
const { setFestivalMode } = useFestival();
setFestivalMode(true);
```

---

## Contact / Maintainer

Mumbai v Upanagar Mahanubhav Panthiya Sanstha (Proposed)  
For technical issues, see `docs/deployment-guide.md` or contact the web administrator.
