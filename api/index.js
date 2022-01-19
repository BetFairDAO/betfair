/**
 * index.js
 * 
 * This file is the entry point for the express server running the BetFair system.
 */

import express from 'express';
import MysqlDb from './db/mysql_adapter.js';
import Roulette from './roulette/roulette.js';

const app = express();
const PORT = process.env.PORT || 2000;
const db = new MysqlDb('127.0.0.1', 3306, 'root', '', 'betfairDB');

// Initialize game with 1 table
const roulette = new Roulette();
roulette.createInstance();

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/get-roulette-tables', (req, res) => {
    res.send(JSON.stringify({"active-instances": roulette.getActiveInstances()}));
});

app.listen(PORT, _ => {
    console.log(`Server is listening on port ${PORT}`);
});