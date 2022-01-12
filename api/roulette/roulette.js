import { RouletteColor, RouletteEvents } from '../utils/roulette_types.js';
export default class Roulette {
    constructor(spinInterval, em) {
        this._spinInterval = spinInterval;
        this._em = em;
    }
    _spin() {
        const winningNum = Math.floor(Math.random() * this._numSquares) + 1;
        const winningSquare = {
            num: winningNum,
            color: (winningNum % 2 == 0 ? RouletteColor.BLACK : RouletteColor.RED)
        };
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
//# sourceMappingURL=roulette.js.map