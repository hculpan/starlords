"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameLocation_1 = require("./GameLocation");
class Game {
    constructor() {
        this.locations = [];
        for (let x = 0; x < Game.MAX_COLS; x++) {
            this.locations[x] = [];
            for (let y = 0; y < Game.MAX_ROWS; y++) {
                this.locations[x][y] = new GameLocation_1.GameLocation(x, y);
            }
        }
    }
    draw(canvas) {
        for (let x = 0; x < Game.MAX_COLS; x++) {
            for (let y = 0; y < Game.MAX_ROWS; y++) {
                this.locations[x][y].draw(canvas);
            }
        }
    }
}
Game.MAX_COLS = 48;
Game.MAX_ROWS = 15;
exports.Game = Game;
//# sourceMappingURL=Game.js.map