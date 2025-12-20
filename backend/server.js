import express, { json } from "express";
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'
import fetchStocks  from "./fetchStocks.ts";
import db from "./prismaClient.ts";

const app = express();
const PORT = 3000;


app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}))

app.use(express.json());

//fetch live stocks from 
setInterval(()=>{
  fetchStocks();
},1000*60*60);





app.get('/stocks', async(req,res) =>{
  const tableStocksData = await db.stocks.findMany();

  res.send(tableStocksData).status(200);
})

app.use('/api',authRoutes);


app.listen(PORT, () => {
  console.log('Server started at port',PORT);
});