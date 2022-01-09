/**
 * index.js
 * 
 * This file is the entry point for the express server running the BetFair system.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, _ => {
    console.log(`Server is listening on port ${PORT}`);
});