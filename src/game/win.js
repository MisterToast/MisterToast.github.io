import { openWinMenu } from "../menus/winMenu.js";
import { players } from "./game.js";

export function showWinner(player) {
    openWinMenu(player.name, players);
}
