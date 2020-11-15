"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class GameRendererInterface {
    static newGame() {
        GameRendererInterface.updateGameDisplay(electron_1.ipcRenderer.sendSync('new-game'));
    }
    static updateGameDisplay(gameState) {
        let turnLabel = document.getElementById("turnLabel");
        turnLabel.value = gameState.turn.toString();
    }
}
exports.GameRendererInterface = GameRendererInterface;
//# sourceMappingURL=RendererGameInterface.js.map