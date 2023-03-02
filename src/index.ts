const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
import { Server } from 'socket.io';
import { connectController } from './api';
import { GAME, resetGame } from './context';
import {
	FinishedRequest,
	FinishedResponse,
	MilestoneRequest,
	Players,
} from './types';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io: Server = new Server(server);

/* GETS */
app.get('/', (req: any, res: any) => res.send('Hello World'));

/* POSTS */
app.post('/connect', (req: any, res: any) => connectController(req, res));

app.post('/finished', (req: any, res: any) => {
	const { player_id } = req.body as FinishedRequest;

	const finishedResponse: FinishedResponse = {
		winner: true,
	};
	// io.emit('finished', player_id);
	console.log(`Player ${player_id} finished!`);

	if (!GAME.winnerDeclared) {
		console.log(`Player ${player_id} is the winner!`);
		GAME.winnerDeclared = true;
		res.send(finishedResponse);
	} else {
		console.log(`Player ${player_id} finished second. Resetting game.`);
		finishedResponse.winner = false;
		res.send(finishedResponse);
		resetGame(GAME.players[0].password, GAME.players[1].password);
	}
});

app.post('/milestone', (req: any, res: any) => {
	const { player_id, milestone } = req.body as MilestoneRequest;
	// io.emit('finished', player_id);
	console.log(`Player ${player_id} reached milestone ${milestone} !`);
	res.send(`Player ${player_id} reached milestone ${milestone}!`);
});

io.on('connection', (socket: any) => {
	console.log(`a user connected: ${socket.id}`);

	socket.on('reset_game', (arg: Players) => {
		console.log('resetting game with arg: ', arg);
		resetGame(arg.player1, arg.player2);
		console.log(GAME);
	});
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
