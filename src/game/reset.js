import { players, setCurrentPlayerIndex, setCurrentThrow } from "./game.js";
import { updateActivePlayer, updateRoundDarts } from "./uiPlayers.js";
import { updateAllPreviews } from "./uiFinish.js";

export function resetGame() {
    players.forEach(p => {
        p.score = 501;
        p.scoreElement.textContent = p.score;
        p.totalThrows = 0;
        p.roundDarts = [];
        p.roundsScore = 501;
    });

    setCurrentPlayerIndex(0);
    setCurrentThrow(1);

    updateActivePlayer();
    updateRoundDarts();
    updateAllPreviews();
}
