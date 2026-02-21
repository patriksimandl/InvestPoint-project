import { NavLink } from "react-router";
import { formatPrice } from "./formatPrice";

type StockContainer =
  {
    stock: {
      name: string,
      symbol: string,
      logoURL: string,
      data: {
        meta:{}
        data: {
          date:string,
          close: number,
          open: number,
        }[]
      }

    }
  }



export function StockContainer({ stock }: StockContainer) {
  const pricesToday = stock.data['data'][0];
  const pricesYesterday = stock.data['data'][1];



  const dailyChange: number = pricesToday.close - pricesToday.open

  return (
    <div className="stock-container align-center py-[16px] md:py-[20px] px-[16px] md:px-[25px] shadow-lg">
      <NavLink
        to={`/stocks/${stock.symbol}`}
        className="flex items-center justify-between gap-4 cursor-pointer md:col-start-1 md:col-end-2"
        aria-label={`Open ${stock.name}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center w-[42px] h-[42px] md:w-[50px] md:h-[50px] rounded-[10px] bg-slate-50 border border-slate-200 justify-center">
            <img src={stock.logoURL} className="w-[28px] md:w-[32px] fill"></img>
          </div>
          <div className="company-name flex flex-col min-w-0">
            <div className="font-bold text-[17px] md:text-[20px] truncate leading-tight">
              {stock.symbol}
            </div>
            <div className="text-[13.5px] md:text-[15.5px] text-slate-500 md:text-slate-700 truncate leading-tight">
              {stock.name}
            </div>
          </div>
        </div>
        <div className="text-right md:hidden">
          <div className="font-semibold text-[17px]">
            ${(Number(pricesToday.close)).toFixed(2)}
          </div>
          <div className={`${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'} text-[13.5px] font-semibold text-nowrap`}>
            {formatPrice(dailyChange)} ({((dailyChange) / (pricesYesterday.close / 100)).toFixed(2)}%)
          </div>
        </div>
      </NavLink>
      <div className="hidden md:flex flex-col items-center justify-center text-center w-full md:col-start-2 md:col-end-3 md:justify-self-center md:self-center">
        <div className="font-semibold text-[20px]">
          ${(Number(pricesToday.close)).toFixed(2)}
        </div>
        <div className={`${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'} text-[15px] font-semibold text-nowrap`}>
          {formatPrice(dailyChange)} ({((dailyChange) / (pricesYesterday.close / 100)).toFixed(2)}%)
        </div>
      </div>
      <div className="hidden md:flex items-center justify-end md:col-start-3 md:col-end-4 md:justify-self-end">
        <NavLink to={`/stocks/${stock.symbol}`} className="button-secondary">
          Select
        </NavLink>
      </div>
    </div>
  )
}