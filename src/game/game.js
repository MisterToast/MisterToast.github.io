const players = [
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

let currentPlayerIndex = 0;
let currentThrow = 1;
const maxThrows = 3;

/* INIT */
updateActivePlayer();
updateRoundDarts();
updateAllPreviews();

/* MISS BUTTON */
document.querySelectorAll(".miss-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
        if (i !== currentPlayerIndex) return;
        const p = players[i];
        p.totalThrows++;
        // write a single dash (Strich) into the current dart-box instead of the full "MISS" text
        p.roundDarts.push("—");
        nextThrow();
    });
});

/* HIT */
function handleHit(hit, multiplier) {
    const p = players[currentPlayerIndex];
    let points = 0;

    if (hit === "BULL") {
        points = multiplier === "DBull" ? 50 : 25;
    } else {
        const v = parseInt(hit);
        if (multiplier.startsWith("S")) points = v;
        if (multiplier.startsWith("D")) points = v * 2;
        if (multiplier.startsWith("T")) points = v * 3;
    }

    const newScore = p.score - points;

    // Bust
    if (newScore < 0 || (newScore === 0 && !multiplier.startsWith("D"))) {
        p.totalThrows++;
        p.score = p.roundsScore;
        p.scoreElement.textContent = p.score;
        p.roundDarts.push("BUST");
        nextThrow(true);
        return;
    }

    p.score = newScore;
    p.scoreElement.textContent = p.score;
    p.totalThrows++;
    p.roundDarts.push(multiplier);

    if (p.score === 0) {
        showWinner(p);
        return;
    }

    nextThrow();
}

/* NEXT THROW */
function nextThrow(bust = false) {
    const p = players[currentPlayerIndex];

    if (!bust && currentThrow < maxThrows) {
        currentThrow++;
    } else {
        p.roundsScore = p.score;
        currentThrow = 1;

        const nextIndex = (currentPlayerIndex + 1) % players.length;
        players[nextIndex].roundDarts = []; // nur beim neuen aktiven Spieler leeren
        currentPlayerIndex = nextIndex;
    }

    updateActivePlayer();
    updateRoundDarts();
    updateAllPreviews();
}

/* ACTIVE PLAYER */
function updateActivePlayer() {
    players.forEach((p, i) => {
        if (i === currentPlayerIndex) {
            p.element.classList.add("active");
            p.element.classList.remove("inactive");
        } else {
            p.element.classList.remove("active");
            p.element.classList.add("inactive");
        }
    });
}

/* ROUND DARTS */
function updateRoundDarts() {
    players.forEach(p => {
        const box = p.element.querySelector(".dart-boxes");
        box.innerHTML = "";

        for (let i = 0; i < maxThrows; i++) {
            const d = document.createElement("div");
            d.className = "dart-box";
            d.textContent = p.roundDarts[i] || "";
            box.appendChild(d);
        }

        p.element.querySelector(".total-throws").textContent =
            `Darts: ${p.totalThrows}`;
    });
}

/* FINISH PREVIEW */
function updateAllPreviews() {
    players.forEach(p => {
        const box = p.element.querySelector(".finish-preview");
        box.innerHTML = "";
        const finish = (p.score <= 170 && p.score > 1) ? calculateFinish(p.score) : [];
        // only grey out darts that are not possible for the currently active player
        const dartsLeft = (players.indexOf(p) === currentPlayerIndex) ? (maxThrows - currentThrow + 1) : maxThrows;

        // always show three preview slots
        for (let i = 0; i < 3; i++) {
            const s = document.createElement("span");
            if (finish[i]) {
                const val = finish[i];
                // check if this dart position is still possible for this player
                if (i < dartsLeft) {
                    // can still throw this dart
                    s.className = 'finish-cell';
                    s.textContent = val;
                    if (val.startsWith('T')) s.classList.add('finish-t');
                    else if (val.startsWith('D')) s.classList.add('finish-d');
                    else s.classList.add('finish-s');
                } else {
                    // not enough darts left in this round for this player
                    s.className = 'finish-unavailable';
                    s.textContent = val;
                }
            } else {
                s.className = 'finish-empty';
                s.textContent = '';
            }
            box.appendChild(s);
        }
    });
}

/* FINISH CALC */
function calculateFinish(score) {
    if (score <= 1 || score > 170) return [];

    const doubles = [...Array(20)].map((_, i) => ({ n: `D${i + 1}`, v: (i + 1) * 2 }))
        .concat({ n: "DBull", v: 50 });

    const singles = [...Array(20)].map((_, i) => ({ n: `S${i + 1}`, v: i + 1 }))
        .concat({ n: "SBull", v: 25 });

    const triples = [...Array(20)].map((_, i) => ({ n: `T${i + 1}`, v: (i + 1) * 3 }));

    for (const d of doubles) if (d.v === score) return [d.n];

    for (const d of doubles)
        for (const a of [...singles, ...triples])
            if (a.v + d.v === score) return [a.n, d.n];

    for (const d of doubles)
        for (const a of [...singles, ...triples])
            for (const b of [...singles, ...triples])
                if (a.v + b.v + d.v === score) return [a.n, b.n, d.n];

    return [];
}

/* WIN */
function showWinner(player) {
    openWinMenu(player.name, players);
}

/* RESET GAME */
function resetGame(){
    players.forEach(p=>{
        p.score = 501;
        p.scoreElement.textContent = p.score;
        p.totalThrows = 0;
        p.roundDarts = [];
        p.roundsScore = 501;
    });
    currentPlayerIndex = 0;
    currentThrow = 1;
    updateActivePlayer();
    updateRoundDarts();
    updateAllPreviews();
}
