import { MainMenu } from "../../shared/MainMenu";
import './StocksPage.css'
import { StockContainer } from "./StockContainer";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIcon from '/LoadingIcon.svg'


type StocksPageProps =
  {
    islogged: boolean,
    
    tableStocksData: null | {
      symbol: string,
      name: string,
      logoURL: string,
      data: {
        "Time Series (Daily)": any


      },
      
    }[],
    setTableStocksData: (tableStocksData : any) => void;
    /*tableStocksData: {

      name: string,
      symbol: string,
      logoURL: string;
      data: {
        "Time Series (Daily)": any
      }

    }[],*/
  }


export function StocksPage({ islogged, tableStocksData, setTableStocksData }: StocksPageProps) {
  //const tableStocksDataFromLocal = JSON.parse(localStorage.getItem('tableStocksData')) || null; 



  let dateForPrice = dayjs().format('YYYY-MM-DD');
  //univerzal date
  dateForPrice = '2025-12-10';


  /*useEffect(()=>{
    console.log(tableStocksData);
  },[tableStocksData]);*/

  useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/stocks')
      setTableStocksData(response.data);
      localStorage.setItem('tableStocksData', JSON.stringify(response.data));
    },
    //To refetch every hour
    staleTime: 1000 * 60 * 20,
  });

  useEffect(() => {
    console.log(tableStocksData);
  }, []);


  return (
    <>
      <MainMenu islogged={islogged} />
      {islogged ? <div className="w-[25%] bg-white h-[82vh] rounded-[8px] fixed right-[8%] z-2 top-[130px] p-[20px] flex flex-col shadow-lg">
        <div className="font-semibold text-[22px]">Portfolio</div>
        <div className="">
          <div className="text-[15px] text-gray-600 mt-[15px]">Your Balance</div>
          <div className="text-[20px] font-semibold">$12 942</div>


        </div>
        <div className="flex  h-full justify-center">
          <button className="button-primary  self-end w-[12vw]">
            View More
            <div className="flex items-center ml-[4px]">
              <img className="h-[20px]" src="/arrow-right-icon-white.svg"></img>
            </div>
          </button>
        </div>

      </div> : ''}
      <div className="w-full bg-white bg-linear-to-br from-sky-300 to-blue-800 fixed top-[0px] h-[160px] content-end px-[8%] z-[1] text-white ">
        <div className={`grid grid-cols-3  mb-[10px] font-semibold ${islogged ? 'w-[69%]' : `w-full`}`}>
          <div className="ml-[90px]">Share</div>
          <div className="ml-[98px]">Price</div>
          <div></div>
        </div>
      </div>
      <div className="stocks-page-container  flex ">
        <div className={islogged ? `w-[68%]` : `w-full`}>

          <div className={`stocks-grid relative  ${tableStocksData ? '' : `h-[calc(100vh-170px)]`}`}>
            {tableStocksData ? tableStocksData.map((Stock) => {
              return <StockContainer name={Stock.name} symbol={Stock.symbol} logoURL={Stock.logoURL} prices={Stock.data["Time Series (Daily)"][dateForPrice]} />
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