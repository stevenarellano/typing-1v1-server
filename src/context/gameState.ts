import { GameInstance } from '../types';
import { getRandomPrompt } from './prompts';

let GAME: GameInstance = {
	playersConnected: 0,
	prompt: 'all I want for christmas is you',
	players: [
		{ password: 'asdf', connected: false },
		{ password: '1234', connected: false },
	],
	promptsSent: 0,
	winnerDeclared: false,
};

const NEW_GAME: GameInstance = {
	playersConnected: 0,
	prompt: 'all I want for christmas is you',
	players: [
		{ password: 'asdf', connected: false },
		{ password: '1234', connected: false },
	],
	promptsSent: 0,
	winnerDeclared: false,
};

function createGameInstance(player1: string, player2: string): GameInstance {
	return {
		playersConnected: 0,
		prompt: getRandomPrompt(),
		players: [
			{ password: player1, connected: false },
			{ password: player2, connected: false },
		],
		promptsSent: 0,
		winnerDeclared: false,
	};
}

function resetGame(player1: string, player2: string) {
	GAME = createGameInstance(player1, player2);
}

export { GAME, NEW_GAME, resetGame, createGameInstance };
