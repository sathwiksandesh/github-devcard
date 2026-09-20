# GitHub Dev Card 

A sleek, dark-themed web app that fetches any public GitHub user's profile and displays a beautiful developer card — complete with bio, top languages, stats, top projects, and an AI-style persona badge.

## Features
- 🔍 Live GitHub API data (no API key needed for public profiles)
- 🎨 Beautiful dark UI with animated card reveal
- 📊 Stats: Repos, Followers, Total Stars, Total Forks
- 💻 Top languages shown as tags
- 📁 Top 3 repositories listed
- 🏷️ Auto-generated persona badge (Researcher, Web Dev, Systems Dev, etc.)

## How to Use

### Option 1 — Open directly
Just double-click `index.html` — it works offline* in any modern browser.

> *GitHub API requires an internet connection to fetch user data.

### Option 2 — Run with a local server (recommended)
```bash
# Python 3
python3 -m http.server 3000

# Node.js (npx)
npx serve .
```
Then open `http://localhost:3000` in your browser.

## Files
```
github-dev-card/
├── index.html   # Main HTML structure
├── style.css    # All styles (dark theme, animations, responsive)
├── app.js       # GitHub API logic & card rendering
└── README.md    # This file
```

## GitHub API Rate Limits
- **Unauthenticated**: 60 requests/hour per IP (plenty for personal use)
- If you hit the limit, wait ~1 minute or add a GitHub Personal Access Token in `app.js` as an `Authorization` header

## Customization
- Edit persona logic in `app.js` → `getPersona()` function
- Swap fonts in `index.html` (Google Fonts link)
- Change colors via CSS variables at the top of `style.css`
- # Developer

## Siddhantam Sathwik Sandesh
Artificial Intelligence & Data Science Student


