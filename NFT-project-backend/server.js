import express from "express";
import cors from 'cors'

const app = express();
const PORT = 3000;


app.use(cors({
  origin: 'http://localhost:5000'
}))

app.get('/menu', (req,res) =>{
  console.log('login');
  res.json({data: ['login','dawdad']}).status(200);
})


app.listen(PORT, () => {
  console.log('Server started at port',PORT);
});