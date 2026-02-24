import type { Dispatch, SetStateAction } from "react"

type TransactionMessageProps ={
  animateInMessage: boolean
  setTransactionMessage: Dispatch<SetStateAction<boolean>>
  symbol: string
  buyingQuantities: {
    price: number
    numberOfShares: number
  }
}


export function TransactionMessage({ animateInMessage, setTransactionMessage, symbol, buyingQuantities }: TransactionMessageProps) {
  


  function clickCloseButton() {
    setTransactionMessage(false);
    
  
  }


  return (
    <div className="toast animate-slide-in min-h-[120px] w-[90vw] sm:w-[70vw] md:w-[40vw] lg:w-[25vw] bottom-[16px] right-[12px] rounded-[10px] bg-slate-100 z-102 fixed flex shadow-2xl duration-200 p-3 gap-4 transition-transform duration-500" style={{transform: `${animateInMessage? 'translateX(0)' : 'translateX(100vw)'}`}} >
      <button onClick={clickCloseButton} aria-label="Close" className="absolute top-3 right-3 p-2 rounded-full cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="h-full w-[15%] min-w-[44px] flex justify-center ">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#00c951" width='40px' height='40px' stroke="#00c951"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#00c951" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
      </div>
      <div className="flex flex-col w-[70%]">
        <div className="w-full text-xl flex text-blue-900 font-semibold">
          Order Executed
        </div>
        <div className="text-gray-600">
          You have successfully bought {buyingQuantities.numberOfShares} shares of {symbol} at ${buyingQuantities.price}
        </div>
      </div>


    </div>
  )
}