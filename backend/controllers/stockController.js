import dayjs from "dayjs";
import db from "../prismaClient.ts";
import { ai } from "../googleGem/client.ts";
import { cache, inProgress } from "../server.js";

const STOCKS_CACHE_KEY = 'stocks:all';
const STOCK_SYMBOL_CACHE_KEY = (symbol) => `stocks:symbol:${symbol}`;
const STOCK_OVERVIEW_CACHE_KEY = (symbol) => `stocks:overview:${symbol}`;

function setToCache(key, value) {
  const expiry = 1000 * 60 * 5;//5 mins

  cache.set(key, {
    value,
    expiry: Date.now() + expiry
  }
  );
}

function getFromCache(key) {
  const entry = cache.get(key);

  if (!entry || typeof entry !== 'object' || Date.now() > entry?.expiry) {
    cache.delete(key);
    return null
  }

  return entry.value;
}

export const getAllStocks = async (req, res) => {
  const stocks = getFromCache(STOCKS_CACHE_KEY);

  if (stocks) {
    
    return res.status(200).json(stocks);
  }

  try {
    const tableStocksData = await db.stocks.findMany();
    setToCache(STOCKS_CACHE_KEY, tableStocksData);
    return res.status(200).json(tableStocksData);
  } catch (error) {
    console.log('Error fetching all stocks:', error);
    return res.status(500).send('Error fetching stocks');
  }
};

export const getStockBySymbol = async (req, res) => {
  try {
    const { symbol } = req.params;
    const stockSymbolCacheKey = STOCK_SYMBOL_CACHE_KEY(symbol);

    let symbolData = getFromCache(stockSymbolCacheKey);

    if (symbolData) {
      return res.status(200).json(symbolData);
    }

    symbolData = await db.stocks.findUnique({
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
    });

    if (!symbolData) {
      return res.status(404).send('Stock not found');
    }

    setToCache(stockSymbolCacheKey, symbolData);
    return res.status(200).send(symbolData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return res.status(500).send('Error fetching stock data');
  }
};

export const getStockOverview = async (req, res) => {
  try {
    const todaysDate = dayjs().startOf('day');
    const { symbol } = req.params;
    const stockOverviewCacheKey = STOCK_OVERVIEW_CACHE_KEY(symbol);

    const result = getFromCache(stockOverviewCacheKey)
    
    if (result){
      
      return res.status(200).send({ overview: result.overview, lastUpdatedOverview: todaysDate });
    }


    if (inProgress.has(symbol)) {
      const existingPromise = await inProgress.get(symbol);
      const result = existingPromise;

      return res.status(200).send({ overview: result.text, lastUpdatedOverview: todaysDate });

    }

    const overview = await db.stocks.findUnique({
      where: {
        symbol
      },
      select: {
        overview: true,
        lastUpdatedOverview: true
      }
    });

    if (!overview) {
      return res.status(404).send('Stock not found');
    }

    if (overview.lastUpdatedOverview && todaysDate.isSame(overview.lastUpdatedOverview, 'day') && overview.overview) {
      setToCache(stockOverviewCacheKey, { overview: overview.overview, lastUpdatedOverview: overview.lastUpdatedOverview });



      return res.status(200).send(overview);
    }

    const generatePromise = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a financial analyst. Provide a brief, 3-5 line overview of the stock with symbol ${symbol}. Include:
- Current price standing or trend
- Overall market sentiment
- Key recent events or factors affecting it
Keep it simple, general, and easy to read.`,
    });

    inProgress.set(symbol, generatePromise);

    try {
      const { text } = await generatePromise;

      const updatedOverview = text;

      inProgress.delete(symbol);
      setToCache(stockOverviewCacheKey, { overview: updatedOverview, lastUpdatedOverview: todaysDate.toISOString() });

      await db.stocks.update({
        where: {
          symbol
        },
        data: {
          overview: updatedOverview,
          lastUpdatedOverview: todaysDate.toDate(),
        }
      });

      return res.status(200).send({ overview: updatedOverview, lastUpdatedOverview: todaysDate.toISOString() });

    } catch (aiError) {
      // Clean up inProgress on AI error
      inProgress.delete(symbol);

      console.log('AI generation error:', aiError);
      console.error('Attempting to fetch existing overview from database');

      // Try to fetch existing overview from database
      const existingOverview = await db.stocks.findUnique({
        where: {
          symbol
        },
        select: {
          lastUpdatedOverview: true,
          overview: true
        }
      });

      if (existingOverview && existingOverview.overview) {
        // Return existing overview with a 200 status since we have data
        return res.status(200).send({
          overview: existingOverview.overview,
          lastUpdatedOverview: existingOverview.lastUpdatedOverview,
          note: 'Using cached overview due to AI service unavailability'
        });
      }

      // No overview available in database
      return res.status(503).send('AI service unavailable and no cached overview found');
    }

  } catch (error) {
    console.error('Error fetching stock overview:', error);
    return res.status(500).send('Error fetching stock overview');
  }
};
