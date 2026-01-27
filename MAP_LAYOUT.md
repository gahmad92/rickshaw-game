# Rickshaw Game - Complete Map Layout

## Overall World Map (3000x3000px)

```
┌──────────────────────────────────────────────────────────────────┐
│                    ⛰️ MOUNTAIN RANGE 1 (Top Right)              │
│                    ⛰️ Multiple Peaks with Snow Caps             │
│                                                                   │
│  ⛰️ MTN 3                                                         │
│  TOP LEFT     🌳🌳🌳 FOREST 2    🏢🏢 TECH PARK  🌳 FOREST 4   │
│  ⛰️RANGE       🌳🌳🌳           🏢🏢 (500x450)                  │
│                                  🏢🌳🌳                          │
│                                                                   │
│ ~🌊~ RIVER 1                    🏙️ DOWNTOWN                     │
│  🌊~~ (Diagonal)                🏢 🏢 🏢                         │
│ ~~🌊 Flow                        🏢 🏢 🏢 (600x500)            │
│  🌊~~                            🏢 🏢 🏢                        │
│                                                                   │
│  🌳🌳 FOREST 1                  ~~ LAKE ~~                      │
│  🌳🌳 (600x500)                  ~~ (300x250) ~~                │
│  🌳🌳                             ~~~              ⛰️ MTN 4     │
│                                                     ⛰️ RIGHT    │
│ 🏭🏭🏭 INDUSTRIAL   MAIN ROAD (Horizontal)        ⛰️ SIDE     │
│ 🏭🏭🏭 ZONE        ════════════════════════         ⛰️        │
│ 🏭🏭🏭 (550x400)                                                │
│                                                                   │
│                ~🌊~ RIVER 2 (Vertical)                          │
│                 🌊~~                                             │
│                 ~~🌊 |                                           │
│                  🌊 |                                            │
│   🌳 FOREST 3   |  |   🌳 FOREST 5     🏘️ RESIDENTIAL         │
│   🌳🌳🌳        |  |   🌳🌳🌳🌳       🏘️🏘️ AREA              │
│   🌳🌳🌳        |  |   🌳🌳🌳        🏘️🏘️ (600x500)         │
│                 |  |                   🏘️🏘️                   │
│                                                                   │
│      ⛰️ MOUNTAIN RANGE 2 (Bottom Left) - 6 Peaks              │
│      ⛰️ Multiple heights with varied colors                    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## Map Grid (With Approximate Coordinates)

```
     0        600      1200      1800      2400      3000
     │         │         │         │         │         │
   ┌─────────────────────────────────────────────────────┐
0  │ ⛰️(300,400)        🏘️(1200,300)    ⛰️(2200,200)   │
   │  Mtn3                Sch                Mtn1       │
   │                                                     │
6  │ 🌳(400,800)     🏙️Downtown    🏢Tech(2300,1800)   │
   │ F1(600x500)     (1200,1000)    Park               │
   │                 (600x500)                           │
12 │ ~🌊~River1~  🌊~Lake~           ⛰️ Mtn4          │
   │ /Diagonal/  (1800,500)         (2800,1500)        │
   │              (300x250)          (320x350)          │
18 │                                                     │
   │   MAIN ROAD ZONE                                   │
24 │ 🏭Ind(400,1500) 🌳F4(2300,800)  ~~River2~~       │
   │ Zone(550x400)   (500x400)       (Vertical)        │
   │                                                     │
30 │ 🌳F3(600,2200)   🏘️Res(1600,2300)   ⛰️ Mtn2    │
   │ (800x500)        (600x500)          (100,2400)    │
   │                                      6 peaks       │
   └─────────────────────────────────────────────────────┘
