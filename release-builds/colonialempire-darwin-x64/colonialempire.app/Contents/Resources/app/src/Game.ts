export class Game {
    private canvas: HTMLCanvasElement;

    private _isRunning: boolean = false;

    private _intervalId: any;

    constructor() {
    }

    initCanvas(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        let context = this.canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    stopGame(): void {
        if (!this.isRunning) return;
        let button: HTMLInputElement = <HTMLInputElement>document.getElementById("start-btn");
        button.disabled = false;
        button = <HTMLInputElement>document.getElementById("stop-btn");
        button.disabled = true;
        button = <HTMLInputElement>document.getElementById("pause-btn");
        button.disabled = true;
        
        this._isRunning = false;
        window.clearInterval(this._intervalId);
        let context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    pauseGame(): void {
        if (!this.isRunning) return;
        let button: HTMLInputElement = <HTMLInputElement>document.getElementById("start-btn");
        button.disabled = false;
        button = <HTMLInputElement>document.getElementById("stop-btn");
        button.disabled = true;
        button = <HTMLInputElement>document.getElementById("pause-btn");
        button.disabled = true;
        
        this._isRunning = false;
        window.clearInterval(this._intervalId);
    }

    startGame(): void {
        if (this.isRunning) return;
        let button: HTMLInputElement = <HTMLInputElement>document.getElementById("start-btn");
        button.disabled = true;
        button = <HTMLInputElement>document.getElementById("stop-btn");
        button.disabled = false;
        button = <HTMLInputElement>document.getElementById("pause-btn");
        button.disabled = false;

        this._isRunning = true;
        this._intervalId = window.setInterval(this.drawFrame, 1, this);
    }

    drawFrame(game: Game): void {
        let context = game.canvas.getContext('2d');

        let x = Math.random() * (game.canvas.width - 100);
        let y = Math.random() * (game.canvas.height - 100);
        let w = 20 + Math.random() * 100;
        let h = 20 + Math.random() * 100;
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        context.fillStyle = "rgb(" + r + "," + b + "," + g + ")";
        context.fillRect(x, y, w, h);
    }
}


