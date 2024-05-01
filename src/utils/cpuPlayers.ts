interface CPUPlayer {
    name: string;
    points: number;
    multiplier: number;
}

export const generateInitialCPUPlayers = (): CPUPlayer[] => [
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