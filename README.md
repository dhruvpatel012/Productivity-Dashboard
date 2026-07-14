# ⚡ ProductiveMind:Productivity Dashboard

Welcome to **ProductiveMind**! 🎓

I built this dashboard to solve a real problem: keeping my study sessions organized, tracking daily goals, managing my schedule, and staying focused—all in one place without getting distracted by a million different tabs or checking my phone.

It is designed with a premium, glassmorphic **"Aurora / Gradient Mesh"** look that adapts to the time of day, creating a calm and aesthetic study environment.

---

## 🎯 What it does (Bento Features)

The dashboard uses a clean **Bento Grid** layout, keeping everything visible at a glance:

1. **⏱️ Pomodoro Focus Timer**: A classic study timer with 25-minute focus intervals and 5-minute short breaks to help maintain concentration.
2. **📝 Todo List**: Easily jot down assignments, study topics, and general tasks. Mark high-priority tasks as "Important" with a star.
3. **📅 Daily Planner**: Plan out study blocks, class times, and breaks throughout the day.
4. **📊 Daily Goals Tracker**: Set primary goals for the day and see a live progress bar update as you check them off.
5. **⛅ Real-Time Weather Widget**: Displays current weather conditions based on location, so I know whether to study indoors or take a break outside.
6. **💡 Motivation Quotes**: Randomly pulls inspiring quotes from a public API to keep procrastination at bay.
7. **🎨 Dynamic Time-of-Day Themes**: The background colors shift automatically based on the time slot (Morning, Afternoon, Evening, and Night) to ease eye strain.
8. **✨ Cursor-Reactive Glow**: Cards illuminate with a soft, glow following the cursor.

---

## 🛠️ The Tech Stack (Kept it Simple!)

- **Structure**: Semantic HTML5.
- **Styling**: Vanilla CSS3 using custom properties (CSS variables), CSS Grid, Flexbox, and glassmorphic backdrop filters. Responsive designs are separated into `mediaQuery.css` for tablet and mobile views.
- **Logic**: Vanilla ES6+ JavaScript. I separated the logic into individual scripts inside the `js/` directory (`todo.js`, `planner.js`, `weather.js`, etc.) to keep the codebase modular, easy to read, and maintain.
- **Icons**: Font Awesome (for buttons/controls) and Remix Icons (for dashboard tiles).

---

## 💾 How it saves data

All task lists, daily schedules, goals, and active theme preferences are saved to the browser's **Local Storage**. This means my work is persisted even if I close the tab or refresh the page before a study session!

---

## 📂 Project Structure

```text
Productivity-Dashboard/
├── index.html        # Main markup & bento card container layout
├── style.css         # Typography, styling variables, and layout styles
├── mediaQuery.css    # Responsive styles for mobile and tablet views
├── favicon.svg       # Custom browser tab icon
├── js/
│   ├── background.js # Time-of-day dynamic classes
│   ├── theme.js      # Dark/Light mode toggle persistence
│   ├── navigation.js # Maximizing/back navigation routines
│   ├── pomodoro.js   # Focus & break countdown timer
│   ├── todo.js       # Task addition, stars, and list renders
│   ├── planner.js    # Time slot updates
│   ├── goals.js      # Goal percentage progress computations
│   ├── weather.js    # Open-Meteo current condition fetcher
│   ├── quotes.js     # Random motivation quotes fetcher
│   └── interactions.js # Cursor-reactive cards glow effect
└── README.md         # Project documentation (this file!)
```

---

_Designed by Dhruv Patel._
