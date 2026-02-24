import {MainMenu}  from "../../shared/MainMenu";
import './StocksPage.css'
import { StockContainer } from "./StockContainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import LoadingIcon from '/LoadingIcon.svg'
import { NavLink, useSearchParams } from "react-router";
import { Portfolio } from "../PortfolioPage/Portfolio.ts";
import { BottomMenu } from "../../shared/BottomMenu.tsx";
import { IsLoggedContext } from "../../App";
import type { StockData } from "../PortfolioPage/types.ts";
import { Transaction } from "../PortfolioPage/Tranasaction.ts";
import dayjs from "dayjs";

type StockWithLogo = StockData & {
  logoURL: string;
  data: {
    meta: {};
    data: { date: string; close: number; open: number }[];
  };
};




export function StocksPage() {

  const { isLogged } = useContext(IsLoggedContext)!;
  
  const [SearchParams] = useSearchParams();


  const search = SearchParams.get('search');


  const { data: tableStocksData } = useQuery<StockWithLogo[]>({
    queryKey: ["stocksData"],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/stocks')
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks`)
      return response.data

    },
    //To refetch every hour
    staleTime: 1000 * 60 * 20,
  });

  const { data: userPortfolio } = useQuery({
    queryKey: ["userPortfolio"],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/api/portfolio', { withCredentials: true })
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio`, { withCredentials: true })

      const data = response.data;
      return new Portfolio(
        data.userId,
        data.totalBalance,
        data.cashBalance,
        data.totalBalanceHistory,
        data.cashBalanceHistory,
        data.stockHoldings,
        data.transactionHistory

      )

      
    },

  });

  const { data: transactionHistory } = useQuery({
    queryKey: ["transactionHistory"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transactionHistory`, { withCredentials: true })
      const data = response.data

      const transactionHistory = data.map((item: Transaction)=>{
        return new Transaction(item.price,item.quantity,item.timestamp,item.type,item.symbol);
      })

      return transactionHistory
      
    },

  });

  const totalBalance = Number(userPortfolio?.totalBalance ?? 0);
  const cashBalance = Number(userPortfolio?.cashBalance ?? 0);
  const holdingsCount = userPortfolio?.stockHoldings
    ? Object.keys(userPortfolio.stockHoldings).length
    : 0;
  const totalHistory = userPortfolio?.totalBalanceHistory ?? [];
  const latestTotal = totalHistory.length
    ? Object.values(totalHistory[totalHistory.length - 1])[1]
    : undefined;
  const previousTotal = totalHistory.length > 1
    ? Object.values(totalHistory[totalHistory.length - 2])[1]
    : undefined;
  const dailyChange =
    latestTotal !== undefined && previousTotal !== undefined
      ? latestTotal - previousTotal
      : undefined;
  const dailyChangePct =
    dailyChange !== undefined && previousTotal
      ? (dailyChange / previousTotal) * 100
      : undefined;

  let filteredTableStocksData: StockWithLogo[] | undefined;

  if (search && tableStocksData) {
    filteredTableStocksData = tableStocksData.filter((stock: StockWithLogo) => {
      return stock.name.toLowerCase().includes(search.toLowerCase()) || stock.symbol.toLowerCase().includes(search.toLowerCase());
    });
  } else if (search) {
    filteredTableStocksData = [];
  } else {
    filteredTableStocksData = tableStocksData ?? [];
  }

  console.log(latestTotal) 

  return (
    <>
      <title>Browse Stocks</title>
      <MainMenu />
      
      <div className="stocks-page-container pb-8">
        <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px] flex flex-col lg:flex-row gap-5">
          <div className={isLogged ? `w-full lg:w-[70%]` : `w-full`}>
            <div className={`stocks-grid relative  ${tableStocksData ? '' : `h-[calc(100vh-170px)]`}`}>
              {tableStocksData 
              ? 
               (filteredTableStocksData ?? []).map((stock) => {
                return <StockContainer key={stock.symbol} stock={stock} />
              }) :
                <div className="absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
                  <img className="w-[80px]" src={LoadingIcon}></img>
                  <div className="text-[25px] font-semibold"></div>
                </div>
              }
            </div>
          </div>

          {isLogged && (
            <div className="w-full lg:w-[30%] lg:sticky lg:top-[120px] h-auto lg:h-[79vh] bg-slate-50/70 rounded-[20px] p-[22px] flex flex-col shadow-md border border-slate-200/60">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-[18.5px] text-slate-900">You221[18r Portfolio</div>
                {dailyChange !== undefined && dailyChangePct !== undefined && (
                  <div
                    className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-full border ${dailyChange >= 0 ? 'text-emerald-700 bg-emerald-50 border-emerald-200/70' : 'text-rose-700 bg-rose-50 border-rose-200/70'}`}
                  >
                    {dailyChange >= 0 ? '+' : ''}${dailyChange.toFixed(2)}
                    <span className="ml-1">({dailyChangePct >= 0 ? '+' : ''}{dailyChangePct.toFixed(2)}%)</span>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-[16px] bg-white/80 border border-slate-200/70 p-4">
                <div className="text-[11.5px] uppercase tracking-[0.24em] text-slate-500">Total Balance</div>
                <div className="text-[26px] font-semibold mt-2 text-slate-900">${totalBalance.toFixed(2)}</div>
                <div className="text-[12.5px] text-slate-500 mt-2">Updated daily</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-[16px] bg-white/80 border border-slate-200/70 p-4">
                  <div className="text-[11.5px] uppercase tracking-[0.2em] text-slate-500">Cash</div>
                  <div className="text-[18px] font-semibold mt-2 text-slate-900">${cashBalance.toFixed(2)}</div>
                </div>
                <div className="rounded-[16px] bg-white/80 border border-slate-200/70 p-4">
                  <div className="text-[11.5px] uppercase tracking-[0.2em] text-slate-500">Holdings</div>
                  <div className="text-[18px] font-semibold mt-2 text-slate-900">{holdingsCount}</div>
                </div>
              </div>

              {transactionHistory && transactionHistory.length > 0 && (
                <div className="mt-4 rounded-[16px] bg-white/80 border border-slate-200/70 p-4">
                  <div className="text-[11.5px] uppercase tracking-[0.24em] text-slate-500 mb-3">Recent Transactions</div>
                  <div className="space-y-2 max-h-[180px] overflow-y-auto">
                    {transactionHistory.slice(0, 3).map((transaction: Transaction, index: number) => (
                      <div key={index} className="flex items-center justify-between gap-2 py-2 border-b border-slate-100 last:border-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase whitespace-nowrap ${
                            transaction.type === 'BUY' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {transaction.type}
                          </span>
                          <div className="min-w-0">
                            <div className="text-[12px] font-semibold text-slate-900 truncate">
                              {transaction.symbol}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {(transaction.timestamp)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[12px] font-semibold text-slate-900">
                            ${Number(transaction.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-auto p">
                <NavLink to="/portfolio" className="button-primary self-end w-full sm:w-[220px] md:w-[12vw]">
                  View More
                  <div className="flex items-center ml-[4px]">
                    <img className="h-[20px]" src="/arrow-right-icon-white.svg"></img>
                  </div>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomMenu />
    </>

  )
}