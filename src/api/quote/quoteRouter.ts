import express from 'express';
import { Container } from 'typescript-ioc';
import { QuoteController } from './quoteController';

const urlPath = '/quote';

const router = express.Router();

const quoteController = Container.get(QuoteController);

router.post(urlPath, (req, res) => {
	quoteController.postHandler(req, res);
});

router.get(urlPath, (req, res) => {
	quoteController.getHandler(req, res);
});

export { router as quoteRouter };
