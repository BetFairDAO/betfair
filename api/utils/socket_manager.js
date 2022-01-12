export default class SocketManager {
    constructor() {
        this._clientSockets = [];
    }
    broadcast(message, eventString) {
        for (let client of this._clientSockets) {
            client.emit(eventString, message);
        }
    }
}
//# sourceMappingURL=socket_manager.js.map