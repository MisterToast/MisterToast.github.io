// =======================
// STATE
// =======================

// Spieler & Zustand
export const players = [
    {
        name: "Spieler 1",
        score: 501,
        element: document.getElementById("player1"),
        scoreElement: document.getElementById("score1"),
        totalThrows: 0,
        roundDarts: [],
        roundsScore: 501
    },
    {
        name: "Spieler 2",
        score: 501,
        element: document.getElementById("player2"),
        scoreElement: document.getElementById("score2"),
        totalThrows: 0,
        roundDarts: [],
        roundsScore: 501
    }
];

// Aktueller Spieler & Wurf
let currentPlayerIndex = 0;
let currentThrow = 1;
export const maxThrows = 3;

// Getter für State
export function getCurrentPlayerIndex() {
    return currentPlayerIndex;
}

export function getCurrentThrow() {
    return currentThrow;
}

// Setter für State
export function setCurrentPlayerIndex(i) {
    currentPlayerIndex = i;
}

export function setCurrentThrow(v) {
    currentThrow = v;
}
