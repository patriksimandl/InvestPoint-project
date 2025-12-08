import express, { json } from "express";
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'
import fetchStocks  from "./fetchStocks.ts";

const app = express();
const PORT = 3000;


app.use(cors({
  origin: 'http://localhost:5000'
}))

app.use(express.json());

fetchStocks();




app.get('/stocks', (req,res) =>{




})

app.use('/api',authRoutes);


app.listen(PORT, () => {
  console.log('Server started at port',PORT);
});