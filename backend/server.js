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


export const cache = new Map();
export const inProgress = new Map();








const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

function runBackgroundJob(name, job) {
  Promise.resolve()
    .then(() => job())
    .catch((error) => {
      console.error(`[job:${name}] failed`);
      console.error(error);
    });
}




//to allow to check cookies
app.use(cookieParser());

app.use(cors({
  //origin: 'http://investpoint-project-backend-production.up.railway.app',
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

console.log(process.env.FRONTEND_URL || '*');




app.use(express.json());






runBackgroundJob('updatePortfolio-startup', updatePortfolio);

cron.schedule('10 0 * * *', () => {
  runBackgroundJob('updatePortfolio-cron', updatePortfolio);
  runBackgroundJob('clear-memoryCahe',cache.clear);
  runBackgroundJob('clear-memoryProgressCache',inProgress.clear);
})





//fetch live stocks from 
runBackgroundJob('fetchStocks-startup', fetchStocks);
setInterval(() => {

  runBackgroundJob('fetchStocks-interval', fetchStocks);
}, 1000 * 60 * 60);





//stocks
app.use('/stocks', stockRoutes);

app.use('/market', marketRoutes);

app.use('/auth', authRoutes);

app.use('/verify', authMiddlewere, verifyRoutes);

app.use('/api', authMiddlewere, apiRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});




app.listen(PORT, HOST, () => {
  console.log(`Server started at http://${HOST}:${PORT}`);
});