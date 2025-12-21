import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

export default function HoldingsGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    series: [44, 100, 41, 17, 15, 20, 19],
    labels: ['Tech', 'Finance', 'Consumer & Retail', 'Healthcare', 'Energy', 'Automotive & Industrials', 'Entertainment'],
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

  useEffect(() => {
    if (!containerRef.current) return;
    const holdingsChart = new ApexCharts(containerRef.current as any, holdingsGraphOptions);
    holdingsChart.render();
    return () => { holdingsChart.destroy(); };
  }, []);

  return <div className="mt-[5%] " ref={containerRef} />;
}
