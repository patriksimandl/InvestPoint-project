import express, { json } from "express";
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'

const app = express();
const PORT = 3000;


app.use(cors({
  origin: 'http://localhost:5000'
}))

app.use(express.json());

app.get('/menu', (req,res) =>{
  console.log('login');
  res.json({data: ['login','dawdad']}).status(200);
})

app.use('/api',authRoutes);


app.listen(PORT, () => {
  console.log('Server started at port',PORT);
});