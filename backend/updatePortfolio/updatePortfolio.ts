import dayjs from "dayjs";
import db from "../prismaClient.ts";

import { validate } from "node-cron";
import isThereDate from "./isThereDate.ts";
import{ ValueOfPortfolioHoldings} from '@investpoint/shared'
type TotalBalanceEntry = {
  date: string,
  value: number
}



function isTotalBalanceEntry(value: unknown): value is TotalBalanceEntry {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    "date" in value &&
    "value" in value &&
    typeof (value as any).date === 'string' &&
    typeof (value as any).value === 'number'
  )
}



export default async function updatePortfolio() {
  const todaysDate: string = dayjs().format('YYYY-MM-DD');
  const yesterdayDate: string = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

  type Portfolios = {
    userId: number,
    cashBalance: Decimal,
    totalBalance: Decimal,
    totalBalanceHistory: {}[],
    stockHoldings: {}[],
    cashBalanceHistory: {}[],
  }[];


  let portfolios;
  let tableStocksData;
  try {
    portfolios = await db.userPortfolio.findMany({
      select: {
        userId: true,
        totalBalance: true,
        cashBalance: true,
        totalBalanceHistory: true,
        cashBalanceHistory: true,
        stockHoldings: true
      }
    })

    tableStocksData = await db.stocks.findMany({
      select: {
        symbol: true,
        data: true
      }
    })


  } catch (error) {
    console.log(error);
  }

  //console.log(portfolios!);

  if (!!!portfolios!) return 'No portfolios yet'
  

  if(!!!tableStocksData) return 'No market StockData' 


  portfolios.forEach(async (portfolio) => {
    const stockHoldings = portfolio?.stockHoldings
    const totalBalanceHistory = portfolio.totalBalanceHistory
    const cashBalanceHistory = portfolio.cashBalanceHistory



    if (stockHoldings === null) return

    if (totalBalanceHistory === null || !Array.isArray(totalBalanceHistory)) return

    if (cashBalanceHistory === null || !Array.isArray(cashBalanceHistory)) return


    const stockHoldingsLength = Object.entries(stockHoldings).length

    const yesterdaysTotalBalanceIndex: number | null = isThereDate(totalBalanceHistory, yesterdayDate);

    console.log(yesterdaysTotalBalanceIndex);

    if (yesterdaysTotalBalanceIndex !== null) {
      const entry = totalBalanceHistory[yesterdaysTotalBalanceIndex];

      if (!isTotalBalanceEntry(entry)) return

      //no stockHoldings
      if (stockHoldingsLength === 0) {
        entry.value = portfolio.totalBalance.toNumber();
        console.log(portfolio.totalBalance.toNumber());


      }
      else {
        


      }


    }

    //if backend restarts and there is already todays date
    //if there is already today date

    let alreadyToday: number | null = isThereDate(totalBalanceHistory, todaysDate);

    let totalBalance;


    if (alreadyToday === null) {


      //no stockHoldings
      if (stockHoldingsLength === 0) {

        totalBalanceHistory.push({ date: todaysDate, value: portfolio.totalBalance.toNumber() })
        
      }

      else{
        const marketHoldingsValue = ValueOfPortfolioHoldings(Object.entries(stockHoldings),tableStocksData);

        totalBalance = marketHoldingsValue + portfolio.cashBalance.toNumber();

        

        totalBalanceHistory.push({ date: todaysDate, value: portfolio.cashBalance.toNumber() + marketHoldingsValue });

      }

      cashBalanceHistory.push({ date: todaysDate, value: portfolio.cashBalance.toNumber() })


    }else{
      totalBalance = portfolio.totalBalance;
    }









    await db.userPortfolio.update({
      where: {
        userId: portfolio.userId,
      },
      data: {
        totalBalance,
        cashBalance: portfolio.cashBalance,
        totalBalanceHistory: totalBalanceHistory,
        cashBalanceHistory: cashBalanceHistory
      }
    })

  })

}