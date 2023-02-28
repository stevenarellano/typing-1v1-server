import { GameInstance } from '../../types';

export let GAME: GameInstance = {
	playersConnected: 0,
	prompt: 'all I want for christmas is you',
	players: [
		{ password: 'asdf', connected: false },
		{ password: '1234', connected: false },
	],
	promptsSent: 0,
	winnerDeclared: false,
};

const SAMPLE_GAME: GameInstance = {
	playersConnected: 0,
	prompt: 'all I want for christmas is you',
	players: [
		{ password: 'asdf', connected: false },
		{ password: '1234', connected: false },
	],
	promptsSent: 0,
	winnerDeclared: false,
};

function getVisitNumberInSecond(date: Date, lastAccess: number): number {
	if (date.getSeconds() === lastAccess) {
		return 2;
	} else {
		return 1;
	}
}

function getPlayer(password: string): number {
	if (password === GAME.players[0].password) {
		return 0;
	} else if (password === GAME.players[1].password) {
		return 1;
	} else {
		return -1;
	}
}

interface ConnectResponse {
	starting: boolean;
	player_id?: number;
	msg: string;
}

let visitNumberInSecond = 1;
let lastAccess = new Date().getSeconds();
export function connectController(req: any, res: any): void {
	const date = new Date();
	visitNumberInSecond = getVisitNumberInSecond(date, lastAccess);
	lastAccess = date.getSeconds();

	const { password } = req.body;
	const player = getPlayer(password);

	if (player === 0 && !GAME.players[0].connected) {
		GAME.playersConnected++;
		GAME.players[0].connected = true;
	}
	if (player === 1 && !GAME.players[1].connected) {
		GAME.playersConnected++;
		GAME.players[1].connected = true;
	}

	if (GAME.playersConnected === 2 && player !== -1) {
		if (
			(visitNumberInSecond === 1 && GAME.promptsSent === 0) ||
			(visitNumberInSecond === 2 && GAME.promptsSent === 1)
		) {
			const connectResponse: ConnectResponse = {
				starting: true,
				player_id: player,
				msg: GAME.prompt,
			};

			res.send(connectResponse);
			GAME.promptsSent++;

			if (GAME.promptsSent >= 2) {
				// DELETE THIS AT SOME POINT
				resetGame();
			}
		} else {
			const connectResponse: ConnectResponse = {
				starting: false,
				msg: 'All players connected. Please wait to start.',
			};
			res.send(connectResponse);
		}
	} else {
		const connectResposne: ConnectResponse = {
			starting: false,
			msg: 'Waiting for other player to connect.',
		};
		res.send(connectResposne);
	}
}

export function resetGame() {
	GAME = SAMPLE_GAME;
}
