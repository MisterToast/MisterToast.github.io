import { players, currentPlayerIndex, currentThrow, maxThrows, setCurrentPlayerIndex, setCurrentThrow } from "./game.js";
import { updateActivePlayer, updateRoundDarts } from "./uiPlayers.js";
import { updateAllPreviews } from "./uiFinish.js";

export function nextThrow(bust = false) {
    const p = players[currentPlayerIndex];

    if (!bust && currentThrow < maxThrows) {
        setCurrentThrow(currentThrow + 1);
    } else {
        p.roundsScore = p.score;
        setCurrentThrow(1);

        const nextIndex = (currentPlayerIndex + 1) % players.length;
        players[nextIndex].roundDarts = [];
        setCurrentPlayerIndex(nextIndex);
    }

    updateActivePlayer();
    updateRoundDarts();
    updateAllPreviews();
}
