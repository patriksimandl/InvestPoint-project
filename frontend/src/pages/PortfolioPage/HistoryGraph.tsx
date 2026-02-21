import ApexCharts from "apexcharts";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

type HistoryGraphProps = {
  isLogged: boolean,
  totalBalanceHistory: Record<string,number>[] | undefined;
  setActiveZoomButton: Dispatch<SetStateAction<string>> ,


}


export default function HistoryGraph({ setActiveZoomButton, isLogged, totalBalanceHistory}: HistoryGraphProps) {
  const lastIndex =totalBalanceHistory?.length! - 1;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    

    if (!containerRef.current) return
    if (!isLogged) return
    if(!totalBalanceHistory) return

    
    const dates: string[] = [];


    const format = totalBalanceHistory?.map((day : Record<string,  number | string>, index) => {
      dates.push(day.date as string);


      return {
        x: index,
        y: Number(day.value).toFixed(2)
      }
    })




    const historyGraphOptions = {

      chart: {
        events: {
          zoomed: (chartContext: any, { xaxis, yaxis }: { xaxis: { min: number, max: number }, yaxis: { min: number, max: number } }) => {
            if (!xaxis) { return }
            const max = Math.round(xaxis.max);
            const min = Math.round(xaxis.min);

            /*console.log(max);
            console.log(min);
            */

            if (min === lastIndex - 30 && max === lastIndex) {
              setActiveZoomButton('1M');
            }

            else if (min === lastIndex - 365 && max === lastIndex) {
              setActiveZoomButton('1Y');
            }
            
            else if(min === 0 && max === lastIndex) {
              setActiveZoomButton('All')
            }
            
          },
        },
        id: 'PortfolioHistory',
        type: 'area',
        width: '100%',
        height: '95%',
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      grid: { show: true, xaxis: { lines: { show: false } } },
      markers: { strokeColor: 'inherited' },
      series: [{
        data: format
      }],
      xaxis: {
        type: 'numeric',
        labels: {
          formatter: (value: Number) => {
            const idx = Math.round(Number(value));
            return dates[idx]
          },
          rotate: -35,
          style: { fontSize: '11px' }
        }
      },
      yaxis: {
        title: { text: 'Portfolio value ($)', style: { fontWeight: '600', fontSize: '14px' } },
        labels: { style: { fontSize: '11px' } }
      },
      stroke: { curve: 'straight' },
      subtitle: { text: '', align: '', style: { fontSize: '15px' } },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          return (`<div class="p-[7px] text-[14px] flex">
                  <div class="font-semibold">
                    ${series[seriesIndex][dataPointIndex]} USD 
                  </div>
                  ${/*<div class="text-gray-500 ml-[5px]">
                    ${w.globals.categoryLabels[dataPointIndex]}
                  </div>*/''}
                </div>`)
        },
        marker: false,
        y: { show: true }
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { height: 280 },
            xaxis: { labels: { rotate: -45, style: { fontSize: '10px' } } },
            yaxis: { title: { style: { fontSize: '12px' } }, labels: { style: { fontSize: '10px' } } }
          }
        },
        {
          breakpoint: 480,
          options: {
            chart: { height: 240 },
            grid: { padding: { left: 6, right: 6 } },
            xaxis: { labels: { show: false } },
            yaxis: { title: { style: { fontSize: '11px' } }, labels: { style: { fontSize: '9px' } } }
          }
        }
      ]
    };


    const chart = new ApexCharts(containerRef.current as any, historyGraphOptions);
    chart.render();
    return () => { chart.destroy(); };

  }, [isLogged, containerRef.current,totalBalanceHistory]);

  return <div id="chart" className="w-full h-full min-h-[240px]" ref={containerRef} />;
}
