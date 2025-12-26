import { MainMenu } from "../../shared/MainMenu";
import './StocksPage.css'
import { StockContainer } from "./StockContainer";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import LoadingIcon from '/LoadingIcon.svg'
import { NavLink } from "react-router";


type StocksPageProps =
  {
    isLogged: boolean,
    userEmail: string | undefined;

    tableStocksData: null | {

      logoURL: string
      name: string
      symbol: string
      data: {
        meta: {}
        data: {
          date: string,
          close: number


        }[],
      }

    }[],
    setTableStocksData: (tableStocksData: any) => void;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
    /*tableStocksData: {

      name: string,
      symbol: string,
      logoURL: string;
      data: {
        "Time Series (Daily)": any
      }

    }[],*/
  }


export function StocksPage({ isLogged, tableStocksData, setTableStocksData, setIsLogged, userEmail }: StocksPageProps) {
  //const tableStocksDataFromLocal = JSON.parse(localStorage.getItem('tableStocksData')) || null; 



  useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/stocks')
      setTableStocksData(response.data);
      //localStorage.setItem('tableStocksData', JSON.stringify(response.data));
    },
    //To refetch every hour
    staleTime: 1000 * 60 * 20,
  });


  return (
    <>
      <title>Browse Stocks</title>
      <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />
      {isLogged ? <div className="w-[25%] bg-white h-[82vh] rounded-[8px] fixed right-[8%] z-99 top-[130px] p-[20px] flex flex-col shadow-lg">
        <div className="font-semibold text-[22px]">Portfolio</div>
        <div className="">
          <div className="text-[15px] text-gray-600 mt-[15px]">Your Balance</div>
          <div className="text-[20px] font-semibold">$12 942</div>


        </div>
        <div className="flex  h-full justify-center">
          <NavLink to="/portfolio" className="button-primary self-end w-[12vw]">
            View More
            <div className="flex items-center ml-[4px]">
              <img className="h-[20px]" src="/arrow-right-icon-white.svg"></img>
            </div>
          </NavLink>
        </div>

      </div> : ''}
      <div className="w-full bg-white bg-linear-to-br from-sky-300 to-blue-800 fixed top-[0px] h-[160px] content-end px-[8%] z-[1] text-white ">
        <div className={`grid grid-cols-3  mb-[10px] font-semibold ${isLogged ? 'w-[69%]' : `w-full`}`}>
          <div className="ml-[90px]">Share</div>
          <div className="ml-[98px]">Price</div>
          <div></div>
        </div>
      </div>
      <div className="stocks-page-container  flex ">
        <div className={isLogged ? `w-[68%]` : `w-full`}>

          <div className={`stocks-grid relative  ${tableStocksData ? '' : `h-[calc(100vh-170px)]`}`}>
            {tableStocksData ? tableStocksData.map((Stock) => {
              return <StockContainer key={Stock.symbol} stock={Stock}/>
            }) :
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
                <img className="w-[80px]" src={LoadingIcon}></img>
                <div className="text-[25px] font-semibold"></div>
              </div>
            }

          </div>
        </div>


      </div>
    </>

  )
}