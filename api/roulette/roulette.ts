/**
 * roulette.ts
 */

import RouletteInstance from "./rouletteinstance.js";

export default class Roulette {
    private _instances: Set<RouletteInstance>;
    private _openPort: number;

    constructor() {
        this._instances = new Set();
        this._openPort = 4000;
    }

    /**
     * Returns port number and number of connected clients for each active game instance
     * @returns Array containing [active port, number of connected clients]
     */
    getActiveInstances(): Array<Array<number>> {
        var activePorts = new Array<Array<number>>();
        for (let instance of this._instances) {
            activePorts.push([instance.getPort(), instance.getConnectedClients()])
        }
        return activePorts
    }

    createInstance() {
        const newInst = new RouletteInstance(500, this._openPort);
        this._instances.add(newInst);

        this._openPort += 1;
    }

    removeInstance(port: number) {
        // Removes instance by port #
    }
}