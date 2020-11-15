"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class GameRendererInterface {
    static initialize() {
        console.log('Initializing GameRenderInterface: ' + process.type);
    }
    static newGame() {
        console.log('Starting new game');
        let game = electron_1.ipcRenderer.sendSync('new-game');
        let newGameButton = document.getElementById("new-game-btn");
        newGameButton.disabled = true;
        let nextTurnButton = document.getElementById("next-turn-btn");
        nextTurnButton.disabled = false;
        GameRendererInterface.updateGameDisplay(game);
    }
    static nextTurn() {
        console.log('Starting new turn');
        let game = electron_1.ipcRenderer.sendSync('next-turn');
        GameRendererInterface.updateGameDisplay(game);
    }
    static drawGridLocation(context, grid, gridx, gridy) {
        let gridLocation = grid[gridx][gridy];
        console.log(gridx + "." + gridy + ": " + gridLocation.type);
        switch (gridLocation.type) {
            case 0: // building
                context.fillStyle = 'black';
                break;
            case 1: // forest
                context.fillStyle = 'green';
                break;
            case 2: // grassland
                context.fillStyle = 'lightgreen';
                break;
            default:
                context.fillStyle = 'black';
        }
        context.fillRect(160 + gridx * 64, 160 + gridy * 64, 64, 64);
    }
    static updateGameDisplay(gameState) {
        console.log('Updating game display');
        let turnLabel = document.getElementById("turnLabel");
        turnLabel.value = gameState.turn.toString();
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                GameRendererInterface.drawGridLocation(context, gameState.grid, x, y);
            }
        }
        // draw grid
        context.strokeStyle = 'gray';
        context.lineWidth = 2;
        for (let x = 1; x < 5; x++) {
            context.beginPath();
            context.moveTo(160 + x * 64, 160);
            context.lineTo(160 + x * 64, 480);
            context.stroke();
        }
        for (let y = 1; y < 5; y++) {
            context.beginPath();
            context.moveTo(160, 160 + y * 64);
            context.lineTo(480, 160 + y * 64);
            context.stroke();
        }
    }
}
exports.GameRendererInterface = GameRendererInterface;
//# sourceMappingURL=GameRendererInterface.js.map