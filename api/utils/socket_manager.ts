/**
 * socket_manager.ts
 * 
 * Generic SocketManager class that handles client connections, disconnections, and message broadcasts.
 * Note: This is a unidirectional broadcast socket system. The host cannot receive any socket data from clients.
 */

import { Server, Socket } from "socket.io";
import { SocketEvents } from "./socket_types";
import * as http from 'http';

export default class SocketManager {
    private _clientSockets: Set<Socket>;
    private _socketServer: Server;

    /**
     * SocketManager Constructor
     * @param httpServer HttpServer instance with which the socket will be connected to
     */
    constructor(httpServer: http.Server) {
        this._clientSockets = new Set();
        this._socketServer = new Server(httpServer);

        this._socketServer.on('connection', clientSocket => {
            this._clientSockets.add(clientSocket);
            clientSocket.on('disconnect', _ => {
                this._clientSockets.delete(clientSocket);
            });
        });
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

    /**
     * Getter method for number of connected sockets
     * @returns Number of connected sockets
     */
    getConnectedSockets(): number {
        return this._clientSockets.size;
    }
}