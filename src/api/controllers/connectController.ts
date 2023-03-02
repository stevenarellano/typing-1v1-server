import { GAME } from '../../context';
import {
	createConnectResponse,
	getPlayer,
	getVisitNumberInSecond,
} from '../../utils';

let visitNumberInSecond = 1;
let lastAccess = new Date().getSeconds();

export function connectController(req: any, res: any): void {
	console.log(req.body);
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
			const connectResponse = createConnectResponse(
				true,
				GAME.prompt,
				player,
			);

			res.send(connectResponse);
			GAME.promptsSent++;
		} else {
			const connectResponse = createConnectResponse(
				false,
				'All players connected. Please wait to start.',
			);
			res.send(connectResponse);
		}
	} else {
		const connectResposne = createConnectResponse(
			false,
			'Waiting for other player to connect.',
		);

		res.send(connectResposne);
	}
}
