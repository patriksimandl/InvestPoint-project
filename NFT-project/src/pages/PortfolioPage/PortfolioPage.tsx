import dayjs from "dayjs";
import { MainMenu } from "../../shared/MainMenu";
import ApexCharts from "apexcharts";



export function PortfolioPage({ logged }: { logged: boolean }) {
  const todaysDate = dayjs().format('DD. MM');

  var options = {
    chart: {
      type: 'area',
      width: "100%",
      height: "95%",
      toolbar: {
        show: false,

      },

    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      xaxis: {
        lines: { show: true }  // vertical grid lines
      },
    },



    series: [{
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    stroke: {
      curve: 'smooth',
    },

  }

  var chart = new ApexCharts(document.querySelector("#chart"), options);

  chart.render();




  return (
    <>
      <MainMenu logged={logged} />
      <div className="portfolio-page-container ">
        <div className="grid grid-cols-3 gap-[20px]">
          <div className="shadow-lg rounded-[8px] p-[20px] w-full bg-white flex flex-col">
            <div className="font-semibold">Total portfolio value</div>
            <div>$12578</div>
            <div>{todaysDate} &#183; UTC+1</div>
          </div>
          <div className="shadow-lg rounded-[8px] p-[20px] w-full bg-white flex flex-col">
            <div className="font-semibold">Total portfolio value</div>
            <div>$12578</div>
          </div><div className="shadow-lg rounded-[8px] p-[20px] w-full bg-white flex flex-col">
            <div className="font-semibold">Total portfolio value</div>
            <div>$12578</div>
          </div>
          <div className="col-span-2 w-full h-[500px] p-[20px] shadow-lg bg-white rounded-[8px] flex flex-col">
            <div className="pl-[50px] font-semibold text-[23px]">
              Your history
            </div>
            <div id="chart" className="w-full h-full"></div>
          </div>

        </div>



      </div>

    </>
  )
}