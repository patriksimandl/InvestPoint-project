type StockContainer = 
{
  name: string,
  symbol: string,
  logoURL: string,
  prices: {
    "1. open": string
  }
}



export function StockContainer({name, symbol, logoURL, prices}: StockContainer) {

  console.log(prices);
  
  return (
    <div className="stock-container align-center p-[20px] shadow-lg h-[110px]">
      <div className="flex justify-end  flex-row-reverse">
        <div className="company-name flex justify-center flex-col ml-[20px]">
          <div className="font-bold text-[20px] p-[0] ">
            {symbol}
          </div>
          <div>
            {name}
          </div>
        </div>
        <div className="flex items-center w-[50px]">
          <img src={logoURL} className="w-[50px] fill "></img>
        </div>


      </div>
      <div className="flex flex-col justify-center ml-[90px]">
        <div className="font-semibold  text-[20px] flex">
          ${(Number(prices["1. open"])).toFixed(2)}
        </div>
        <div className="text-red-700 text-[17px] flex">
          −0,89 (0,32 %)
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button className="button-secondary">Select</button>
      </div>
    </div>
  )
}