```

## Map Features Legend

| Symbol | Feature | Count | Description |
|--------|---------|-------|-------------|
| ⛰️ | Mountains | 4 ranges | Multiple peaks with snow caps per range |
| 🌳 | Forests | 5 areas | Dense tree clusters (60-70% density) |
| 🏙️ | Downtown | 1 city | 25 buildings, central hub |
| 🏢 | Tech Park | 1 city | 15 buildings, tech center |
| 🏭 | Industrial | 1 city | 12 buildings, factory zone |
| 🏘️ | Residential | 1 city | 30 buildings, housing area |
| 🌊 | Water | 2 rivers + 1 lake | Rivers with wave effects |
| 🌉 | Bridges | 4 bridges | Wooden structures with railings |
| ═══ | Roads | 5 main roads | Horizontal & vertical routes |
| 🌲 | Parks | 5 parks | Green spaces with benches and paths |
| 🌾 | Farms | 4 farms | Agricultural areas with crop rows |
| 🐄 | Animals | Multiple | Cows, sheep, horses, chickens, ducks, goats |
| 🏪 | Shops | 20+ shops | Bakery, clothing, electronics, cafe, etc |
| 🛒 | Markets | 4 markets | Central, East, West, North markets |
| 🛤️ | Small Streets | 8 streets | Alleyways and scenic drives connecting areas |

## Rendering Layers (Back to Front)

```
Layer 8: Sky (Day/Night gradient)
Layer 7: Mountains (with snow caps)
Layer 6: Water (rivers + lakes with waves)
Layer 5: Bridges (rotatable wooden structures)
Layer 4: Forests (green triangle trees)
Layer 3: Cities (buildings + windows + labels)
Layer 2: Roads (gray asphalt + white markings)
Layer 1: Buildings/Trees (original game objects)
Layer 0: Players/Passengers/UI (HTML elements on top)
```

## City Details

### Downtown (1200, 1000) - 600x500px, 25 buildings
- Central business district
- Mixed building heights
- 3x4 window grid per building

### Tech Park (2300, 1800) - 500x450px, 15 buildings
- Modern facilities
- Regular spacing
- Efficient layout

### Industrial Zone (400, 1500) - 550x400px, 12 buildings
- Factory area
- Dark gray colors
- Heavy industry feel

### Residential Area (1600, 2300) - 600x500px, 30 buildings
- Suburban housing
- Tighter spacing
- Light gray colors

## Forest Distribution

| Forest | Location | Size | Density |
|--------|----------|------|---------|
| F1 | (400, 800) | 600x500 | 60% |
| F2 | (1800, 1200) | 700x600 | 70% |
| F3 | (600, 2200) | 800x500 | 65% |
| F4 | (2300, 800) | 500x400 | 60% |
| F5 | (1200, 2600) | 700x300 | 70% |

## Bridge Information

| Bridge | Coordinates | Angle | Dimensions |
|--------|-------------|-------|------------|
| North Bridge | (1050, 1100) | 0.3 rad | 120x250 |
| East Bridge | (2500, 1200) | 1.57 rad | 100x200 |
| West Bridge | (600, 1800) | 0.5 rad | 110x280 |
| Central Bridge | (2000, 600) | 0.2 rad | 100x350 |

## Water Features

### Rivers
- **River 1**: Diagonal flow from (100,500) to (2500,2300) - 80px wide
- **River 2**: Vertical flow from (2600,300) to (2600,2800) - 100px wide

### Lake
- **Location**: (1800, 500)
- **Size**: 300x250px
- **Features**: 3 concentric wave patterns

## Strategic Notes

✓ Mountains provide natural barriers at map edges
✓ Bridges connect separated areas across water

## NEW FEATURES - Parks, Farms & Engagement

### Parks (5 Locations)
- **Central Park** (800, 300) - 300x280px
  - Benches and walking paths
  - Scenic running routes
  
- **Forest Park** (2200, 700) - 350x300px
  - Near forest area, peaceful atmosphere
  
- **Riverside Park** (500, 2000) - 280x250px
  - Along river with scenic views
  
- **Community Park** (1900, 2100) - 320x280px
  - Central meeting point
  
- **Mountain View Park** (2600, 2300) - 300x300px
  - Near mountain range, elevated views

### Farms (4 Locations)
- **North Farm** (100, 1000) - 350x400px - Wheat crops
- **East Farm** (2800, 500) - 300x350px - Corn crops
- **South Farm** (1100, 2500) - 400x300px - Vegetables
- **Valley Farm** (2200, 2200) - 350x380px - Mixed crops

Features:
- Crop rows for visual variety
- Animals roaming (diversify long runs)

### Animals on Map
**Types**: Cow, Sheep, Horse, Chicken, Duck, Goat
- Scattered around farms and parks
- Adds liveliness to the world
- Good visual breaks during long runs

### Shops (20+ Locations)
**Types**: Bakery, Clothing Store, Electronics, Bookstore, Pharmacy, Cafe, Flower Shop, Toy Store
- Distributed across all city areas
- Colorful designs (red, teal, blue, orange, green)
- Add interest to urban exploration

### Markets (4 Locations)
- **Central Market** (1300, 1500) - 200x180px - 12 stalls
- **East Market** (2100, 2000) - 180x160px - 8 stalls
- **West Market** (600, 1700) - 200x170px - 10 stalls
- **North Market** (1700, 400) - 180x150px - 7 stalls

Features:
- Colorful stalls arranged in grid
- Bustling marketplace atmosphere
- Breaks up monotony of long routes

### Small Streets & Alleyways (8 Routes)
1. **Park Lane** - Connects parks and natural areas
2. **Market Street** - Links markets
3. **Tech Road** - Tech park connection
4. **Farm Road** - Agricultural area routes
5. **Country Lane** - Scenic farm routes
6. **Forest Path** - Forest connections
7. **Valley Road** - Mountain and valley routes
8. **Scenic Drive** - Scenic alternative routes

**Benefits for Long Runs:**
- Reduces boredom with varied environments
- Provides alternative paths
- Encourages exploration
- Mix of urban, rural, and natural scenery
- Multiple visual points of interest every short distance
✓ Cities provide mission destinations
✓ Forests offer scenic routes and NPCs
✓ Roads create main transportation routes
✓ Well-balanced distribution across the map
✓ Multiple pathways between destinations
