import { findPortfolioByUserId } from '../utils/portfolioHelpers.js';

export const getPortfolio = async (req, res) => {
  const userId = req.userId;

  try {
    const userPortfolio = await findPortfolioByUserId(userId);
    if (!userPortfolio) {
      return res.status(404).send('Portfolio not found');
    }

    return res.status(200).send(userPortfolio);

  } catch (err) {
    return res.status(503).send('Service unavailable');
  }
};
