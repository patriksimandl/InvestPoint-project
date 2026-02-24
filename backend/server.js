import express, { json } from "express";
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'
import fetchStocks from "./fetchStocks.ts";
import db from "./prismaClient.ts";
import authMiddlewere from "./middlewere/authMiddlewere.js";
import apiRoutes from './Routes/apiRoutes.js'
import cookieParser from 'cookie-parser';
import verifyRoutes from './Routes/verifyRoutes.js'
import cron from 'node-cron'
import updatePortfolio from "./updatePortfolio/updatePortfolio.ts";
import dayjs from "dayjs";
import marketRoutes from './Routes/marketRoutes.js'
import stockRoutes from './Routes/stockRoutes.js'
import 'dotenv/config'
import { ai } from "./googleGem/client.ts";











const app = express();
const PORT = process.env.PORT




//to allow to check cookies
app.use(cookieParser());

app.use(cors({
  //origin: 'http://investpoint-project-backend-production.up.railway.app',
  origin: true,
  credentials: true
}))




app.use(express.json());






updatePortfolio();

cron.schedule('10 0 * * *', () => {
  updatePortfolio();
})








//fetch live stocks from 
fetchStocks();
setInterval(() => {

  fetchStocks();
}, 1000 * 60 * 60);





//stocks
app.use('/stocks', stockRoutes);

app.use('/market', marketRoutes);

app.use('/auth', authRoutes);

app.use('/verify', authMiddlewere, verifyRoutes);

app.use('/api', authMiddlewere, apiRoutes);




app.listen(PORT, () => {
  console.log('Server started at port', PORT);
});