import { useState, type Dispatch, type SetStateAction } from "react"

type OperationTabProps ={
  setIsBuying: Dispatch<SetStateAction<boolean>>,
  isLogged: boolean,
  setShowLogin: Dispatch<SetStateAction<boolean>>
  showLogin: boolean,
  setLoginTransition: Dispatch<SetStateAction<boolean>>
  setAction: Dispatch<SetStateAction<string>>
  canSell: boolean
}


export function OperationTab({setIsBuying,isLogged,setShowLogin,showLogin,setLoginTransition,setAction,canSell} : OperationTabProps) {
  const [buttonState,setButtonState] = useState('Overview');

  function changeBuying(action :string) {
    if(isLogged){
      setAction(action);
      setIsBuying(true)
    }
    else{
      setShowLogin(true)
      setLoginTransition(true);
    }
    
  }


  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-4 mt-4 sm:mt-5 md:mt-6 pt-4 border-t border-slate-200">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <button 
          onClick={() => {changeBuying('Buy')}} 
          className="button-primary rounded-lg min-w-[90px] sm:min-w-[100px] text-sm sm:text-[15px] font-semibold shadow-sm hover:shadow transition-all"
        >
          Buy
        </button>
        <button 
          onClick={() => { if (canSell) changeBuying('Sell') }}
          disabled={!canSell}
          className={`border-2 rounded-lg font-semibold transition-all min-w-[90px] sm:min-w-[100px] px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-[15px] shadow-sm ${
            canSell
              ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:shadow'
              : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
          }`}
        >
          Sell
        </button>
        <button 
          className="flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-300 rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-[15px] shadow-sm hover:shadow min-w-[48px]"
          title="Add to watchlist"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="19px" 
            viewBox="0 -960 960 960" 
            width="19px" 
            fill="currentColor" 
            className="sm:h-[20px] sm:w-[20px] flex-shrink-0"
          >
            <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
          </svg>
          <span className="hidden min-[400px]:inline sm:hidden whitespace-nowrap">Add</span>
          <span className="hidden sm:inline lg:hidden whitespace-nowrap">Watchlist</span>
          <span className="hidden lg:inline whitespace-nowrap">Add to watchlist</span>
        </button>
      </div>
      
      {/* Segmented Control: Overview/News */}
      <div className="flex rounded-lg border-2 border-slate-300 bg-white overflow-hidden w-full lg:w-auto lg:min-w-[320px] xl:min-w-[360px] h-[46px] sm:h-[50px] shadow-sm">
        <button 
          onClick={() => {setButtonState('Overview')}} 
          className={`flex-1 relative flex items-center justify-center px-5 sm:px-7 md:px-9 text-sm sm:text-[15px] font-semibold transition-all duration-200 ${
            buttonState === 'Overview' 
              ? 'text-blue-900 bg-blue-50/70' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          Overview
          {buttonState === 'Overview' && (
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[70%] h-[3px] bg-blue-900 rounded-t-full"></div>
          )}
        </button>
        
        <div className="w-[2px] bg-slate-300"></div>
        
        <button 
          onClick={() => {setButtonState('News')}} 
          className={`flex-1 relative flex items-center justify-center px-5 sm:px-7 md:px-9 text-sm sm:text-[15px] font-semibold transition-all duration-200 ${
            buttonState === 'News' 
              ? 'text-blue-900 bg-blue-50/70' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          News
          {buttonState === 'News' && (
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[70%] h-[3px] bg-blue-900 rounded-t-full"></div>
          )}
        </button>
      </div>
    </div>
  )
}