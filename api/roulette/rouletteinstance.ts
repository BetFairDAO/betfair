/**
 * roulette.ts
 * 
 * The Roulette class is responsible for one "table" of roulette, which is equivalent to one game instance.
 */

import { EventEmitter } from 'events';
import { RouletteEvents, RouletteWheel } from '../utils/roulette_types.js';
import SocketManager from '../utils/socket_manager.js';
import { SocketEvents } from '../utils/socket_types.js';

export default class RouletteInstance {
    private _spinInterval: number;
    private _spinTimer: NodeJS.Timer;
    private _numSquares: number;
    private _em: EventEmitter;
    private _socketManager: SocketManager;


    constructor (spinInterval: number, port: number) {
        this._spinInterval = spinInterval;
        this._em = new EventEmitter();
        this._socketManager = new SocketManager(port);

        this._em.on(RouletteEvents.SPIN_COMPLETE, result => {
            // TODO: Web3 integraion -> send spin result to smart contract to handle payout determination
            this._socketManager.broadcast(SocketEvents.SPIN_COMPLETE, result);

            // TODO: Web3 integraion -> query smart contract to get total payouts, betting data & store in database
        });
    }

    /**
     * Runs a game epoch of roulette. A random wheel square is selected and emitted on the SPIN_COMPLETE Roulette Event.
     */
    private _spin() {
        // Generate the winning number
        const winningNum = Math.floor(Math.random() * this._numSquares) + 1;
        // If the selected number is even, color is black
        const winningSquare = {
            num: winningNum,
            color: RouletteWheel[winningNum]
        };

        // Emit spin event with result
        this._em.emit(RouletteEvents.SPIN_COMPLETE, winningSquare);
    }

    /**
     * Starts the game loop
     */
    start() {
        if (this._spinTimer === undefined) {
            this._spinTimer = setInterval(this._spin, this._spinInterval);
        }
    }

    /**
     * Stops the game loop
     */
    stop() {
        clearInterval(this._spinTimer);
        this._spinTimer = undefined;
    }

    /**
     * Returns the port of the listening socket
     * @returns Port of listening socket
     */
    getPort():number {
        return this._socketManager.getSocketPort();
    }

    /**
     * Returns the number of clients connected to the instance socket
     * @returns Number of connected sockets
     */
    getConnectedClients(): number {
        return this._socketManager.getConnectedSockets();
    }
}