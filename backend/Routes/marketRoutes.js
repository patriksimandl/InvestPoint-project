import express from "express";
import axios from "axios";

const router = express.Router();

let markethoursData = null;
let expiresIn = 0;

async function fetchMarketStatus(){
  const now = Date.now();

  if(markethoursData && now < expiresIn){
    return markethoursData;
  }
  const response = await axios.get('https://markethours.io/api/markets/status?markets=nasdaq');

  markethoursData = response.data
  expiresIn = now + 1000*60*5;  

  return markethoursData
}

router.get('/info',async(req,res)=>{
  const marketData = await fetchMarketStatus();

  res.send(marketData).status(200);
});

export default router