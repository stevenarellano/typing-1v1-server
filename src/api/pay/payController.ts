import express from 'express';
import { Inject } from 'typescript-ioc';

import { PayService } from './payService';
import { PayResponse } from '../../types';

export class PayController {
	private payService: PayService;

	constructor(@Inject payService: PayService) {
		this.payService = payService;
	}

	public async postHandler(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		const { period, queries, count } = req.body;
		const quote: PayResponse = await this.payService.feedback(
			period,
			queries,
			count
		);
		res.send(quote);
	}
}
