// Main Game Object
const game = {
    canvas: null,
    ctx: null,
    
    init() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Initialize UI
        UI.init();
        
        // Input handlers
        this.setupInput();
        
        // Window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    },
    
    start() {
        document.getElementById('titleScreen').classList.add('hidden');
        
        // Initialize map system
        MAP.init();
        
        this.initWorld();
        this.loadMission(generateRandomMission());
        
        UI.createRickshaw();
        UI.createHUD();
        UI.createMissionIndicator();
        UI.createDayNightIndicator();
        UI.createMamuPortrait();
        UI.createControls();
        
        // Start background music
        this.playBackgroundMusic();
        
        gameState.isRunning = true;
        gameState.gameStartTime = Date.now();
        
        // Spawn enemies periodically
        this.startEnemySpawning();
        
        this.gameLoop();
        
        setTimeout(() => {
            UI.showDialogue("Mamu Butt", "Bismillah! 🧔 Naya din shuru ho gaya. Allah ki rehmat se kamaayi karni hai!");
            setTimeout(() => UI.closeDialogue(), 3000);
        }, 1000);
    },
    
    playBackgroundMusic() {
        const audio = document.getElementById('backgroundMusic');
        if (audio) {
            audio.volume = 0.3;
            audio.loop = true;
            audio.autoplay = true;
            
            // Start playing
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => console.log('Audio autoplay blocked:', err));
            }
            
            // Monitor audio and restart if it stops
            const audioMonitor = setInterval(() => {
                if (gameState.isRunning && audio.paused && !audio.ended) {
                    audio.play().catch(err => console.log('Audio restart blocked:', err));
                }
                // Restart if it ended
                if (gameState.isRunning && audio.ended) {
                    audio.currentTime = 0;
                    audio.play().catch(err => console.log('Audio restart blocked:', err));
                }
            }, 1000);
            
            // Store interval ID for cleanup
            gameState.audioMonitorInterval = audioMonitor;
            
            // Ensure loop attribute is set
            audio.addEventListener('ended', function() {
                if (gameState.isRunning) {
                    audio.currentTime = 0;
                    audio.play().catch(err => console.log('Audio loop restart blocked:', err));
                }
            }, false);
        }
    },
    
    stopBackgroundMusic() {
        const audio = document.getElementById('backgroundMusic');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        // Stop audio monitor
        if (gameState.audioMonitorInterval) {
            clearInterval(gameState.audioMonitorInterval);
        }
    },
    
    initWorld() {
        // Create roads
        gameState.roads = [
            { x: 0, y: 350, width: CONFIG.WORLD_WIDTH, height: 150 },
            { x: 600, y: 0, width: 150, height: CONFIG.WORLD_HEIGHT },
            { x: 1500, y: 0, width: 150, height: CONFIG.WORLD_HEIGHT },
            { x: 0, y: 1000, width: CONFIG.WORLD_WIDTH, height: 150 },
            { x: 0, y: 1800, width: CONFIG.WORLD_WIDTH, height: 150 }
        ];
        
        // Create mini roads within blocks
        gameState.miniRoads = [];
        this.generateMiniRoads();
        
        // Create buildings
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * CONFIG.WORLD_WIDTH;
            const y = Math.random() * CONFIG.WORLD_HEIGHT;
            
            const onRoad = gameState.roads.some(road => 
                x >= road.x - 50 && x <= road.x + road.width + 50 &&
                y >= road.y - 50 && y <= road.y + road.height + 50
            );
            
            const onMiniRoad = gameState.miniRoads.some(road =>
                x >= road.x - 30 && x <= road.x + road.width + 30 &&
                y >= road.y - 30 && y <= road.y + road.height + 30
            );
            
            if (!onRoad && !onMiniRoad) {
                gameState.buildings.push({
                    x, y,
                    width: 80 + Math.random() * 60,
                    height: 100 + Math.random() * 100,
                    isSchool: false
                });
            }
        }
        
        // Add schools
        gameState.buildings.push(
            { x: 1200, y: 300, width: 200, height: 150, isSchool: true, name: "Government School" },
            { x: 2200, y: 1200, width: 200, height: 150, isSchool: true, name: "City College" }
        );
        
        // Create trees
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * CONFIG.WORLD_WIDTH;
            const y = Math.random() * CONFIG.WORLD_HEIGHT;
            
            const onRoad = gameState.roads.some(road => 
                x >= road.x - 30 && x <= road.x + road.width + 30 &&
                y >= road.y - 30 && y <= road.y + road.height + 30
            );
            
            if (!onRoad) {
                gameState.trees.push({ x, y });
            }
        }
        
        // Add ambient NPCs (children and people)
        const npcEmojis = ['👦', '👧', '🧒', '👶', '🚶', '🚶‍♀️', '👨', '👩', '🧓', '👵', '👨‍🦱', '👩‍🦰'];
        
        for (let i = 0; i < 40; i++) {
            const x = 100 + Math.random() * (CONFIG.WORLD_WIDTH - 200);
            const y = 100 + Math.random() * (CONFIG.WORLD_HEIGHT - 200);
            
            const onRoad = gameState.roads.some(road => 
                x >= road.x && x <= road.x + road.width &&
                y >= road.y && y <= road.y + road.height
            );
            
            if (!onRoad) {
                const npc = {
                    emoji: npcEmojis[Math.floor(Math.random() * npcEmojis.length)],
                    x, y,
                    element: null
                };
                
                npc.element = UI.createAmbientNPC(npc);
                gameState.ambientNPCs.push(npc);
            }
        }
        
        // Create vehicles on roads
        this.generateVehicles();
        
        // Initialize enemy system
        gameState.enemies = [];
        gameState.projectiles = [];
        gameState.enemySpawnInterval = null;
        this.generateEnemies();
    },
    
    startEnemySpawning() {
        // Spawn new enemies every 8-12 seconds
        gameState.enemySpawnInterval = setInterval(() => {
            if (gameState.isRunning && gameState.enemies.length < 12) {
                this.spawnNewEnemy();
            }
        }, 8000 + Math.random() * 4000);
    },
    
    spawnNewEnemy() {
        const road = gameState.roads[Math.floor(Math.random() * gameState.roads.length)];
        const enemyTypes = ['police', 'sumo', 'mustache'];
        const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        
        let x, y;
        if (road.width > road.height) {
            // Horizontal road
            x = road.x + Math.random() * road.width;
            y = road.y + Math.random() * road.height;
        } else {
            // Vertical road
            x = road.x + Math.random() * road.width;
            y = road.y + Math.random() * road.height;
        }
        
        gameState.enemies.push({
            x: x,
            y: y,
            width: 40,
            height: 40,
            speed: 1.5 + Math.random() * 1,
            health: 100,
            targetX: x,
            targetY: y,
            type: type
        });
    },
    
    generateEnemies() {
        // Spawn initial 3-5 enemies on various roads
        const enemyCount = 3 + Math.floor(Math.random() * 3);
        const enemyTypes = ['police', 'sumo', 'mustache'];
        
        for (let i = 0; i < enemyCount; i++) {
            const road = gameState.roads[Math.floor(Math.random() * gameState.roads.length)];
            const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
            
            let x, y;
            if (road.width > road.height) {
                // Horizontal road
                x = road.x + Math.random() * road.width;
                y = road.y + Math.random() * road.height;
            } else {
                // Vertical road
                x = road.x + Math.random() * road.width;
                y = road.y + Math.random() * road.height;
            }
            
            gameState.enemies.push({
                x: x,
                y: y,
                width: 40,
                height: 40,
                speed: 1.5 + Math.random() * 1,
                health: 100,
                targetX: x,
                targetY: y,
                type: type
            });
        }
    },
    
    generateMiniRoads() {
        // Define blocks between main roads
        const blocks = [
            // Top-left block
            { minX: 0, maxX: 600, minY: 0, maxY: 350 },
            // Top-middle-left block
            { minX: 600, maxX: 1500, minY: 0, maxY: 350 },
            // Top-right block
            { minX: 1500, maxX: CONFIG.WORLD_WIDTH, minY: 0, maxY: 350 },
            // Middle-left block
            { minX: 0, maxX: 600, minY: 350, maxY: 1000 },
            // Middle-middle-left block
            { minX: 600, maxX: 1500, minY: 350, maxY: 1000 },
            // Middle-right block
            { minX: 1500, maxX: CONFIG.WORLD_WIDTH, minY: 350, maxY: 1000 },
            // Lower-middle-left block
            { minX: 0, maxX: 600, minY: 1000, maxY: 1800 },
            // Lower-middle-middle block
            { minX: 600, maxX: 1500, minY: 1000, maxY: 1800 },
            // Lower-middle-right block
            { minX: 1500, maxX: CONFIG.WORLD_WIDTH, minY: 1000, maxY: 1800 },
            // Bottom-left block
            { minX: 0, maxX: 600, minY: 1800, maxY: CONFIG.WORLD_HEIGHT },
            // Bottom-middle block
            { minX: 600, maxX: 1500, minY: 1800, maxY: CONFIG.WORLD_HEIGHT },
            // Bottom-right block
            { minX: 1500, maxX: CONFIG.WORLD_WIDTH, minY: 1800, maxY: CONFIG.WORLD_HEIGHT }
        ];
        
        // Generate mini roads within each block
        blocks.forEach(block => {
            const blockWidth = block.maxX - block.minX;
            const blockHeight = block.maxY - block.minY;
            
            // Create 2-3 vertical mini roads per block
            const verticalRoads = Math.floor(blockWidth / 350) + 1;
            for (let i = 1; i < verticalRoads; i++) {
                const x = block.minX + (i * blockWidth / verticalRoads);
                gameState.miniRoads.push({
                    x: x,
                    y: block.minY,
                    width: 70,
                    height: blockHeight,
                    isVertical: true
                });
            }
            
            // Create 1-2 horizontal mini roads per block
            const horizontalRoads = Math.floor(blockHeight / 400) + 1;
            for (let i = 1; i < horizontalRoads; i++) {
                const y = block.minY + (i * blockHeight / horizontalRoads);
                gameState.miniRoads.push({
                    x: block.minX,
                    y: y,
                    width: blockWidth,
                    height: 70,
                    isVertical: false
                });
            }
        });
    },
    
    generateVehicles() {
        const vehicleTypes = [
            { emoji: '🚗', name: 'Car', speed: 2 },
            { emoji: '🚙', name: 'SUV', speed: 1.8 },
            { emoji: '🚕', name: 'Taxi', speed: 2.2 },
            { emoji: '🚌', name: 'Bus', speed: 1.5 },
            { emoji: '🚎', name: 'Mini Bus', speed: 1.7 }
        ];
        
        // Generate vehicles for each road
        gameState.roads.forEach((road, roadIndex) => {
            const isHorizontal = road.width > road.height;
            const vehiclesPerRoad = 4;
            
            for (let i = 0; i < vehiclesPerRoad; i++) {
                const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
                
                if (isHorizontal) {
                    gameState.vehicles.push({
                        ...vehicleType,
                        x: road.x + Math.random() * road.width,
                        y: road.y + (road.height / 3) + (i % 2) * (road.height / 3),
                        direction: Math.random() > 0.5 ? 1 : -1,
                        roadIndex: roadIndex,
                        isHorizontal: true
                    });
                } else {
                    gameState.vehicles.push({
                        ...vehicleType,
                        x: road.x + (road.width / 3) + (i % 2) * (road.width / 3),
                        y: road.y + Math.random() * road.height,
                        direction: Math.random() > 0.5 ? 1 : -1,
                        roadIndex: roadIndex,
                        isHorizontal: false
                    });
                }
            }
        });
    },
    
    loadMission(mission) {
        gameState.currentMission = mission;
        gameState.passengers = mission.passengers.map(p => ({
            ...p,
            pickedUp: false,
            dropped: false,
            element: null
        }));
        
        // Create passenger elements
        gameState.passengers.forEach(passenger => {
            passenger.element = UI.createPassenger(passenger);
            // Debug log to verify passengers are created
            console.log(`Passenger created: ${passenger.name} at (${passenger.pickupX}, ${passenger.pickupY})`);
        });
        
        // Create destination marker
        UI.createDestinationMarker();
        
        UI.updateMissionIndicator();
        
        console.log(`Mission loaded with ${gameState.passengers.length} passengers`);
    },
    
    setupInput() {
        window.addEventListener('keydown', (e) => {
            gameState.keys[e.key] = true;
            
            if (e.key === 'Enter') {
                if (gameState.nearbyPassenger !== null) {
                    this.pickupPassenger(gameState.nearbyPassenger);
                } else if (gameState.nearDestination) {
                    this.dropPassengers();
                }
            }
            
            if ((e.key === 'm' || e.key === 'M') && gameState.missionComplete) {
                this.showMissionSelect();
            }
            
            if ((e.key === 'z' || e.key === 'Z')) {
                this.fireAtEnemies();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            gameState.keys[e.key] = false;
        });
    },
    
    handleInput() {
        if (gameState.keys['ArrowUp'] || gameState.keys['w']) {
            gameState.player.y -= gameState.player.speed;
            gameState.player.fuel = Math.max(0, gameState.player.fuel - 0.02);
        }
        if (gameState.keys['ArrowDown'] || gameState.keys['s']) {
            gameState.player.y += gameState.player.speed;
            gameState.player.fuel = Math.max(0, gameState.player.fuel - 0.02);
        }
        if (gameState.keys['ArrowLeft'] || gameState.keys['a']) {
            gameState.player.x -= gameState.player.speed;
            gameState.player.fuel = Math.max(0, gameState.player.fuel - 0.02);
        }
        if (gameState.keys['ArrowRight'] || gameState.keys['d']) {
            gameState.player.x += gameState.player.speed;
            gameState.player.fuel = Math.max(0, gameState.player.fuel - 0.02);
        }
        
        // Infinite world wrapping (no bounds)
        // Player can drive off edges and appear on the other side
    },
    
    fireAtEnemies() {
        // Find nearest enemy within range
        let nearestEnemy = null;
        let nearestDistance = 300;
        
        gameState.enemies.forEach(enemy => {
            const distance = Math.hypot(
                enemy.x - gameState.player.x,
                enemy.y - gameState.player.y
            );
            
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestEnemy = enemy;
            }
        });
        
        if (nearestEnemy) {
            // Create projectile towards enemy
            const angle = Math.atan2(nearestEnemy.y - gameState.player.y, nearestEnemy.x - gameState.player.x);
            
            gameState.projectiles.push({
                x: gameState.player.x,
                y: gameState.player.y,
                vx: Math.cos(angle) * 8,
                vy: Math.sin(angle) * 8,
                speed: 8,
                damage: 25
            });
        }
    },
    
    updateCamera() {
        gameState.camera.x = gameState.player.x - this.canvas.width / 2;
        gameState.camera.y = gameState.player.y - this.canvas.height / 2;
        
        gameState.camera.x = Math.max(0, Math.min(CONFIG.WORLD_WIDTH - this.canvas.width, gameState.camera.x));
        gameState.camera.y = Math.max(0, Math.min(CONFIG.WORLD_HEIGHT - this.canvas.height, gameState.camera.y));
    },
    
    checkNearbyPassengers() {
        gameState.nearbyPassenger = null;
        
        gameState.passengers.forEach((passenger, index) => {
            if (passenger.pickedUp || passenger.dropped) return;
            
            const distance = Math.hypot(
                gameState.player.x - passenger.pickupX,
                gameState.player.y - passenger.pickupY
            );
            
            if (distance < CONFIG.PICKUP_DISTANCE) {
                gameState.nearbyPassenger = index;
                const screenX = passenger.pickupX - gameState.camera.x;
                const screenY = passenger.pickupY - gameState.camera.y;
                UI.showActionPrompt('Press ENTER to pickup 👆', screenX, screenY);
            }
        });
        
        if (gameState.nearbyPassenger === null) {
            UI.removeActionPrompt();
        }
    },
    
    checkDestination() {
        if (gameState.missionComplete) return;
        
        const anyPickedUp = gameState.passengers.some(p => p.pickedUp);
        if (!anyPickedUp) {
            gameState.nearDestination = false;
            return;
        }
        
        const dest = gameState.currentMission.destination;
        const distance = Math.hypot(
            gameState.player.x - dest.x,
            gameState.player.y - dest.y
        );
        
        if (distance < CONFIG.DROP_DISTANCE) {
            gameState.nearDestination = true;
            const screenX = dest.x - gameState.camera.x;
            const screenY = dest.y - gameState.camera.y;
            if (gameState.nearbyPassenger === null) {
                UI.showActionPrompt('Press ENTER to drop passengers 🎯', screenX, screenY);
            }
        } else {
            gameState.nearDestination = false;
            if (gameState.nearbyPassenger === null) {
                UI.removeActionPrompt();
            }
        }
    },
    
    pickupPassenger(index) {
        const passenger = gameState.passengers[index];
        if (passenger.pickedUp) return;
        
        passenger.pickedUp = true;
        passenger.element.remove();
        UI.removeActionPrompt();
        
        UI.showDialogue(passenger.name, passenger.dialogue);
        setTimeout(() => {
            UI.closeDialogue();
            UI.updateMissionIndicator();
        }, 2500);
    },
    
    dropPassengers() {
        if (!gameState.nearDestination || gameState.missionComplete) return;
        
        gameState.missionComplete = true;
        gameState.missionCount++;
        
        const totalFare = gameState.currentMission.reward;
        gameState.player.money += totalFare;
        
        UI.showEarnings(totalFare, window.innerWidth / 2, window.innerHeight * 0.3);
        UI.removeActionPrompt();
        
        // Remove marker
        const marker = document.getElementById('destinationMarker');
        if (marker) marker.remove();
        
        // Clear passengers
        gameState.passengers.forEach(p => {
            if (p.element) p.element.remove();
        });
        
        UI.updateHUD();
        
        setTimeout(() => {
            UI.showNotification(
                '🎉 MISSION COMPLETE! 🎉',
                [
                    'Shabash Mamu Butt! Sab log pohonch gaye!',
                    `Earned: Rs. ${totalFare}`,
                    `Total Missions: ${gameState.missionCount}`
                ],
                [
                    { text: 'Next Ride', action: 'game.startNextMission()' },
                    { text: 'Choose Mission', action: 'game.showMissionSelect()' }
                ]
            );
        }, 1000);
    },
    
    startNextMission() {
        UI.closeNotification();
        const newMission = generateRandomMission();
        gameState.missionComplete = false;
        
        // Clear and respawn enemies for new mission
        gameState.enemies = [];
        this.generateEnemies();
        
        this.loadMission(newMission);
        
        UI.showDialogue("Mamu Butt", "Chalo, agla customer dhoondte hain! 🛺");
        setTimeout(() => UI.closeDialogue(), 2000);
    },
    
    showMissionSelect() {
        UI.closeNotification();
        
        gameState.availableMissions = [];
        for (let i = 0; i < 5; i++) {
            gameState.availableMissions.push(generateRandomMission());
        }
        
        UI.showMissionSelect();
    },
    
    selectMission(index) {
        UI.closeMissionSelect();
        
        const selectedMission = gameState.availableMissions[index];
        gameState.missionComplete = false;
        
        // Clear and respawn enemies for new mission
        gameState.enemies = [];
        this.generateEnemies();
        
        this.loadMission(selectedMission);
        
        UI.showDialogue("Mamu Butt", "Theek hai! Yeh ride lenge. Bismillah! 🚀");
        setTimeout(() => UI.closeDialogue(), 2000);
    },
    
    render() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        
        // Day/Night sky
        const hour = gameState.timeOfDay % 24;
        let skyGradient;
        
        if (hour >= 6 && hour < 8) {
            skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            skyGradient.addColorStop(0, '#FF6B35');
            skyGradient.addColorStop(0.5, '#F7931E');
            skyGradient.addColorStop(1, '#87CEEB');
        } else if (hour >= 8 && hour < 17) {
            skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            skyGradient.addColorStop(0, '#87CEEB');
            skyGradient.addColorStop(0.6, '#F0E68C');
            skyGradient.addColorStop(1, '#90EE90');
        } else if (hour >= 17 && hour < 19) {
            skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            skyGradient.addColorStop(0, '#FF6B6B');
            skyGradient.addColorStop(0.5, '#FFA500');
            skyGradient.addColorStop(1, '#4A148C');
        } else {
            skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            skyGradient.addColorStop(0, '#0D1B2A');
            skyGradient.addColorStop(0.5, '#1B263B');
            skyGradient.addColorStop(1, '#415A77');
        }
        
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(-gameState.camera.x, -gameState.camera.y);
        
        // Render map features (mountains, forests, cities, bridges, water)
        MAP.render(ctx, gameState.camera);
        
        // Roads
        ctx.fillStyle = '#696969';
        gameState.roads.forEach(road => {
            ctx.fillRect(road.x, road.y, road.width, road.height);
            
            ctx.fillStyle = '#FFF';
            if (road.height > road.width) {
                for (let i = 0; i < road.height; i += 80) {
                    ctx.fillRect(road.x + road.width / 2 - 5, road.y + i, 10, 40);
                }
            } else {
                for (let i = 0; i < road.width; i += 80) {
                    ctx.fillRect(road.x + i, road.y + road.height / 2 - 5, 40, 10);
                }
            }
            ctx.fillStyle = '#696969';
        });
        
        // Mini roads (neighborhood streets)
        ctx.fillStyle = '#808080';
        gameState.miniRoads.forEach(road => {
            ctx.fillRect(road.x, road.y, road.width, road.height);
            
            // Add road markings
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            if (road.isVertical) {
                for (let i = 0; i < road.height; i += 100) {
                    ctx.fillRect(road.x + road.width / 2 - 3, road.y + i, 6, 30);
                }
            } else {
                for (let i = 0; i < road.width; i += 100) {
                    ctx.fillRect(road.x + i, road.y + road.height / 2 - 3, 30, 6);
                }
            }
            ctx.fillStyle = '#808080';
        });
        
        // Render vehicles on roads
        gameState.vehicles.forEach(vehicle => {
            const screenX = vehicle.x - gameState.camera.x;
            const screenY = vehicle.y - gameState.camera.y;
            
            if (screenX > -50 && screenX < window.innerWidth + 50 &&
                screenY > -50 && screenY < window.innerHeight + 50) {
                
                ctx.font = 'bold 30px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Flip emoji based on direction
                if (vehicle.direction < 0) {
                    ctx.scale(-1, 1);
                    ctx.fillText(vehicle.emoji, -screenX, screenY);
                    ctx.scale(-1, 1);
                } else {
                    ctx.fillText(vehicle.emoji, screenX, screenY);
                }
            }
        });
        
        // Trees
        gameState.trees.forEach(tree => {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(tree.x - 7, tree.y + 20, 14, 30);
            
            ctx.fillStyle = '#228B22';
            ctx.beginPath();
            ctx.arc(tree.x, tree.y + 20, 30, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Buildings
        const isNight = hour < 6 || hour >= 19;
        gameState.buildings.forEach(building => {
            if (building.isSchool) {
                ctx.fillStyle = '#FF6B6B';
                ctx.fillRect(building.x, building.y, building.width, building.height);
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 3;
                ctx.strokeRect(building.x, building.y, building.width, building.height);
                
                ctx.fillStyle = '#FFF';
                ctx.font = 'bold 20px Arial';
                ctx.fillText('SCHOOL', building.x + 50, building.y + building.height / 2);
            } else {
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(building.x, building.y, building.width, building.height);
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.strokeRect(building.x, building.y, building.width, building.height);
                
                ctx.fillStyle = isNight ? '#FFFF00' : '#87CEEB';
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 4; j++) {
                        ctx.fillRect(building.x + 15 + i * 25, building.y + 15 + j * 25, 15, 15);
                    }
                }
            }
        });
        
        // Render enemies with different types
        gameState.enemies.forEach(enemy => {
            const screenX = enemy.x - gameState.camera.x;
            const screenY = enemy.y - gameState.camera.y;
            
            if (screenX > -50 && screenX < window.innerWidth + 50 &&
                screenY > -50 && screenY < window.innerHeight + 50) {
                
                // Draw different enemy types
                ctx.font = 'bold 40px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                if (enemy.type === 'police') {
                    ctx.fillText('👮', screenX, screenY);
                } else if (enemy.type === 'sumo') {
                    ctx.fillText('🤼', screenX, screenY);
                } else if (enemy.type === 'mustache') {
                    ctx.fillText('🧔', screenX, screenY);
                }
                
                // Health bar
                const healthBarWidth = 40;
                const healthPercent = enemy.health / 100;
                ctx.fillStyle = '#00AA00';
                ctx.fillRect(screenX - healthBarWidth / 2, screenY - 30, healthBarWidth * healthPercent, 6);
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.strokeRect(screenX - healthBarWidth / 2, screenY - 30, healthBarWidth, 6);
            }
        });
        
        // Render projectiles (yellow fire)
        gameState.projectiles.forEach(proj => {
            const screenX = proj.x - gameState.camera.x;
            const screenY = proj.y - gameState.camera.y;
            
            if (screenX > -50 && screenX < window.innerWidth + 50 &&
                screenY > -50 && screenY < window.innerHeight + 50) {
                
                // Yellow fire projectile
                ctx.fillStyle = '#FFFF00';
                ctx.beginPath();
                ctx.arc(screenX, screenY, 8, 0, Math.PI * 2);
                ctx.fill();
                
                // Fire glow
                ctx.strokeStyle = '#FFA500';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(screenX, screenY, 12, 0, Math.PI * 2);
                ctx.stroke();
            }
        });
        
        ctx.restore();
        
        // Draw navigation arrow pointing to destination
        this.drawNavigationArrow(ctx);
        
        // Update HTML elements
        const rickshaw = document.getElementById('playerRickshaw');
        if (rickshaw) {
            rickshaw.style.left = (gameState.player.x - gameState.camera.x - 50) + 'px';
            rickshaw.style.top = (gameState.player.y - gameState.camera.y - 35) + 'px';
        }
        
        gameState.passengers.forEach(p => {
            if (!p.pickedUp && p.element) {
                p.element.style.left = (p.pickupX - gameState.camera.x - 20) + 'px';
                p.element.style.top = (p.pickupY - gameState.camera.y - 20) + 'px';
            }
        });
        
        const marker = document.getElementById('destinationMarker');
        if (marker && gameState.currentMission) {
            marker.style.left = (gameState.currentMission.destination.x - gameState.camera.x - 20) + 'px';
            marker.style.top = (gameState.currentMission.destination.y - gameState.camera.y - 20) + 'px';
        }
        
        gameState.ambientNPCs.forEach(npc => {
            if (npc.element) {
                npc.element.style.left = (npc.x - gameState.camera.x - 20) + 'px';
                npc.element.style.top = (npc.y - gameState.camera.y - 20) + 'px';
            }
        });
    },
    
    update() {
        if (!gameState.isRunning) return;
        
        this.handleInput();
        this.updateCamera();
        this.updateVehicles();
        this.updateEnemies();
        this.updateProjectiles();
        this.wrapWorldCoordinates();
        
        gameState.timeOfDay += CONFIG.DAY_NIGHT_SPEED;
        if (gameState.timeOfDay >= 24) gameState.timeOfDay = 0;
        
        this.checkNearbyPassengers();
        this.checkDestination();
        
        UI.updateHUD();
        UI.updateDayNightIndicator();
    },
    
    updateEnemies() {
        gameState.enemies = gameState.enemies.filter(enemy => enemy.health > 0);
        
        gameState.enemies.forEach(enemy => {
            // Move towards player
            const distX = gameState.player.x - enemy.x;
            const distY = gameState.player.y - enemy.y;
            const distance = Math.hypot(distX, distY);
            
            if (distance > 50) {
                const angle = Math.atan2(distY, distX);
                enemy.x += Math.cos(angle) * enemy.speed;
                enemy.y += Math.sin(angle) * enemy.speed;
            }
        });
    },
    
    updateProjectiles() {
        // Move projectiles
        gameState.projectiles.forEach(proj => {
            proj.x += proj.vx;
            proj.y += proj.vy;
        });
        
        // Check collisions with enemies
        gameState.projectiles = gameState.projectiles.filter(proj => {
            let hitEnemy = false;
            
            gameState.enemies.forEach(enemy => {
                const distance = Math.hypot(proj.x - enemy.x, proj.y - enemy.y);
                if (distance < 30) {
                    enemy.health -= proj.damage;
                    hitEnemy = true;
                }
            });
            
            // Remove projectile if off screen or hit enemy
            if (hitEnemy) return false;
            if (proj.x < -100 || proj.x > CONFIG.WORLD_WIDTH + 100) return false;
            if (proj.y < -100 || proj.y > CONFIG.WORLD_HEIGHT + 100) return false;
            
            return true;
        });
    },
    
    updateVehicles() {
        gameState.vehicles.forEach(vehicle => {
            if (vehicle.isHorizontal) {
                vehicle.x += vehicle.direction * vehicle.speed;
                if (vehicle.x > CONFIG.WORLD_WIDTH + 100) vehicle.x = -100;
                if (vehicle.x < -100) vehicle.x = CONFIG.WORLD_WIDTH + 100;
            } else {
                vehicle.y += vehicle.direction * vehicle.speed;
                if (vehicle.y > CONFIG.WORLD_HEIGHT + 100) vehicle.y = -100;
                if (vehicle.y < -100) vehicle.y = CONFIG.WORLD_HEIGHT + 100;
            }
        });
    },
    
    wrapWorldCoordinates() {
        // Player wrapping
        if (gameState.player.x < 0) gameState.player.x = CONFIG.WORLD_WIDTH;
        if (gameState.player.x > CONFIG.WORLD_WIDTH) gameState.player.x = 0;
        if (gameState.player.y < 0) gameState.player.y = CONFIG.WORLD_HEIGHT;
        if (gameState.player.y > CONFIG.WORLD_HEIGHT) gameState.player.y = 0;
    },
    
    drawNavigationArrow(ctx) {
        if (!gameState.currentMission || gameState.missionComplete) return;
        
        // Show arrow as soon as ANY passenger is picked up
        const anyPickedUp = gameState.passengers.some(p => p.pickedUp);
        if (!anyPickedUp) return; // Only show arrow when at least one passenger is picked up
        
        const canvas = this.canvas;
        const destination = gameState.currentMission.destination;
        
        // Calculate direction to destination
        const dx = destination.x - gameState.player.x;
        const dy = destination.y - gameState.player.y;
        const distance = Math.hypot(dx, dy);
        
        if (distance === 0) return; // Already at destination
        
        // Normalize direction
        const dirX = dx / distance;
        const dirY = dy / distance;
        
        // Arrow position on screen (top-center, below HUD)
        const arrowX = canvas.width / 2;
        const arrowY = 100;
        const arrowSize = 40;
        
        // Draw arrow pointing direction
        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(Math.atan2(dirY, dirX));
        
        // Arrow head (triangle)
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(arrowSize, 0);
        ctx.lineTo(-arrowSize / 2, -arrowSize / 2);
        ctx.lineTo(-arrowSize / 2, arrowSize / 2);
        ctx.closePath();
        ctx.fill();
        
        // Arrow outline
        ctx.strokeStyle = '#FF8C00';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.restore();
        
        // Draw distance below arrow
        const distanceInMeters = Math.round(distance);
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`📍 ${distanceInMeters}m`, arrowX, arrowY + 70);
        
        // Draw destination name below distance
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#FFF';
        ctx.fillText(destination.name, arrowX, arrowY + 95);
    },
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
};

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    game.init();
});
