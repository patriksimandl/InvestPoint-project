import dayjs from "dayjs";
import { MainMenu } from "../../shared/MainMenu";
import { useContext, useState } from "react";
import './PortfolioPage.css'
import { Portfolio } from "./Portfolio.ts";
import HoldingsGraph from './HoldingsGraph';
import HistoryGraph from './HistoryGraph';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingOverlay from './LoadingOverlay';
import { NotLoggedOverlay } from "./NotLoggedOverlay";
import { verification } from "../../verification.ts";
import { GraphZoomButtons } from "./GraphZoomButtons.tsx";
import { NavLink } from "react-router";
import { NetProfit } from "./NetProfit.tsx";
import { BottomMenu } from "../../shared/BottomMenu.tsx";
import { IsLoggedContext } from "../../App";
import { Transaction } from "./Tranasaction.ts";


export function PortfolioPage() {
  const { isLogged } = useContext(IsLoggedContext)!;
  const [activeZoomButton, setActiveZoomButton] = useState<string>('All');
  const zoomButtons = ['1M', '1Y', 'All'];


  const { isLoading: isVerficationLoading } = useQuery({
    queryKey: ['verification'],
    queryFn: verification,
    retry: false,
    staleTime: 1000 *60
  })



  const { data: userPortfolio, isLoading } = useQuery({
    queryKey: ["userPortfolio"],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/api/portfolio', { withCredentials: true })
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio`, { withCredentials: true })
        const data =response.data


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

  const { data: transactionHistory, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ["transactionHistory"],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/api/portfolio', { withCredentials: true })
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transactionHistory`, { withCredentials: true })
        const data =response.data

      const transactionHistory = data.map((item: Transaction)=>{
        return new Transaction(item.price,item.quantity,item.timestamp,item.type,item.symbol);
      })

      return transactionHistory
      
    },

    
  });





  const {data:tableStocksData} = useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/stocks')
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks`)
      
      return response.data
      //localStorage.setItem('tableStocksData', JSON.stringify(response.data));
    },
    //To refetch every 20 min
    staleTime: 1000 * 60 * 20,
    enabled: !!isLogged && !!userPortfolio?.stockHoldings
  });

  const {data:watchlist} = useQuery({
    queryKey: ["watchList"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/watchList`,{withCredentials:true});
      return response.data;
    },
  });






  

  const lastIndex = userPortfolio?.totalBalanceHistory?.length! - 1;

  console.log('History',userPortfolio?.transactionHistory);

  return (
    <>
      <title>Your Portfolio</title>
      <MainMenu />



      {isVerficationLoading ? <LoadingOverlay /> : isLogged ? '' : <NotLoggedOverlay />}




      <div style={{height: `${isLogged? '' : ''}`,overflow: `${isLogged? '' : 'hidden'}`}}className={`portfolio-page-container `}>
        <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px] space-y-6 py-6">
          
          {/* SECTION 1: SUMMARY CARDS */}
          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          <div className="shadow-lg rounded-[12px] p-[18px] sm:p-[22px] md:p-[26px] md:pl-[36px] w-full bg-white flex flex-col min-h-[120px] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl active:scale-[1.01] cursor-pointer group">
            <div className="font-semibold headings-portfolio-page transition-colors duration-300 group-hover:text-green-700">Total portfolio value</div>
            <div className="text-[28px] sm:text-[32px] font-semibold text-green-700 flex items-center h-full ">
              ${isLoading || !isLogged ? '0' : Number(userPortfolio?.totalBalance).toFixed(2)}
            </div>

          </div>
          <div className="shadow-lg rounded-[12px] p-[18px] sm:p-[22px] md:p-[26px] md:pl-[36px] w-full bg-white flex flex-col min-h-[120px] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl active:scale-[1.01] cursor-pointer group">
            <div className="font-semibold headings-portfolio-page flex transition-colors duration-300 group-hover:text-blue-700">
              <div>
                Cash Balance
              </div>

            </div>
            <div className="text-[28px] sm:text-[32px] font-semibold text-blue-700 flex items-center h-full ">

              ${isLoading || !isLogged ? '1000' : Number(userPortfolio?.cashBalance).toFixed(2)}

            </div>
          </div>
          <div className="min-[520px]:col-span-2 lg:col-span-1">
            <NetProfit userPortfolio={userPortfolio} tableStocksData={tableStocksData} isLogged={isLogged}/>
          </div>
          </div>

          {/* SECTION 2: ANALYSIS & MONITORING */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 transition-all duration-300 hover:text-blue-600 cursor-default">Analysis & Monitoring</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              <div className="lg:col-span-2 relative w-full min-h-[320px] sm:min-h-[360px] md:min-h-[420px] p-[16px] md:p-[20px] shadow-lg bg-white rounded-[12px] flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl">
                <div className="headings-portfolio-page px-2 sm:px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="font-semibold">Historical Portfolio Value</div>
                  <GraphZoomButtons zoomButtons={zoomButtons} lastIndex={lastIndex} setActiveZoomButton={setActiveZoomButton} activeZoomButton={activeZoomButton} />
                </div>

            <HistoryGraph setActiveZoomButton={setActiveZoomButton} isLogged={isLogged} totalBalanceHistory={userPortfolio?.totalBalanceHistory} />
              </div>
              <div className="lg:col-span-1 w-full shadow-lg bg-white rounded-[12px] p-[16px] md:p-[20px] flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl">
                <div className="headings-portfolio-page font-semibold px-2 sm:px-4">
                  My Watchlist
                </div>
                
                {!watchlist || watchlist.length === 0 ? (
                  <div className="text-center py-12 px-4 flex flex-col items-center">
                    <div className="bg-gray-100 rounded-full p-5 mb-4 transition-all duration-300 hover:bg-gray-200 hover:scale-110 hover:rotate-6">
                      <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="#6B7280">
                        <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Watchlist is Empty
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-sm">
                      Add stocks to your watchlist to track them here
                    </p>
                    <NavLink to='/stocks' className="button-primary flex items-center gap-2 px-5 py-2.5 text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
                      <span>Browse Stocks</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                        <path d="M665.08-450H180v-60h485.08L437.23-737.85 480-780l300 300-300 300-42.77-42.15L665.08-450Z" />
                      </svg>
                    </NavLink>
                  </div>
                ) : (
                  <div className="overflow-y-auto max-h-[500px] px-2 sm:px-4 -mx-2 sm:-mx-4">
                    <div className="space-y-2">
                      {watchlist.map((watchlistItem: any, index: number) => {
                        const stockData = tableStocksData?.find((stock: any) => stock.symbol === watchlistItem.symbol);
                        const logoURL = stockData?.logoURL || '';
                        const currentPrice = stockData?.data?.data?.[0]?.close || 0;
                        const previousPrice = stockData?.data?.data?.[1]?.close || 0;
                        const priceChange = currentPrice - previousPrice;
                        const percentChange = previousPrice > 0 ? ((priceChange / previousPrice) * 100) : 0;
                        
                        return (
                          <NavLink
                            key={`${watchlistItem.symbol}-${index}`}
                            to={`/stocks/${watchlistItem.symbol}`}
                            className="py-[16px] md:py-[20px] mb-2 px-[16px] md:px-[25px] shadow-lg bg-white rounded-[12px] hover:shadow-xl hover:bg-blue-50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-between gap-4 block cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {/* Logo */}
                              <div className="flex items-center justify-center w-[42px] h-[42px] md:w-[50px] md:h-[50px] rounded-[10px] bg-slate-50 border border-slate-200 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                {logoURL ? (
                                  <img 
                                    src={logoURL} 
                                    alt={watchlistItem.symbol} 
                                    className="w-[28px] md:w-[32px]"
                                  />
                                ) : (
                                  <div className="w-[28px] md:w-[32px] h-[28px] md:h-[32px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-[6px] flex items-center justify-center text-white font-bold text-sm">
                                    {watchlistItem.symbol.charAt(0)}
                                  </div>
                                )}
                              </div>
                              
                              {/* Symbol and Details */}
                              <div className="flex flex-col min-w-0 flex-1 transition-all duration-300 group-hover:translate-x-1">
                                <div className="text-[17px] md:text-[20px] font-bold text-gray-900 truncate leading-tight transition-colors duration-300 group-hover:text-blue-600">
                                  {watchlistItem.symbol}
                                </div>
                                <div className={`text-[13.5px] md:text-[15px] font-semibold transition-all duration-300 group-hover:scale-105 ${priceChange >= 0 ? 'text-green-600 group-hover:text-green-700' : 'text-red-600 group-hover:text-red-700'}`}>
                                  ${currentPrice.toFixed(2)} {priceChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3: YOUR HOLDINGS */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 transition-all duration-300 hover:text-green-600 cursor-default">Your Holdings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              <div className="lg:col-span-1 shadow-lg rounded-[12px] p-[18px] sm:p-[20px] w-full bg-white flex flex-col relative transition-all duration-300 hover:shadow-2xl">
                <div className="font-semibold headings-portfolio-page">Portfolio holdings</div>
                {
                  userPortfolio?.stockHoldings ?
                    <HoldingsGraph tableStocksData={tableStocksData} isLogged={isLogged} userPortfolio={userPortfolio} />
                    :
                    <div className="flex flex-col items-center justify-center pt-30">
                      <div className="bg-gray-100 rounded-full p-5 mb-4 transition-all duration-300 hover:bg-gray-200 hover:scale-110 hover:rotate-6">
                        <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="#6B7280">
                          <path d="M333.85-441.69v-264.46h92.3v264.46L380-486.16l-46.15 44.47Zm186.92 74.61v-499.07h92.3v406.77l-92.3 92.3ZM146.16-255.23v-290.92h92.3v198.61l-92.3 92.31ZM143.85-128l234.92-234.92 142 122L767.85-488H690v-60h180v180h-60v-77.85L523.23-159.08l-142-122L228.15-128h-84.3Z" />
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">
                        No Stock Holdings
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
                        Start investing to see your portfolio
                      </p>
                      
                    </div>

                }


              </div>

              <div className="lg:col-span-2 w-full shadow-lg bg-white rounded-[12px] p-[16px] md:p-[20px] flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl">
                <div className="headings-portfolio-page font-semibold px-2 sm:px-4">
                  Stock Holdings
                </div>
            
            {isLoading || !userPortfolio?.stockHoldings ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-5 mb-4 transition-all duration-300 hover:bg-gray-200 hover:scale-110 hover:rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="#6B7280">
                    <path d="M333.85-441.69v-264.46h92.3v264.46L380-486.16l-46.15 44.47Zm186.92 74.61v-499.07h92.3v406.77l-92.3 92.3ZM146.16-255.23v-290.92h92.3v198.61l-92.3 92.31ZM143.85-128l234.92-234.92 142 122L767.85-488H690v-60h180v180h-60v-77.85L523.23-159.08l-142-122L228.15-128h-84.3Z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  No Stock Holdings
                </h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm">
                  Start investing to see your holdings
                </p>
                <NavLink to='/stocks' className="button-primary flex items-center gap-2 px-5 py-2.5 text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
                  <span>Buy Shares</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                    <path d="M665.08-450H180v-60h485.08L437.23-737.85 480-780l300 300-300 300-42.77-42.15L665.08-450Z" />
                  </svg>
                </NavLink>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[500px] px-2 sm:px-4 -mx-2 sm:-mx-4">
                <div className="space-y-2">
                  {Object.entries(userPortfolio.stockHoldings).map(([symbol, holding]: [string, any]) => {
                    const stockData = tableStocksData?.find((stock: any) => stock.symbol === symbol);
                    const logoURL = stockData?.logoURL || '';
                    const currentPrice = stockData?.data?.data?.[0]?.close || 0;
                    const totalValue = currentPrice * holding.quantity;
                    const costBasis = holding.avgBuyPricePerShare * holding.quantity;
                    const profitLoss = totalValue - costBasis;
                    const profitLossPercent = costBasis > 0 ? ((profitLoss / costBasis) * 100) : 0;
                    
                    return (
                      <div 
                        key={symbol} 
                        className="py-[16px] md:py-[20px] px-[16px] md:px-[25px] shadow-lg bg-white rounded-[12px] hover:shadow-2xl hover:bg-green-50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Logo */}
                          <div className="flex items-center justify-center w-[42px] h-[42px] md:w-[50px] md:h-[50px] rounded-[10px] bg-slate-50 border border-slate-200 flex-shrink-0">
                            {logoURL ? (
                              <img 
                                src={logoURL} 
                                alt={symbol} 
                                className="w-[28px] md:w-[32px]"
                              />
                            ) : (
                              <div className="w-[28px] md:w-[32px] h-[28px] md:h-[32px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-[6px] flex items-center justify-center text-white font-bold text-sm">
                                {symbol.charAt(0)}
                              </div>
                            )}
                          </div>
                          
                          {/* Symbol and Details */}
                          <div className="flex flex-col min-w-0 flex-1 transition-all duration-300 group-hover:translate-x-1">
                            <div className="text-[17px] md:text-[20px] font-bold text-gray-900 truncate leading-tight">
                              {symbol}
                            </div>
                            <div className="text-[13.5px] md:text-[15.5px] text-slate-500 md:text-slate-700 truncate leading-tight">
                              {holding.quantity} {holding.quantity === 1 ? 'Share' : 'Shares'} @ ${Number(holding.avgBuyPricePerShare).toFixed(2)}
                            </div>
                            <div className={`text-[13.5px] md:text-[15px] font-semibold transition-all duration-300 group-hover:scale-105 ${profitLoss >= 0 ? 'text-green-600 group-hover:text-green-700' : 'text-red-600 group-hover:text-red-700'}`}>
                              {profitLoss >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}% • ${profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Current Value and Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right transition-all duration-300 group-hover:scale-105">
                            <div className="text-[17px] md:text-[20px] font-semibold text-gray-900">
                              ${totalValue.toFixed(2)}
                            </div>
                            <div className="text-[13.5px] md:text-[15.5px] text-slate-500 md:text-slate-700">
                              ${currentPrice.toFixed(2)}/share
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <NavLink 
                              to={`/stocks/${symbol}`}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 hover:scale-110 active:scale-95 text-white text-xs font-semibold rounded-[6px] transition-all duration-300 text-center shadow-md hover:shadow-lg"
                            >
                              Buy
                            </NavLink>
                            <NavLink 
                              to={`/stocks/${symbol}`}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 hover:scale-110 active:scale-95 text-white text-xs font-semibold rounded-[6px] transition-all duration-300 text-center shadow-md hover:shadow-lg"
                            >
                              Sell
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
            </div>
          </div>

          {/* SECTION 4: RECENT ACTIVITY */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 transition-all duration-300 hover:text-purple-600 cursor-default">Recent Activity</h2>
            <div className="w-full shadow-lg bg-white rounded-[12px] p-[16px] md:p-[20px] flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl">
              <div className="headings-portfolio-page font-semibold px-2 sm:px-4">
                Transaction History
              </div>
            
            {isLoadingTransactions ? (
              <div className="text-center py-12 text-gray-500">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3 hover:border-t-2 transition-all"></div>
                <div className="animate-pulse">Loading transactions...</div>
              </div>
            ) : !transactionHistory || transactionHistory.length === 0 ? (
              <div className="text-center py-16 px-4 flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-5 mb-4 transition-all duration-300 hover:bg-gray-200 hover:scale-110 hover:rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 -960 960 960" width="56px" fill="#6B7280">
                    <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z"/>
                  </svg>
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  No Transactions Yet
                </h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm">
                  Start trading to see your transaction history
                </p>
                
                <NavLink 
                  to='/stocks' 
                  className="button-primary flex items-center gap-2 px-5 py-2.5 text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <span>Browse Stocks</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                    <path d="M665.08-450H180v-60h485.08L437.23-737.85 480-780l300 300-300 300-42.77-42.15L665.08-450Z"/>
                  </svg>
                </NavLink>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[500px] px-2 sm:px-4 -mx-2 sm:-mx-4">
                <div className="space-y-2">
                  {transactionHistory.map((transaction: Transaction, index: number) => {
                    const stockData = tableStocksData?.find((stock: any) => stock.symbol === transaction.symbol);
                    const logoURL = stockData?.logoURL || '';
                    
                    return (
                      <div 
                        key={index} 
                        className="py-[16px] md:py-[20px] px-[16px] md:px-[25px] shadow-lg bg-white rounded-[12px] hover:shadow-2xl hover:bg-purple-50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Logo */}
                          <div className="flex items-center justify-center w-[42px] h-[42px] md:w-[50px] md:h-[50px] rounded-[10px] bg-slate-50 border border-slate-200 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                            {logoURL ? (
                              <img 
                                src={logoURL} 
                                alt={transaction.symbol} 
                                className="w-[28px] md:w-[32px]"
                              />
                            ) : (
                              <div className="w-[28px] md:w-[32px] h-[28px] md:h-[32px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-[6px] flex items-center justify-center text-white font-bold text-sm">
                                {transaction.symbol.charAt(0)}
                              </div>
                            )}
                          </div>
                          
                          {/* Symbol and Details */}
                          <div className="flex flex-col min-w-0 flex-1 transition-all duration-300 group-hover:translate-x-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[17px] md:text-[20px] font-bold text-gray-900 truncate leading-tight transition-colors duration-300 group-hover:text-blue-600">
                                {transaction.symbol}
                              </span>
                              <span className={`px-2 py-0.5 rounded-[4px] text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-all duration-300 group-hover:scale-110 ${
                                transaction.type === 'BUY' 
                                  ? 'bg-green-600 text-white group-hover:bg-green-700' 
                                  : 'bg-red-600 text-white group-hover:bg-red-700'
                              }`}>
                                {transaction.type}
                              </span>
                            </div>
                            <div className="text-[13.5px] md:text-[15.5px] text-slate-500 md:text-slate-700 truncate leading-tight">
                              {transaction.quantity} {transaction.quantity === 1 ? 'Share' : 'Shares'}
                            </div>
                            <div className="text-[12px] md:text-[13.5px] text-slate-400 truncate">
                              {dayjs(transaction.timestamp).format('MMM DD, YYYY · HH:mm')}
                            </div>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="flex-shrink-0 text-right transition-all duration-300 group-hover:scale-105">
                          <div className="text-[17px] md:text-[20px] font-semibold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
                            ${Number(transaction.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        </div>
        </div>
      <BottomMenu />

    </>
  )
}