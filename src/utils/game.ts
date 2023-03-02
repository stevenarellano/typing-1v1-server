import { GAME } from '../context';

function getPlayer(password: string): number {
	if (password === GAME.players[0].password) {
		return 0;
	} else if (password === GAME.players[1].password) {
		return 1;
	} else {
		return -1;
	}
}

export { getPlayer };
