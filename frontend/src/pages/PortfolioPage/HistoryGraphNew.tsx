import ApexCharts from "apexcharts";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";

type HistoryGraphProps = {
  isLogged: boolean,
  totalBalanceHistory: Record<string, number> | undefined | null;
}

export default function HistoryGraph({ isLogged, totalBalanceHistory }: HistoryGraphProps ) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLogged) return;
    if (!containerRef.current) return;
    if (!totalBalanceHistory) return;

    const entries = Object.entries(totalBalanceHistory as Record<string, number>);
    if (entries.length === 0) return;

    entries.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

    const dates: string[] = [];
    const format = entries.map(([date, value], index) => {
      dates.push(date);
      return { x: index, y: Number(value) };
    });

    const historyGraphOptions = {
      chart: {
        id: 'HistoryGraph',
        animations: { enabled: true, speed: 100, animateGradually: { enabled: false } },
        type: 'area', width: '100%', height: '100%', toolbar: { show: false }, zoom: { enabled: true },
      },
      dataLabels: { enabled: false },
      grid: { show: true, xaxis: { lines: { show: false } } },
      series: [{ data: format }],
      xaxis: {
        type: 'numeric',
        labels: {
          formatter: (value: number) => {
            const indx = Math.round(Number(value));
            return dayjs(dates[indx]).format('YYYY-MM-DD');
          }
        },
        tooltip: { enabled: true }
      },
      yaxis: { title: { text: 'Portfolio value ($)', style: { fontWeight: '600', fontSize: '15px' } } },
      stroke: { curve: 'straight' },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          const val = (series[seriesIndex] && series[seriesIndex][dataPointIndex]) ?? '';
          return (`<div class="p-[7px] text-[14px] flex">\n                    <div class="font-semibold">\n                      ${val} USD \n                    </div>\n                    <div class="text-gray-500 ml-[5px]">\n                      ${w.globals.categoryLabels[dataPointIndex]}\n                    </div>\n                  </div>`)
        },
        marker: false,
        y: { show: true }
      }
    };

    const chart = new ApexCharts(containerRef.current as any, historyGraphOptions);
    chart.render();
    return () => { chart.destroy(); };
  }, [isLogged, totalBalanceHistory]);

  return <div id="chart" className="w-full h-full " ref={containerRef} />;
}
