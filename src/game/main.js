// Import all modules first (order matters!)
import "../menus/hitMenu.js";
import "../menus/confirmMenu.js";
import "../menus/winMenu.js";
import "../board.js";

// Then import game logic
import { initGame } from "./init.js";
import { registerMissButtons } from "./throws.js";
import { openConfirmReset } from "../menus/confirmMenu.js";

// Initialize game
initGame();
registerMissButtons();

// Register reset button handler after DOM is ready
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
    resetBtn.onclick = openConfirmReset;
}
