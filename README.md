# 🎬 MoodCinema

> AI-powered emotion-driven movie & series recommender.  
> Pick a mood → get 6 perfectly matched, highly-rated titles instantly.

---

## 🗂 Project Structure

```
mood-cinema/
├── api/
│   └── recommend.js      ← Secure serverless proxy (Anthropic key lives here)
├── public/
│   └── index.html        ← Full frontend app (no keys, safe to publish)
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

---

## 🚀 How to Deploy (Step by Step)

### Step 1 — Install Node.js
Download from https://nodejs.org (choose LTS version)  
After install, open terminal and confirm:
```bash
node --version
npm --version
```

### Step 2 — Install Vercel CLI
```bash
npm install -g vercel
```

### Step 3 — Clone or download this project
If you have it as a zip, extract it.  
Then open terminal inside the `mood-cinema` folder:
```bash
cd mood-cinema
```

### Step 4 — Login to Vercel
```bash
vercel login
```
This opens your browser. Sign up free at vercel.com then confirm.

### Step 5 — Deploy to Vercel
```bash
vercel
```
Answer the prompts:
- **Set up and deploy?** → Y
- **Which scope?** → your username
- **Link to existing project?** → N
- **Project name?** → mood-cinema
- **In which directory is your code?** → ./  (just press Enter)

Vercel will give you a live URL like: `https://mood-cinema-xyz.vercel.app`

### Step 6 — Add your Anthropic API Key (IMPORTANT)
Your key must NEVER go in the code. Add it in Vercel dashboard:

1. Go to https://vercel.com/dashboard
2. Click your **mood-cinema** project
3. Click **Settings** tab
4. Click **Environment Variables** in the left menu
5. Click **Add New**
6. Name: `ANTHROPIC_API_KEY`
7. Value: paste your key (starts with `sk-ant-...`)
8. Click **Save**

### Step 7 — Redeploy to apply the key
```bash
vercel --prod
```

✅ Your app is now live and secure!

---

## 🔒 Why This Architecture Is Safe

```
Browser (public)          Server (private)
─────────────────         ─────────────────
index.html          →     /api/recommend.js
  sends prompt      →       reads ANTHROPIC_API_KEY
  receives results  ←       calls Anthropic
                            returns results
```

- The API key is **only on Vercel's servers**
- The browser **never sees the key**
- GitHub only has the code — **no secrets**

---

## 🌟 Features

- 9 preset moods + custom mood text input
- Movies & Series toggle
- Mood intensity slider (Light / Medium / Intense)  
- Time available filter
- AI-curated recommendations (IMDb 7.5+ only)
- OTT platform badges (Netflix, Prime, Disney+ etc.)
- Movie plot popup with trailer link
- Watchlist with localStorage persistence
- Taste insight panel
- Total watch time calculator
- Shimmer skeleton loading
- Mood journey journal

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/CSS/JS |
| Backend | Vercel Serverless Functions (Node.js) |
| AI | Anthropic Claude (claude-sonnet-4) |
| Hosting | Vercel (free tier) |

---

