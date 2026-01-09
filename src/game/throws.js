import { players, currentPlayerIndex } from "./game.js";
import { nextThrow } from "./turn.js";
import { showWinner } from "./win.js";

export function registerMissButtons() {
    document.querySelectorAll(".miss-btn").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            if (i !== currentPlayerIndex) return;
            const p = players[i];
            p.totalThrows++;
            p.roundDarts.push("—");
            nextThrow();
        });
    });
}

export function handleHit(hit, multiplier) {
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
