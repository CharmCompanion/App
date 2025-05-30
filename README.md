# Charm Companion – Full Feature List

A complete breakdown of all systems, features, and tools in the Warframe Charm Companion App.

---

## 🧠 Core Systems

### 📂 Account & Scanner Integration
- JSON scanner import (inventory sync)
- Real-time resource tracking
- Firebase user data sync
- QR code loadout importing
- Screenshot-based import (optional)

### 🗺️ Star Chart
- Interactive map with node tracking
- Resource links per node
- Progress/unlock tracking

---

## 📈 Dashboard & Hub

### 🏠 Homepage Overview
- Alerts (resources, events, rotations)
- Nightwave XP + Rank
- Duviri Circuit rotation
- Goals progress
- Loadout preview
- Login streak, mastery, and resource status

---

## 📚 Tools & Utilities

### 🔁 Import / Export
- Scanner JSON upload
- QR loadout import/export
- Loadout preview & validation
- Screenshot import (planned)

### 📦 Loadout Manager
- View, edit, apply builds
- QR preview + sharing
- Build voting system
- Build tags (Warframe, Weapon, Role)

### 📆 Calendar & Alerts
- Dev streams, reset timers
- Player-set reminders
- Resource deadlines

---

## 🎯 Goals & Paths

### 🧭 Goal Tracker
- Add/remove/complete goals
- Deadlines, tags, percent complete
- Subtasks and priority

### 🗺️ Path Planner
- Task chains for:
  - Steel Path Ready
  - Hemith Unlock
  - MR30 Prep
  - Forging Mastery
  - Beat the Game
- Suggested Warframes, missions, weapons
- Unique/meta-viable builds
- Visual path badge system

---

## 🔬 Trackers & Progress

### 💥 Nightwave Tracker
- Track current/recoverable acts
- XP & Rank display
- Full reward tiers (1–30 + Prestige)

### ⚔️ Lich/Sister Tracker
- Image-based mod selection
- Pass/Fail cycling
- Attempt rows (1–5)
- Suggest/Clear/Drag-to-Swap
- Coda support (red/purple theme)

### 📖 Mastery Tracker
- Item ownership & rank tracking
- Total mastery progress
- Filtered views

### 📦 Resource Tracker
- Total resource counts
- Farming goals
- Inventory alerts by threshold

---

## 🛡️ Community Tools

### 🏛️ LFG + Blessing Trains
- Post runs and blessing times
- Select roles (giver/receiver)
- Choose blessing type
- Activity tags (farming, relics, endless)

### 📝 Notes & Sheets
- Markdown notes system
- Spreadsheet tracker
- Shareable formats

### 🏘️ Clan Tools
- MOTD editor
- Member guide sharing
- Clan build sharing (future)

---

## 📚 Guides

### 📘 Guide Library
- Add/edit full markdown guides
- Tag by type (farming, mastery, builds)
- Linked to goals, paths, events

---

## 🔔 Event Tracker

### 🗓️ Events Page
- Ghoul Purge
- Thermia Fractures
- Belly of the Beast
- Notes per event
- Timer tracking

---

## 🤖 Discord Integration

### Discord Bot
- Live event notifications
- Slash commands
  - `/build <name>`
  - `/event <name>`
- Guide + build linking

---

## 🎨 UI & Themes

### UI/UX
- Faction themes (Corpus, Grineer, etc.)
- Responsive top bar navigation
- Clean dropdowns & buttons

### Styling
- `themes.css` – faction look
- `shared.css` – global styles

---

## 📁 Key Folders

```
/src/pages/              → Main screens
/src/components/         → UI components
/src/firebase/           → DB modules
/src/hooks/              → Custom hooks
/src/styles/             → CSS/Theme files
/public/assets/          → Mod/Fashion/QR images
```

---

## ✅ Feature Tags

| Category         | Features Implemented                      |
|------------------|--------------------------------------------|
| Loadouts         | ✅ Import, Edit, Share                     |
| Paths/Goals      | ✅ Task Chains, Farming Suggestions       |
| Lich Tracker     | ✅ Guess Logic, Visual States             |
| Nightwave        | ✅ XP, Rank, Rewards                      |
| Inventory        | ✅ Alerts, Thresholds, QR Codes           |
| Notes            | ✅ Markdown & Spreadsheets               |
| Clan/Community   | ✅ MOTD, LFG, Blessing Train              |
| Events           | ✅ Ghoul, Thermia, Belly                  |
| Calendar/Timers  | ✅ Dev Stream, Reset, Duviri              |
| Guides           | ✅ Editable, Taggable, Searchable         |
| Discord Bot      | ✅ Notifications, Slash Commands           |
