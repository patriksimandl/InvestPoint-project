import ApexCharts from "apexcharts";
import { useEffect, useRef } from "react";

type HoldingsGraphProps = {
  isLogged: boolean,
  stockHoldings: Record<string, number> | undefined | null;
  tableStocksData: {symbol: string, industry: string}[] 
}

export default function HoldingsGraph({ isLogged, stockHoldings, tableStocksData }: HoldingsGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(stockHoldings);
  }, [stockHoldings])


  function defineLabels(stockHoldingsEntries: [string, number][]) {

    const labels: String[] = [];

    console.log(stockHoldingsEntries);


    stockHoldingsEntries.forEach((entry) => {
      const symbol = entry[0];

      tableStocksData.forEach((stock: { symbol: string, industry: string }) => {
        if (stock.symbol === symbol) {
          if (labels.includes(stock.industry)) return
          return labels.push(stock.industry);
        }
      });



    })
    return labels
  }

  function defineSeries(stockHoldingsEntries : [string,any][], labels : String[] ) {
    const series:number[] = [];

    let HoldingsQuantity: number = 0;

    stockHoldingsEntries.forEach((entry) => {
      const quantity = entry[1].quantity
      const pricePerShare = entry[1].avgBuyPricePerShare;
      HoldingsQuantity += quantity * pricePerShare

    })

    const numberOfLabels = labels.length;


    labels.forEach((label,i) => {
      let percentOflabel = 0
      if (i === numberOfLabels-1){
        //To have nice 100% 
        let sumOfSeries = 0;
        
        series.forEach((value : number)=>{
          sumOfSeries += value
        })


        series.push(
          Number((100 - sumOfSeries).toFixed(2))
        )
        return
      }
      stockHoldingsEntries.forEach((entry) => {
        const symbol = entry[0]


        tableStocksData.forEach((stock : {symbol: string,industry: string}) => {
          if (stock.symbol === symbol && stock.industry === label) {
            const quantity = entry[1].quantity
            const pricePerShare = entry[1].avgBuyPricePerShare;

            const valueOfSymbol = (quantity*pricePerShare) / (HoldingsQuantity / 100) 
            percentOflabel += valueOfSymbol;

            console.log(symbol);
            console.log(valueOfSymbol);

            
          }
        })

      })
      series.push(Number(percentOflabel.toFixed(2)))



    })

    console.log(series);
    
    let sumOfSeries = 0

    series.forEach((num)=>{
      sumOfSeries += num;
    })

    console.log(sumOfSeries);
    return series
  }



  useEffect(() => {

    if (!isLogged) return;
    if (!containerRef.current) return;
    if (!stockHoldings) return;
    if (!tableStocksData) return;

    const entries = Object.entries(stockHoldings);
    if (entries.length === 0) return;

    const labels = defineLabels(entries);




    const series = defineSeries(entries, labels)


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
  }, [isLogged, stockHoldings, containerRef.current, tableStocksData]);

  return <div className="mt-[5%] " ref={containerRef} />;
}