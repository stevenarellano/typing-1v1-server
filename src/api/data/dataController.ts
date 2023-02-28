import express from 'express';
import { Inject } from 'typescript-ioc';

import { DataService } from './dataService';
import { DataResponse } from '../../types';

export class DataController {
	private dataService: DataService;

	constructor(@Inject dataService: DataService) {
		this.dataService = dataService;
	}

	public async postHandler(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		const { accessKey } = req.body;
		const data: DataResponse = await this.dataService.feedback(accessKey);
		res.send(data);
	}
}
