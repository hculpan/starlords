import { NameGenerator } from "./NameGenerator";

export class Planet {
    private _name: string;

    private _productivity: number;

    private _corporations: number;

    private _citizens: number;

    constructor(nameGenerator: NameGenerator) {
        this._name = nameGenerator.generateName();
        this._productivity = Math.floor(Math.random() * 6);
        this._corporations = Math.floor(Math.random() * 6) + 2;
        this._citizens = Math.floor(Math.random() * 3);
    }

    get name(): string {
        return this._name;
    }

    get productivity(): number {
        return this._productivity;
    }

    get corporations(): number {
        return this._corporations;
    }

    get citizens(): number {
        return this._citizens;
    }
}