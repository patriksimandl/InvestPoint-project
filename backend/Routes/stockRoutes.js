import express from "express";
import { getAllStocks, getStockBySymbol, getStockOverview } from './controllers/stockController.js';

const router = express.Router();

router.get('/', getAllStocks)

router.get('/:symbol', getStockBySymbol);

router.get('/:symbol/overview', getStockOverview)





export default router;
