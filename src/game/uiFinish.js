import { players, getCurrentPlayerIndex, getCurrentThrow, maxThrows } from "./game.js";
import { calculateFinish } from "./finishCalc.js";

export function updateAllPreviews() {
    const currentPlayerIndex = getCurrentPlayerIndex();
    const currentThrow = getCurrentThrow();
    
    players.forEach(p => {
        const box = p.element.querySelector(".finish-preview");
        box.innerHTML = "";

        const finish = (p.score <= 170 && p.score > 1)
            ? calculateFinish(p.score)
            : [];

        const dartsLeft = (players.indexOf(p) === currentPlayerIndex)
            ? (maxThrows - currentThrow + 1)
            : maxThrows;

        for (let i = 0; i < 3; i++) {
            const s = document.createElement("span");

            if (finish[i]) {
                s.textContent = finish[i];
                if (i < dartsLeft) {
                    s.className = "finish-cell";
                    if (finish[i].startsWith("T")) s.classList.add("finish-t");
                    else if (finish[i].startsWith("D")) s.classList.add("finish-d");
                    else s.classList.add("finish-s");
                } else {
                    s.className = "finish-unavailable";
                }
            } else {
                s.className = "finish-empty";
            }
            box.appendChild(s);
        }
    });
}
