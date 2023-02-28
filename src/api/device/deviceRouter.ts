import express from 'express';
import { Container } from 'typescript-ioc';
import { DeviceController } from './deviceController';

const urlPath = '/device';

const router = express.Router();

const greeterController = Container.get(DeviceController);

router.get(urlPath, (req, res) => {
	greeterController.get(req, res);
});

export { router as deviceRouter };
