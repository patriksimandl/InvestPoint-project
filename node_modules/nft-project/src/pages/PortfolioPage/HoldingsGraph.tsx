import ApexCharts from "apexcharts";
import { useEffect, useRef } from "react";
import type { Portfolio } from "./Portfolio";
import type { StockData } from "./types";

type HoldingsGraphProps = {
  isLogged: boolean,
  userPortfolio: Portfolio
  
  tableStocksData: StockData[]
}

export default function HoldingsGraph({ isLogged, userPortfolio, tableStocksData }: HoldingsGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);


  const stockHoldings = userPortfolio?.stockHoldings;
  
  useEffect(() => {
    console.log(stockHoldings);
  }, [stockHoldings])


  function defineLabels(stockHoldingsEntries: [string, any][]) {

    const labels: String[] = [];

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

    
    
    console.log(userPortfolio);
    const HoldingsValue: number | 'Stock Holdings is not defined' | undefined =  userPortfolio?.calculateStockHoldingsValue(); 


    
    if(typeof HoldingsValue !== 'number') return

    
   

    

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

            const valueOfSymbol = (quantity*pricePerShare) / (HoldingsValue / 100) 
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