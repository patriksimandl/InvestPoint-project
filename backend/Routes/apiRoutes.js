import express from 'express'
import db from "../prismaClient.ts";
import dayjs from 'dayjs';
import { compare } from 'bcryptjs';
import updateExistingHolding from './orders/ordersSymbolInPortfolio.js';
import { isReqestValid } from './orders/isReqestValid.ts';


const cache = new Map();

const router = express.Router();

const fetchPortfolioAndSymbolData = async (userId, symbol) => {
  const portfolio = await db.userPortfolio.findUnique({
    where: {
      userId
    }
  });

  const symbolData = await db.stocks.findUnique({
    where: {
      symbol: symbol
    },
    select: {
      data: true
    }
  });

  return { portfolio, symbolData };
};


router.get('/portfolio', async (req, res) => {
  const userId = req.userId;

  try {
    const userPortfolio = await db.userPortfolio.findUnique({
      where: {
        userId
      }
    })
    console.log(userPortfolio);

    return res.send(userPortfolio).status(200);


  } catch (err) {
    res.sendStatus(404).send('Portfolio not found');
  }

})


router.get('/transactionHistory', async (req, res) => {
  const userId = req.userId;

  try {
    const portfolio = await db.userPortfolio.findUnique({
      where: {
        userId
      },
      select: {
        id: true
      }
    });

    if (!portfolio) {
      return res.status(404).send('Portfolio not found');
    }

    const transactionHistory = await db.transactionHistory.findMany({
      where: {
        portfolioId: portfolio.id
      },
      orderBy: {
        timestamp: 'desc'
      }
    });

    return res.status(200).send(transactionHistory);

  } catch (err) {
    res.sendStatus(503);
  }
});






router.post('/orders', async (req, res) => {
  console.log('hit');
  const userId = req.userId;


  const type = req.body.type;
  //const price = req.body.price;
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
    return res.Status(503).send('first')
  }

  let portfolioId = portfolio?.id;
  let stockHoldings = portfolio?.stockHoldings;

  const prevCashBalance = Number(portfolio.cashBalance);
  const prevTotalBalance = Number(portfolio.totalBalance);
  const priceOfShare = Number(symbolData.data.data[0].close);


  let updatedTotalBalance;

  if (!isReqestValid(portfolio, quantity, priceOfShare, type, symbol)) return res.status(400).send('Invalid Request');



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
          avgBuyPricePerShare: ((priceOfShare * quantity / quantity).toFixed(15)),
          quantity

        }

      }
      updatedTotalBalance = prevTotalBalance - (priceOfShare * quantity) + ((priceOfShare * quantity / quantity) * quantity)
    }
    else {
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

    await db.transactionHistory.create({
      data: {
        portfolioId,
        symbol,
        price: priceOfShare * quantity,
        quantity: quantity,
        timestamp: date,
        type
      }
    })



  } catch (error) {
    return res.status(503).send('Fatal Error');
  }


  res.sendStatus(201)
})


router.post('/watchList', async (req, res) => {
  const {  userId } = req;
  const { symbol } = req.body

  try {
    const portfolio = await db.userPortfolio.findUnique({
      where: {
        userId
      },

    })

    const portfolioId = portfolio.id;

    const isSymbolOnWatchList = await db.watchList.findUnique({
      where: {
        portfolioId_symbol: {
          portfolioId,
          symbol
        }
      }

    })

    if (!isSymbolOnWatchList) {
      cache.delete(`watchList:${userId}`);
      await db.watchList.create({
        data: {
          portfolioId,
          symbol,

        }
      })
      return res.status(200).send('Created');
    }
    else {
      cache.delete(`watchList:${userId}`);
      await db.watchList.delete({
        where: {
          portfolioId_symbol: {
            portfolioId,
            symbol
          }
        }
      })
      return res.status(204).send('Deleted');
    }

  } catch (err) {
    return res.status(503).send(err.message);
  }


})

router.get('/watchList', async (req,res) =>{
  const {userId}  = req;

  if(cache.has(`watchList:${userId}`)) return res.status(200).send(cache.get(`watchList:${userId}`));

  try{
    const portfolio = await db.userPortfolio.findUnique({
      where: {
        userId
      },

    })
    const portfolioId = portfolio.id;  

    const watchList = await db.watchList.findMany({
      where:{
        portfolioId
      }
    })

    cache.set(`watchList:${userId}`,
      watchList
    );


    return res.status(200).send(watchList);


  }catch{
    return res.status(503).send('service Unavalible')
  }
})


export default router

