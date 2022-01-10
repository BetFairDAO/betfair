import { RouletteSquare } from './utils/roulette_types.js';

class Roulette {
    private _spinInterval: number;
    private _spinLength: number;
    private _spinTimer: NodeJS.Timer;
    private GameOdds: Array<RouletteSquare>;


    constructor (spinInterval: number, spinlength: Number) {
        this._spinInterval = this._spinInterval;
        this._spinLength = this._spinLength;

        // Set initial state of game odds
        this._updateGameOdds();
    }

    private _updateGameOdds () {
        // Query database and get latest game odds
    }

    private _spin() {
        // Run spin logic here
    }

    start() {
        if (this._spinTimer === undefined) {
            this._spinTimer = setInterval(this._spin, this._spinInterval);
        }
    }

    stop() {
        clearInterval(this._spinTimer);
        this._spinTimer = undefined;
    }
}