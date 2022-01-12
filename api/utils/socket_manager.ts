import { Server, Socket } from "socket.io";
import { SocketEvents } from "./socket_types";
import * as http from 'http';

export default class SocketManager {
    private _clientSockets: Array<Socket>;
    private _socketServer: Server;

    constructor(httpServer: http.Server) {
        this._clientSockets = [];
        this._socketServer = new Server(httpServer);
    }

    /**
     * Transmits message to all connected client sockets
     * @param message Result code to be sent to client
     * @param eventString Event key for socket transmission
     */
    broadcast(message: string, eventString: SocketEvents) {
        for (let client of this._clientSockets) {
            client.emit(eventString, message);
        }
    }
}