import express, { json } from "express";
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'
import fetchStocks  from "./fetchStocks.ts";
import db from "./prismaClient.ts";
import authMiddlewere from "./middlewere/authMiddlewere.js";
import apiRoutes from './Routes/apiRoutes.js'
import cookieParser from 'cookie-parser';
import verifyRoutes from './Routes/verifyRoutes.js'
import cron from 'node-cron'
import updatePortfolio from "./updatePortfolio/updatePortfolio.ts";
import dayjs from "dayjs";
import marketRoutes from './Routes/marketRoutes.js'
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT

//to allow to check cookies
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}))




app.use(express.json());






updatePortfolio();

cron.schedule('10 0 * * *',()=>{
  updatePortfolio();
})








//fetch live stocks from 
fetchStocks();
setInterval(()=>{
  
  fetchStocks();
},1000*60*60);




//stocks
app.get('/stocks', async(req,res) =>{
  const tableStocksData = await db.stocks.findMany();

  res.send(tableStocksData).status(200);
})

//one symbol
app.get('/stocks/:symbol',async(req,res) =>{
  const {symbol} = req.params

  const symbolData = await db.stocks.findUnique({
    where: {
      symbol
    },
    select: {
      data: true,
      symbol: true,
      name: true,
      logoURL: true,
      companyProfile: true
    }
  })

  //data array
  
  console.log(symbolData);

  res.send(symbolData).status(200);


})

app.use('/market',marketRoutes);

app.use('/auth',authRoutes);

app.use('/verify',authMiddlewere,verifyRoutes);

app.use('/api',authMiddlewere,apiRoutes);




app.listen(PORT, () => {
  console.log('Server started at port',PORT);
});