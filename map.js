// Map System - Creates dynamic world with mountains, forests, cities, bridges, and streets

const MAP = {
    // Map features
    mountains: [],
    forests: [],
    cities: [],
    bridges: [],
    water: [],
    
    // Initialize the entire map
    init() {
        this.generateMountains();
        this.generateForests();
        this.generateCities();
        this.generateWater();
        this.generateBridges();
        this.generateStreets();
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
    
    // Render map on canvas
    render(ctx, camera) {
        // Draw water bodies
        this.renderWater(ctx, camera);
        
        // Draw mountains
        this.renderMountains(ctx, camera);
        
        // Draw forests
        this.renderForests(ctx, camera);
        
        // Draw cities
        this.renderCities(ctx, camera);
        
        // Draw bridges
        this.renderBridges(ctx, camera);
        
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
