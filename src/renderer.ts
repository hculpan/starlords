import { Planet } from './Planet';
import { GameLocation } from './GameLocation';
import { ipcRenderer } from 'electron';
import { Game } from './Game';

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let game: Game = new Game();
let lastName: string = "";

function getMousePos(canvas: HTMLCanvasElement, event: any): any {
  let rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function convertMouseToLocation(mousePos: any): GameLocation {
  let gridLocations: GameLocation[] = [];

  for (let i = 0; i < Game.MAX_COLS; i++) {
    for (let j = 0; j < Game.MAX_ROWS; j++) {
      if (game.locations[i][j].inBouncds(mousePos.x, mousePos.y)) {
        gridLocations.push(game.locations[i][j]);
      }
    }
  }

  if (gridLocations.length == 0) {
     return null;
  } else if (gridLocations.length == 1) {
    return gridLocations[0];
  } else {
    let lowestDistance: number = 1000;
    let lowestLocation: GameLocation;
    for (let i = 0; i < gridLocations.length; i++) {
      if (!gridLocations[i]) continue;
  
      let pos: any = gridLocations[i].getCenterLocation();
      let xd = (mousePos.x - pos.x)^2;
      let yd = (mousePos.y - pos.y)^2;
      let distance = Math.sqrt(xd + yd);
      if (distance < lowestDistance) {
        lowestDistance = distance;
        lowestLocation = gridLocations[i];
      }
    }
    return lowestLocation;
  }
}

function handleMouseMove(canvas: HTMLCanvasElement, event: any) {
  let loc = convertMouseToLocation(getMousePos(canvas, event));
  let context = canvas.getContext('2d');
  if (loc && loc.planet) {
    if (loc.planet.name !== lastName) {
      context.clearRect(820, 540, 400, 200);
      context.fillStyle = "white";
      context.font = "20px Arial";
      context.fillText("Planet: " + loc.planet.name, 820, 640);
      context.font = "16px Arial";
      context.fillText("Productivity: " + loc.planet.productivity, 840, 660);
      context.fillText("Corporations: " + loc.planet.corporations, 840, 680);
      context.fillText("Citizenry:    " + loc.planet.citizens, 840, 700);
    }
  } else {
    context.clearRect(820, 540, 400, 200);
  }
}

function handleMouseClick(canvas: HTMLCanvasElement, event: any) {
  let loc = convertMouseToLocation(getMousePos(canvas, event));
  let context = canvas.getContext('2d');
  if (loc && loc.selected) {
    loc.selected = false;
    loc.drawHexFull(context);
  } else if (loc) {
    deselectAllHexes(canvas);
    loc.selected = true;
    loc.drawHexFull(context);
  }
}

function deselectAllHexes(canvas: HTMLCanvasElement) {
  let context = canvas.getContext('2d');
  for (let i = 0; i < Game.MAX_COLS; i++) {
    for (let j = 0; j < Game.MAX_ROWS; j++) {
      let loc = game.locations[i][j];
      if (loc.selected) {
        loc.selected = false;
        loc.drawHexFull(context);
      }
    }
  }
}

window.onload = function () {
  ipcRenderer.on('new-game', (event: any) => {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    canvas.addEventListener('mousemove', function(event) { 
      handleMouseMove(canvas, event);
    });

    canvas.addEventListener('click', function(event) {
      handleMouseClick(canvas, event);
    });
  
    let context = canvas.getContext('2d');

    while (true) {
      let x = Math.floor(Math.random() * Game.MAX_COLS) + 1;
      let y = Math.floor(Math.random() * Game.MAX_ROWS) + 1;
      if (game.locations[x][y].planet) {
        game.locations[x][y].playerOwned = true;
        break;
      }
    }
  
    game.draw(context);
  });
}