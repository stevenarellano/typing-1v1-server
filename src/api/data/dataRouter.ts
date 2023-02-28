import express from 'express';
import { Container } from 'typescript-ioc';
import { DataController } from './dataController';

const urlPath = '/data';

const router = express.Router();

const dataController = Container.get(DataController);

router.post(urlPath, (req, res) => {
	dataController.postHandler(req, res);
});

export { router as dataRouter };
