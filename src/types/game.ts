export interface GameInstance {
	playersConnected: number;
	prompt: string;
	players: Player[];
	promptsSent: number;
	winnerDeclared: boolean;
}
export interface Player {
	password: string;
	connected: boolean;
}

export interface ConnectResponse {
	starting: boolean;
	player_id?: number;
	msg: string;
}

export interface Players {
	player1: string;
	player2: string;
}
