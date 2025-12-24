import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

export default function HistoryGraph({isLogged} : {isLogged : boolean}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const historyGraphOptions = {
    chart: { type: 'area', width: '100%', height: '95%', toolbar: { show: false }, zoom: { enabled: false } },
    dataLabels: { enabled: false },
    grid: { show: true, xaxis: { lines: { show: false } } },
    markers: { strokeColor: 'inherited' },
    series: [{ name: 'sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
    xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999], tooltip: { enabled: false } },
    yaxis: { title: { text: 'Portfolio value ($)', style: { fontWeight: '600', fontSize: '15px' } } },
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
      y: { show: true }
    }
  };

  useEffect(() => {
    if(!isLogged) return
    if (!containerRef.current) return;
    const chart = new ApexCharts(containerRef.current as any, historyGraphOptions);
    chart.render();
    return () => { chart.destroy(); };
  }, [isLogged]);

  return <div id="chart" className="w-full h-full " ref={containerRef} />;
}
