// Game Configuration
const CONFIG = {
    WORLD_WIDTH: 3000,
    WORLD_HEIGHT: 3000,
    PLAYER_SPEED: 5,
    DAY_NIGHT_SPEED: 0.01,
    PICKUP_DISTANCE: 150,
    DROP_DISTANCE: 150
};

// Game State
const gameState = {
    player: {
        name: "Mamu Butt",
        x: 500,
        y: 500,
        width: 100,
        height: 70,
        speed: CONFIG.PLAYER_SPEED,
        money: 0,
        fuel: 100
    },
    currentMission: null,
    passengers: [],
    ambientNPCs: [],
    buildings: [],
    trees: [],
    roads: [],
    vehicles: [],
    keys: {},
    camera: { x: 0, y: 0 },
    timeOfDay: 8, // Start at 8 AM
    nearbyPassenger: null,
    nearDestination: false,
    missionComplete: false,
    missionCount: 0,
    availableMissions: [],
    isRunning: false,
    gameStartTime: null,
    mapInitialized: false
};
