import { Collection } from 'mongodb';
import { mongoURI } from '../constants';
import { data } from './mock_data/data2';

export const getCollection = (db: string, collection: string): Collection => {
	const { MongoClient, ServerApiVersion } = require('mongodb');
	const uri = mongoURI;
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});
	return client.db(db).collection(collection);
};

type DeviceDate = {
	device_name: string;
	payload: string;
	location: string;
	date_added: string;
	data_type: string;
	user_address: string;
};

// USED FOR SAVING SAMPLE DATA TO MONGODB BACKEND
export const saveSampleData = async (data: DeviceDate[]) => {
	const deviceData: Collection = getCollection('DeviceData', 'all');

	const res = await deviceData.insertMany(data);

	return res;
};
