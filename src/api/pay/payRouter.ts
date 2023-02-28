import express from 'express';
import { Container } from 'typescript-ioc';
import { PayController } from './payController';

const urlPath = '/pay';

const router = express.Router();

const payController = Container.get(PayController);

router.post(urlPath, (req, res) => {
	payController.postHandler(req, res);
});

export { router as payRouter };
