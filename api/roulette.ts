class Roulette {
    spinInterval: number;
    spinLength: number;
    spinTimer: NodeJS.Timer;

    constructor (spinInterval: number, spinlength: Number) {
        this.spinInterval = this.spinInterval;
        this.spinLength = this.spinLength;
    }

    private _spin() {
        // Run spin logic here
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