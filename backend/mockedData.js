import db from "./prismaClient";

const data ={}


const stocks = await db.stocks.findMany();
console.log(stocks[0].symbol);
console.log(stocks[0].data);