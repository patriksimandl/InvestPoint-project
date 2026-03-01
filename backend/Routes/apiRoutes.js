import express from 'express'
import { getPortfolio } from './controllers/portfolioController.js';
import { getTransactionHistory } from './controllers/transactionController.js';
import { createOrder } from './controllers/orderController.js';
import { toggleWatchList, getWatchList } from './controllers/watchlistController.js';

const router = express.Router();

router.get('/portfolio', getPortfolio);

router.get('/transactionHistory', getTransactionHistory);

router.post('/orders', createOrder);

router.post('/watchList', toggleWatchList);

router.get('/watchList', getWatchList);


export default router

