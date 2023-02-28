const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io: Server = new Server(server);

interface GameInstance {
	playersConnected: number;
	prompt: string;
	players: Player[];
	promptsSent: number;
}
interface Player {
	password: string;
	connected: boolean;
}

let game: GameInstance = {
	playersConnected: 0,
	prompt: 'all I want for christmas is you',
	players: [
		{ password: 'asdf', connected: false },
		{ password: '1234', connected: false },
	],
	promptsSent: 0,
};

let visitNumberInSecond = 1;
let lastAccess = new Date().getSeconds();

app.get('/', (req: any, res: any) => {
	res.send('Hello World');
});

app.post('/connect', (req: any, res: any) => {
	const date = new Date();
	if (date.getSeconds() === lastAccess) {
		visitNumberInSecond = 2;
	} else {
		visitNumberInSecond = 1;
		lastAccess = date.getSeconds();
	}

	// console.log(`connection from: ${req.body.password}`);

	const { password } = req.body;

	let player = -1;
	if (password === game.players[0].password) {
		player = 0;
	} else if (password === game.players[1].password) {
		player = 1;
	}

	if (player === 0) {
		if (game.players[0].connected === false) {
			game.playersConnected++;
			game.players[0].connected = true;
		}
	}
	if (player === 1) {
		if (game.players[1].connected === false) {
			game.playersConnected++;
			game.players[1].connected = true;
		}
	}
	if (game.playersConnected === 2 && player !== -1) {
		if (
			(visitNumberInSecond === 1 && game.promptsSent === 0) ||
			(visitNumberInSecond === 2 && game.promptsSent === 1)
		) {
			console.log(game);
			console.log(visitNumberInSecond);
			res.send(game.prompt);
			game.promptsSent++;

			if (game.promptsSent >= 2) {
				game = {
					playersConnected: 0,
					prompt: 'all I want for christmas is you',
					players: [
						{ password: 'asdf', connected: false },
						{ password: '1234', connected: false },
					],
					promptsSent: 0,
				};
			}
		} else {
			res.send('All players connected, game will start soon');
		}
	} else {
		res.send("Waiting for other player to connect, don't refresh");
	}
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
	console.log('listening on PORT: 3000');
});
