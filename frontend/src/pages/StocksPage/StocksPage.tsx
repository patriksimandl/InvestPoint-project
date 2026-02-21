import { MainMenu } from "../../shared/MainMenu";
import './StocksPage.css'
import { StockContainer } from "./StockContainer";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import LoadingIcon from '/LoadingIcon.svg'
import { NavLink } from "react-router";
import { Portfolio } from "../PortfolioPage/Portfolio.ts";
import { BottomMenu } from "../../shared/BottomMenu.tsx";
import { IsLoggedContext, UserEmailContext } from "../../App";


/*type StocksPageProps =
  {
    tableStocksData: null | {

      logoURL: string
      name: string
      symbol: string
      data: {
        meta: {}
        data: {
          date: string,
          close: number
          open: number


        }[],
      },
      companyProfile: {
        marketCapitalization: number
      }

    }[];
    
  }
*/

export function StocksPage() {

  const { isLogged, setIsLogged } = useContext(IsLoggedContext)!;
  const { userEmail } = useContext(UserEmailContext)!;
  



  const { data: tableStocksData } = useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/stocks')
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks`)
      return response.data

    },
    //To refetch every hour
    staleTime: 1000 * 60 * 20,
  });

  const { data: userPortfolio, isLoading, error } = useQuery({
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

  return (
    <>
      <title>Browse Stocks</title>
      <MainMenu />
      
      <div className="stocks-page-container pb-8 ">
        <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px] flex flex-col lg:flex-row gap-5">
          <div className={isLogged ? `w-full lg:w-[70%]` : `w-full`}>
            <div className={`stocks-grid relative  ${tableStocksData ? '' : `h-[calc(100vh-170px)]`}`}>
              {tableStocksData ? tableStocksData.map((stock) => {
                return <StockContainer key={stock.symbol} stock={stock} />
              }) :
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
                  <img className="w-[80px]" src={LoadingIcon}></img>
                  <div className="text-[25px] font-semibold"></div>
                </div>
              }
            </div>
          </div>

          {isLogged && (
            <div className="w-full bg-white h-auto rounded-[8px] p-[18px] flex flex-col shadow-lg">
              <div className="font-semibold text-[22px]">Your Portfolio</div>
              <div className="">
                <div className="text-[15px] text-gray-600 mt-[15px]">Total Balance</div>
                <div className="text-[20px] font-semibold">${Number(userPortfolio?.totalBalance).toFixed(2)}</div>
              </div>
              <div className="flex h-full justify-center">
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