export type MilestoneRequest = string;
export interface FinishedRequest {
	player_id: number;
	wpm: number;
}
export interface FinishedResponse {
	winner: boolean;
}
