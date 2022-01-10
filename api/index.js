/**
 * index.js
 * 
 * This file is the entry point for the express server running the BetFair system.
 */

import express from 'express';
import MysqlDb from './db/mysql_adapter.js';

const app = express();
const PORT = process.env.PORT || 2000;
const db = new MysqlDb('127.0.0.1', 3306, 'root', '', 'betfairDB');
db.getRouletteOdds().then(vals => {
    console.log(vals);
});
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, _ => {
    console.log(`Server is listening on port ${PORT}`);
});