import dayjs from "dayjs";
import db from "./prismaClient.ts";
import { Decimal } from "@prisma/client/runtime/library";



export default async function updatePortfolio() {
  const todaysDate : string = dayjs().format('YYYY-MM-DD');
  const yesterdayDate : string= dayjs().subtract(1,'day').format('YYYY-MM-DD');

  let portfolios : {
    userId: number,
    cashBalance: Decimal,
    totalBalance: Decimal,
    totalBalanceHistory: any
    stockHoldings: null |{},
    cashBalanceHistory:any
  }[];
  
  try{
     portfolios = await db.userPortfolio.findMany({
      select:{
        userId:true,
        totalBalance:true,
        cashBalance: true,
        totalBalanceHistory:true,
        cashBalanceHistory: true,
        stockHoldings: true
      }
    })


  }catch(error){
    console.log(error);
  }

  console.log(portfolios!);

  if (!!!portfolios!){
    return 'No portfolios yet'
  }


  portfolios.forEach(async(portfolio)=>{
    if(!portfolio?.stockHoldings){

      portfolio.totalBalanceHistory[yesterdayDate] = portfolio.totalBalance;
      portfolio.totalBalanceHistory[todaysDate] = portfolio.totalBalance;
      portfolio.cashBalanceHistory[todaysDate] = portfolio.cashBalance;
    }

    await db.userPortfolio.update({
     where:{
      userId: portfolio.userId,
     },
     data:{
      totalBalance: portfolio.totalBalance,
      cashBalance: portfolio.cashBalance,
      totalBalanceHistory: portfolio.totalBalanceHistory,
      cashBalanceHistory: portfolio.cashBalanceHistory
     } 
    })
    
  })

}