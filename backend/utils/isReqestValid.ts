import { symlink } from "fs";

type userPortfolio = {
    userId: number,
    cashBalance: string,
    totalBalance: string,
    totalBalanceHistory: {}[],
    stockHoldings: {
     [symbol: string]: {
      avgPricePerShare: number,
      quantity: number
     } 
    },
    cashBalanceHistory: {}[],
  };



export function isReqestValid(userPorfolio : userPortfolio, quantity: number, pricePerShare: number,type: string,symbol: string){

  if(type === 'BUY'){
    if(quantity * pricePerShare > Number(userPorfolio.cashBalance)) return false
    else return true
  }
  else if (type === 'SELL'){
    if(quantity > userPorfolio.stockHoldings[symbol].quantity)
      return false
    else return true
  }


}