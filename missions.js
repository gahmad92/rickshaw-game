// Mission Templates - EXPANDED
const MISSION_TEMPLATES = {
    school: {
        titles: ["Morning School Run", "School Ki Raunak", "Taleem Ka Safar", "Knowledge Journey", "Zariye Ilm"],
        destinations: ["Government School", "City College", "High School", "Model School", "Academy", "Institute", "Educational Complex"],
        studentNames: ["Ahmed", "Fatima", "Ali", "Ayesha", "Hassan", "Zainab", "Bilal", "Maryam", "Usman", "Hira", "Saad", "Rabia", "Tariq", "Noor", "Karim"],
        dialogues: [
            "Assalam-o-Alaikum Mamu! School chalte hain!",
            "Mamu Butt! Jaldi chalo, exam hai!",
            "Aaj cricket match hai school mein!",
            "Assignment submit karni hai Mamu!",
            "Test hai aaj, late na ho jao!",
            "Dosto se milna hai Mamu!",
            "Mamu ji homework nahi ki, principal se bachao!",
            "Sports day hai aaj Mamu!",
            "Prize jeeti hain meine!",
            "Aaj parents meeting hai!"
        ],
        emojis: ["👦", "👧", "🧒", "📚"],
        baseFare: 50
    },
    market: {
        titles: ["Bazaar Ki Sair", "Shopping Trip", "Market Run", "Kharidari Ka Din", "Bazaar Jana", "Saman Lena"],
        destinations: ["Liberty Market", "Anarkali Bazaar", "Mall Road", "Sunday Bazaar", "Central Market", "Super Mart", "Shopping Plaza", "Produce Market"],
        passengerNames: ["Ammi Jaan", "Khala", "Baji", "Aunty", "Phupho", "Auntie", "Begum", "Dadi", "Nani"],
        dialogues: [
            "Beta, bazaar chalna hai!",
            "Sabziyan leni hain Mamu!",
            "Shopping karni hai jaldi!",
            "Mehmaan aa rahe hain, saman lena hai!",
            "Discount laga hai beta, jaldi chalo!",
            "Cloth leni hai Mamu!",
            "Jeweler ke pass jana hai!",
            "Makeup samaan lena hai!",
            "Gift leni hai, party hai raat ko!",
            "Groceries khatam ho gayin!"
        ],
        emojis: ["👵", "🧕", "👩", "🛍️"],
        baseFare: 80
    },
    office: {
        titles: ["Office Drop", "Kaam Pe Jaana", "Meeting Time", "Business Trip", "Corporate Run", "Job Ko Jana"],
        destinations: ["IT Tower", "Bank Plaza", "Office Complex", "Business Center", "Corporate Office", "Finance Hub", "Tech Park", "Trade Center"],
        passengerNames: ["Sahab", "Manager Sahab", "Sir Ji", "Boss", "Bhai Sahab", "Executive", "Officer", "Director"],
        dialogues: [
            "Office chaliye jaldi!",
            "Meeting hai, tez chalao!",
            "Client aa raha hai, hurry up!",
            "Boss bula rahe hain!",
            "Presentation hai beta, der mat karna!",
            "Deadline hai aaj!",
            "Conference call hai Mamu!",
            "Important meeting, drive carefully!",
            "Jaldi paho, bonus depend karti hai!",
            "Airport ke liye report submit karna hai!"
        ],
        emojis: ["👨‍💼", "🧔", "👔", "💼"],
        baseFare: 100
    },
    hospital: {
        titles: ["Emergency!", "Hospital Run", "Tabiyat Kharab", "Doctor Ke Pass", "Checkup Time", "Medical Emergency"],
        destinations: ["City Hospital", "Medical Center", "Emergency Ward", "Clinic", "Health Complex", "Private Hospital", "Doctor's Office"],
        passengerNames: ["Patient", "Mareed", "Bhai Sahab", "Uncle", "Aunty", "Dada", "Dadi"],
        dialogues: [
            "Jaldi hospital chalo!",
            "Tabiyat theek nahi hai!",
            "Doctor se milna hai!",
            "Emergency hai beta!",
            "Dawa khatam ho gayi, pharmacy chalo!",
            "Blood test karwani hai!",
            "Checkup appointment hai!",
            "Dard bahut hai Mamu!",
            "Hospital jaldi pohanchna zaroori hai!",
            "Injection lagwana hai!"
        ],
        emojis: ["🤒", "😷", "🧓", "🏥"],
        baseFare: 150
    },
    restaurant: {
        titles: ["Food Run", "Khanay Chalte Hain", "Dinner Time", "Restaurant Visit", "Khana Kha Lenay Chalte Hain"],
        destinations: ["Pizza Place", "Biryani House", "BBQ Corner", "Chinese Restaurant", "Cafe", "Fast Food", "Grillhouse"],
        passengerNames: ["Dost", "Friend", "Parivaar", "Family", "Couple", "Friends Group"],
        dialogues: [
            "Khanay chalte hain Mamu!",
            "Bhook lagi hai!",
            "Restaurant ka order tha!",
            "Date night Mamu!",
            "Friends se milna hai!",
            "Shaadi ka party hai!",
            "Birthday celebration!",
            "Dinner booking hai!",
            "Takeaway order karna hai!",
            "Khanay ka mood hai!"
        ],
        emojis: ["👨‍👩‍👧", "👫", "🍽️", "🎉"],
        baseFare: 120
    },
    airport: {
        titles: ["Airport Run", "Flight Ka Time", "Hawa Jahaz", "Departure Time", "Travel Time"],
        destinations: ["International Airport", "Airport Terminal", "Cargo Area", "Flight Terminal"],
        passengerNames: ["Traveler", "Yatri", "Bhai Sahab", "Family"],
        dialogues: [
            "Airport jaldi pohanchna hai!",
            "Flight miss na ho!",
            "Suitcase pack karo!",
            "Overseas jaana hai!",
            "Urgent airport jana hai!",
            "International flight hai!",
            "Luggage zaada hai Mamu!"
        ],
        emojis: ["✈️", "🧳", "👨‍🍼"],
        baseFare: 200
    },
    park: {
        titles: ["Park Visit", "Tamasha Karnay", "Fresh Air", "Picnic Time", "Sabz Baagh"],
        destinations: ["Central Park", "Adventure Park", "Amusement Park", "Family Park", "Nature Park"],
        passengerNames: ["Family", "Bachche", "Kids", "Parivaar"],
        dialogues: [
            "Park chalte hain!",
            "Swings par khelnay chalte hain!",
            "Mummy ice cream dilayega!",
            "Bachcho ko tafrih karwa do!",
            "Picnic karnay chalte hain!",
            "Family time Mamu!",
            "Khel kud karnay chalte hain!"
        ],
        emojis: ["👨‍👩‍👧‍👦", "🎡", "🎠"],
        baseFare: 90
    }
};

