# 🎵 MoodTunes

A full-stack mood-based music discovery app with **500 songs** across English, Hindi, Kannada, Tamil & Telugu — with built-in YouTube playback.

## Features
- 🎵 500 songs (100 per language)
- 🎬 YouTube player built into the app (no redirect needed)
- 😊💙🎉🎯 Filter by mood: Happy, Sad, Party, Focus
- 🌍 Filter by language: English, Hindi, Kannada, Tamil, Telugu
- 🔍 Real-time search
- ❤️ Favorites (saved to browser localStorage)
- 🌑 Dark mode UI

## Deploy to Netlify (3 steps)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "MoodTunes 500 songs + YouTube player"
git remote add origin https://github.com/YOUR_USERNAME/moodtunes.git
git push -u origin main
```

### Step 2 — Import on Netlify
1. Go to https://app.netlify.com → **Add new site** → **Import an existing project**
2. Connect your GitHub repo
3. Build settings are auto-filled from `netlify.toml`:
   - Base: `frontend`
   - Build: `npm install && CI=false npm run build`
   - Publish: `build`

### Step 3 — Deploy 🚀
Click **Deploy Site** — live in ~2 minutes!

## Run Locally
```bash
cd frontend
npm install
npm start
```
