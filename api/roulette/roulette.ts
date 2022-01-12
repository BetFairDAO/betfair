import { EventEmitter } from 'stream';
import { RouletteColor, RouletteEvents } from '../utils/roulette_types.js';

export default class Roulette {
    private _spinInterval: number;
    private _spinTimer: NodeJS.Timer;
    private _numSquares: number;
    private _em: EventEmitter;


    constructor (spinInterval: number, em: EventEmitter) {
        this._spinInterval = spinInterval;
        this._em = em;
    }

    private _spin() {
        // Generate the winning number
        const winningNum = Math.floor(Math.random() * this._numSquares) + 1;
        // If the selected number is even, color is black
        const winningSquare = {
            num: winningNum,
            color: (winningNum % 2 == 0 ? RouletteColor.BLACK : RouletteColor.RED)
        };

        // Emit spin event with result
        this._em.emit(RouletteEvents.SPIN_COMPLETE, winningSquare);
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