import { useContext, useEffect, useMemo, useState } from "react";
import type { Portfolio } from "./Portfolio"
import type { StockData } from "./types"
import { calculateStockHoldingsValue } from "./CalculateProfit";
import { formatPrice } from "../StocksPage/formatPrice";
import { UserEmailContext } from "../../App";

type NetProfitProps = {
  userPortfolio: Portfolio | undefined;
  tableStocksData: StockData[];
  isLogged: boolean;
}


export function NetProfit({ userPortfolio, tableStocksData, isLogged }: NetProfitProps) {
  const [profit,setProfit] = useState<{profitInMoney: number,profitInPercent: number}>({
    profitInMoney: 0,
    profitInPercent: 0
  });

  useEffect(()=>{
    console.log('profit',profit);
  },[profit])


  const userEmail = useContext(UserEmailContext);

  useMemo(()=>{ 
    if (!isLogged) return setProfit({profitInMoney: 0,profitInPercent: 0});
    if (!tableStocksData) return;
    if (!userPortfolio) return;
    
    const calculatedProfit = calculateStockHoldingsValue(userPortfolio,tableStocksData);

    
    

    if(!calculatedProfit || typeof calculatedProfit !== 'object'){return}

    setProfit(calculatedProfit);

  },[userEmail,userPortfolio,tableStocksData,isLogged])

  

  return (
    <div className="shadow-lg rounded-[12px] p-[18px] sm:p-[22px] md:p-[26px] md:pl-[36px] w-full bg-white flex flex-col">
      <div className="font-semibold headings-portfolio-page flex">
        <div>
          Net Profit
        </div>
        <div className="ml-[6px] flex items-center relative">
          <svg className="info-icon " xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
          <div className="info-label text-gray-800 font-normal absolute text-[14px] w-[68vw] sm:w-[34vw] md:w-[18vw] max-w-[230px] bg-white rounded-[8px] border-[1px] border-gray-200 p-[14px] top-6 left-0 md:left-1/2 md:-translate-x-1/2 z-10 shadow-lg transtion-all" >
            <span className="font-bold text-black">Gain from an investment</span> after subtracting the amount invested and all related costs from the total return.
          </div>
        </div>

      </div>
      <div className={`font-semibold ${profit ? profit?.profitInMoney < 0 ? 'text-red-700' :'text-green-700' : 'text-green-700'}`}>
        <div className="text-[27px]  ">
          {userPortfolio ? formatPrice(profit?.profitInMoney) : '$0'}
        </div>
        <div className="text-[20px] font-normal">
          {profit ? `(${profit?.profitInPercent.toFixed(3)}%)` : '(0%)'}
        </div>
      </div>
    </div>
  )
}