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

fetchStocks();




app.get('/stocks', async(req,res) =>{
  const tableStocksData = await db.stocks.findMany();

  res.send(tableStocksData).status(200);
})

app.use('/api',authRoutes);


app.listen(PORT, () => {
  console.log('Server started at port',PORT);
});