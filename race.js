// Racing Mode System
const raceMode = {
    isRacing: false,
    currentTrack: null,
    startTime: null,
    bestTimes: {
        track1: localStorage.getItem('race_track1_best') || null,
        track2: localStorage.getItem('race_track2_best') || null,
        track3: localStorage.getItem('race_track3_best') || null
    },
    
    tracks: {
        track1: {
            name: 'City Sprint',
            difficulty: 'Easy',
            startX: 300,
            startY: 300,
            finishX: 2700,
            finishY: 300,
            obstacles: [],
            cones: [],
            money: 500,
            traffic: 3
        },
        track2: {
            name: 'Mountain Slalom',
            difficulty: 'Medium',
            startX: 300,
            startY: 1500,
            finishX: 2700,
            finishY: 1500,
            obstacles: [],
            cones: [],
            money: 1000,
            traffic: 6
        },
        track3: {
            name: 'Chaos Canyon',
            difficulty: 'Hard',
            startX: 300,
            startY: 800,
            finishX: 2700,
            finishY: 2500,
            obstacles: [],
            cones: [],
            money: 2000,
            traffic: 10
        }
    },
    
    init() {
        this.generateTracks();
    },
    
    generateTracks() {
        // Track 1: City Sprint - Straight line with side cones
        for (let i = 0; i < 15; i++) {
            this.tracks.track1.cones.push({
                x: 200 + Math.random() * 2600,
                y: 150 + i * 100,
                width: 50,
                height: 50
            });
        }
        
        // Track 2: Mountain Slalom - Zigzag pattern
        for (let i = 0; i < 20; i++) {
            const side = i % 2 === 0 ? -1 : 1;
            this.tracks.track2.cones.push({
                x: 500 + side * 400 + Math.random() * 200,
                y: 1200 + i * 80,
                width: 50,
                height: 50
            });
        }
        
        // Track 3: Chaos Canyon - Random obstacles everywhere
        for (let i = 0; i < 40; i++) {
            this.tracks.track3.cones.push({
                x: 400 + Math.random() * 2000,
                y: 600 + Math.random() * 1800,
                width: 50,
                height: 50
            });
        }
    },
    
    startRace(trackName) {
        this.currentTrack = this.tracks[trackName];
        this.isRacing = true;
        this.startTime = Date.now();
        
        // Reset player position
        gameState.player.x = this.currentTrack.startX;
        gameState.player.y = this.currentTrack.startY;
        gameState.player.money = 0; // Reset for race
        
        // Spawn traffic
        this.spawnRaceTraffic();
        
        // Hide main game UI
        document.getElementById('titleScreen').classList.add('hidden');
        
        // Show race UI
        UI.createRaceHUD();
        
        gameState.isRunning = true;
        this.raceGameLoop();
    },
    
    spawnRaceTraffic() {
        gameState.vehicles = [];
        const vehicleTypes = [
            { emoji: '🚗', speed: 1.5 },
            { emoji: '🚕', speed: 1.8 },
            { emoji: '🚙', speed: 1.6 }
        ];
        
        for (let i = 0; i < this.currentTrack.traffic; i++) {
            const type = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
            gameState.vehicles.push({
                ...type,
                x: 500 + Math.random() * 1500,
                y: Math.random() * CONFIG.WORLD_HEIGHT,
                direction: Math.random() > 0.5 ? 1 : -1,
                isHorizontal: Math.random() > 0.5
            });
        }
    },
    
    checkCollisions() {
        // Check cone collisions
        this.currentTrack.cones.forEach(cone => {
            const distance = Math.hypot(
                gameState.player.x - (cone.x + 25),
                gameState.player.y - (cone.y + 25)
            );
            
            if (distance < 60) {
                this.coneHit(cone);
            }
        });
        
        // Check traffic collisions
        gameState.vehicles.forEach(vehicle => {
            const distance = Math.hypot(
                gameState.player.x - vehicle.x,
                gameState.player.y - vehicle.y
            );
            
            if (distance < 80) {
                this.trafficHit(vehicle);
            }
        });
    },
    
    coneHit(cone) {
        gameState.player.money -= 50;
        cone.hit = true;
        
        setTimeout(() => {
            cone.hit = false;
        }, 300);
    },
    
    trafficHit(vehicle) {
        gameState.player.money -= 100;
        vehicle.hit = true;
        
        setTimeout(() => {
            vehicle.hit = false;
        }, 300);
    },
    
    checkFinish() {
        const finish = this.currentTrack;
        const distance = Math.hypot(
            gameState.player.x - finish.finishX,
            gameState.player.y - finish.finishY
        );
        
        if (distance < 100) {
            return true;
        }
        return false;
    },
    
    finishRace() {
        const elapsedTime = (Date.now() - this.startTime) / 1000;
        const trackKey = Object.keys(this.tracks).find(k => this.tracks[k] === this.currentTrack);
        
        // Calculate money based on time and penalties
        let earnedMoney = this.currentTrack.money - Math.floor(elapsedTime * 2);
        earnedMoney = Math.max(100, earnedMoney); // Minimum 100
        
        // Check if best time
        const bestTimeKey = trackKey + '_best';
        const isBestTime = !this.bestTimes[trackKey] || elapsedTime < parseFloat(this.bestTimes[trackKey]);
        
        if (isBestTime) {
            this.bestTimes[trackKey] = elapsedTime.toFixed(2);
            localStorage.setItem('race_' + bestTimeKey, elapsedTime.toFixed(2));
            earnedMoney += 500; // Bonus for best time
        }
        
        gameState.player.money += earnedMoney;
        
        this.isRacing = false;
        gameState.isRunning = false;
        
        UI.showRaceResults(
            this.currentTrack.name,
            elapsedTime.toFixed(2),
            earnedMoney,
            isBestTime,
            this.bestTimes[trackKey]
        );
    },
    
    raceGameLoop() {
        if (!this.isRacing) return;
        
        this.handleRaceInput();
        this.checkCollisions();
        this.updateTraffic();
        this.renderRace();
        
        if (this.checkFinish()) {
            this.finishRace();
            return;
        }
        
        requestAnimationFrame(() => this.raceGameLoop());
    },
    
    handleRaceInput() {
        if (gameState.keys['ArrowUp'] || gameState.keys['w']) {
            gameState.player.y -= gameState.player.speed + 2; // Faster in race
        }
        if (gameState.keys['ArrowDown'] || gameState.keys['s']) {
            gameState.player.y += gameState.player.speed + 2;
        }
        if (gameState.keys['ArrowLeft'] || gameState.keys['a']) {
            gameState.player.x -= gameState.player.speed + 2;
        }
        if (gameState.keys['ArrowRight'] || gameState.keys['d']) {
            gameState.player.x += gameState.player.speed + 2;
        }
        
        // Keep in bounds
        gameState.player.x = Math.max(0, Math.min(CONFIG.WORLD_WIDTH, gameState.player.x));
        gameState.player.y = Math.max(0, Math.min(CONFIG.WORLD_HEIGHT, gameState.player.y));
    },
    
    updateTraffic() {
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
    
    renderRace() {
        const ctx = game.ctx;
        const canvas = game.canvas;
        
        // Background
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw track bounds
        ctx.fillStyle = '#696969';
        ctx.fillRect(150, 0, CONFIG.WORLD_WIDTH - 300, CONFIG.WORLD_HEIGHT);
        
        // Draw road lines
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 5;
        for (let i = 0; i < CONFIG.WORLD_HEIGHT; i += 100) {
            ctx.beginPath();
            ctx.moveTo(300, i);
            ctx.lineTo(300, i + 50);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(CONFIG.WORLD_WIDTH - 300, i);
            ctx.lineTo(CONFIG.WORLD_WIDTH - 300, i + 50);
            ctx.stroke();
        }
        
        // Draw start line
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(200, this.currentTrack.startY - 30, 100, 60);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('START', 220, this.currentTrack.startY + 10);
        
        // Draw finish line
        ctx.fillStyle = '#FF1493';
        ctx.fillRect(this.currentTrack.finishX - 50, this.currentTrack.finishY - 30, 100, 60);
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('FINISH', this.currentTrack.finishX - 40, this.currentTrack.finishY + 10);
        
        // Draw cones
        this.currentTrack.cones.forEach(cone => {
            ctx.fillStyle = cone.hit ? '#FF6B6B' : '#FF8C00';
            ctx.fillRect(cone.x, cone.y, cone.width, cone.height);
            ctx.font = '30px Arial';
            ctx.fillText('🔲', cone.x - 10, cone.y + 35);
        });
        
        // Draw vehicles
        gameState.vehicles.forEach(vehicle => {
            ctx.font = vehicle.hit ? '25px Arial' : '30px Arial';
            ctx.fillStyle = vehicle.hit ? 'rgba(255,100,100,0.5)' : 'rgba(0,0,0,1)';
            ctx.fillText(vehicle.emoji, vehicle.x - 15, vehicle.y);
        });
        
        // Draw player rickshaw
        const rickshaw = document.getElementById('playerRickshaw');
        if (rickshaw) {
            rickshaw.style.left = (gameState.player.x - 50) + 'px';
            rickshaw.style.top = (gameState.player.y - 35) + 'px';
        }
    },
    
    exitRace() {
        this.isRacing = false;
        gameState.isRunning = false;
        document.getElementById('gameContainer').innerHTML = '';
        document.getElementById('titleScreen').classList.remove('hidden');
        UI.showMainMenu();
    }
};
