import express from 'express';
import { Inject } from 'typescript-ioc';

import { DeviceService } from './deviceService';

export class DeviceController {
	private deviceService: DeviceService;

	constructor(@Inject deviceService: DeviceService) {
		this.deviceService = deviceService;
	}

	public async get(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		const greeting = this.deviceService.feedback();

		res.send(greeting);
	}
}
