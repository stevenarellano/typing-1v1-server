const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
import { Server } from 'socket.io';
import { GAME, connectController, resetGame } from './api';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io: Server = new Server(server);

app.get('/', (req: any, res: any) => {
	res.send('Hello World');
});

app.post('/connect', (req: any, res: any) => {
	connectController(req, res);
});

interface FinishedRequest {
	player_id: number;
	wpm: number;
}
interface FinishedResponse {
	winner: boolean;
}
app.post('/finished', (req: any, res: any) => {
	const { player_id } = req.body as FinishedRequest;

	const finishedResponse: FinishedResponse = {
		winner: true,
	};
	// io.emit('finished', player_id);
	console.log(`Player ${player_id} finished!`);

	if (!GAME.winnerDeclared) {
		GAME.winnerDeclared = true;
		res.send(finishedResponse);
	} else {
		finishedResponse.winner = false;
		res.send(finishedResponse);
		resetGame();
	}
});

interface MilestoneRequest {
	player_id: number;
	milestone: number;
}
app.post('/milestone', (req: any, res: any) => {
	const { player_id, milestone } = req.body as MilestoneRequest;
	// io.emit('finished', player_id);
	console.log(`Player ${player_id} reached milestone ${milestone} !`);
	res.send(`Player ${player_id} reached milestone ${milestone}!`);
});

app.get('/api', (req: any, res: any) => {
	console.log('this ran');
	io.emit('api', 'It works!!!');
	res.send('good job');
});

io.on('connection', (socket: any) => {
	console.log(`a user connected: ${socket.id}`);
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
