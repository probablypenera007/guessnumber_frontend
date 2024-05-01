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

