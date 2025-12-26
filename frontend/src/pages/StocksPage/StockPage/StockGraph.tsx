import { useEffect, useRef, useState } from "react";
import ApexCharts from 'apexcharts'
import dayjs from "dayjs";

type StockGraphProps = {
  stockData: {date: string,
    open: number,
    high:number,
    low:number,
    close: number
  }[] 
}

export function StockGraph({stockData}: StockGraphProps) {
  const graphContainer = useRef(null)
  const [formatedData,setFormatedData] = useState<Array<object> | null>(null);


  useEffect(()=>{
    if(stockData){
      const format = stockData.map((day)=>{
        return({
          x: dayjs(day.date).format('YYYY-MM-DD'),
          y: [day.open,day.high,day.low,day.close]
        })
      }).reverse()
      setFormatedData(format);
    }
  },[stockData])

  useEffect(()=>{
    if(formatedData){
      console.log(formatedData);
    }
  },[formatedData])




    const stockGraphOptions = {
    chart: { animations: {
      enabled:true,
      speed:100,
      animateGradually:{
        enabled: false
      }
    },type: 'candlestick', width: '100%', height: '100%', toolbar: { show: false }, zoom: { enabled: true } },
    dataLabels: { enabled: false },
    grid: { show: true, xaxis: { lines: { show: false } } },
    markers: { strokeColor: 'inherited' },
    series: [{
      data: formatedData}],
    xaxis: {
      tooltip: { 
        enabled:false
      },
      crosshairs:{
        show:true,
      } },
    yaxis: { 
      crosshairs: {
        show: true, // horizontal line 👈 THIS is the missing part
        stroke: {
          color: "#888",
          width: 2,
          dashArray: 0,
        },
    },
    title: { text: '', style: { fontWeight: '600', fontSize: '15px' } } },
    stroke: { curve: 'straight' },
    subtitle: { text: '', align: '', style: { fontSize: '15px' } },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return (`<div class="p-[7px] text-[14px] flex">
                  <div class="font-semibold">
                    ${series[seriesIndex][dataPointIndex]} USD 
                  </div>
                  <div class="text-gray-500 ml-[5px]">
                    ${w.globals.categoryLabels[dataPointIndex]}
                  </div>
                </div>`)
      },
      marker: false,
      y: { show: true },
    },
    

  };


  useEffect(() => {
      if(!formatedData)return
      if (!graphContainer.current) return;
      const chart = new ApexCharts(graphContainer.current as any, stockGraphOptions);
      chart.render();
      return () => { chart.destroy(); };
    }, [formatedData]);

  return(
    
    <div ref={graphContainer} className=" h-[100%] w-[100%]"></div>
  )
}