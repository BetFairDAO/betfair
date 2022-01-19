import { Server } from "socket.io";
import * as http from 'http';
import express from "express";
export default class SocketManager {
    constructor(port) {
        this._clientSockets = new Set();
        this._serverPort = port;
        this._expressApp = express();
        this._httpServer = new http.Server(this._expressApp);
        this._socketServer = new Server(this._httpServer);
        this._socketServer.on('connection', clientSocket => {
            this._clientSockets.add(clientSocket);
            clientSocket.on('disconnect', _ => {
                this._clientSockets.delete(clientSocket);
            });
        });
        this._httpServer.listen(this._serverPort);
    }
    broadcast(message, eventString) {
        for (let client of this._clientSockets) {
            client.emit(eventString, message);
        }
    }
    getConnectedSockets() {
        return this._clientSockets.size;
    }
    getSocketPort() {
        return this._serverPort;
    }
    close() {
        this._httpServer.close();
    }
}
//# sourceMappingURL=socket_manager.js.map