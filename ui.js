// UI Manager
const UI = {
    elements: {},
    
    init() {
        this.container = document.getElementById('gameContainer');
    },
    
    createRickshaw() {
        const rickshaw = document.createElement('div');
        rickshaw.className = 'rickshaw';
        rickshaw.id = 'playerRickshaw';
        rickshaw.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%;">
                <div style="position: absolute; top: 0; left: 10px; width: 80px; height: 20px; background: linear-gradient(180deg, #FF6B6B 0%, #C92A2A 100%); border: 2px solid #000; border-radius: 10px 10px 0 0;"></div>
                <div style="position: absolute; top: 18px; left: 15px; width: 70px; height: 35px; background: linear-gradient(180deg, #FFD700 0%, #FFA500 100%); border: 2px solid #000; border-radius: 5px;"></div>
                <div style="position: absolute; top: 20px; left: 20px; width: 25px; height: 15px; background: rgba(135, 206, 235, 0.6); border: 2px solid #000;"></div>
                <div style="position: absolute; top: 48px; left: 30px; width: 16px; height: 16px; background: radial-gradient(circle, #333 30%, #000 30%, #000 60%, #555 60%); border-radius: 50%; border: 2px solid #000;"></div>
                <div style="position: absolute; top: 48px; left: 60px; width: 16px; height: 16px; background: radial-gradient(circle, #333 30%, #000 30%, #000 60%, #555 60%); border-radius: 50%; border: 2px solid #000;"></div>
                <div style="position: absolute; top: 48px; left: 72px; width: 16px; height: 16px; background: radial-gradient(circle, #333 30%, #000 30%, #000 60%, #555 60%); border-radius: 50%; border: 2px solid #000;"></div>
                <div style="position: absolute; top: 30px; left: 12px; width: 6px; height: 6px; background: #FFFF00; border-radius: 50%; box-shadow: 0 0 10px rgba(255, 255, 0, 0.8);"></div>
            </div>
        `;
        this.container.appendChild(rickshaw);
        this.elements.rickshaw = rickshaw;
    },
    
    createHUD() {
        const hud = document.createElement('div');
        hud.className = 'hud';
        hud.innerHTML = `
            <div class="hud-item">
                <span class="hud-label">🧔 Mamu Butt</span>
            </div>
        `;
        this.container.appendChild(hud);
    },
    
    createMissionIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'mission-indicator';
        indicator.id = 'missionIndicator';
        this.container.appendChild(indicator);
    },
    
    updateMissionIndicator() {
        const indicator = document.getElementById('missionIndicator');
        if (!indicator || !gameState.currentMission) return;
        
        const pickedUp = gameState.passengers.filter(p => p.pickedUp).length;
        const total = gameState.passengers.length;
        
        indicator.innerHTML = `
            <div class="mission-title">${gameState.currentMission.title}</div>
            <div class="mission-objective">Pick up: ${pickedUp}/${total}</div>
        `;
    },
    
    createDayNightIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'day-night-indicator';
        indicator.id = 'dayNightIndicator';
        this.container.appendChild(indicator);
    },
    
    updateDayNightIndicator() {
        const indicator = document.getElementById('dayNightIndicator');
        if (!indicator) return;
        
        const hour = Math.floor(gameState.timeOfDay);
        if (hour >= 6 && hour < 18) {
            indicator.innerHTML = '☀️';
            indicator.title = `${hour}:00 - Day`;
        } else {
            indicator.innerHTML = '🌙';
            indicator.title = `${hour}:00 - Night`;
        }
    },
    
    createMamuPortrait() {
        const portrait = document.createElement('div');
        portrait.className = 'character-portrait';
        portrait.innerHTML = '🧔';
        portrait.title = 'Mamu Butt - Best Driver!';
        this.container.appendChild(portrait);
    },
    
    createControls() {
        const controls = document.createElement('div');
        controls.className = 'controls-hint';
        controls.innerHTML = '⬆️⬇️⬅️➡️ Drive | ENTER Pick/Drop | M Mission Menu | 🔊 Sound | Z Fire 🔥';
        this.container.appendChild(controls);
        
        // Add enemy hint at bottom
        const enemyHint = document.createElement('div');
        enemyHint.className = 'enemy-hint';
        enemyHint.innerHTML = '👮🤼🧔 Press Z to Fire at Enemies! 🔥';
        enemyHint.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 100, 0, 0.9);
            border: 2px solid #FFD700;
            color: #FFF;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            z-index: 150;
            font-family: 'Righteous', cursive;
        `;
        this.container.appendChild(enemyHint);
        
        // Add sound toggle button
        const soundBtn = document.createElement('button');
        soundBtn.id = 'soundToggleBtn';
        soundBtn.className = 'sound-toggle-btn';
        soundBtn.innerHTML = '🔊';
        soundBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid #FFD700;
            color: #FFD700;
            padding: 10px 15px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        soundBtn.addEventListener('mouseover', () => {
            soundBtn.style.background = 'rgba(0, 0, 0, 0.9)';
            soundBtn.style.transform = 'scale(1.1)';
        });
        
        soundBtn.addEventListener('mouseout', () => {
            soundBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            soundBtn.style.transform = 'scale(1)';
        });
        
        soundBtn.addEventListener('click', () => {
            const audio = document.getElementById('backgroundMusic');
            if (audio.paused) {
                audio.play();
                soundBtn.innerHTML = '🔊';
            } else {
                audio.pause();
                soundBtn.innerHTML = '🔇';
            }
        });
        
        this.container.appendChild(soundBtn);
    },
    
    showDialogue(speaker, text) {
        this.closeDialogue();
        
        const dialogue = document.createElement('div');
        dialogue.className = 'dialogue-box';
        dialogue.id = 'dialogueBox';
        dialogue.innerHTML = `
            <div class="speaker-name">${speaker}</div>
            <div class="dialogue-text">${text}</div>
            <div class="dialogue-options">
                <button class="dialogue-btn" onclick="UI.closeDialogue()">Continue</button>
            </div>
        `;
        this.container.appendChild(dialogue);
        
        // Auto-close dialogue after 5 seconds
        setTimeout(() => this.closeDialogue(), 5000);
    },
    
    closeDialogue() {
        const dialogue = document.getElementById('dialogueBox');
        if (dialogue) dialogue.remove();
    },
    
    showActionPrompt(text, screenX, screenY) {
        this.removeActionPrompt();
        
        const prompt = document.createElement('div');
        prompt.className = 'action-prompt';
        prompt.id = 'actionPrompt';
        prompt.innerHTML = text;
        prompt.style.left = screenX + 'px';
        prompt.style.top = (screenY - 50) + 'px';
        this.container.appendChild(prompt);
    },
    
    removeActionPrompt() {
        const prompt = document.getElementById('actionPrompt');
        if (prompt) prompt.remove();
    },
    
    createPassenger(passenger) {
        const el = document.createElement('div');
        el.className = 'passenger pickable';
        el.innerHTML = passenger.emoji;
        this.container.appendChild(el);
        return el;
    },
    
    createAmbientNPC(npc) {
        const el = document.createElement('div');
        el.className = 'passenger';
        el.innerHTML = npc.emoji;
        this.container.appendChild(el);
        return el;
    },
    
    createDestinationMarker() {
        const marker = document.createElement('div');
        marker.className = 'map-marker';
        marker.id = 'destinationMarker';
        this.container.appendChild(marker);
        return marker;
    },
    
    updateHUD() {
        // Simplified HUD - no stats display
    },
    
    showNotification(title, messages, buttons) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.id = 'notification';
        
        let html = `<div class="notification-title">${title}</div>`;
        messages.forEach(msg => {
            html += `<div class="notification-text">${msg}</div>`;
        });
        
        html += '<div class="dialogue-options">';
        buttons.forEach(btn => {
            html += `<button class="dialogue-btn" onclick="${btn.action}">${btn.text}</button>`;
        });
        html += '</div>';
        
        notification.innerHTML = html;
        this.container.appendChild(notification);
    },
    
    closeNotification() {
        const notification = document.getElementById('notification');
        if (notification) notification.remove();
    },
    
    showMissionSelect() {
        const missionList = document.createElement('div');
        missionList.className = 'mission-list';
        missionList.id = 'missionSelect';
        
        let html = '<h2 style="font-family: Righteous; color: #FFD700; text-align: center; margin-bottom: 20px;">Choose Your Ride</h2>';
        
        gameState.availableMissions.forEach((mission, index) => {
            const icon = mission.type === 'school' ? '📚' : 
                        mission.type === 'market' ? '🛒' : 
                        mission.type === 'office' ? '💼' : '🏥';
            html += `
                <div class="mission-card" onclick="game.selectMission(${index})">
                    <div class="mission-card-title">${icon} ${mission.title}</div>
                    <div class="mission-card-desc">${mission.description}</div>
                    <div class="mission-card-reward">💰 Rs. ${mission.reward}</div>
                </div>
            `;
        });
        
        missionList.innerHTML = html;
        this.container.appendChild(missionList);
    },
    
    closeMissionSelect() {
        const missionSelect = document.getElementById('missionSelect');
        if (missionSelect) missionSelect.remove();
    },
    
    showEarnings(amount, x, y) {
        const earnings = document.createElement('div');
        earnings.className = 'earnings';
        earnings.innerHTML = `+Rs. ${amount}`;
        earnings.style.left = x + 'px';
        earnings.style.top = y + 'px';
        this.container.appendChild(earnings);
        setTimeout(() => earnings.remove(), 2000);
    },
    
    showRaceSelect() {
        const raceSelect = document.createElement('div');
        raceSelect.id = 'raceSelect';
        raceSelect.className = 'notification';
        raceSelect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            width: 600px;
        `;
        
        raceSelect.innerHTML = `
            <div style="font-size: 40px; margin-bottom: 20px;">🏎️ RICKSHAW RACES 🏎️</div>
            <div style="font-size: 18px; margin-bottom: 30px;">Choose Your Track!</div>
            
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <button onclick="raceMode.startRace('track1')" style="
                    padding: 15px;
                    font-size: 16px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: 0.3s;
                ">
                    🟢 CITY SPRINT (Easy) - Rs. 500
                </button>
                
                <button onclick="raceMode.startRace('track2')" style="
                    padding: 15px;
                    font-size: 16px;
                    background: #2196F3;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: 0.3s;
                ">
                    🔵 MOUNTAIN SLALOM (Medium) - Rs. 1000
                </button>
                
                <button onclick="raceMode.startRace('track3')" style="
                    padding: 15px;
                    font-size: 16px;
                    background: #F44336;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: 0.3s;
                ">
                    🔴 CHAOS CANYON (Hard) - Rs. 2000
                </button>
                
                <button onclick="raceMode.exitRace()" style="
                    padding: 15px;
                    font-size: 16px;
                    background: #888;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    margin-top: 10px;
                ">
                    Back to Menu
                </button>
            </div>
        `;
        
        this.container.appendChild(raceSelect);
    },
    
    createRaceHUD() {
        const hud = document.createElement('div');
        hud.id = 'raceHUD';
        hud.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            color: white;
            font-size: 20px;
            z-index: 100;
            background: rgba(0,0,0,0.7);
            padding: 15px;
            border-radius: 10px;
            font-weight: bold;
        `;
        hud.innerHTML = `
            <div>🏎️ ${raceMode.currentTrack.name} - ${raceMode.currentTrack.difficulty}</div>
            <div id="raceTimer">Time: 0s</div>
            <div id="raceMoney">Penalties: Rs. 0</div>
        `;
        this.container.appendChild(hud);
        
        // Update timer
        const timerInterval = setInterval(() => {
            if (!raceMode.isRacing) {
                clearInterval(timerInterval);
                return;
            }
            
            const elapsed = ((Date.now() - raceMode.startTime) / 1000).toFixed(1);
            document.getElementById('raceTimer').textContent = `Time: ${elapsed}s`;
            document.getElementById('raceMoney').textContent = `Penalties: -Rs. ${Math.abs(gameState.player.money)}`;
        }, 100);
    },
    
    showRaceResults(trackName, time, money, isBestTime, bestTime) {
        const results = document.createElement('div');
        results.className = 'notification';
        results.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            width: 600px;
        `;
        
        const bestTimeBonus = isBestTime ? '<div style="color: #FFD700; font-size: 24px; margin: 10px 0;">⭐ NEW BEST TIME! +Rs. 500 BONUS! ⭐</div>' : '';
        
        results.innerHTML = `
            <div style="font-size: 40px; margin-bottom: 20px;">🏁 RACE COMPLETE! 🏁</div>
            <div style="font-size: 24px; margin-bottom: 20px;">${trackName}</div>
            
            <div style="font-size: 20px; margin: 15px 0;">
                <div>⏱️ Time: ${time}s</div>
                <div style="margin: 10px 0;">💰 Earned: Rs. ${money}</div>
                ${bestTimeBonus}
                ${isBestTime ? `<div>Best Time: ${bestTime}s</div>` : ''}
            </div>
            
            <div style="display: flex; gap: 15px; margin-top: 30px;">
                <button onclick="raceMode.exitRace()" style="
                    flex: 1;
                    padding: 15px;
                    font-size: 16px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                ">
                    Back to Menu
                </button>
                <button onclick="UI.showRaceSelect()" style="
                    flex: 1;
                    padding: 15px;
                    font-size: 16px;
                    background: #2196F3;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                ">
                    Try Another Race
                </button>
            </div>
        `;
        
        this.container.appendChild(results);
    }
};
