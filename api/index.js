/**
 * index.js
 * 
 * This file is the entry point for the express server running the BetFair system.
 */

import express from 'express';
import MysqlDb from './db/mysql_adapter.js';
import Spin from './utils/roulette_spin.js';

const app = express();
const PORT = process.env.PORT || 2000;
const db = new MysqlDb('127.0.0.1', 3306, 'root', '', 'betfairDB');

// Testing out the roulette wheel
db.getRouletteOdds().then(currentOdds => {
    console.log(Spin(currentOdds));
});
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, _ => {
    console.log(`Server is listening on port ${PORT}`);
});