type tableStocksData = {
    symbol: string;
    data: {
        data: {
            date: string;
            close: number;
        }[];
    };
}[];
export declare function ValueOfPortfolioHoldings(entries: [string, {
    quantity: number;
}][], tableStocksData: tableStocksData): number;
export {};
