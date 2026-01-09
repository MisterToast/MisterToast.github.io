import { players, currentPlayerIndex, maxThrows } from "./game.js";

export function updateActivePlayer() {
    players.forEach((p, i) => {
        p.element.classList.toggle("active", i === currentPlayerIndex);
        p.element.classList.toggle("inactive", i !== currentPlayerIndex);
    });
}

export function updateRoundDarts() {
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
