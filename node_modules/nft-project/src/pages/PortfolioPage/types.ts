export interface StockData {
  symbol: string;
  industry: string;
  data:{
    data:{
      date: string,
      close: number
    }[]
  }
}