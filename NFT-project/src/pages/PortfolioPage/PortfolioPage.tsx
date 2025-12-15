import dayjs from "dayjs";
import { MainMenu } from "../../shared/MainMenu";
import ApexCharts from "apexcharts";
import { use, useEffect, useRef, useState } from "react";
import './PortfolioPage.css'
import InfoIcon from '/InfoIcon.svg'



export function PortfolioPage({ logged }: { logged: boolean }) {
  const [activeZoomButton, setActiveZoomButton] = useState('All');
  const historicalGraphContainer = useRef(null);
  const holdingsGraphContainer = useRef(null);
  const todaysDate = dayjs().format('DD. MM');

  const zoomButtons = ['1Y', '1M', 'All'];

  const historyGraphOptions = {
    chart: {
      type: 'area',
      width: "100%",
      height: "95%",
      toolbar: {
        show: false,

      },
      zoom: {
        enabled: false,
      }

    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      xaxis: {
        lines: { show: false },  // vertical grid lines

      },
    },
    markers: {
      strokeColor: 'inherited',
    },


    series: [{
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      tooltip: {
        enabled: false,
      }

    },
    yaxis: {
      title: {
        text: 'Portfolio value ($)',
        style: {
          fontWeight: '600',
          fontSize: '15px'
        }
      },

    },
    stroke: {
      curve: 'straight',
    },
    subtitle: {
      text: '',
      align: '',
      style: {
        fontSize: '15px'


      }
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: { series: any, seriesIndex: number, dataPointIndex: number, w: any }) {
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
      y: {
        show: true
      }
    }

  }

  const holdingsGraphOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
      events:{
        legendClick: function (chartContext, seriesIndex, config){
          const seriesName = config.global.seriesNames[seriesIndex];
          console.log(seriesName);

        }

        
      }
    },
    series: [44, 100, 41, 17, 15,20,19],
    
    labels: ['Tech', 'Finance', 'Consumer & Retail', 'Healthcare', 'Energy', 'Automotive & Industrials', 'Entertainment'],

    plotOptions: {
      pie: {
        expandOnClick: false,
        customScale: 1,
        donut: {
          size: '50%'
        }
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '12px',
    },
    states: {
      active: {
        filter: {
          //type: 'none'
        }
      }
    },
    colors: ['#008FFB', // blue
      '#00E396', // green
      '#FEB019', // yellow
      '#FF4560', // red
      '#775DD0', // purple
      '#3F51B5', // indigo
      '#546E7A', // gray-blue
      ],
    onItemClick:{
      
    },
  }



  useEffect(() => {
    const chart = new ApexCharts(historicalGraphContainer.current, historyGraphOptions);

    chart.render();

  }, [historicalGraphContainer]);

  useEffect(() => {
    console.log(holdingsGraphContainer);
    const holdingsChart = new ApexCharts(holdingsGraphContainer.current, holdingsGraphOptions);

    holdingsChart.render();
  }, [holdingsGraphContainer]);









  return (
    <>
      <MainMenu logged={logged} />
      <div className="portfolio-page-container ">
        <div className="grid grid-cols-3 gap-[20px] pb-[20px]">
          <div className="pl-[50px] shadow-lg rounded-[8px] p-[30px] w-full bg-white flex flex-col">
            <div className="font-semibold headings-portfolio-page">Total portfolio value</div>
            <div className="text-[32px] font-semibold text-green-700 flex items-center h-full">
              $12,578.204
            </div>

          </div>
          <div className="pl-[50px] shadow-lg rounded-[8px] p-[30px] w-full bg-white flex flex-col">
            <div className="font-semibold headings-portfolio-page flex">
              <div>
                Net Profit
              </div>
              <div className="ml-[6px] flex flex-center relative">
                <img src={InfoIcon} alt="InfoIcon" className="info-icon w-[20px]" />
                <div className="info-label text-gray-800 font-normal absolute text-[14px] w-[14vw] bg-white rounded-[8px] border-[1px] border-gray-200 p-[14px] top-5 left-5 z-10 shadow-md transtion-all" >
                  <span className="font-bold text-black">Gain from an investment</span> after subtracting the amount invested and all related costs from the total return.
                </div>
              </div>

            </div>
            <div className="font-semibold text-green-700">
              <div className="text-[27px]  ">
                +$273.36
              </div>
              <div className="text-[20px] font-normal">
                (+761.87 %)
              </div>

            </div>
          </div>
          <div className="shadow-lg row-span-2 rounded-[8px] p-[20px] w-full bg-white flex flex-col">
            <div className="font-semibold headings-portfolio-page">Portfolio holdings</div>
            <div className="mt-[5%]" ref={holdingsGraphContainer} ></div>
          </div>
          <div className="col-span-2 relative w-full h-[500px] p-[20px] shadow-lg bg-white rounded-[8px] flex flex-col">
            <div className="headings-portfolio-page pl-[30px] grid grid-cols-2">
              <div className="grid-span-1 font-semibold ">Historical Portfolio Value</div>
              <div className="zoom-grid flex gap-5 w-full text-[17px] justify-end pr-[30px]">
                {zoomButtons.map((button) => {
                  return (
                    <div key={button} className={`w-[40px] cursor-pointer justify-center flex transition-[border] duration-40 ${activeZoomButton === button ? 'font-semibold border-b-[3px]' : ''}`} onClick={() => { setActiveZoomButton(button) }}>{button}</div>
                  )
                })}
              </div>
            </div>

            <div id="chart" className="w-full h-full" ref={historicalGraphContainer}></div>
          </div>

        </div>



      </div>

    </>
  )
}