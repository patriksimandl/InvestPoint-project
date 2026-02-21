import { useEffect, type Dispatch, type SetStateAction } from "react"
import ApexCharts from "apexcharts";

type GraphZoomButtonsProps = {
  zoomButtons: string[],
  setActiveZoomButton: Dispatch<SetStateAction<string>>,
  activeZoomButton: string,
  lastIndex: number
}


export function GraphZoomButtons({ zoomButtons, setActiveZoomButton, activeZoomButton, lastIndex }: GraphZoomButtonsProps) {

  function ZoomGraph(option: string) {
    if (option === '1Y') {
      if (lastIndex - 365 >= 0) {
        ApexCharts.exec('PortfolioHistory', 'zoomX', lastIndex - 365, lastIndex)
      }
      else {
        ApexCharts.exec('PortfolioHistory', 'zoomX', 'resetSeries');
      }

    }
    else if (option === '1M') {
      if (lastIndex - 30 >= 0) {
        ApexCharts.exec('PortfolioHistory', 'zoomX', lastIndex - 30, lastIndex)
      }
      else {
        ApexCharts.exec('PortfolioHistory', 'zoomX', 'resetSeries');
      }

    }
    else if (option === 'All') {
      ApexCharts.exec('PortfolioHistory', 'zoomX', 'resetSeries');
    }
  }






  return (
    <div className="zoom-grid flex gap-2 sm:gap-4 w-full text-[14px] sm:text-[16px] justify-start sm:justify-end flex-wrap">
      {zoomButtons.map((option: string) => {
        return (
          <div key={option} className={`cursor-pointer justify-center flex px-3 py-1 rounded-full border ${activeZoomButton === option ? 'font-semibold border-slate-900 text-slate-900' : 'border-slate-200 text-slate-600'} transition-colors`} onClick={() => { setActiveZoomButton(option); ZoomGraph(option) }}>{option}</div>
        )
      })}
    </div>
  )
}