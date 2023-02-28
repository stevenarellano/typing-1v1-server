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
