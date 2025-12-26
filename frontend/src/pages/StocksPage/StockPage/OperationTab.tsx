import { useState } from "react"

export function OperationTab() {
  const [buttonState,setButtonState] = useState('Overview');


  return (
    <div className=" w-[100%] flex  justify-between mt-[10px]">
    <div className="flex gap-5">
      <div className="button-primary rounded-[8px]">
        Buy
      </div>
      <div className="button-primary bg-slate-100 text-black rounded-[8px] font-normal hover:bg-slate-200 transition-all">
        Sell
      </div>
      <div className="button-primary bg-slate-100 text-black rounded-[8px] font-normal text-nowrap w-auto hover:bg-slate-200 transition-all">
        <div className="flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" /></svg></div>
        <div className="mx-[10px]">Add to watchlist</div>
      </div>
      </div>
      
      <div className="button-primary rounded-[8px] w-[45%] bg-white outline-1 outline-slate-300 text-slate-700 font-normal justify-start p-0">
        <div onClick={()=>{setButtonState('Overview')}} className=" border-r-1 border-slate-300 h-full p-3 px-[30px] relative">Overview
          {buttonState === 'Overview' ?<div className="left-[50%] translate-x-[-50%] absolute w-20 h-[3px] bottom-[8px] bg-blue-900"></div> : ''}
        </div>
        <div onClick={()=>{setButtonState('News')}}className="p-3 px-[30px] relative">News
          {buttonState === 'News' ? <div className="left-[50%] translate-x-[-50%] absolute w-15 h-[3px] bottom-[8px] bg-blue-900"></div> : ''}
        </div>

      </div>
    </div>
  )
}