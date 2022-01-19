import RouletteInstance from "./rouletteinstance.js";
export default class Roulette {
    constructor() {
        this._instances = new Set();
        this._openPort = 4000;
    }
    getActiveInstances() {
        var activePorts = new Array();
        for (let instance of this._instances) {
            activePorts.push([instance.getPort(), instance.getConnectedClients()]);
        }
        return activePorts;
    }
    createInstance() {
        const newInst = new RouletteInstance(500, this._openPort);
        this._instances.add(newInst);
        this._openPort += 1;
    }
    removeInstance(port) {
    }
}
//# sourceMappingURL=roulette.js.map