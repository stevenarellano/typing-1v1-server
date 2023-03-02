import { ConnectResponse } from '../types';

function getVisitNumberInSecond(date: Date, lastAccess: number): number {
	if (date.getSeconds() === lastAccess) {
		return 2;
	} else {
		return 1;
	}
}

function createConnectResponse(
	starting: boolean,
	msg: string,
	player_id?: number,
): ConnectResponse {
	return {
		starting,
		msg,
		player_id,
	};
}

export { getVisitNumberInSecond, createConnectResponse };
