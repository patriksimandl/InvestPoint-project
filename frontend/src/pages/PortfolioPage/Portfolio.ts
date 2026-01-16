export class Portfolio {

  userId: number;
  totalBalance: number;
  cashBalance: number;
  totalBalanceHistory: Record<string, number>[];
  cashBalanceHistory: Record<string, number>[];
  stockHoldings: Record<string, { quantity: number; avgBuyPricePerShare: number }> |Record<string, { quantity: number; avgBuyPricePerShare: number }> []| null;
  transactionHistory: any[] | null;


  constructor(
    userId: number,
    totalBalance: number,
    cashBalance: number,
    totalBalanceHistory: Record<string, number>[],
    cashBalanceHistory: Record<string, number>[],
    stockHoldings: Record<string, { quantity: number; avgBuyPricePerShare: number }> | null,
    transactionHistory: any[] | null
  ) {
    this.userId = userId
    this.totalBalance = totalBalance,
      this.cashBalance = cashBalance,
      this.totalBalanceHistory = totalBalanceHistory,
      this.cashBalanceHistory = cashBalanceHistory,
      this.stockHoldings = stockHoldings && typeof stockHoldings === 'object' && !Array.isArray(stockHoldings)
        ? Object.entries(stockHoldings).length > 0 ? stockHoldings : null : null;






    this.transactionHistory = transactionHistory


  }


  calculateStockHoldingsValue() {
    if (!this.stockHoldings) return ('Stock Holdings is not defined')

    const entries = Object.entries(this.stockHoldings);
    if (entries.length === 0) return;

    let HoldingsQuantity = 0;


    entries.forEach((entry: [string, { quantity: number; avgBuyPricePerShare: number }]) => {
      const quantity = entry[1].quantity
      const pricePerShare = entry[1].avgBuyPricePerShare;
      HoldingsQuantity += quantity * pricePerShare

    })

    return HoldingsQuantity;
  }
}