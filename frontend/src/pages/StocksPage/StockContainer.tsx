import { NavLink } from "react-router";
import { calculatePriceChange } from "./calculatePriceChange";

type StockContainer =
  {
    stock: {
      name: string,
      symbol: string,
      logoURL: string,
      data: {
        'data': {
          close: number
        }[]
      }

    }
  }



export function StockContainer({ stock }: StockContainer) {
  const pricesToday = stock.data['data'][0];
  const pricesYesterday = stock.data['data'][1];



  const dailyChange: number = pricesToday.close - pricesYesterday.close

  return (
    <div className="stock-container align-center p-[20px] shadow-lg h-[110px]">
      <div className="flex justify-end  flex-row-reverse">
        <div className="company-name flex justify-center flex-col ml-[20px]">
          <div className="font-bold text-[20px] p-[0] ">
            {stock.symbol}
          </div>
          <div>
            {stock.name}
          </div>
        </div>
        <div className="flex items-center w-[50px]">
          <img src={stock.logoURL} className="w-[50px] fill "></img>
        </div>


      </div>
      <div className="flex flex-col justify-center ml-[90px]">
        <div className="font-semibold  text-[20px] flex">
          ${(Number(pricesToday.close)).toFixed(2)}
        </div>
        <div className={`${dailyChange >= 0 ? 'text-green-700' : 'text-red-700'} text-[17px] flex`}>

          {calculatePriceChange(dailyChange)} ({((dailyChange) / (pricesYesterday.close / 100)).toFixed(2)}%)
        </div>
      </div>
      <div className="flex items-center justify-end">
        <NavLink to={`/stocks/${stock.symbol}`} className="button-secondary">
          Select
        </NavLink>
      </div>
    </div>
  )
}