export type MilestoneRequest = { data: string };
export interface FinishedRequest {
	player_id: number;
	wpm: number;
}
export interface FinishedResponse {
	winner: boolean;
}
