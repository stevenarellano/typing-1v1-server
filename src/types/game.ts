export interface GameInstance {
	playersConnected: number;
	prompt: string;
	players: Player[];
	promptsSent: number;
}
export interface Player {
	password: string;
	connected: boolean;
}


