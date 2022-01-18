import { Server } from "socket.io";
export default class SocketManager {
    constructor(httpServer) {
        this._clientSockets = new Set();
        this._socketServer = new Server(httpServer);
        this._socketServer.on('connection', clientSocket => {
            this._clientSockets.add(clientSocket);
            clientSocket.on('disconnect', _ => {
                this._clientSockets.delete(clientSocket);
            });
        });
    }
    broadcast(message, eventString) {
        for (let client of this._clientSockets) {
            client.emit(eventString, message);
        }
    }
}
//# sourceMappingURL=socket_manager.js.map