import axios from 'axios';
import db from './prismaClient.ts';
import dayjs from 'dayjs';
import "dotenv/config";

export default async function fetchStocks() {
  const todaysDate = dayjs().startOf('day')


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
    const symbols = await db.stocks.findMany({
      select: {
        symbol: true,
      },
    });


    //actual fetch from server
    await fetchFromStocksServer(symbols);

    


    //update the last time fetch or create if it is first time
    if (lastFetchDate) {
      await db.lastFetch.update({
        where: {
          id: 1
        },
        data: {
          lastFetch: todaysDate
        }
      })
    }
    else {
      await db.lastFetch.create({
        data: {
          lastFetch: todaysDate
        }
      })
    }

  } catch (error: any) {
    console.log('error');
    console.log('has to fix error of fetching stocks in the container');
    console.log(error.message);
  }

}


async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchFromStocksServer(symbols: { symbol: string }[]) {
  let fetches = 0;
  for (const item of symbols) {
    //symbols.forEach(async(item : {symbol:string})=>{
    const symbol = item.symbol;


    //need to replace it with actual key from .env
    //fetching from stockdata.org      
    //fetching stock history

    const response = await axios.get(`https://api.stockdata.org/v1/data/eod?symbols=${symbol}&api_token=${process.env.STOCKDATA_API_KEY}`);
    fetches++;
    console.log(response);
    await db.Stocks.update({
      where: {
        symbol
      },
      data: {
        data: response.data
      }

    })


    const responseCompanyProfile = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    //convert to default units from milions USD to USD
    responseCompanyProfile.data.marketCapitalization *= 1000000;
    await db.stocks.update({
      where: {
        symbol
      },
      data: {
        companyProfile: responseCompanyProfile.data
      }
    })




    //console.log('This is time out');
    //await delay(1000);

  }//)
  console.log('fetches was: ');
  console.log(fetches);
  return 0;
}