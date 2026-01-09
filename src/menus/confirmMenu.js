import { resetGame } from "../game/reset.js";

export function openConfirmReset() {
    const overlay = document.createElement("div");
    overlay.className = "menu-overlay";

    overlay.innerHTML = `
        <div class="confirm-box">
            <h2>Spiel wirklich zurücksetzen?</h2>
            <div class="confirm-buttons">
                <button id="yes">Ja</button>
                <button id="no">Nein</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector("#yes").onclick = () => {
        overlay.remove();
        resetGame();
    };

    overlay.querySelector("#no").onclick = () => overlay.remove();
}

// register reset button handler here to ensure openConfirmReset is defined
const resetBtnEl = document.getElementById("resetBtn");
if(resetBtnEl) resetBtnEl.onclick = openConfirmReset;
