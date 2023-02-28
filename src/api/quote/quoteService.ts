import { Collection, ObjectId } from 'mongodb';
import { getCollection } from '../../utils';
import { QuoteResponse } from '../../types';

function estimateCost(documentCount: number, queryCount: number) {
	/*
		WHEN PARAMETERS GO UP, THE COST WILL INCREASE (better data);
		CURRENT PRICING: 1 SOL PER 10,000 Data Points
	*/
	const complexityFactor = 0.0001 * 1.1 ** queryCount;
	const transactionFee = documentCount * 0.001; // PER 1000, WE EXPECT TO MAKE 1 SOL

	return complexityFactor * documentCount + transactionFee;
}

type Quote = {
	quote: number;
	data_count: number;
};

async function getQuote(dates: string[], queries: any, limit: number) {
	const deviceData: Collection = getCollection('DeviceData', 'all');

	const countQuery = {
		date_added: { $gte: dates[0], $lte: dates[1] },
		...queries,
	};

	const found = await deviceData.countDocuments(countQuery);
	const count = Math.min(limit, found);

	const numQueries = Object.keys(queries).length;

	const quote = Number(estimateCost(count, numQueries).toFixed(3));

	const response: Quote = {
		quote,
		data_count: count,
	};

	return response;
}

async function saveQuote(quote: number, data_count: number) {
	const quoteData: Collection = getCollection('Quotes', 'solana');
	const result = await quoteData.insertOne({
		quote: quote as number,
		data_count: data_count as number,
	});

	return result.insertedId.toHexString();
}

export async function findQuote(quoteId: string) {
	const quoteData: Collection = getCollection('Quotes', 'solana');
	const _id: ObjectId = ObjectId.createFromHexString(quoteId);
	const res = await quoteData.findOne({ _id });

	return res;
}

export class QuoteService {
	public async poster(
		period: string[],
		queries: any,
		limit: number
	): Promise<QuoteResponse> {
		console.log('QUOTE SERVICE POST: ', period, queries, limit);
		const quoteData = await getQuote(period, queries, limit);
		const quoteId = await saveQuote(quoteData.quote, quoteData.data_count);
		return { quote_id: quoteId };
	}

	public async getter(quoteId: string): Promise<any> {
		console.log('QUOTE SERVICE GET: ', quoteId);
		const quoteData = await findQuote(quoteId);
		if (!quoteData) {
			throw 'Invalid Quote ID';
		}
		return {
			quote_id: quoteId,
			cost: quoteData.quote,
			data_count: quoteData.data_count,
		};
	}
}
