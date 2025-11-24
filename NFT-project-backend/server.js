import express from "express";
const app = express();
const PORT = 3000;

app.get('/', (req,res) =>{
  console.log('GET request');
  res.sendStatus(200);
})


app.listen(PORT, () => {
  console.log('Server started at port',PORT);
});