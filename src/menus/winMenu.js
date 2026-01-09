import { resetGame } from "../game/reset.js";

export function openWinMenu(winnerName, players){
    const o = document.createElement("div");
    o.className = "menu-overlay";
    o.innerHTML = `
        <div class="win-box">
            <h2>🏆 ${winnerName} gewinnt!</h2>
            <table>
                <tr><th>Spieler</th><th>Würfe</th><th>Punkte</th></tr>
                ${players.map(p=>`
                    <tr>
                        <td>${p.name}</td>
                        <td>${p.totalThrows}</td>
                        <td>${501 - p.score}</td>
                    </tr>`).join("")}
            </table>
            <button class="rematch-btn">Rematch</button>
        </div>`;
    document.body.appendChild(o);
    o.querySelector(".rematch-btn").onclick = ()=>{
        o.remove();
        resetGame();
    };
}
