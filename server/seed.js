const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Animal = require('./models/Animal');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const animalsData = [
    // ================= MAMMALS =================
    {
        name: "African Lion",
        category: "Mammals",
        species: "Panthera leo",
        count: 4,
        description:
            "The king of the jungle. Highly social animals that live in prides.",
        image:
            "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=800&auto=format&fit=crop",
        born: "2018",
        gender: "Male",
        origin: "Sub-Saharan Africa",
        funFacts: "A lion's roar can be heard from up to 5 miles away.",
        behavior: "Nocturnal hunters, resting up to 20 hours a day.",
        conservationStatus: "Vulnerable",
    },
    {
        name: "Asian Elephant",
        category: "Mammals",
        species: "Elephas maximus",
        count: 12,
        description:
            "The largest land mammal in Asia, known for intelligence and memory.",
        image:
            "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=800&auto=format&fit=crop",
        born: "2010",
        gender: "Female",
        origin: "South and Southeast Asia",
        funFacts: "Elephants can recognize themselves in mirrors.",
        behavior: "Highly social, lives in herds led by a matriarch.",
        conservationStatus: "Endangered",
    },
    {
        name: "Giraffe",
        category: "Mammals",
        species: "Giraffa camelopardalis",
        count: 8,
        description: "The tallest mammal on Earth with an incredibly long neck.",
        image:
            "https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=800&auto=format&fit=crop",
        born: "2019",
        gender: "Female",
        origin: "Africa",
        funFacts: "A giraffe’s tongue can be up to 20 inches long.",
        behavior: "Calm herbivores that spend most of the day eating leaves.",
        conservationStatus: "Vulnerable",
    },
    {
        name: "Bengal Tiger",
        category: "Mammals",
        species: "Panthera tigris tigris",
        count: 12,
        description:
            "A powerful apex predator famous for its orange coat and black stripes.",
        image:
            "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmVuZ2FsJTIwVGlnZXJ8ZW58MHx8MHx8fDA%3D",
        born: "2020",
        gender: "Male",
        origin: "India",
        funFacts: "No two tigers have the same stripe pattern.",
        behavior: "Solitary and territorial hunters.",
        conservationStatus: "Endangered",
    },
    {
        name: "Western Lowland Gorilla",
        category: "Mammals",
        species: "Gorilla gorilla gorilla",
        count: 14,
        description:
            "A highly intelligent primate with strong family bonds and communication.",
        image:
            "https://media.istockphoto.com/id/1126004892/photo/western-lowland-gorilla.webp?a=1&b=1&s=612x612&w=0&k=20&c=mVjaaNQNWSDxbf5D2Jjoo9hZRqyb9TjXj2AJWe9tr4M=",
        born: "2016",
        gender: "Male",
        origin: "Central Africa",
        funFacts: "Gorillas share around 98% of their DNA with humans.",
        behavior: "Lives in troops led by a silverback male.",
        conservationStatus: "Critically Endangered",
    },

    // ================= BIRDS =================
    {
        name: "Scarlet Macaw",
        category: "Birds",
        species: "Ara macao",
        count: 6,
        description: "A large, incredibly colorful parrot native to rainforests.",
        image: "https://images.unsplash.com/photo-1608336838021-57718556979d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFNjYXJsZXQlMjBNYWNhd3xlbnwwfHwwfHx8MA%3D%3D",
        born: "2021",
        gender: "Female",
        origin: "South America",
        funFacts: "Macaws can mimic human speech and live for over 50 years.",
        behavior: "Highly social and intelligent birds that thrive in pairs.",
        conservationStatus: "Least Concern"
    },
    {
        name: "Bald Eagle",
        category: "Birds",
        species: "Haliaeetus leucocephalus",
        count: 2,
        description: "A magnificent bird of prey known for its white head.",
        image: "https://images.unsplash.com/photo-1605051538183-11cedbf63597?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmFsZCUyMEVhZ2xlfGVufDB8fDB8fHww",
        born: "2017",
        gender: "Male",
        origin: "North America",
        funFacts: "The bald eagle is the national bird of the United States.",
        behavior: "Powerful solitary hunters with exceptional eyesight.",
        conservationStatus: "Least Concern"
    },
    {
        name: "Emperor Penguin",
        category: "Birds",
        species: "Aptenodytes forsteri",
        count: 12,
        description: "The tallest and heaviest of all living penguin species.",
        image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=800",
        born: "2022",
        gender: "Male",
        origin: "Antarctica",
        funFacts: "Male emperor penguins incubate eggs on their feet during winter.",
        behavior: "Lives in large colonies and huddles together for warmth.",
        conservationStatus: "Near Threatened"
    },
    {
        name: "Indian Peafowl",
        category: "Birds",
        species: "Pavo cristatus",
        count: 8,
        description: "Famous for the male's spectacular iridescent tail feathers.",
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=800",
        born: "2020",
        gender: "Male",
        origin: "South Asia",
        funFacts: "Peacocks can fan out over 200 feathers in their display.",
        behavior: "Ground-feeding birds that roost in trees at night.",
        conservationStatus: "Least Concern"
    },
    {
        name: "Snowy Owl",
        category: "Birds",
        species: "Bubo scandiacus",
        count: 3,
        description: "A large, white owl native to Arctic regions.",
        image: "https://media.istockphoto.com/id/898400750/photo/heres-looking-at-you.webp?a=1&b=1&s=612x612&w=0&k=20&c=GgF5veREEAKEVJTdkK8_c7mIJhL2eDpQuSWBKMlUuO8=",
        born: "2019",
        gender: "Female",
        origin: "Arctic Regions",
        funFacts: "Snowy owls are active during both day and night.",
        behavior: "Silent hunters that rely on keen hearing and vision.",
        conservationStatus: "Vulnerable"
    },

    // ================= REPTILES =================
{
        name: "Komodo Dragon",
        category: "Reptiles",
        species: "Varanus komodoensis",
        count: 2,
        description: "The largest living species of lizard, known for its powerful bite.",
        image: "https://media.istockphoto.com/id/936160908/photo/wildlife-shot-of-a-komodo-dragon.webp?a=1&b=1&s=612x612&w=0&k=20&c=lSbXd7OXuA6X3PLqWODY8AvpZNl4yvtGUoYvKh9yPFw=",
        born: "2016",
        gender: "Male",
        origin: "Indonesia",
        funFacts: "Komodo dragons can detect carrion from several kilometers away.",
        behavior: "Solitary apex predators that rely on stealth and patience.",
        conservationStatus: "Endangered"
    },
    {
        name: "Green Sea Turtle",
        category: "Reptiles",
        species: "Chelonia mydas",
        count: 5,
        description: "A large sea turtle with a hard shell, travels vast distances.",
        image: "https://plus.unsplash.com/premium_photo-1684358604861-485e918547fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R3JlZW4lMjBTZWElMjBUdXJ0bGV8ZW58MHx8MHx8fDA%3D",
        born: "2005",
        gender: "Female",
        origin: "Global Oceans",
        funFacts: "Green sea turtles migrate thousands of kilometers between feeding and nesting grounds.",
        behavior: "Gentle marine reptiles that spend most of their lives in water.",
        conservationStatus: "Endangered"
    },
    {
        name: "American Alligator",
        category: "Reptiles",
        species: "Alligator mississippiensis",
        count: 4,
        description: "A large crocodilian reptile native to the southeastern US.",
        image: "https://media.istockphoto.com/id/116569284/photo/alligator-mississippiensis-everglades-national-park-florida.webp?a=1&b=1&s=612x612&w=0&k=20&c=v7GmaFBRqsmn_F_ohBmB3stiE-ULpFRG135LZ_EfvnM=",
        born: "2014",
        gender: "Male",
        origin: "United States",
        funFacts: "Alligators can stay submerged for up to an hour while hunting.",
        behavior: "Ambush predators that wait silently near the water surface.",
        conservationStatus: "Least Concern"
    },
    {
        name: "King Cobra",
        category: "Reptiles",
        species: "Ophiophagus hannah",
        count: 3,
        description: "The world's longest venomous snake, famous for its hood.",
        image: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=800",
        born: "2019",
        gender: "Female",
        origin: "South Asia",
        funFacts: "King cobras mainly eat other snakes, including venomous ones.",
        behavior: "Highly alert reptiles that raise their hood when threatened.",
        conservationStatus: "Vulnerable"
    },
    {
        name: "Leopard Gecko",
        category: "Reptiles",
        species: "Eublepharis macularius",
        count: 7,
        description: "A small nocturnal lizard known for its spotted body.",
        image: "https://media.istockphoto.com/id/179030572/photo/leopard-gecko.webp?a=1&b=1&s=612x612&w=0&k=20&c=OVEdYq8cRy5bQdKzuA0VzsCjxDpR0jrbT9rJqOPaftc=",
        born: "2021",
        gender: "Male",
        origin: "Afghanistan",
        funFacts: "Leopard geckos can detach and regrow their tails.",
        behavior: "Calm nocturnal reptiles often active after sunset.",
        conservationStatus: "Least Concern"
    },

    // ================= AQUATIC =================
{
        name: "Bottlenose Dolphin",
        category: "Aquatic",
        species: "Tursiops truncatus",
        count: 4,
        description: "Highly intelligent and playful marine mammals.",
        image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qm90dGxlbm9zZSUyMERvbHBoaW58ZW58MHx8MHx8fDA%3D",
        born: "2015",
        gender: "Male",
        origin: "Global Oceans",
        funFacts: "Dolphins use echolocation to navigate and hunt underwater.",
        behavior: "Highly social animals that live and hunt in pods.",
        conservationStatus: "Least Concern"
    },
    {
        name: "Great White Shark",
        category: "Aquatic",
        species: "Carcharodon carcharias",
        count: 1,
        description: "A massive and iconic apex predator of the ocean.",
        image: "https://images.unsplash.com/photo-1704694214588-24f4bae4757b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3JlYXQlMjBXaGl0ZSUyMFNoYXJrfGVufDB8fDB8fHww",
        born: "2010",
        gender: "Female",
        origin: "Global Oceans",
        funFacts: "Great white sharks can detect a drop of blood from far away.",
        behavior: "Solitary predators known for powerful ambush attacks.",
        conservationStatus: "Vulnerable"
    },
    {
        name: "Clownfish",
        category: "Aquatic",
        species: "Amphiprioninae",
        count: 15,
        description: "Brightly colored orange and white reef fish.",
        image: "https://images.unsplash.com/photo-1722482312877-dda06fc3c23d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENsb3duZmlzaHxlbnwwfHwwfHx8MA%3D%3D",
        born: "2023",
        gender: "Male",
        origin: "Indo-Pacific",
        funFacts: "Clownfish live among sea anemones without being stung.",
        behavior: "Small territorial fish that protect their host anemone.",
        conservationStatus: "Least Concern"
    },
    {
        name: "Giant Pacific Octopus",
        category: "Aquatic",
        species: "Enteroctopus dofleini",
        count: 2,
        description: "A highly intelligent creature with eight arms.",
        image: "https://plus.unsplash.com/premium_photo-1723513718626-5884b1afd7e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8R2lhbnQlMjBQYWNpZmljJTIwT2N0b3B1c3xlbnwwfHwwfHx8MA%3D%3D",
        born: "2022",
        gender: "Female",
        origin: "North Pacific",
        funFacts: "Octopuses can solve puzzles and open containers.",
        behavior: "Solitary and highly intelligent hunters.",
        conservationStatus: "Least Concern"
    },
    {
        name: "Blue Tang",
        category: "Aquatic",
        species: "Paracanthurus hepatus",
        count: 10,
        description: "A beautiful, vibrant blue and yellow reef fish.",
        image: "https://media.istockphoto.com/id/636995850/photo/blue-tang-fish-tropical-fish.jpg?s=612x612&w=0&k=20&c=3BLamb0709rJfS4QNBzMOpj7K2RhTto1Rj-6NfMnGJA=",
        born: "2021",
        gender: "Male",
        origin: "Indo-Pacific",
        funFacts: "Blue tangs change color intensity depending on mood and environment.",
        behavior: "Active schooling fish commonly found around coral reefs.",
        conservationStatus: "Least Concern"
    }
];

const importData = async () => {
    try {
        await Animal.deleteMany(); // Clear existing data
        await Animal.insertMany(animalsData);
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();