export interface MilestoneRequest {
	player_id: number;
	milestone: number;
}
export interface FinishedRequest {
	player_id: number;
	wpm: number;
}
export interface FinishedResponse {
	winner: boolean;
}
