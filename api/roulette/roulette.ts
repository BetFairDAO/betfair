/**
 * roulette.ts
 * 
 * The Roulette class is responsible for one "table" of roulette, which is equivalent to one game instance.
 */

import { EventEmitter } from 'stream';
import { RouletteEvents, RouletteWheel } from '../utils/roulette_types.js';
import SocketManager from '../utils/socket_manager.js';
import { SocketEvents } from '../utils/socket_types.js';

export default class Roulette {
    private _spinInterval: number;
    private _spinTimer: NodeJS.Timer;
    private _numSquares: number;
    private _em: EventEmitter;
    private _socketManager: SocketManager;


    constructor (spinInterval: number, em: EventEmitter, socketManager: SocketManager) {
        this._spinInterval = spinInterval;
        this._em = em;
        this._socketManager = socketManager;

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
}