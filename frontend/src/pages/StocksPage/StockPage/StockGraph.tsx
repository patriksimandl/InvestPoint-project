import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import ApexCharts from 'apexcharts'
import dayjs from "dayjs";

type StockGraphProps = {
  stockData: {
    date: string,
    open: number,
    high: number,
    low: number,
    close: number
  }[],
  lastIndex: number,
  setZoomButton: Dispatch<SetStateAction<string>>
}

export function StockGraph({ stockData, lastIndex, setZoomButton }: StockGraphProps) {
  const graphContainer = useRef(null)
  //const [formatedData, setFormatedData] = useState<Array<object> | null>(null);
  const [isRendered,setIsRendered] = useState(false);



  useEffect(() => {
    if (stockData) {
      
      const dataLength = stockData.length;
      const dates: string[] = [];

      let format;
      //if data
      if (new Date(stockData[0].date) > new Date(stockData[dataLength - 1].date)) {
        format = [...stockData].reverse();
      }
      else {
        format = [...stockData];
      }



      format = format.map((day, index) => {
        dates.push(day.date);

        //console.log('1');
        //console.log(index,day);
        return ({
          x: index,
          //x: dayjs(day.date).format('YYYY-MM-DD'),
          y: [day.open, day.high, day.low, day.close]
        })
      })
      //setFormatedData(format);
      const stockGraphOptions = {
        chart: {
          events:{
            zoomed: (chartContext,{xaxis,yaxis}) =>{
              if(!xaxis){return}
              const max = Math.round(xaxis.max);
              const min = Math.round(xaxis.min);

              if(min === lastIndex-90 && max=== lastIndex){
                setZoomButton('3M');
              }
              else if(min === lastIndex-30 && max===lastIndex){
                setZoomButton('1M');
              }
              else if(min === 0 && max === lastIndex){
                setZoomButton('6M');
              }
              else{
                setZoomButton('NONE')
              }
            }

            
          },

          id: 'StockGraph',
          animations: {
            
            enabled: true,
            speed: 100,
            animateGradually: {
              enabled: false
            }
          }, type: 'candlestick', width: '100%', height: '100%', toolbar: { show: false }, zoom: { enabled: true }
        },
        dataLabels: { enabled: false },
        grid: { show: true, xaxis: { lines: { show: false } } },
        //markers: { strokeColor: 'inherited' },
        series: [{
          data: format
        }],
        xaxis: {
          type: 'numeric',
          labels: {
            formatter: (value: number) => {
              const indx = Math.round(Number(value));
              return dayjs(dates[indx]).format('YYYY-MM-DD')
            }
          },

          tooltip: {
            enabled: true
          },
          crosshairs: {
            show: true,
            stroke: {
              color: "#888",
              width: 1,
              dashArray: 0,
            },
          }
        },
        yaxis: {
          crosshairs: {
            show: true, 
            stroke: {
              color: "#888",
              width: 1,
              dashArray: 0,
            },

          },
          tooltip: {
            enabled: true
          },
          title: { text: '', style: { fontWeight: '600', fontSize: '15px' } }
        },
        stroke: { curve: 'straight' },
        //subtitle: { text: '', align: '', style: { fontSize: '15px' } },
        /*tooltip: {
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
        },*/


      };

      if (!graphContainer.current) return;
      const chart = new ApexCharts(graphContainer.current as any, stockGraphOptions);
      setIsRendered(true);
      chart.render();
      
      return () => { chart.destroy(); };


    }
  }, [stockData])


 



  
  return (

    <div ref={graphContainer} className=" h-[100%] w-[100%]"></div>
  )
}