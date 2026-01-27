// Map System - Creates dynamic world with mountains, forests, cities, bridges, and streets

const MAP = {
    // Map features
    mountains: [],
    forests: [],
    cities: [],
    bridges: [],
    water: [],
    parks: [],
    farms: [],
    animals: [],
    shops: [],
    markets: [],
    smallStreets: [],
    
    // Initialize the entire map
    init() {
        this.generateMountains();
        this.generateForests();
        this.generateCities();
        this.generateWater();
        this.generateBridges();
        this.generateStreets();
        this.generateParks();
        this.generateFarms();
        this.generateAnimals();
        this.generateShops();
        this.generateMarkets();
        this.generateSmallStreets();
    },
    
    // Generate mountain ranges at different areas of the map
    generateMountains() {
        // Mountain Range 1 - Top right
        this.createMountainRange(2200, 200, 8, 400, 300);
        
        // Mountain Range 2 - Bottom left
        this.createMountainRange(100, 2400, 6, 350, 280);
        
        // Mountain Range 3 - Top left corner
        this.createMountainRange(300, 400, 5, 300, 250);
        
        // Mountain Range 4 - Right side
        this.createMountainRange(2800, 1500, 7, 320, 350);
    },
    
    // Helper: Create a mountain range with multiple peaks
    createMountainRange(startX, startY, peakCount, baseWidth, baseHeight) {
        for (let i = 0; i < peakCount; i++) {
            const offsetX = i * (baseWidth * 0.6);
            const offsetY = (Math.random() - 0.5) * 100;
            const variationWidth = baseWidth * (0.8 + Math.random() * 0.4);
            const variationHeight = baseHeight * (0.7 + Math.random() * 0.5);
            
            this.mountains.push({
                x: startX + offsetX,
                y: startY + offsetY,
                width: variationWidth,
                height: variationHeight,
                peakHeight: variationHeight * 0.8,
                color: `hsl(${240 + Math.random() * 20}, 40%, ${35 + Math.random() * 15}%)`
            });
        }
    },
    
    // Generate forest areas scattered around the map
    generateForests() {
        const forestAreas = [
            { x: 400, y: 800, width: 600, height: 500, density: 0.6 },
            { x: 1800, y: 1200, width: 700, height: 600, density: 0.7 },
            { x: 600, y: 2200, width: 800, height: 500, density: 0.65 },
            { x: 2300, y: 800, width: 500, height: 400, density: 0.6 },
            { x: 1200, y: 2600, width: 700, height: 300, density: 0.7 },
        ];
        
        forestAreas.forEach(area => {
            this.createForest(area.x, area.y, area.width, area.height, area.density);
        });
    },
    
    // Helper: Create forest with trees
    createForest(x, y, width, height, density) {
        const treeCount = Math.floor((width * height) / (200 / density));
        
        for (let i = 0; i < treeCount; i++) {
            const tree = {
                x: x + Math.random() * width,
                y: y + Math.random() * height,
                size: 20 + Math.random() * 25,
                type: ['pine', 'oak', 'birch'][Math.floor(Math.random() * 3)]
            };
            
            this.forests.push(tree);
        }
    },
    
    // Generate cities/urban areas
    generateCities() {
        const cityData = [
            { 
                name: 'Downtown',
                x: 1200, 
                y: 1000, 
                width: 600, 
                height: 500,
                buildings: 25,
                color: '#888888'
            },
            { 
                name: 'Tech Park',
                x: 2300, 
                y: 1800, 
                width: 500, 
                height: 450,
                buildings: 15,
                color: '#666666'
            },
            { 
                name: 'Industrial Zone',
                x: 400, 
                y: 1500, 
                width: 550, 
                height: 400,
                buildings: 12,
                color: '#777777'
            },
            { 
                name: 'Residential Area',
                x: 1600, 
                y: 2300, 
                width: 600, 
                height: 500,
                buildings: 30,
                color: '#999999'
            }
        ];
        
        cityData.forEach(city => {
            this.cities.push({
                ...city,
                buildings: this.generateCityBuildings(city)
            });
        });
    },
    
    // Helper: Generate buildings for a city
    generateCityBuildings(city) {
        const buildings = [];
        const cols = Math.ceil(Math.sqrt(city.buildings));
        const rows = Math.ceil(city.buildings / cols);
        const blockWidth = city.width / cols;
        const blockHeight = city.height / rows;
        
        for (let i = 0; i < city.buildings; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            
            buildings.push({
                x: city.x + col * blockWidth + Math.random() * (blockWidth * 0.3),
                y: city.y + row * blockHeight + Math.random() * (blockHeight * 0.3),
                width: blockWidth * 0.7 + Math.random() * (blockWidth * 0.2),
                height: blockHeight * 0.7 + Math.random() * (blockHeight * 0.2),
                height: 50 + Math.random() * 100,
                color: ['#888', '#999', '#777', '#666'][Math.floor(Math.random() * 4)]
            });
        }
        
        return buildings;
    },
    
    // Generate water bodies (rivers, lakes)
    generateWater() {
        // River 1 - Diagonal
        this.createRiver(100, 500, 2500, 2300, 80, 'river');
        
        // River 2 - Vertical
        this.createRiver(2600, 300, 2600, 2800, 100, 'river');
        
        // Lake 1
        this.water.push({
            x: 1800, y: 500,
            width: 300, height: 250,
            type: 'lake',
            color: '#4DA6FF'
        });
    },
    
    // Helper: Create a river using multiple segments
    createRiver(startX, startY, endX, endY, width, type) {
        const segments = 20;
        for (let i = 0; i < segments; i++) {
            const t = i / segments;
            const nextT = (i + 1) / segments;
            
            const x1 = startX + (endX - startX) * t;
            const y1 = startY + (endY - startY) * t;
            const x2 = startX + (endX - startX) * nextT;
            const y2 = startY + (endY - startY) * nextT;
            
            this.water.push({
                x1, y1, x2, y2,
                type: type,
                width: width,
                color: '#3498DB'
            });
        }
    },
    
    // Generate bridges over water
    generateBridges() {
        this.bridges = [
            { 
                x: 1050, y: 1100, 
                angle: 0.3, 
                width: 120, 
                length: 250,
                name: 'North Bridge'
            },
            { 
                x: 2500, y: 1200, 
                angle: 1.57, 
                width: 100, 
                length: 200,
                name: 'East Bridge'
            },
            { 
                x: 600, y: 1800, 
                angle: 0.5, 
                width: 110, 
                length: 280,
                name: 'West Bridge'
            },
            {
                x: 2000, y: 600,
                angle: 0.2,
                width: 100,
                length: 350,
                name: 'Central Bridge'
            }
        ];
    },
    
    // Generate main streets and roads
    generateStreets() {
        // Streets are already defined in game.js roads, but we can enhance rendering here
        // This is mainly for reference
        gameState.streets = [
            { name: 'Main Street', x: 0, y: 350, width: CONFIG.WORLD_WIDTH, height: 150 },
            { name: 'Tech Avenue', x: 600, y: 0, width: 150, height: CONFIG.WORLD_HEIGHT },
            { name: 'Market Road', x: 1500, y: 0, width: 150, height: CONFIG.WORLD_HEIGHT },
            { name: 'Harbor Lane', x: 0, y: 1000, width: CONFIG.WORLD_WIDTH, height: 150 },
            { name: 'Riverside Road', x: 0, y: 1800, width: CONFIG.WORLD_WIDTH, height: 150 }
        ];
    },
    
    // Generate parks throughout the map
    generateParks() {
        const parkLocations = [
            { x: 800, y: 300, width: 300, height: 280, name: 'Central Park' },
            { x: 2200, y: 700, width: 350, height: 300, name: 'Forest Park' },
            { x: 500, y: 2000, width: 280, height: 250, name: 'Riverside Park' },
            { x: 1900, y: 2100, width: 320, height: 280, name: 'Community Park' },
            { x: 2600, y: 2300, width: 300, height: 300, name: 'Mountain View Park' }
        ];
        
        parkLocations.forEach(park => {
            this.parks.push(park);
            // Add benches, paths, and trees to parks
            const benchCount = Math.floor(park.width * park.height / 15000);
            for (let i = 0; i < benchCount; i++) {
                this.parks.push({
                    type: 'bench',
                    x: park.x + Math.random() * park.width,
                    y: park.y + Math.random() * park.height,
                    parentPark: park.name
                });
            }
        });
    },
    
    // Generate farms and agricultural areas
    generateFarms() {
        const farmLocations = [
            { x: 100, y: 1000, width: 350, height: 400, name: 'North Farm', crops: 'wheat' },
            { x: 2800, y: 500, width: 300, height: 350, name: 'East Farm', crops: 'corn' },
            { x: 1100, y: 2500, width: 400, height: 300, name: 'South Farm', crops: 'vegetables' },
            { x: 2200, y: 2200, width: 350, height: 380, name: 'Valley Farm', crops: 'mixed' }
        ];
        
        farmLocations.forEach(farm => {
            this.farms.push(farm);
            // Add crop rows
            const rowCount = Math.floor(farm.height / 40);
            for (let i = 0; i < rowCount; i++) {
                this.farms.push({
                    type: 'crop-row',
                    x: farm.x,
                    y: farm.y + i * 40,
                    width: farm.width,
                    parentFarm: farm.name,
                    crops: farm.crops
                });
            }
        });
    },
    
    // Generate animals scattered around farms and parks
    generateAnimals() {
        const animalTypes = ['cow', 'sheep', 'horse', 'chicken', 'duck', 'goat'];
        const farmAndParkAreas = [
            { x: 100, y: 1000, width: 350, height: 400 },
            { x: 2800, y: 500, width: 300, height: 350 },
            { x: 1100, y: 2500, width: 400, height: 300 },
            { x: 800, y: 300, width: 300, height: 280 },
            { x: 2200, y: 700, width: 350, height: 300 }
        ];
        
        farmAndParkAreas.forEach(area => {
            const animalCount = Math.floor((area.width * area.height) / 50000);
            for (let i = 0; i < animalCount; i++) {
                this.animals.push({
                    x: area.x + Math.random() * area.width,
                    y: area.y + Math.random() * area.height,
                    type: animalTypes[Math.floor(Math.random() * animalTypes.length)],
                    size: 8 + Math.random() * 8,
                    angle: Math.random() * Math.PI * 2
                });
            }
        });
    },
    
    // Generate shops scattered around cities
    generateShops() {
        const shopTypes = ['bakery', 'clothing', 'electronics', 'bookstore', 'pharmacy', 'cafe', 'flower', 'toy'];
        const cityAreas = [
            { x: 1100, y: 900, width: 800, height: 700 },  // Downtown
            { x: 2200, y: 1700, width: 600, height: 550 }, // Tech Park
            { x: 300, y: 1400, width: 650, height: 450 },  // Industrial
            { x: 1500, y: 2200, width: 700, height: 600 }  // Residential
        ];
        
        cityAreas.forEach(area => {
            const shopCount = Math.floor((area.width * area.height) / 80000);
            for (let i = 0; i < shopCount; i++) {
                this.shops.push({
                    x: area.x + Math.random() * area.width,
                    y: area.y + Math.random() * area.height,
                    width: 40 + Math.random() * 30,
                    height: 35 + Math.random() * 25,
                    type: shopTypes[Math.floor(Math.random() * shopTypes.length)],
                    color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][Math.floor(Math.random() * 5)]
                });
            }
        });
    },
    
    // Generate markets in various locations
    generateMarkets() {
        const marketLocations = [
            { x: 1300, y: 1500, width: 200, height: 180, name: 'Central Market', stalls: 12 },
            { x: 2100, y: 2000, width: 180, height: 160, name: 'East Market', stalls: 8 },
            { x: 600, y: 1700, width: 200, height: 170, name: 'West Market', stalls: 10 },
            { x: 1700, y: 400, width: 180, height: 150, name: 'North Market', stalls: 7 }
        ];
        
        marketLocations.forEach(market => {
            this.markets.push(market);
            // Add market stalls
            const stallsPerRow = Math.ceil(Math.sqrt(market.stalls));
            for (let i = 0; i < market.stalls; i++) {
                const row = Math.floor(i / stallsPerRow);
                const col = i % stallsPerRow;
                this.markets.push({
                    type: 'stall',
                    x: market.x + col * (market.width / stallsPerRow),
                    y: market.y + row * (market.height / Math.ceil(market.stalls / stallsPerRow)),
                    width: (market.width / stallsPerRow) - 5,
                    height: (market.height / Math.ceil(market.stalls / stallsPerRow)) - 5,
                    parentMarket: market.name
                });
            }
        });
    },
    
    // Generate small streets and alleyways for variety
    generateSmallStreets() {
        const smallStreetPaths = [
            { x1: 800, y1: 500, x2: 1100, y2: 700, name: 'Park Lane', width: 40 },
            { x1: 1400, y1: 1200, x2: 1600, y2: 1500, name: 'Market Street', width: 45 },
            { x1: 2300, y1: 1000, x2: 2500, y2: 1300, name: 'Tech Road', width: 50 },
            { x1: 600, y1: 2000, x2: 900, y2: 2300, name: 'Farm Road', width: 45 },
            { x1: 1700, y1: 2400, x2: 2000, y2: 2600, name: 'Country Lane', width: 40 },
            { x1: 300, y1: 600, x2: 500, y2: 900, name: 'Forest Path', width: 35 },
            { x1: 2600, y1: 1600, x2: 2800, y2: 1900, name: 'Valley Road', width: 45 },
            { x1: 1100, y1: 400, x2: 1400, y2: 600, name: 'Scenic Drive', width: 50 }
        ];
        
        smallStreetPaths.forEach(street => {
            this.smallStreets.push(street);
        });
    },
    
    // Render map on canvas
    render(ctx, camera) {
        // Draw water bodies
        this.renderWater(ctx, camera);
        
        // Draw mountains
        this.renderMountains(ctx, camera);
        
        // Draw forests
        this.renderForests(ctx, camera);
        
        // Draw farms
        this.renderFarms(ctx, camera);
        
        // Draw animals
        this.renderAnimals(ctx, camera);
        
        // Draw parks
        this.renderParks(ctx, camera);
        
        // Draw cities
        this.renderCities(ctx, camera);
        
        // Draw shops
        this.renderShops(ctx, camera);
        
        // Draw markets
        this.renderMarkets(ctx, camera);
        
        // Draw bridges
        this.renderBridges(ctx, camera);
        
        // Draw small streets
        this.renderSmallStreets(ctx, camera);
        
        // Draw streets grid
        this.renderStreetGrid(ctx, camera);
    },
    
    // Render water features
    renderWater(ctx, camera) {
        ctx.fillStyle = '#4DA6FF';
        ctx.globalAlpha = 0.6;
        
        this.water.forEach(water => {
            if (water.type === 'lake') {
                const screenX = water.x - camera.x;
                const screenY = water.y - camera.y;
                
                if (screenX + water.width > 0 && screenX < window.innerWidth &&
                    screenY + water.height > 0 && screenY < window.innerHeight) {
                    ctx.fillRect(screenX, screenY, water.width, water.height);
                    // Add waves
                    ctx.strokeStyle = '#2E7CB8';
                    ctx.lineWidth = 2;
                    for (let i = 0; i < 3; i++) {
                        ctx.beginPath();
                        ctx.arc(screenX + water.width / 2, screenY + water.height / 2 + i * 40, 50, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            } else if (water.type === 'river' && water.x1) {
                const screenX1 = water.x1 - camera.x;
                const screenY1 = water.y1 - camera.y;
                const screenX2 = water.x2 - camera.x;
                const screenY2 = water.y2 - camera.y;
                
                ctx.strokeStyle = water.color;
                ctx.lineWidth = water.width;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(screenX1, screenY1);
                ctx.lineTo(screenX2, screenY2);
                ctx.stroke();
            }
        });
        
        ctx.globalAlpha = 1.0;
    },
    
    // Render mountains
    renderMountains(ctx, camera) {
        this.mountains.forEach(mountain => {
            const screenX = mountain.x - camera.x;
            const screenY = mountain.y - camera.y;
            
            if (screenX + mountain.width > -100 && screenX < window.innerWidth + 100 &&
                screenY + mountain.height > -100 && screenY < window.innerHeight + 100) {
                
                // Draw mountain shadow/base
                ctx.fillStyle = mountain.color;
                ctx.beginPath();
                ctx.moveTo(screenX, screenY + mountain.height);
                ctx.lineTo(screenX + mountain.width / 2, screenY + mountain.height - mountain.peakHeight);
                ctx.lineTo(screenX + mountain.width, screenY + mountain.height);
                ctx.closePath();
                ctx.fill();
                
                // Add outline
                ctx.strokeStyle = '#1a1a2e';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Add snow cap
                ctx.fillStyle = '#FFFFFF';
                ctx.globalAlpha = 0.7;
                ctx.beginPath();
                ctx.moveTo(screenX + mountain.width / 2, screenY + mountain.height - mountain.peakHeight);
                ctx.lineTo(screenX + mountain.width / 2 - 20, screenY + mountain.height - mountain.peakHeight + 30);
                ctx.lineTo(screenX + mountain.width / 2 + 20, screenY + mountain.height - mountain.peakHeight + 30);
                ctx.closePath();
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        });
    },
    
    // Render forests
    renderForests(ctx, camera) {
        ctx.fillStyle = '#228B22';
        this.forests.forEach(tree => {
            const screenX = tree.x - camera.x;
            const screenY = tree.y - camera.y;
            
            if (screenX > -50 && screenX < window.innerWidth + 50 &&
                screenY > -50 && screenY < window.innerHeight + 50) {
                
                // Draw tree
                const treeSize = tree.size;
                ctx.beginPath();
                ctx.moveTo(screenX, screenY - treeSize);
                ctx.lineTo(screenX - treeSize / 2, screenY + treeSize / 2);
                ctx.lineTo(screenX + treeSize / 2, screenY + treeSize / 2);
                ctx.closePath();
                ctx.fill();
                
                // Tree trunk
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(screenX - treeSize / 8, screenY + treeSize / 2, treeSize / 4, treeSize / 2);
                ctx.fillStyle = '#228B22';
            }
        });
    },
    
    // Render cities
    renderCities(ctx, camera) {
        this.cities.forEach(city => {
            // Draw city boundary
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(city.x - camera.x, city.y - camera.y, city.width, city.height);
            ctx.setLineDash([]);
            
            // Draw buildings
            city.buildings.forEach(building => {
                const screenX = building.x - camera.x;
                const screenY = building.y - camera.y;
                
                if (screenX + building.width > 0 && screenX < window.innerWidth &&
                    screenY + building.height > 0 && screenY < window.innerHeight) {
                    
                    ctx.fillStyle = building.color;
                    ctx.fillRect(screenX, screenY, building.width, building.height);
                    
                    // Windows
                    ctx.fillStyle = '#FFFF00';
                    for (let i = 0; i < Math.floor(building.width / 20); i++) {
                        for (let j = 0; j < Math.floor(building.height / 25); j++) {
                            ctx.fillRect(screenX + i * 20 + 5, screenY + j * 25 + 5, 8, 8);
                        }
                    }
                    
                    // Outline
                    ctx.strokeStyle = '#222';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(screenX, screenY, building.width, building.height);
                }
            });
            
            // City name label
            const labelX = city.x + city.width / 2 - camera.x;
            const labelY = city.y - 20 - camera.y;
            if (labelX > 0 && labelX < window.innerWidth && labelY > 0 && labelY < window.innerHeight) {
                ctx.fillStyle = '#333';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(city.name, labelX, labelY);
            }
        });
    },
    
    // Render bridges
    renderBridges(ctx, camera) {
        this.bridges.forEach(bridge => {
            const screenX = bridge.x - camera.x;
            const screenY = bridge.y - camera.y;
            
            if (screenX > -300 && screenX < window.innerWidth + 300 &&
                screenY > -300 && screenY < window.innerHeight + 300) {
                
                ctx.save();
                ctx.translate(screenX, screenY);
                ctx.rotate(bridge.angle);
                
                // Bridge main structure
                ctx.fillStyle = '#A0522D';
                ctx.fillRect(-bridge.width / 2, -10, bridge.length, bridge.width);
                
                // Bridge railings
                ctx.strokeStyle = '#654321';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-bridge.width / 2, -8);
                ctx.lineTo(bridge.length - bridge.width / 2, -8);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(-bridge.width / 2, bridge.width - 2);
                ctx.lineTo(bridge.length - bridge.width / 2, bridge.width - 2);
                ctx.stroke();
                
                // Support pillars
                for (let i = 0; i < bridge.length; i += 50) {
                    ctx.fillStyle = '#8B4513';
                    ctx.fillRect(i - bridge.width / 2 - 5, 0, 10, 20);
                }
                
                // Bridge name
                ctx.fillStyle = '#000';
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(bridge.name, bridge.length / 2, -20);
                
                ctx.restore();
            }
        });
    },
    
    // Render parks with grass, benches, and paths
    renderParks(ctx, camera) {
        this.parks.forEach(park => {
            if (!park.type) {  // Only render park boundaries, not benches
                const screenX = park.x - camera.x;
                const screenY = park.y - camera.y;
                
                if (screenX + park.width > 0 && screenX < window.innerWidth &&
                    screenY + park.height > 0 && screenY < window.innerHeight) {
                    
                    // Park grass area
                    ctx.fillStyle = '#90EE90';
                    ctx.fillRect(screenX, screenY, park.width, park.height);
                    
                    // Park border
                    ctx.strokeStyle = '#228B22';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(screenX, screenY, park.width, park.height);
                    
                    // Park name
                    ctx.fillStyle = '#228B22';
                    ctx.font = 'bold 12px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(park.name, screenX + park.width / 2, screenY + 20);
                    
                    // Add pathways
                    ctx.strokeStyle = 'rgba(200, 180, 120, 0.5)';
                    ctx.lineWidth = 8;
                    ctx.beginPath();
                    ctx.moveTo(screenX + 10, screenY + park.height / 2);
                    ctx.lineTo(screenX + park.width - 10, screenY + park.height / 2);
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.moveTo(screenX + park.width / 2, screenY + 10);
                    ctx.lineTo(screenX + park.width / 2, screenY + park.height - 10);
                    ctx.stroke();
                    
                    // Benches
                    this.parks.forEach(bench => {
                        if (bench.type === 'bench' && bench.parentPark === park.name) {
                            const benchX = bench.x - camera.x;
                            const benchY = bench.y - camera.y;
                            ctx.fillStyle = '#8B4513';
                            ctx.fillRect(benchX - 8, benchY - 3, 16, 6);
                        }
                    });
                }
            }
        });
    },
    
    // Render farms with crop rows
    renderFarms(ctx, camera) {
        this.farms.forEach(farm => {
            if (!farm.type) {  // Only render farm boundaries, not crop rows
                const screenX = farm.x - camera.x;
                const screenY = farm.y - camera.y;
                
                if (screenX + farm.width > 0 && screenX < window.innerWidth &&
                    screenY + farm.height > 0 && screenY < window.innerHeight) {
                    
                    // Farm land color based on crops
                    const cropColors = {
                        'wheat': '#D2B48C',
                        'corn': '#FFD700',
                        'vegetables': '#8FBC8F',
                        'mixed': '#DAA520'
                    };
                    ctx.fillStyle = cropColors[farm.crops] || '#D2B48C';
                    ctx.fillRect(screenX, screenY, farm.width, farm.height);
                    
                    // Farm border
                    ctx.strokeStyle = '#8B4513';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(screenX, screenY, farm.width, farm.height);
                    
                    // Farm name
                    ctx.fillStyle = '#654321';
                    ctx.font = 'bold 12px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(farm.name, screenX + farm.width / 2, screenY + 20);
                    
                    // Crop rows
                    this.farms.forEach(row => {
                        if (row.type === 'crop-row' && row.parentFarm === farm.name) {
                            const rowY = row.y - camera.y;
                            ctx.strokeStyle = 'rgba(101, 67, 33, 0.6)';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(screenX, rowY);
                            ctx.lineTo(screenX + row.width, rowY);
                            ctx.stroke();
                        }
                    });
                }
            }
        });
    },
    
    // Render animals with simple shapes
    renderAnimals(ctx, camera) {
        this.animals.forEach(animal => {
            const screenX = animal.x - camera.x;
            const screenY = animal.y - camera.y;
            
            if (screenX > -20 && screenX < window.innerWidth + 20 &&
                screenY > -20 && screenY < window.innerHeight + 20) {
                
                // Draw different animal types
                switch(animal.type) {
                    case 'cow':
                        ctx.fillStyle = '#8B4513';
                        ctx.fillRect(screenX - animal.size / 2, screenY - animal.size / 3, animal.size, animal.size / 2);
                        ctx.fillStyle = '#654321';
                        ctx.beginPath();
                        ctx.arc(screenX, screenY - animal.size / 3, animal.size / 3, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case 'sheep':
                        ctx.fillStyle = '#F5F5DC';
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, animal.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case 'horse':
                        ctx.fillStyle = '#CD853F';
                        ctx.fillRect(screenX - animal.size / 2, screenY - animal.size / 4, animal.size, animal.size / 2);
                        break;
                    case 'chicken':
                        ctx.fillStyle = '#FFB347';
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, animal.size / 3, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case 'duck':
                        ctx.fillStyle = '#FFA500';
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, animal.size / 3, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case 'goat':
                        ctx.fillStyle = '#A9A9A9';
                        ctx.fillRect(screenX - animal.size / 2, screenY - animal.size / 3, animal.size, animal.size / 2);
                        break;
                }
            }
        });
    },
    
    // Render shops
    renderShops(ctx, camera) {
        this.shops.forEach(shop => {
            const screenX = shop.x - camera.x;
            const screenY = shop.y - camera.y;
            
            if (screenX + shop.width > 0 && screenX < window.innerWidth &&
                screenY + shop.height > 0 && screenY < window.innerHeight) {
                
                // Shop building
                ctx.fillStyle = shop.color;
                ctx.fillRect(screenX, screenY, shop.width, shop.height);
                
                // Shop window
                ctx.fillStyle = '#87CEEB';
                ctx.fillRect(screenX + 2, screenY + 2, shop.width - 4, shop.height / 2 - 2);
                
                // Shop door
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(screenX + shop.width / 2 - 3, screenY + shop.height / 2, 6, shop.height / 2);
                
                // Border
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1;
                ctx.strokeRect(screenX, screenY, shop.width, shop.height);
            }
        });
    },
    
    // Render markets
    renderMarkets(ctx, camera) {
        this.markets.forEach(market => {
            if (!market.type) {  // Only render market boundaries, not stalls
                const screenX = market.x - camera.x;
                const screenY = market.y - camera.y;
                
                if (screenX + market.width > 0 && screenX < window.innerWidth &&
                    screenY + market.height > 0 && screenY < window.innerHeight) {
                    
                    // Market area background
                    ctx.fillStyle = '#FFE4B5';
                    ctx.fillRect(screenX, screenY, market.width, market.height);
                    
                    // Market border
                    ctx.strokeStyle = '#FF8C00';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(screenX, screenY, market.width, market.height);
                    
                    // Market stalls
                    this.markets.forEach(stall => {
                        if (stall.type === 'stall' && stall.parentMarket === market.name) {
                            const stallX = stall.x - camera.x;
                            const stallY = stall.y - camera.y;
                            
                            // Stall tent
                            ctx.fillStyle = ['#FF6B6B', '#4ECDC4', '#FFD93D'][Math.floor(Math.random() * 3)];
                            ctx.fillRect(stallX, stallY, stall.width, stall.height);
                            
                            // Stall border
                            ctx.strokeStyle = '#333';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(stallX, stallY, stall.width, stall.height);
                        }
                    });
                    
                    // Market name
                    ctx.fillStyle = '#FF8C00';
                    ctx.font = 'bold 11px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(market.name, screenX + market.width / 2, screenY + market.height + 12);
                }
            }
        });
    },
    
    // Render small streets and alleyways
    renderSmallStreets(ctx, camera) {
        ctx.strokeStyle = 'rgba(150, 150, 150, 0.4)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        
        this.smallStreets.forEach(street => {
            const screenX1 = street.x1 - camera.x;
            const screenY1 = street.y1 - camera.y;
            const screenX2 = street.x2 - camera.x;
            const screenY2 = street.y2 - camera.y;
            
            // Draw street line
            ctx.beginPath();
            ctx.moveTo(screenX1, screenY1);
            ctx.lineTo(screenX2, screenY2);
            ctx.stroke();
            
            // Draw street name at midpoint
            if (screenX1 > -100 && screenX1 < window.innerWidth + 100 &&
                screenY1 > -100 && screenY1 < window.innerHeight + 100) {
                
                const midX = (screenX1 + screenX2) / 2;
                const midY = (screenY1 + screenY2) / 2;
                
                ctx.fillStyle = '#666';
                ctx.font = '9px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(street.name, midX, midY - 5);
            }
        });
    },
    
    // Render street grid
    renderStreetGrid(ctx, camera) {
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
        ctx.lineWidth = 1;
        
        const gridSize = 100;
        const startX = Math.floor(camera.x / gridSize) * gridSize;
        const startY = Math.floor(camera.y / gridSize) * gridSize;
        
        for (let x = startX; x < camera.x + window.innerWidth; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x - camera.x, -camera.y);
            ctx.lineTo(x - camera.x, window.innerHeight - camera.y);
            ctx.stroke();
        }
        
        for (let y = startY; y < camera.y + window.innerHeight; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(-camera.x, y - camera.y);
            ctx.lineTo(window.innerWidth - camera.x, y - camera.y);
            ctx.stroke();
        }
    }

};
