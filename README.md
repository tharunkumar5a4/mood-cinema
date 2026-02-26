# 🎬 MoodCinema

> **AI-powered emotion-driven movie & series recommender**  
> Tell us how you feel — we'll find the perfect watch for tonight.

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-mood--cinema--five.vercel.app-black?style=for-the-badge)](https://mood-cinema-five.vercel.app)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 🌐 Live Demo

👉 **[https://mood-cinema-five.vercel.app](https://mood-cinema-five.vercel.app)**

---

## ✨ Features

- 🎭 **9 Preset Moods** — Heartbroken, Hyped, Chill, Funny, Mind-Blown and more
- ✍️ **Custom Mood Input** — Describe any mood in your own words
- 🎬 **Movies & Series Toggle** — Switch between films and TV shows
- 🎚️ **Mood Intensity Slider** — Light, Medium, or Intense recommendations
- ⏱️ **Time Filter** — Filter by how much time you have
- ⭐ **IMDb 7.5+ Only** — Only highly rated, critically acclaimed titles
- 📺 **OTT Platform Badges** — See where to watch (Netflix, Prime, Disney+ etc.)
- 🎬 **Watchlist** — Save titles for later, persists across sessions
- 🧠 **Taste Insight** — Learns your viewing pattern during the session
- ⏳ **Total Watch Time** — Calculates tonight's total viewing time
- ✨ **Shimmer Skeleton Loading** — Smooth loading experience
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Vercel Serverless Functions (Node.js) |
| AI | OpenRouter API (Llama 3.3 70B + fallbacks) |
| Hosting | Vercel (Free Tier) |
| Version Control | GitHub |

---

## 🔒 Security Architecture

```
Browser (Public)            Server (Private)
────────────────            ─────────────────
index.html          →       /api/recommend.js
  sends prompt      →         reads OPENROUTER_API_KEY
  receives results  ←         calls AI API
                              returns results
```

- ✅ API keys stored only in Vercel environment variables
- ✅ Keys never exposed in frontend code
- ✅ Safe to open source — no secrets in repository

---

## 🚀 How to Deploy Your Own

### 1. Clone the repo
```bash
git clone https://github.com/tharunkumar5a4/mood-cinema.git
cd mood-cinema
```

### 2. Install Vercel CLI
```bash
npm install -g vercel
```

### 3. Get a free API key
- Go to [openrouter.ai](https://openrouter.ai)
- Sign up free → Create API key

### 4. Deploy to Vercel
```bash
vercel
```

### 5. Add environment variable in Vercel dashboard
```
OPENROUTER_API_KEY = your_key_here
```

### 6. Redeploy
```bash
vercel --prod
```

✅ Your own MoodCinema is live!

---

## 📁 Project Structure

```
mood-cinema/
├── api/
│   └── recommend.js      ← Secure serverless proxy
├── public/
│   └── index.html        ← Full frontend app
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

---

## 👨‍💻 Author

**Tharunkumar** — [@tharunkumar5a4](https://github.com/tharunkumar5a4)

---

<div align="center">
  <a href="https://mood-cinema-five.vercel.app">🎬 Try MoodCinema Now</a>
</div>
