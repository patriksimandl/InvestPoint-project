import dayjs from "dayjs";

export class Transaction {
  price: number;
  quantity: number;
  timestamp: string;
  type: string;
  symbol: string;

  constructor(price: number, quantity: number, timestamp: string, type: string, symbol: string) {
    this.price = price;
    this.quantity = quantity;
    this.timestamp = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
    this.type = type;
    this.symbol = symbol;
  }
}