// Generate Random Mission - ENHANCED
function generateRandomMission() {
    const types = Object.keys(MISSION_TEMPLATES);
    const type = types[Math.floor(Math.random() * types.length)];
    const template = MISSION_TEMPLATES[type];
    
    // MORE PASSENGERS: 1-4 instead of 1-3
    const numPassengers = Math.floor(Math.random() * 4) + 1; // 1-4 passengers
    const passengers = [];
    
    // BETTER LOCATION DISTRIBUTION - spread across entire map more evenly
    const destX = 400 + Math.random() * (CONFIG.WORLD_WIDTH - 800);
    const destY = 400 + Math.random() * (CONFIG.WORLD_HEIGHT - 800);
    const destinationName = template.destinations[Math.floor(Math.random() * template.destinations.length)];
    
    for (let i = 0; i < numPassengers; i++) {
        // Better pickup location variety
        const pickupX = 200 + Math.random() * (CONFIG.WORLD_WIDTH - 400);
        const pickupY = 200 + Math.random() * (CONFIG.WORLD_HEIGHT - 400);
        
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
            fare: template.baseFare + (Math.random() * 50) // Varied fares
        });
    }
    
    const totalReward = Math.round(passengers.reduce((sum, p) => sum + p.fare, 0) + 100); // Increased base reward
    
    return {
        id: Date.now(),
        title: template.titles[Math.floor(Math.random() * template.titles.length)],
        description: `Pick up ${numPassengers} passenger${numPassengers > 1 ? 's' : ''} and drop at ${destinationName}`,
        type,
        passengers,
        destination: { x: destX, y: destY, name: destinationName },
        reward: totalReward,
        timeLimit: 300 + (numPassengers * 50) // More time for more passengers
    };
}
