import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { symbolContext, watchListContext } from "./StockPage";
import axios from "axios";

type OperationTabProps ={
  setIsBuying: Dispatch<SetStateAction<boolean>>,
  isLogged: boolean,
  setShowLogin: Dispatch<SetStateAction<boolean>>
  showLogin: boolean,
  setLoginTransition: Dispatch<SetStateAction<boolean>>
  setAction: Dispatch<SetStateAction<string>>
  canSell: boolean
  selectedTab: 'Overview' | 'News'
  setSelectedTab: Dispatch<SetStateAction<'Overview' | 'News'>>
}


export function OperationTab({setIsBuying,isLogged,setShowLogin,showLogin,setLoginTransition,setAction,canSell,selectedTab,setSelectedTab} : OperationTabProps) {
  const [isInTheWatchList,setIsInTheWatchList] = useState(false);

  const symbol = useContext(symbolContext);
  const watchList = useContext(watchListContext);

  useEffect(()=>{
    if(!watchList) return

    setIsInTheWatchList(watchList.some((item)=> item.symbol === symbol))
  },[watchList])



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

  async function toggleWatchList(){
    if(isLogged){
      const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/watchlist`,{symbol},{withCredentials:true});
      setIsInTheWatchList(!isInTheWatchList);
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
          onClick={toggleWatchList} 
          className={`flex items-center justify-center gap-2 rounded-lg font-semibold transition-all px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-[15px] shadow-sm hover:shadow min-w-[48px] border-2 ${
            isInTheWatchList
              ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100 hover:border-amber-400'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
          }`}
          title={isInTheWatchList ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="19px" 
            viewBox="0 0 24 24" 
            width="19px" 
            fill={isInTheWatchList ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isInTheWatchList ? 0 : 2}
            className={`sm:h-[20px] sm:w-[20px] flex-shrink-0 ${isInTheWatchList ? 'text-yellow-500' : ''}`}
          >
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="hidden min-[400px]:inline sm:hidden whitespace-nowrap">{isInTheWatchList ? 'Remove' : 'Add'}</span>
          <span className="hidden sm:inline lg:hidden whitespace-nowrap">{isInTheWatchList ? 'Saved' : 'Watchlist'}</span>
          <span className="hidden lg:inline whitespace-nowrap">{isInTheWatchList ? 'Remove from watchlist' : 'Add to watchlist'}</span>
        </button>
      </div>
      
      {/* Segmented Control: Overview/News */}
      <div className="flex rounded-lg border-2 border-slate-300 bg-white overflow-hidden w-full lg:w-auto lg:min-w-[320px] xl:min-w-[360px] h-[46px] sm:h-[50px] shadow-sm">
        <button 
          onClick={() => {setSelectedTab('Overview')}} 
          className={`flex-1 relative flex items-center justify-center px-5 sm:px-7 md:px-9 text-sm sm:text-[15px] font-semibold transition-all duration-200 ${
            selectedTab === 'Overview' 
              ? 'text-blue-900 bg-blue-50/70' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          Overview
          {selectedTab === 'Overview' && (
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[70%] h-[3px] bg-blue-900 rounded-t-full"></div>
          )}
        </button>
        
        <div className="w-[2px] bg-slate-300"></div>
        
        <button 
          onClick={() => {setSelectedTab('News')}} 
          className={`flex-1 relative flex items-center justify-center px-5 sm:px-7 md:px-9 text-sm sm:text-[15px] font-semibold transition-all duration-200 ${
            selectedTab === 'News' 
              ? 'text-blue-900 bg-blue-50/70' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          News
          {selectedTab === 'News' && (
            <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[70%] h-[3px] bg-blue-900 rounded-t-full"></div>
          )}
        </button>
      </div>
    </div>
  )
}