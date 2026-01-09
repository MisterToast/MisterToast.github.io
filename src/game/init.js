import { updateActivePlayer, updateRoundDarts } from "./uiPlayers.js";
import { updateAllPreviews } from "./uiFinish.js";

export function initGame() {
    updateActivePlayer();
    updateRoundDarts();
    updateAllPreviews();
}
