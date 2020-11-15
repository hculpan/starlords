import { Planet } from './Planet';
import { NameGenerator } from './NameGenerator';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
export class GameLocation {
    private _q: number;

    private _r: number;

    private _planet: Planet;

    private _x: number;

    private _y: number;

    private _playerOwned: boolean = false;

    selected: boolean = false;

    static _nameGenerator: NameGenerator = new NameGenerator();

    constructor(q: number, r: number) {
        this._q = q;
        this._r = r;
        this._playerOwned = false;
        this.selected = false;

        if (Math.random() > 0.70) {
            this._planet = new Planet(GameLocation._nameGenerator);
        }
    }

    inBouncds(x: number, y: number): boolean {
        return (x >= this._x && y >= this._y && x <= this._x + 32 && y <= this._y + 32);
    }

    get playerOwned(): boolean {
        return this._playerOwned;
    }

    set playerOwned(value: boolean) {
        this._playerOwned = value;
    }

    getCenterLocation(): any {
        return {
            x: this._x + 16,
            y: this._y + 16
        }
    }

    get planet(): Planet {
        return this._planet;
    }

    public drawHexErased(canvas: CanvasRenderingContext2D): void {
        this.drawHexFull(canvas, "black");
    }

    public drawHexSelected(canvas: CanvasRenderingContext2D): void {
        this.drawHexFull(canvas, "red");
    }

    public drawHexFull(canvas: CanvasRenderingContext2D, color?: string): void {
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

    public draw(canvas: CanvasRenderingContext2D): void {
        let baseX = Math.floor(this._q / 2) * 32 + 10;
        let baseY = this._r * 48 + 10;
        if (this._q % 2 != 0) {  // odd col
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
            } else {
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
        } else if (this._q == 1) {
            canvas.moveTo(baseX, baseY + 24);
            canvas.lineTo(baseX, baseY + 8);
        } 
        
        if (this._r == 0 && this._q % 2 == 0) {
            canvas.moveTo(baseX, baseY + 8);
            canvas.lineTo(baseX + 16, baseY);
        } else if (this._r == 14 && this._q % 2 != 0) {
            canvas.moveTo(baseX + 16, baseY + 32);
            canvas.lineTo(baseX, baseY + 24);
        }

        canvas.stroke();
    }
}