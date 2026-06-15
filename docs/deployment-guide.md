# Deployment Guide

Step-by-step instructions to deploy the full **मुंबई व उपनगर महानुभाव पंथीय संस्था** stack.

---

## Part 1 — Backend: Google Apps Script

### Step 1 — Set up Google Sheets

Follow `docs/google-sheet-setup.md` to create the spreadsheet with the three required tabs (`Events`, `Registrations`, `Gallery`).

### Step 2 — Open Apps Script

1. Open your Google Spreadsheet.
2. Click **Extensions → Apps Script**.
3. Delete any placeholder code in the editor.
4. Copy the entire contents of `backend/GOOGLE_APPS_SCRIPT.js` and paste it.

### Step 3 — Set your admin token

At the top of the script, find:

```js
const ADMIN_TOKEN = "CHANGE_THIS_TO_YOUR_SECRET_TOKEN_123";
```

Replace the value with a strong, unique password. **Keep this secret.**

Also update the admin credentials used in `frontend/src/services/api.ts` — search for `ADMIN_PASS` and set the same value.

### Step 4 — Deploy the Web App

1. Click **Deploy → New Deployment**.
2. Click the gear icon next to **Type** and select **Web App**.
3. Fill in:
   - **Description:** `Mahanubhav Sanstha API v1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy**.
5. Authorise the script when prompted (this lets it access your Sheets).
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfy.../exec
   ```

### Step 5 — Paste the URL into the frontend

Open `frontend/src/services/api.ts` and replace the value of `SCRIPT_URL`:

```ts
export const SCRIPT_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

### Step 6 — Redeploy after changes

Whenever you update the Apps Script code:
1. Click **Deploy → Manage Deployments**.
2. Click the pencil (edit) icon on the existing deployment.
3. Change **Version** to `New version`.
4. Click **Deploy**.

> ⚠️ The URL stays the same after redeployment — you do **not** need to update `api.ts` again.

---

## Part 2 — Frontend: Cloudflare Pages

### Prerequisites

- A [Cloudflare](https://cloudflare.com) account (free tier works).
- Your project pushed to a **GitHub** or **GitLab** repository.

### Step 1 — Push to GitHub

```bash
# From the project root (mahanubhav-sanstha/)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mahanubhav-sanstha.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorise Cloudflare to access your GitHub account.
4. Select the `mahanubhav-sanstha` repository.
5. Click **Begin setup**.

### Step 3 — Configure build settings

| Setting | Value |
|---|---|
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `frontend` |

> The **Root directory** field tells Cloudflare Pages to run all commands from inside the `frontend/` folder.

### Step 4 — Deploy

1. Click **Save and Deploy**.
2. Cloudflare will install dependencies, build, and deploy in ~2 minutes.
3. Your site will be live at `https://mahanubhav-sanstha.pages.dev` (or a custom domain).

### Step 5 — Add a custom domain (optional)

1. In **Cloudflare Pages → your project → Custom Domains**.
2. Click **Set up a custom domain** and follow the DNS instructions.

### Step 6 — Subsequent deployments

Every `git push` to `main` triggers an automatic rebuild and deploy — no manual steps needed.

---

## Part 3 — Admin Panel

The admin panel is embedded in the frontend and requires **no separate deployment**.

### Access

URL: `https://your-site.pages.dev/admin/login`

Default credentials (change these before going live):

| Field | Default |
|---|---|
| Username | `admin` |
| Password | *(set in `frontend/src/services/api.ts` → `ADMIN_PASS`)* |

### Change credentials

Open `frontend/src/services/api.ts`:

```ts
const ADMIN_USER = "admin";          // change this
const ADMIN_PASS = "Yashaki@21";     // MUST change this
```

Also ensure `ADMIN_TOKEN` in `backend/GOOGLE_APPS_SCRIPT.js` matches `ADMIN_PASS`.

Commit and push — Cloudflare Pages will redeploy automatically.

---

## Quick Reference

| Task | Command / Location |
|---|---|
| Run locally | `cd frontend && npm install && npm run dev` |
| Production build | `cd frontend && npm run build` |
| Update backend | Edit `backend/GOOGLE_APPS_SCRIPT.js`, redeploy in Apps Script |
| Update API URL | `frontend/src/services/api.ts` → `SCRIPT_URL` |
| Change admin pass | `frontend/src/services/api.ts` → `ADMIN_PASS` + Apps Script `ADMIN_TOKEN` |
| Sheet structure | See `docs/google-sheet-setup.md` |
