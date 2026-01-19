export function ValueOfPortfolioHoldings(entries, tableStocksData) {
    let marketStocksValue = 0;
    entries.forEach((entry) => {
        const symbol = entry[0];
        const quantity = entry[1].quantity;
        tableStocksData.forEach((stock) => {
            if (stock.symbol === symbol) {
                const price = stock.data.data[0].close * quantity;
                marketStocksValue += price;
                return;
            }
        });
    });
    return marketStocksValue;
}
