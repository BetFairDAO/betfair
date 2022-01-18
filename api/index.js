/**
 * index.js
 * 
 * This file is the entry point for the express server running the BetFair system.
 */

import express from 'express';
import http from 'http';
import MysqlDb from './db/mysql_adapter.js';
import EventEmitter from 'events';
import Roulette from './roulette/roulette.js';
import SocketManager from './utils/socket_manager.js';
import { SocketEvents } from './utils/socket_types.js';

const app = express();
const PORT = process.env.PORT || 2000;
const db = new MysqlDb('127.0.0.1', 3306, 'root', '', 'betfairDB');
var em = new EventEmitter();
const httpServer = http.createServer(app);
const socketManager = new SocketManager(httpServer);

const rouletteGame = new Roulette(500, em, socketManager);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, _ => {
    console.log(`Server is listening on port ${PORT}`);
});