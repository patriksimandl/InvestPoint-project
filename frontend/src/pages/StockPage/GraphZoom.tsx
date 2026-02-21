import type { Dispatch, SetStateAction } from "react";
import ApexCharts from 'apexcharts'

export function GraphZoom({zoomButton,setZoomButton,lastIndex}: {setZoomButton: Dispatch<SetStateAction<string>>, zoomButton: string,lastIndex: number}) {
  const options = ['1M','3M','6M'];

  function ZoomGraph(option : string){
    if(option === '6M'){
      ApexCharts.exec('StockGraph','resetSeries');
    }
    else if(option === '3M'){
      ApexCharts.exec('StockGraph','zoomX',lastIndex-90,lastIndex);

    }
    else{
      ApexCharts.exec('StockGraph','zoomX',lastIndex-30,lastIndex);
    }
  }


  return (
    <div className="w-full flex flex-row justify-end h-full items-center flex-wrap gap-1 sm:gap-0">
      {options.map((option) => {
        return (
          <div onClick={()=>{setZoomButton(option); ZoomGraph(option)}} className={`text-gray-600 h-[70%] min-h-[36px] flex relative justify-center items-center text-[15px] sm:text-[17px] md:text-[18px] px-3 sm:px-4 py-2 mx-1 sm:mx-2 md:mx-3 cursor-pointer rounded-md hover:bg-slate-50 transition-colors ${zoomButton === option? 'font-semibold bg-slate-50' : ''}`}>{option}
            { zoomButton === option ? <div className="absolute bottom-0 sm:bottom-[-5px] w-8 sm:w-9 h-[3px] bg-blue-900 rounded-full"></div> : ''}
          </div>
        )
      })}
    </div>
  )
}