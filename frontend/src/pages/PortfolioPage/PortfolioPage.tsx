import dayjs from "dayjs";
import { MainMenu } from "../../shared/MainMenu";
import { use, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
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
import { IsLoggedContext, UserEmailContext } from "../../App";


export function PortfolioPage() {
  const { isLogged, setIsLogged } = useContext(IsLoggedContext)!;
  const { userEmail } = useContext(UserEmailContext)!;
  const [activeZoomButton, setActiveZoomButton] = useState<string>('All');
  const todaysDate = dayjs().format('DD. MM');
  const zoomButtons = ['1M', '1Y', 'All'];


  const { isLoading: isVerficationLoading } = useQuery({
    queryKey: ['verification'],
    queryFn: verification,
    retry: false,
    staleTime: 1000 *60
  })



  const { data: userPortfolio, isLoading, error } = useQuery({
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






  

  const lastIndex = userPortfolio?.totalBalanceHistory?.length! - 1;



  return (
    <>
      <title>Your Portfolio</title>
      <MainMenu />



      {isVerficationLoading ? <LoadingOverlay /> : isLogged ? '' : <NotLoggedOverlay />}




      <div style={{height: `${isLogged? '' : ''}`,overflow: `${isLogged? '' : 'hidden'}`}}className={`portfolio-page-container `}>
        <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px]">
          <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 pb-4">
          <div className="shadow-lg rounded-[12px] p-[18px] sm:p-[22px] md:p-[26px] md:pl-[36px] w-full bg-white flex flex-col min-h-[120px] transition-transform duration-200 ease-out hover:scale-[1.02]">
            <div className="font-semibold headings-portfolio-page">Total portfolio value</div>
            <div className="text-[28px] sm:text-[32px] font-semibold text-green-700 flex items-center h-full">
              ${isLoading || !isLogged ? '0' : Number(userPortfolio?.totalBalance).toFixed(2)}
            </div>

          </div>
          <div className="shadow-lg rounded-[12px] p-[18px] sm:p-[22px] md:p-[26px] md:pl-[36px] w-full bg-white flex flex-col min-h-[120px] transition-transform duration-200 ease-out hover:scale-[1.02]">
            <div className="font-semibold headings-portfolio-page flex">
              <div>
                Cash Balance
              </div>

            </div>
            <div className="text-[28px] sm:text-[32px] font-semibold text-blue-700 flex items-center h-full">

              ${isLoading || !isLogged ? '1000' : Number(userPortfolio?.cashBalance).toFixed(2)}

            </div>
          </div>
          <div className="min-[520px]:col-span-2 lg:col-span-1">
            <NetProfit userPortfolio={userPortfolio} tableStocksData={tableStocksData} isLogged={isLogged}/>
          </div>

          <div className="lg:col-span-2 relative w-full min-h-[320px] sm:min-h-[360px] md:min-h-[420px] p-[16px] md:p-[20px] shadow-lg bg-white rounded-[12px] flex flex-col gap-3">
            <div className="headings-portfolio-page px-2 sm:px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="font-semibold">Historical Portfolio Value</div>
              <GraphZoomButtons zoomButtons={zoomButtons} lastIndex={lastIndex} setActiveZoomButton={setActiveZoomButton} activeZoomButton={activeZoomButton} />
            </div>

            <HistoryGraph setActiveZoomButton={setActiveZoomButton} isLogged={isLogged} totalBalanceHistory={userPortfolio?.totalBalanceHistory} />
          </div>
          <div className="shadow-lg row-span-1 rounded-[12px] p-[18px] sm:p-[20px] w-full bg-white flex flex-col relative">
            <div className="font-semibold headings-portfolio-page">Portfolio holdings</div>
            {
              userPortfolio?.stockHoldings ?
                <HoldingsGraph tableStocksData={tableStocksData} isLogged={isLogged} userPortfolio={userPortfolio} />
                :
                <div className="left-[50%] translate-x-[-50%] flex flex-col top-[50%] translate-y-[-25%] items-center absolute">

                  <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" height="110px" viewBox="0 -960 960 960" width="110px" fill="#6B7280"><path d="M333.85-441.69v-264.46h92.3v264.46L380-486.16l-46.15 44.47Zm186.92 74.61v-499.07h92.3v406.77l-92.3 92.3ZM146.16-255.23v-290.92h92.3v198.61l-92.3 92.31ZM143.85-128l234.92-234.92 142 122L767.85-488H690v-60h180v180h-60v-77.85L523.23-159.08l-142-122L228.15-128h-84.3Z" /></svg>
                  </div>
                  <div className="text-gray-600 text-lg sm:text-xl text-center">
                    No current stock holdings
                  </div>
                  <NavLink to='/stocks' className="button-primary flex gap-2 mt-[40px]  w-full sm:w-80">
                    <div>
                      Buy Shares
                    </div>
                    <div>

                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M665.08-450H180v-60h485.08L437.23-737.85 480-780l300 300-300 300-42.77-42.15L665.08-450Z" /></svg>
                    </div>

                  </NavLink>
                </div>

            }


          </div>

        </div>
        </div>
      </div>
      <BottomMenu />

    </>
  )
}