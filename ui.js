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
        controls.innerHTML = '⬆️⬇️⬅️➡️ Drive | ENTER Pick/Drop | M Mission Menu';
        this.container.appendChild(controls);
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
    }
};
