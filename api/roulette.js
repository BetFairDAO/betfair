class Roulette {
    constructor(spinInterval, spinlength) {
        this.spinInterval = this.spinInterval;
        this.spinLength = this.spinLength;
    }
    _getLatestOdds() {
    }
    _spin() {
    }
    start() {
        if (this.spinTimer === undefined) {
            this.spinTimer = setInterval(this._spin, this.spinInterval);
        }
    }
    stop() {
        clearInterval(this.spinTimer);
        this.spinTimer = undefined;
    }
}
//# sourceMappingURL=roulette.js.map