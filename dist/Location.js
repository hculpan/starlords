"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Location {
    draw(canvas, q, r) {
        canvas.strokeStyle = "lightgray";
        let baseX = Math.floor(q / 2) * 32 + 10;
        let baseY = r * 48 + 10;
        if (q % 2 != 0) { // odd col
            baseX += 16;
            baseY += 24;
        }
        canvas.beginPath();
        canvas.moveTo(baseX + 16, baseY);
        canvas.lineTo(baseX + 32, baseY + 8);
        canvas.lineTo(baseX + 32, baseY + 24);
        canvas.lineTo(baseX + 16, baseY + 32);
        if (q == 0) {
            canvas.lineTo(baseX, baseY + 24);
            canvas.lineTo(baseX, baseY + 8);
            canvas.lineTo(baseX + 16, baseY);
        }
        else if (q == 1) {
            canvas.moveTo(baseX, baseY + 24);
            canvas.lineTo(baseX, baseY + 8);
        }
        if (r == 0 && q % 2 == 0) {
            canvas.moveTo(baseX, baseY + 8);
            canvas.lineTo(baseX + 16, baseY);
        }
        else if (r == 14 && q % 2 != 0) {
            canvas.moveTo(baseX + 16, baseY + 32);
            canvas.lineTo(baseX, baseY + 24);
        }
        canvas.stroke();
    }
}
exports.Location = Location;
//# sourceMappingURL=Location.js.map