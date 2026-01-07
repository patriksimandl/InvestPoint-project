import dayjs from "dayjs";
import db from "../prismaClient.ts";
import { Decimal, objectEnumValues } from "@prisma/client/runtime/library";
import { validate } from "node-cron";
import isThereDate from "./isThereDate.ts";

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


  } catch (error) {
    console.log(error);
  }

  //console.log(portfolios!);

  if (!!!portfolios!) {
    return 'No portfolios yet'
  }



  portfolios.forEach(async (portfolio) => {
    const stockHoldings = portfolio?.stockHoldings
    const totalBalanceHistory = portfolio.totalBalanceHistory
    const cashBalanceHistory = portfolio.cashBalanceHistory



    if (stockHoldings === null) return
    
    if (totalBalanceHistory === null || !Array.isArray(totalBalanceHistory)) return
    
    if (cashBalanceHistory === null || !Array.isArray(cashBalanceHistory)) return
    
    if (Object.entries(stockHoldings).length === 0) {
      console.log('s');

      const yesterdaysTotalBalanceIndex: number | null = isThereDate(totalBalanceHistory,yesterdayDate);

      console.log(yesterdaysTotalBalanceIndex);

      if (yesterdaysTotalBalanceIndex !== null) {
        const entry = totalBalanceHistory[yesterdaysTotalBalanceIndex];



        if (!isTotalBalanceEntry(entry)) return
        console.log(portfolio.totalBalance.toNumber());
        entry.value = portfolio.totalBalance.toNumber();
      }

      //if backend restarts and there is alredy todays date
      //if there is already today date

      let alreadyToday : number | null  = isThereDate(totalBalanceHistory,todaysDate);

      if (alreadyToday === null) {

        totalBalanceHistory.push({ date: todaysDate, value: portfolio.totalBalance.toNumber() })
        cashBalanceHistory.push({ date: todaysDate, value: portfolio.totalBalance.toNumber() })
      }
    }

    await db.userPortfolio.update({
      where: {
        userId: portfolio.userId,
      },
      data: {
        totalBalance: portfolio.totalBalance,
        cashBalance: portfolio.cashBalance,
        totalBalanceHistory: totalBalanceHistory,
        cashBalanceHistory: cashBalanceHistory
      }
    })

  })

}