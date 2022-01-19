import { EventEmitter } from 'events';
import { RouletteEvents, RouletteWheel } from '../utils/roulette_types.js';
import SocketManager from '../utils/socket_manager.js';
import { SocketEvents } from '../utils/socket_types.js';
export default class RouletteInstance {
    constructor(spinInterval, port) {
        this._spinInterval = spinInterval;
        this._em = new EventEmitter();
        this._socketManager = new SocketManager(port);
        this._em.on(RouletteEvents.SPIN_COMPLETE, result => {
            this._socketManager.broadcast(SocketEvents.SPIN_COMPLETE, result);
        });
    }
    _spin() {
        const winningNum = Math.floor(Math.random() * this._numSquares) + 1;
        const winningSquare = {
            num: winningNum,
            color: RouletteWheel[winningNum]
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
    getPort() {
        return this._socketManager.getSocketPort();
    }
    getConnectedClients() {
        return this._socketManager.getConnectedSockets();
    }
}
//# sourceMappingURL=rouletteinstance.js.map