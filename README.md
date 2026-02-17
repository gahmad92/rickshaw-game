# 🛺 Mamu Butt's Rickshaw Chronicles
https://rickshaw-mamo-butt.netlify.app/

An interactive rickshaw driving game with infinite world exploration, dynamic traffic, and engaging missions.

## 🎮 Features

### World & Environment
- **Infinite World Map** - 3000x3000px seamless world with infinite wrapping
- **4 Mountain Ranges** - 26 peaks with snow caps
- **5 Dense Forests** - 500+ individual trees
- **4 Major Cities** - 82+ buildings with unique architecture
- **Dynamic Water** - 2 rivers, 1 lake with wave effects
- **4 Strategic Bridges** - Rotatable wooden structures

### Gameplay
- **Live Traffic** - 20 vehicles (cars, taxis, buses) with AI movement
- **Mission System** - Random passenger pickups and destinations
- **Day/Night Cycle** - Dynamic lighting and atmosphere
- **Ambient NPCs** - 40+ characters roaming the world
- **Infinite Wrapping** - Drive off edges and reappear on opposite side

### UI & Polish
- **Clean Minimalist HUD** - Shows only essential info
- **Smooth Camera System** - Follows player smoothly
- **Responsive Controls** - Arrow keys or WASD
- **Immersive Dialogue** - Character interactions with Urdu text

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### How to Play

1. Open `index.html` in your web browser
2. Click "START YOUR DAY" button
3. **Controls:**
   - **Arrow Keys** or **WASD** - Drive rickshaw
   - **Enter** - Pick up/Drop off passengers
   - **M** - Select mission (when available)
   - https://rickshaw-mamo-butt.netlify.app/

### Gameplay Loop

1. **Pick Up** - Drive to waiting passengers (they appear on map)
2. **Transport** - Drive to the destination city
3. **Drop Off** - Reach destination and press Enter
4. **Earn** - Get paid for completed mission
5. **Repeat** - Select next mission and continue

## 📁 Project Structure

```
├── index.html           # Game entry point
├── config.js            # Game configuration & state
├── game.js              # Main game engine
├── map.js               # World generation & rendering
├── missions.js          # Mission system
├── ui.js                # UI management
├── style.css            # Styling
├── .gitignore           # Git ignore rules
└── *.md                 # Documentation files
```

## 🎯 Key Systems

### Map System (map.js)
- **Mountains** - Multiple peaks with snow caps
- **Forests** - Procedurally placed trees
- **Cities** - Urban centers with buildings and windows
- **Water** - Rivers and lakes with rendering effects
- **Bridges** - Rotatable wooden structures over water

### Game Engine (game.js)
- **Game Loop** - 60 FPS target
- **Input Handling** - Keyboard controls
- **Camera System** - Smooth world scrolling
- **Vehicle System** - 20 AI-controlled vehicles
- **World Wrapping** - Infinite edge wrapping

### Mission System (missions.js)
- **Random Generation** - Unique missions each time
- **Passenger Creation** - NPCs with dialogue
- **Destination Selection** - Various cities
- **Reward Calculation** - Based on distance/time

### UI System (ui.js)
- **HUD Display** - Clean player information
- **Dialogue System** - Character interactions
- **Notifications** - Mission alerts
- **Mission Indicators** - Objective tracking

## 🎨 Visual Design

- **Color Scheme** - Day/night dynamic gradients
- **Emoji-based Graphics** - Simple, colorful characters
- **Responsive Layout** - Works on all screen sizes
- **Smooth Animations** - Camera tracking and transitions

## 📊 Game Statistics

| Element | Count |
|---------|-------|
| Mountain Peaks | 26 |
| Forest Trees | 500+ |
| Buildings | 82+ |
| Cities | 4 |
| NPCs | 40+ |
| Vehicles | 20 |
| Roads | 5 |
| Bridges | 4 |
| Water Bodies | 3 |

## 🛠️ Technical Details

- **Framework** - Vanilla JavaScript (no dependencies)
- **Rendering** - HTML5 Canvas
- **Performance** - 60 FPS target
- **Compatibility** - All modern browsers

## 🎮 Tips & Tricks

1. **Explore Everywhere** - There are hidden areas and shortcuts
2. **Use Roads** - Roads provide the best routes
3. **Money Matters** - Complete missions to earn money
4. **Watch Traffic** - Vehicles add to the immersion
5. **Day/Night** - Game changes with time of day
6. **Infinite Wrapping** - Drive off edge and appear on opposite side

## 🚗 Vehicle Types

- 🚗 **Car** - Average speed
- 🚙 **SUV** - Medium speed  
- 🚕 **Taxi** - Fast
- 🚌 **Bus** - Slow but steady
- 🚎 **Mini Bus** - Quick acceleration

## 📝 Latest Updates (v2)

- ✅ Simplified UI (removed stats clutter)
- ✅ Infinite world wrapping (all 4 directions)
- ✅ Two-way traffic system (20 vehicles)
- ✅ Vehicle variety (5 different types)
- ✅ Smooth 60 FPS gameplay

## 🐛 Known Issues

None currently! Report issues in GitHub Issues.

## 📄 License

Private Project - All Rights Reserved

## 👤 Creator

**Mamu Butt** 🧔 - Your trusted rickshaw driver!

---

**Ready to drive? Open `index.html` and start your adventure!** 🛺✨
