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

export let currentPlayerIndex = 0;
export let currentThrow = 1;
export const maxThrows = 3;

export function setCurrentPlayerIndex(i) {
    currentPlayerIndex = i;
}

export function setCurrentThrow(v) {
    currentThrow = v;
}
