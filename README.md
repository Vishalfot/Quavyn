# Quavyn Dashboard v2.0 — Setup Guide
## Production-Quality Multi-Page SaaS

---

## Prerequisites

- **Node.js** v18+ → https://nodejs.org/
- **VS Code** → https://code.visualstudio.com/

---

## Quick Start (5 Steps)

### 1. Extract ZIP
Unzip `quavyn-dashboard-v2.zip` anywhere on your system.

### 2. Open in VS Code
```
File → Open Folder → select "quavyn-v2"
```

### 3. Open Terminal
```
Terminal → New Terminal  (Ctrl + `)
```

### 4. Install Dependencies
```bash
npm install
```
Takes 1–2 minutes.

### 5. Start Development Server
```bash
npm start
```
Opens at `http://localhost:3000` automatically.

---

## Feature Walkthrough

### Dashboard (Homepage)
- Executive briefing at the top — summary of most critical situation
- **6 metric cards** — click any metric to open investigation drawer
- **Priority Insights** — click any card for full detail drawer with tabs
- **Signal Feed** — live scrolling signals, expandable
- **Recommendations** — AI-ranked founder actions

### Clicking a Metric (Churn, CAC, etc.)
→ Opens **Insight Investigation Drawer** on the right side with:
- Overview tab: AI analyst pipeline + reasoning
- Causes tab: Internal / Market / External breakdown
- Timeline tab: Interactive event sequence
- Actions tab: Prioritized founder actions

### Insight Cards
→ Click "Deep investigate" or the card itself
→ Opens full investigation drawer

### Ask Quavyn (Chat)
→ Click "Ask Quavyn" in the top bar
→ Slides in from right (dashboard shifts left)
→ Type anything — try "Why is churn rising?" or "What should I do?"
→ Smart responses for CAC, churn, actions

### Navigation (Sidebar)
- Dashboard — executive homepage
- Insights — full insight list
- Alerts — all active signals
- Integrations — 10 connected data sources
- Settings — configuration

---

## File Structure

```
src/
├── App.jsx                          # Root + routing
├── index.js                         # Entry point
├── index.css                        # Global styles + animations
├── data/
│   └── index.js                     # All mock data
├── hooks/
│   └── useApp.js                    # Global state (React Context)
├── pages/
│   ├── DashboardPage.jsx            # Main homepage
│   ├── InsightsPage.jsx             # Insights list
│   ├── AlertsPage.jsx               # Alerts feed
│   ├── IntegrationsPage.jsx         # Integrations grid
│   └── SettingsPage.jsx             # Settings
└── components/
    ├── layout/
    │   ├── TopBar.jsx               # Navigation bar
    │   ├── Sidebar.jsx              # Icon sidebar
    │   └── StatusStrip.jsx          # Bottom ticker
    ├── shared/
    │   ├── ui.jsx                   # Badges, bars, primitives
    │   └── QuavynLogo.jsx           # SVG logo
    ├── dashboard/
    │   ├── MetricsBar.jsx           # 6 clickable metric cards
    │   ├── InsightCards.jsx         # Priority insight cards
    │   ├── SignalFeed.jsx           # Expandable signal feed
    │   ├── Recommendations.jsx      # Strategic actions
    │   └── IntelligenceLayers.jsx   # Collapsible data layers
    ├── insights/
    │   └── InsightDrawer.jsx        # Full investigation drawer
    └── chat/
        └── ChatPanel.jsx            # Sliding AI chat panel
```

---

## Customizing Data

Edit `src/data/index.js` to update:
- `METRICS` — 6 KPI cards
- `INSIGHTS` — insight cards and drawer content
- `SIGNAL_FEED` — live signal items
- `ANALYST_PIPELINE` — AI analyst findings
- `RECOMMENDATIONS` — strategic actions
- `INITIAL_CHAT` — opening AI conversation

---

## Recommended VS Code Extensions

```
ES7+ React Snippets          dsznajder.es7-react-js-snippets
Tailwind CSS IntelliSense    bradlc.vscode-tailwindcss
Prettier                     esbenp.prettier-vscode
Auto Rename Tag              formulahendry.auto-rename-tag
```

---

## Build for Production

```bash
npm run build
```
Output → `build/` folder. Deploy to Vercel with:
```bash
npx vercel --prod
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `npx kill-port 3000 && npm start` |
| node_modules missing | `rm -rf node_modules && npm install` |
| Tailwind styles missing | Make sure you ran `npm install` |
| Blank screen | Check browser console, ensure Node 18+ |

---

Built with React 18 · Tailwind CSS · Lucide React · DM Sans · DM Mono
