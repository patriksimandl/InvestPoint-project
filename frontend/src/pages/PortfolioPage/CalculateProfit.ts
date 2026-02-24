import type { Portfolio } from "./Portfolio";
import type { StockData } from "./types";
import {ValueOfPortfolioHoldings} from '@investpoint/shared'

export function calculateStockHoldingsValue(userPortfolio: Portfolio | undefined, tableStocksData: StockData[]): { profitInMoney: number; profitInPercent: number } |number | undefined {

  const buyHoldingsValue = userPortfolio?.calculateStockHoldingsValue();


  

  if (!userPortfolio?.stockHoldings) return undefined;


  

  const entries = Object.entries(userPortfolio.stockHoldings);
  if (entries.length === 0) return 0;

  const marketStocksValue = ValueOfPortfolioHoldings(entries,tableStocksData);;

  
  

  // TODO: Implement market value calculation using tableStocksData
  /*entries.forEach((entry)=>{
    const symbol = entry[0];
    const quantity = entry [1].quantity;
    

    tableStocksData.forEach((stock)=>{
      if(stock.symbol === symbol){
        
        const price = stock.data.data[0].close * quantity;
        marketStocksValue += price;
      }
    })


  })


  
  console.log('market',marketStocksValue);
 console.log(marketStocksValue - Number(buyHoldingsValue));

  console.log((marketStocksValue - Number(buyHoldingsValue))/ Number(buyHoldingsValue) *100);
*/

  const profitInMoney = marketStocksValue - Number(buyHoldingsValue);  

  const profitInPercent = (marketStocksValue - Number(buyHoldingsValue))/ Number(buyHoldingsValue)*100; 

  return ({profitInMoney, profitInPercent });
}