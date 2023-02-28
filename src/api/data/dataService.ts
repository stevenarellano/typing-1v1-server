import { Collection, ObjectId } from 'mongodb';
import { getCollection } from '../../utils';
import { DataResponse, SolanaReceipt } from '../../types';

async function fetchReceipt(accessKey: string): Promise<SolanaReceipt> {
	let receipt: SolanaReceipt = {
		count: 0,
		queries: '',
		date_end: '',
		date_start: '',
	};

	try {
		const receiptData: Collection = getCollection('DataReceipt', 'solana');
		const _id: ObjectId = ObjectId.createFromHexString(accessKey);
		const res = (await receiptData.findOne({ _id })) as SolanaReceipt;

		if (!res) {
			throw 'Invalid Access Key';
		}
		receipt = { ...res };
	} catch (error) {
		console.log('ERROR: Could not find receipt');
	}

	return receipt;
}

async function fetchData(
	period: string[],
	queries: any,
	count: number
): Promise<DataResponse> {
	let response: DataResponse = { data: '', count: 0 };
	try {
		const deviceData: Collection = getCollection('DeviceData', 'all');

		const dataQuery = {
			date_added: {
				$gte: period[0],
				$lte: period[1],
			},
			...queries,
		};
		const result = await deviceData.find(dataQuery).limit(count).toArray();
		response = {
			count: result.length,
			data: result,
		};
	} catch (error) {
		console.log('ERROR: Failed to insert document');
	}
	return response;
}

export class DataService {
	public async feedback(accessKey: string): Promise<DataResponse> {
		console.log('DATA SERVICE: ', accessKey);
		const { count, queries, date_start, date_end } = await fetchReceipt(
			accessKey
		);
		if (count === 0) return { count: 0, data: [] };

		return await fetchData([date_start, date_end], queries, count);
	}
}

// 63c92f27f3be386e4fbd9ad4
