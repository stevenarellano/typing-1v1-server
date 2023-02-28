import { ObjectId } from 'mongodb';

export type SolanaReceipt = {
	_id?: ObjectId;
	queries: any;
	count: number;
	date_start: string;
	date_end: string;
};
