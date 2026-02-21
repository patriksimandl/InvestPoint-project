type StockDetailsProps ={
  prevClosePrice: undefined | string 
  openPrice: undefined | string,
  marketCap: undefined | string
}


export function StockDetails({prevClosePrice, openPrice,marketCap} : StockDetailsProps) {

  return (
    <>
      <div className="flex flex-row justify-between border-b-1 border-gray-200 p-3 tracking-wide">

        <div className="pl-2 pr-4 sm:pr-6 border-r-1 border-gray-200 flex-1 text-base sm:text-lg">
          <div className="text-gray-700 text-nowrap">
            Previous close
          </div>
          <div className="text-xl sm:text-2xl p-1">
            ${prevClosePrice}
          </div>
        </div>
        <div className="pl-4 sm:pl-6 flex-1">
          <div className="text-gray-700 text-base sm:text-lg">
            Open
          </div>
          <div className="text-xl sm:text-2xl p-1">
            ${openPrice}
          </div>
        </div>
      </div>
      <div className="p-3 tracking-wide border-b-1 border-gray-200">
        <div className=" pl-2">
          <div className="text-gray-700">
            Market cap.
          </div>
          <div className="text-xl">
            $ {marketCap}
          </div>
        </div>
      </div></>
  )
}