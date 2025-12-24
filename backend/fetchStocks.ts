import axios from 'axios';
import db from './prismaClient.ts';
import dayjs from 'dayjs';
import dotenv from 'dotenv'

export default async function fetchStocks() {
  const todaysDate  = dayjs().startOf('day');


  try {
    //get last time fetched
    const lastFetchDate = await db.lastFetch.findUnique({
      where: {
        id: 1,
      },
    })

    
    //if it was today
    if (lastFetchDate && todaysDate.isSame(lastFetchDate.lastFetch)) {
      console.log('exit');
      return;
    }

    //get all the symbols
    const symbols = await db.Stocks.findMany({
      select: {
        symbol: true,
      },
    });

    //actual fetch from server
    await fetchFromStocksServer(symbols);

    //update the last time fetch or create if it is first time
    if(lastFetchDate){
      await db.lastFetch.update({
        where:{
          id: 1
        },
        data:{
          lastFetch: todaysDate
        }
      })
    }
    else{
      await db.lastFetch.create({
        data:{
          lastFetch: todaysDate
        }
      })
    }

  } catch (error : any) {
    console.log(error.message);
  }

}


async function delay(ms : number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchFromStocksServer(symbols: {symbol: string}[]){
  for(const item of symbols){
  //symbols.forEach(async(item : {symbol:string})=>{
      const symbol = item.symbol;


      //need to replace it with actual key from .env
      //use 'demo' as a key for testing or if need
      const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
      console.log(response);
      await db.Stocks.update({
        where:{
          symbol
        },
        data: {
          data: response.data
        }
        
      })

      console.log('This is time out');
      await delay(1000);
      
  }//)
  return 0;
}