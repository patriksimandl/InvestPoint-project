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
    <div className="w-full flex flex-row justify-end h-full items-center">
      {options.map((option) => {
        return (
          <div onClick={()=>{setZoomButton(option); ZoomGraph(option)}} className={`text-gray-600 h-[70%] flex relative justify-center items-center text-[18px] p-2 mx-3 cursor-pointer ${zoomButton === option? 'font-semibold ' : ''}`}>{option}
            { zoomButton === option ? <div className="absolute bottom-[-5px] w-9 h-[3px] bg-blue-900"></div> : ''}
          </div>
        )
      })}
    </div>
  )
}