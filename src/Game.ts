import { GameLocation } from "./GameLocation";
import { NameGenerator } from "./NameGenerator";

export class Game {
    static MAX_COLS: number = 48;

    static MAX_ROWS: number = 15;

    locations: GameLocation[][];

    constructor() {
        this.locations = [];
        for (let x = 0; x < Game.MAX_COLS; x++) {
            this.locations[x] = [];
            for (let y = 0; y < Game.MAX_ROWS; y++) {
                this.locations[x][y] = new GameLocation(x, y);
            }
        }
    }

    draw(canvas: CanvasRenderingContext2D): void {
        for (let x = 0; x < Game.MAX_COLS; x++) {
            for (let y = 0; y < Game.MAX_ROWS; y++) {
                this.locations[x][y].draw(canvas);
            }
        }
    }
}


