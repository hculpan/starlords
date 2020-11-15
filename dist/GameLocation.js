"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Planet_1 = require("./Planet");
const NameGenerator_1 = require("./NameGenerator");
class GameLocation {
    constructor(q, r) {
        this._playerOwned = false;
        this.selected = false;
        this._q = q;
        this._r = r;
        this._playerOwned = false;
        this.selected = false;
        if (Math.random() > 0.70) {
            this._planet = new Planet_1.Planet(GameLocation._nameGenerator);
        }
    }
    inBouncds(x, y) {
        return (x >= this._x && y >= this._y && x <= this._x + 32 && y <= this._y + 32);
    }
    get playerOwned() {
        return this._playerOwned;
    }
    set playerOwned(value) {
        this._playerOwned = value;
    }
    getCenterLocation() {
        return {
            x: this._x + 16,
            y: this._y + 16
        };
    }
    get planet() {
        return this._planet;
    }
    drawHexErased(canvas) {
        this.drawHexFull(canvas, "black");
    }
    drawHexSelected(canvas) {
        this.drawHexFull(canvas, "red");
    }
    drawHexFull(canvas, color) {
        let baseX = this._x;
        let baseY = this._y;
        console.log("Drawing hex with " + color);
        if (!color) {
            color = (this.selected ? "red" : "darkgray");
        }
        if (color !== "black") {
            this.drawHexFull(canvas, "black");
        }
        canvas.beginPath();
        canvas.strokeStyle = color;
        canvas.moveTo(baseX + 16, baseY);
        canvas.lineTo(baseX + 32, baseY + 8);
        canvas.lineTo(baseX + 32, baseY + 24);
        canvas.lineTo(baseX + 16, baseY + 32);
        canvas.lineTo(baseX, baseY + 24);
        canvas.lineTo(baseX, baseY + 8);
        canvas.lineTo(baseX + 16, baseY);
        canvas.stroke();
    }
    draw(canvas) {
        let baseX = Math.floor(this._q / 2) * 32 + 10;
        let baseY = this._r * 48 + 10;
        if (this._q % 2 != 0) { // odd col
            baseX += 16;
            baseY += 24;
        }
        this._x = baseX;
        this._y = baseY;
        canvas.beginPath();
        if (this._planet) {
            if (this._playerOwned) {
                canvas.strokeStyle = "lightblue";
                canvas.fillStyle = "blue";
            }
            else {
                canvas.strokeStyle = "lightgreen";
                canvas.fillStyle = "green";
            }
            canvas.arc(baseX + 16, baseY + 16, 8, 0, 360);
            canvas.fill();
        }
        canvas.stroke();
        canvas.beginPath();
        canvas.strokeStyle = "darkgray";
        canvas.moveTo(baseX + 16, baseY);
        canvas.lineTo(baseX + 32, baseY + 8);
        canvas.lineTo(baseX + 32, baseY + 24);
        canvas.lineTo(baseX + 16, baseY + 32);
        if (this._q == 0) {
            canvas.lineTo(baseX, baseY + 24);
            canvas.lineTo(baseX, baseY + 8);
            canvas.lineTo(baseX + 16, baseY);
        }
        else if (this._q == 1) {
            canvas.moveTo(baseX, baseY + 24);
            canvas.lineTo(baseX, baseY + 8);
        }
        if (this._r == 0 && this._q % 2 == 0) {
            canvas.moveTo(baseX, baseY + 8);
            canvas.lineTo(baseX + 16, baseY);
        }
        else if (this._r == 14 && this._q % 2 != 0) {
            canvas.moveTo(baseX + 16, baseY + 32);
            canvas.lineTo(baseX, baseY + 24);
        }
        canvas.stroke();
    }
}
GameLocation._nameGenerator = new NameGenerator_1.NameGenerator();
exports.GameLocation = GameLocation;
//# sourceMappingURL=GameLocation.js.map