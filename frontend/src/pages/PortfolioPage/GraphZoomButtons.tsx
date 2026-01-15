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
      console.log('reset');
      ApexCharts.exec('PortfolioHistory', 'zoomX', 'resetSeries');
    }
  }






  return (
    <div className="zoom-grid flex gap-5 w-full text-[17px] justify-end pr-[30px]">
      {zoomButtons.map((option: string) => {
        return (
          <div key={option} className={`w-[40px] cursor-pointer justify-center flex transition-[border] duration-40 ${activeZoomButton === option ? 'font-semibold border-b-[3px]' : ''}`} onClick={() => { setActiveZoomButton(option); ZoomGraph(option) }}>{option}</div>
        )
      })}
    </div>
  )
}