import { Collection } from 'mongodb';
import { getCollection } from '../../utils';
import { PayResponse, SolanaReceipt } from '../../types';

/*
	TODO
	checkTransaction: responsible for ensuring that the frontend paid in solana the correct amount
*/
async function checkTransaction() {}

/*
	addReceipt: adds the users queries to the access database and returns their access key
	OUTPUT: access_key (string)
*/
async function addReceipt(
	period: string[],
	queries: any,
	count: number
): Promise<string> {
	let accessKey = '';
	try {
		const receiptData: Collection = getCollection('DataReceipt', 'solana');
		const result = await receiptData.insertOne({
			queries,
			count,
			date_start: period[0],
			date_end: period[1],
		});
		accessKey = result.insertedId.toString();
	} catch (error) {
		console.log('ERROR: Failed to insert document');
	}
	return accessKey;
}

export class PayService {
	public async feedback(
		period: string[],
		queries: any,
		count: number
	): Promise<PayResponse> {
		console.log('PAY SERVICE: ', period, queries, count);
		// TODO: ADD SOLANA TXN HANDLING
		const accessKey = await addReceipt(period, queries, count);
		return { access_key: accessKey };
	}
}
