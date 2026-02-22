export interface StockData {
  name: string
  symbol: string;
  industry: string;
  data:{
    data:{
      date: string,
      close: number
      open:number
    }[]
  }
}