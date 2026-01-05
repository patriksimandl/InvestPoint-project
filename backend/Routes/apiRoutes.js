import express from 'express'
import db from "../prismaClient.ts";
import dayjs from 'dayjs';
import { compare } from 'bcryptjs';
import { Decimal } from '@prisma/client/runtime/library';


const router = express.Router();


router.get('/portfolio', async (req, res) => {
  const userId = req.userId;

  try {
    const userPortfolio = await db.userPortfolio.findUnique({
      where: {
        userId
      }
    })


    return res.send(userPortfolio).status(200);


  } catch (err) {
    res.sendStatus(503);
  }

})



router.post('/orders', async (req, res) => {
  console.log('hit');
  const userId = req.userId;

  
  const type = req.body.type;
  const price = req.body.price;
  const quantity = req.body.numberOfShares;
  const symbol = req.body.symbol
  const date = dayjs();

  



  let portfolio;

  try {
    portfolio = await db.userPortfolio.findUnique({
      where: {
        userId
      }
    })
  } catch (err) {
    res.sendStatus(503)
  }

  let portfolioId = portfolio?.id;
  let stockHoldings = portfolio?.stockHoldings;
  
  const prevCashBalance = Number(portfolio.cashBalance);
  const prevTotalBalance = Number(portfolio.totalBalance);
  
  let updatedTotalBalance
  

  if (symbol in stockHoldings) {
    
    const prevAvgPrice = stockHoldings[symbol].avgBuyPricePerShare;
    const prevQuantity = stockHoldings[symbol].quantity;
    



    if (type === 'BUY') {
      stockHoldings[symbol] = {
        avgBuyPricePerShare: ((prevAvgPrice * prevQuantity)+(price * quantity))/(prevQuantity+quantity),
        quantity: prevQuantity + quantity,

      }

      updatedTotalBalance = prevTotalBalance + (((prevAvgPrice * prevQuantity)+(price * quantity))/(prevQuantity+quantity) * quantity)
    }

  }
  else {


    if (type === 'BUY') {

      stockHoldings = {
        ...stockHoldings,
        [symbol]: {
          avgBuyPricePerShare: ((price / quantity).toFixed(15)),
          quantity

        }

      }
      updatedTotalBalance = prevTotalBalance + ((price/quantity) * quantity)
    }
    else {

    }

  }

  console.log(prevTotalBalance);
  console.log(price)
  console.log(quantity);
  console.log(updatedTotalBalance);


  try {
    await db.userPortfolio.update({
      where: {
        userId
      },
      data: {
        stockHoldings,
        cashBalance: type === 'BUY'
          ? prevCashBalance - price 
          : prevCashBalance + price,
        totalBalance: updatedTotalBalance
      }
    })

    await db.transactionHistory.create({
      data:{
        portfolioId,
        price: price,
        quantity: quantity,
        timestamp: date,
        type
      }
    })



  } catch (error) {
    res.sendStatus(503)
  }








})


export default router

