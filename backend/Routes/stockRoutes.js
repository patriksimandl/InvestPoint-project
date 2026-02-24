import express from "express";
import dayjs from "dayjs";
import db from "../prismaClient.ts";
import { ai } from "../googleGem/client.ts";

const router = express.Router();

const cache = new Map();
const inProgress = new Map();


router.get('/', async (req, res) => {
  try {
    const tableStocksData = await db.stocks.findMany();
    res.json(tableStocksData).status(200);
  } catch (error) {
    console.error('Error fetching all stocks:', error);
    res.status(500).send('Error fetching stocks');
  }
})

router.get('/:symbol', async (req, res) => {
  


  try {
    const { symbol } = req.params

    const symbolData = await db.stocks.findUnique({
      where: {
        symbol
      },
      select: {
        data: true,
        symbol: true,
        name: true,
        logoURL: true,
        companyProfile: true,
      }
    })

    if (!symbolData) {
      return res.status(404).send('Stock not found');
    }

    return res.status(200).send(symbolData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).send('Error fetching stock data');
  }
});

router.get('/:symbol/overview', async (req, res) => {
  const now = Date.now();
  try {
    const todaysDate = dayjs().startOf('day');
    const { symbol } = req.params


    
    // if there is aleready cached value
    if (cache.has(symbol)) {
      console.log('cache');
      const result = cache.get(symbol);
      const overview = result.overview
      return res.status(200).send({overview,lastUpdatedOverview: todaysDate});
      
    }

    // if ai generating is in promise
    if (inProgress.has(symbol)) {
      console.log('inProgress');
      const existingPromise = await inProgress.get(symbol);
      const result = existingPromise;
      return res.status(200).send({overview: result.text, lastUpdatedOverview: todaysDate});
    }


    const overview = await db.stocks.findUnique({
      where: {
        symbol
      },
      select: {
        overview: true,
        lastUpdatedOverview: true
      }
    })

    if (!overview) {
      return res.status(404).send('Stock not found');
    }

    if (overview.lastUpdatedOverview && todaysDate.isSame(overview.lastUpdatedOverview, 'day')) {
      cache.set(symbol, { overview: overview.overview, lastUpdatedOverview: overview.lastUpdatedOverview });
      return res.status(200).send(overview);
    }



    //generate new
    const generatePromise = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a financial analyst. Provide a brief, 3-5 line overview of the stock with symbol ${symbol}. Include:
- Current price standing or trend
- Overall market sentiment
- Key recent events or factors affecting it
Keep it simple, general, and easy to read.`,
    });
    
    inProgress.set(symbol, generatePromise);

    const { text } = await generatePromise;
    const updatedOverview = text;
    
    inProgress.delete(symbol);
    cache.set(symbol, { overview: updatedOverview, lastUpdatedOverview: todaysDate.toISOString() });

    await db.stocks.update({
      where: {
        symbol
      },
      data: {
        overview: updatedOverview,
        lastUpdatedOverview: todaysDate.toDate(),
      }
    })

    return res.status(200).send({ overview: updatedOverview, lastUpdatedOverview: todaysDate.toISOString() });
  } catch (error) {
    console.error('Error fetching stock overview:', error);
    res.status(500).send('Error fetching stock overview');
  }
})



export default router;
