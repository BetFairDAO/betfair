class Roulette {
    constructor(spinInterval, spinlength) {
        this._spinInterval = this._spinInterval;
        this._spinLength = this._spinLength;
        this._updateGameOdds();
    }
    _updateGameOdds() {
    }
    _spin() {
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
export {};
//# sourceMappingURL=roulette.js.map