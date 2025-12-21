import express, { json } from "express";
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'
import fetchStocks  from "./fetchStocks.ts";
import db from "./prismaClient.ts";
import authMiddlewere from "./middlewere/authMiddlewere.js";
import apiRoutes from './Routes/apiRoutes.js'
import cookieParser from 'cookie-parser';



const app = express();
const PORT = 3000;

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}))

//to allow to check cookies


app.use(express.json());

//fetch live stocks from 
setInterval(()=>{
  fetchStocks();
},1000*60*60);





app.get('/stocks', async(req,res) =>{
  const tableStocksData = await db.stocks.findMany();

  res.send(tableStocksData).status(200);
})

app.use('/auth',authRoutes);

app.use('/api',authMiddlewere,apiRoutes);


app.listen(PORT, () => {
  console.log('Server started at port',PORT);
});