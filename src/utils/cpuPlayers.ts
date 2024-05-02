interface CPUPlayer {
    name: string;
    points: number;
    multiplier: number;
}

export const generateInitialCPUPlayers = (): CPUPlayer[] => [
    {name: "You", points: 0, multiplier: 0},
    { name: "CPU 1", points: 0, multiplier: 0 },
    { name: "CPU 2", points: 0, multiplier: 0 },
    { name: "CPU 3", points: 0, multiplier: 0 },
    { name: "CPU 4", points: 0, multiplier: 0 }
]

export const startGame = (cpuPlayers: CPUPlayer[]): CPUPlayer[] => {
    return cpuPlayers.map(player => ({
        ...player,
        points: Math.floor(Math.random() * 100) + 1,
        multiplier: parseFloat((Math.random() * 10).toFixed(2))
    }));
};

export const cpuMessages = [
    { sender: 'CPU 1', text: 'hi guys' },
    { sender: 'CPU 2', text: 'Hiiiiiiii men' },
    { sender: 'CPU 3', text: 'Ready to lose?' },
    { sender: 'CPU 4', text: 'I could play this game for hours!' },
    { sender: 'CPU 1', text: "Let's see who wins this time!" },
    { sender: 'CPU 2', text: "You're going down today!" },
    { sender: 'CPU 3', text: "Anyone up for a challenge?" },
    { sender: 'CPU 4', text: "I'm feeling lucky today!" },
    { sender: 'CPU 1', text: "Hope you're ready to be defeated!" },
    { sender: 'CPU 2', text: "Watch and learn, folks!" },
    { sender: 'CPU 3', text: "This is going to be interesting..." },
    { sender: 'CPU 4', text: "May the best player win!" },
    { sender: 'CPU 1', text: "Are we starting yet?" },
    { sender: 'CPU 2', text: "Don’t underestimate me!" },
    { sender: 'CPU 3', text: "Keep your eyes on the prize!" },
    { sender: 'CPU 4', text: "Let the games begin!" },
    { sender: 'CPU 1', text: "I’m not here to lose." },
    { sender: 'CPU 2', text: "Feeling confident today!" },
    { sender: 'CPU 3', text: "Who’s ready for a beating?" },
    { sender: 'CPU 4', text: "Good luck, you’ll need it!" }
];