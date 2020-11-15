"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Planet {
    constructor(nameGenerator) {
        this._name = nameGenerator.generateName();
        this._productivity = Math.floor(Math.random() * 6);
        this._corporations = Math.floor(Math.random() * 6) + 2;
        this._citizens = Math.floor(Math.random() * 3);
    }
    get name() {
        return this._name;
    }
    get productivity() {
        return this._productivity;
    }
    get corporations() {
        return this._corporations;
    }
    get citizens() {
        return this._citizens;
    }
}
exports.Planet = Planet;
//# sourceMappingURL=Planet.js.map