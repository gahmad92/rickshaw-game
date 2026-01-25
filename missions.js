// Mission Templates
const MISSION_TEMPLATES = {
    school: {
        titles: ["Morning School Run", "School Ki Raunak", "Taleem Ka Safar", "Knowledge Journey"],
        destinations: ["Government School", "City College", "High School", "Model School"],
        studentNames: ["Ahmed", "Fatima", "Ali", "Ayesha", "Hassan", "Zainab", "Bilal", "Maryam", "Usman", "Hira"],
        dialogues: [
            "Assalam-o-Alaikum Mamu! School chalte hain!",
            "Mamu Butt! Jaldi chalo, exam hai!",
            "Aaj cricket match hai school mein!",
            "Assignment submit karni hai Mamu!",
            "Test hai aaj, late na ho jao!",
            "Dosto se milna hai Mamu!",
            "Mamu ji homework nahi ki, principal se bachao!"
        ],
        emojis: ["👦", "👧", "🧒"],
        baseFare: 50
    },
    market: {
        titles: ["Bazaar Ki Sair", "Shopping Trip", "Market Run", "Kharidari Ka Din"],
        destinations: ["Liberty Market", "Anarkali Bazaar", "Mall Road", "Sunday Bazaar"],
        passengerNames: ["Ammi Jaan", "Khala", "Baji", "Aunty", "Phupho"],
        dialogues: [
            "Beta, bazaar chalna hai!",
            "Sabziyan leni hain Mamu!",
            "Shopping karni hai jaldi!",
            "Mehmaan aa rahe hain, saman lena hai!",
            "Discount laga hai beta, jaldi chalo!"
        ],
        emojis: ["👵", "🧕", "👩"],
        baseFare: 80
    },
    office: {
        titles: ["Office Drop", "Kaam Pe Jaana", "Meeting Time", "Business Trip"],
        destinations: ["IT Tower", "Bank Plaza", "Office Complex", "Business Center"],
        passengerNames: ["Sahab", "Manager Sahab", "Sir Ji", "Boss", "Bhai Sahab"],
        dialogues: [
            "Office chaliye jaldi!",
            "Meeting hai, tez chalao!",
            "Client aa raha hai, hurry up!",
            "Boss bula rahe hain!",
            "Presentation hai beta, der mat karna!"
        ],
        emojis: ["👨‍💼", "🧔", "👔"],
        baseFare: 100
    },
    hospital: {
        titles: ["Emergency!", "Hospital Run", "Tabiyat Kharab", "Doctor Ke Pass"],
        destinations: ["City Hospital", "Medical Center", "Emergency Ward", "Clinic"],
        passengerNames: ["Patient", "Mareed", "Bhai Sahab", "Uncle"],
        dialogues: [
            "Jaldi hospital chalo!",
            "Tabiyat theek nahi hai!",
            "Doctor se milna hai!",
            "Emergency hai beta!",
            "Dawa khatam ho gayi, pharmacy chalo!"
        ],
        emojis: ["🤒", "😷", "🧓"],
        baseFare: 150
    }
};

// Generate Random Mission
function generateRandomMission() {
    const types = Object.keys(MISSION_TEMPLATES);
    const type = types[Math.floor(Math.random() * types.length)];
    const template = MISSION_TEMPLATES[type];
    
    const numPassengers = Math.floor(Math.random() * 3) + 1; // 1-3 passengers
    const passengers = [];
    
    const destX = 500 + Math.random() * (CONFIG.WORLD_WIDTH - 1000);
    const destY = 500 + Math.random() * (CONFIG.WORLD_HEIGHT - 1000);
    const destinationName = template.destinations[Math.floor(Math.random() * template.destinations.length)];
    
    for (let i = 0; i < numPassengers; i++) {
        const pickupX = 300 + Math.random() * (CONFIG.WORLD_WIDTH - 600);
        const pickupY = 300 + Math.random() * (CONFIG.WORLD_HEIGHT - 600);
        
        passengers.push({
            name: type === 'school' 
                ? template.studentNames[Math.floor(Math.random() * template.studentNames.length)]
                : template.passengerNames[Math.floor(Math.random() * template.passengerNames.length)],
            emoji: template.emojis[Math.floor(Math.random() * template.emojis.length)],
            pickupX,
            pickupY,
            destinationX: destX,
            destinationY: destY,
            dialogue: template.dialogues[Math.floor(Math.random() * template.dialogues.length)],
            fare: template.baseFare
        });
    }
    
    const totalReward = passengers.reduce((sum, p) => sum + p.fare, 0) + 50;
    
    return {
        id: Date.now(),
        title: template.titles[Math.floor(Math.random() * template.titles.length)],
        description: `Pick up ${numPassengers} passenger${numPassengers > 1 ? 's' : ''} and drop at ${destinationName}`,
        type,
        passengers,
        destination: { x: destX, y: destY, name: destinationName },
        reward: totalReward,
        timeLimit: 300
    };
}
