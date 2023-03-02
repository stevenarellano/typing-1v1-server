"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket_io_1 = require("socket.io");
const api_1 = require("./api");
const context_1 = require("./context");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new socket_io_1.Server(server);
/* GETS */
app.get('/', (req, res) => res.send('Hello World'));
/* POSTS */
app.post('/connect', (req, res) => (0, api_1.connectController)(req, res));
app.post('/finished', (req, res) => {
    const { player_id } = req.body;
    const finishedResponse = {
        winner: true,
    };
    // io.emit('finished', player_id);
    console.log(`Player ${player_id} finished!`);
    if (!context_1.GAME.winnerDeclared) {
        console.log(`Player ${player_id} is the winner!`);
        context_1.GAME.winnerDeclared = true;
        res.send(finishedResponse);
    }
    else {
        console.log(`Player ${player_id} finished second. Resetting game.`);
        finishedResponse.winner = false;
        res.send(finishedResponse);
        (0, context_1.resetGame)(context_1.GAME.players[0].password, context_1.GAME.players[1].password);
    }
});
app.post('/milestone', (req, res) => {
    const { player_id, milestone } = req.body;
    // io.emit('finished', player_id);
    console.log(`Player ${player_id} reached milestone ${milestone} !`);
    res.send(`Player ${player_id} reached milestone ${milestone}!`);
});
io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);
    socket.on('reset_game', (arg) => {
        console.log('resetting game with arg: ', arg);
        (0, context_1.resetGame)(arg.player1, arg.player2);
        console.log(context_1.GAME);
    });
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
