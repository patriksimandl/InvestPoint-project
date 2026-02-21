import { NavLink } from "react-router";
import type { StockData } from "../PortfolioPage/types";

type ScrollStockPanelProps = {
  tableStocksData: StockData[]
}


export function ScrollStockPanel({ tableStocksData }: ScrollStockPanelProps) {
  return (
    <div className='h-[4rem] overflow-hidden text-md pb-4 bg-slate-100 md:bg-white pt-5' >
      <div className='stock-scroll h-full'>
        {tableStocksData?.map((stock, i) => {
          if (i > 15) {
            return
          }
          const symbol = stock.symbol;
          const closePrice = stock.data.data[0].close;
          const yesterdayPrice = stock.data.data[1].close

          const priceChange = closePrice - yesterdayPrice

          const percentChange = (closePrice - yesterdayPrice) / (yesterdayPrice / 100)

          return (
            <NavLink to={`/stocks/${symbol}`} className='px-6 sm:px-10 h-full flex items-center gap-3'>
              <div className="font-semibold">
                {symbol}
              </div>
              <div className="text-slate-600">
                ${closePrice}
              </div>
              {priceChange < 0 ? <div className="text-red-600 ml-1">
                <div className="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e7000b"><path d="M480-360 280-560h400L480-360Z" /></svg>
                </div>
                <div>
                  {percentChange.toFixed(2)}%

                </div>

              </div>
                :
                <div className="text-green-500 ml-1">
                  <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00c951"><path d="m280-400 200-200 200 200H280Z" /></svg>
                  </div>
                  <div>
                    {percentChange.toFixed(2)}%

                  </div>


                </div>

              }


            </NavLink>
          )
        })}


      </div>
    </div>
  )
}