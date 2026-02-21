type PortfolioOverlayProps ={
  price: number,
  userTotalValue: number,
  userCashBalance: number
}

export function PortfolioOverlay({price, userTotalValue, userCashBalance}: PortfolioOverlayProps){
  return (
    <div className="fixed hidden md:block z-102 right-[-90vw] sm:right-[-60vw] md:right-[-30vw] lg:right-[-20vw] shadow-lg top-[50%] bg-slate-100 translate-y-[-50%] w-[90vw] sm:w-[60vw] md:w-[30vw] lg:w-[20vw] h-[auto] rounded-l-[8px] p-6 sm:p-8 translate-x-[-100%] transition-all">
        <div className="flex font-semibold text-2xl">
          Your portfolio
        </div>
        <div className="text-md mt-5 text-lg p-5 bg-white rounded-[8px]">
          Cash Balance
          <div className={`text-blue-600  relative flex flex-col items-center text-xl `}>
            <div className={`flex flex-col  ${price > 0 ? 'font-normal' : 'font-semibold'}`}>
              ${userCashBalance}
              {price > 0 ? <div>
              <div className="text-red-500 relative right-0 font-normal flex justify-end">
                -{price}
              </div>
              <div className="bg-gray-600 relative h-[1px] w-full"/>
              <div className="flex justify-end font-semibold">
                ${userCashBalance - price}
              </div>

              
            </div> : ''}
            </div>
            

          </div>

        </div>
        <div className="text-md mt-3 text-lg p-5 bg-white rounded-[8px]">
          Portfolio Value
          <div className="text-blue-600 flex justify-center font-semibold text-xl">
            ${userTotalValue}
          </div>
        </div>
      </div>
  )
}