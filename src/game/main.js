import { initGame } from "./init.js";
import { registerMissButtons } from "./throws.js";
import { openConfirmReset } from "../menus/confirmMenu.js";
import "../board.js";
import "../menus/hitMenu.js";
import "../menus/winMenu.js";

initGame();
registerMissButtons();

// Register reset button handler after DOM is ready
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
    resetBtn.onclick = openConfirmReset;
}
