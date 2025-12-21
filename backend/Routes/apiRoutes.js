import express from 'express'
import db from "../prismaClient.ts";


const router = express.Router();


router.get('/portfolio', async (req, res) => {
  const userId = req.userId;

  try {
    const userPortfolio = await db.userPortfolio.findUnique({
      where: {
        id: userId
      }
    })
    
    return res.send(userPortfolio).status(200);


  } catch (err) {
    res.sendStatus(503);
  }

})


export default router

