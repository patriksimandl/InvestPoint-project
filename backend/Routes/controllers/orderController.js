import db from "../../prismaClient.ts";
import dayjs from 'dayjs';
import updateExistingHolding from '../orders/ordersSymbolInPortfolio.js';
import { isReqestValid } from '../orders/isReqestValid.ts';
import { fetchPortfolioAndSymbolData } from '../utils/portfolioHelpers.js';
import { addTransactionToHistory } from '../utils/transactionHelpers.js';

export const createOrder = async (req, res) => {
  console.log('hit');
  const userId = req.userId;

  const type = req.body.type;
  const quantity = req.body.numberOfShares;
  const symbol = req.body.symbol
  const date = dayjs();

  let portfolio;
  let symbolData;

  try {
    const result = await fetchPortfolioAndSymbolData(userId, symbol);
    portfolio = result.portfolio;
    symbolData = result.symbolData;
  } catch (err) {
    return res.status(503).send('Service unavailable')
  }

  if (!portfolio) {
    return res.status(404).send('Portfolio not found');
  }

  if (!symbolData?.data?.data?.[0]?.close) {
    return res.status(404).send('Symbol data not found');
  }

  let portfolioId = portfolio?.id;
  let stockHoldings = portfolio?.stockHoldings ?? {};

  const prevCashBalance = Number(portfolio.cashBalance);
  const prevTotalBalance = Number(portfolio.totalBalance);
  const priceOfShare = Number(symbolData.data.data[0].close);

  let updatedTotalBalance;

  if (!isReqestValid(portfolio, quantity, priceOfShare, type, symbol)) {
    return res.status(400).send('Invalid Request');
  }

  if (symbol in stockHoldings) {
    const result = updateExistingHolding({
      stockHoldings,
      symbol,
      type,
      priceOfShare,
      quantity,
      prevTotalBalance
    });

    stockHoldings = result.stockHoldings;
    updatedTotalBalance = result.updatedTotalBalance;
  } else {
    if (type === 'BUY') {
      stockHoldings = {
        ...stockHoldings,
        [symbol]: {
          avgBuyPricePerShare: priceOfShare,
          quantity
        }
      }
      // Explicitly recalculate: subtract cash spent, add stock value gained
      updatedTotalBalance = prevTotalBalance - (priceOfShare * quantity) + (priceOfShare * quantity)
    } else {
      return res.status(400).send('Error');
    }
  }

  try {
    await db.userPortfolio.update({
      where: {
        userId
      },
      data: {
        stockHoldings,
        cashBalance: type === 'BUY'
          ? prevCashBalance - priceOfShare * quantity
          : prevCashBalance + priceOfShare * quantity,
        totalBalance: updatedTotalBalance
      }
    })

    await addTransactionToHistory({
      portfolioId,
      symbol,
      totalPrice: priceOfShare * quantity,
      quantity,
      timestamp: date,
      type
    });

  } catch (error) {
    return res.status(503).send('Fatal Error');
  }

  return res.sendStatus(201)
};
