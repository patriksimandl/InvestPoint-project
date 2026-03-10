import db from "../prismaClient.ts";

export const findPortfolioByUserId = async (userId, select = null) => {
  return await db.userPortfolio.findUnique({
    where: {
      userId
    },
    ...(select && { select })
  });
};

export const fetchPortfolioAndSymbolData = async (userId, symbol) => {
  const portfolio = await findPortfolioByUserId(userId);

  const symbolData = await db.stocks.findUnique({
    where: {
      symbol: symbol
    },
    select: {
      data: true
    }
  });

  return { portfolio, symbolData };
};
