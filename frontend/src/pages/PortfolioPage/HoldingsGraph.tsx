import ApexCharts from "apexcharts";
import { useEffect, useRef } from "react";

type HoldingsGraphProps = {
  isLogged: boolean,
  stockHoldings: Record<string, number> | undefined | null;
}

export default function HoldingsGraph({ isLogged, stockHoldings }: HoldingsGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLogged) return;
    if (!containerRef.current) return;
    if (!stockHoldings) return;

    const entries = Object.entries(stockHoldings);
    if (entries.length === 0) return;

    const labels = [];


    const series = entries.map((entry)=>{







    });





    
    
    const holdingsGraphOptions = {
      chart: {
        type: 'donut',
        toolbar: { show: false },
        events: {
          legendClick: function (chartContext: any, seriesIndex: any, config: any) {
            const seriesName = config.global.seriesNames[seriesIndex];
            console.log(seriesName);
          }
        }
      },
      series: series,
      labels: labels,
      plotOptions: {
        pie: {
          expandOnClick: false,
          customScale: 1,
          donut: { size: '50%' }
        }
      },
      legend: { position: 'bottom', fontSize: '12px' },
      states: { active: { filter: {} } },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#546E7A']
    };

    const chart = new ApexCharts(containerRef.current as any, holdingsGraphOptions);
    chart.render();
    return () => { chart.destroy(); };
  }, [isLogged, stockHoldings,containerRef.current]);

  return <div className="mt-[5%] " ref={containerRef} />;
}