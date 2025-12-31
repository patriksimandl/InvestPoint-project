type StockDetailsProps ={
  prevClosePrice: undefined | string 
  openPrice: undefined | string,
  marketCap: undefined | string
}


export function StockDetails({prevClosePrice, openPrice,marketCap} : StockDetailsProps) {

  return (
    <>
      <div className="flex border-b-1 border-gray-300 p-3  tracking-wide ">

        <div className="pl-2 pr-22 border-r-1 border-gray-300 text-lg  ">
          <div className="text-gray-700">
            Previous close
          </div>
          <div className="text-2xl p-1">
            ${prevClosePrice}
          </div>
        </div>
        <div className="pl-6">
          <div className="text-gray-700 text-lg">
            Open
          </div>
          <div className="text-2xl p-1">
            ${openPrice}
          </div>
        </div>
      </div>
      <div className="p-3 tracking-wide border-b-1 border-gray-300">
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