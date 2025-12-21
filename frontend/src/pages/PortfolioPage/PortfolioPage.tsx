import dayjs from "dayjs";
import { MainMenu } from "../../shared/MainMenu";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import './PortfolioPage.css'
import InfoIcon from '/InfoIcon.svg'
import HoldingsGraph from './HoldingsGraph';
import HistoryGraph from './HistoryGraph';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingOverlay from './LoadingOverlay';


type PortfolioPageProps = {
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>;

}

export function PortfolioPage({ isLogged, setIsLogged }: PortfolioPageProps) {
  const [activeZoomButton, setActiveZoomButton] = useState<string>('All');
  const todaysDate = dayjs().format('DD. MM');

  const zoomButtons = ['1Y', '1M', 'All'];

  const { data: userPortfolio, isLoading, error } = useQuery({
    queryKey: ["userPortfolio"],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/portfolio', { withCredentials: true })
      return response.data;
    },
  });







  useEffect(() => {
    console.log(userPortfolio);

  }, [userPortfolio]);





  return (
    <>
      <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} />
      {isLoading ? <LoadingOverlay /> : null}

      
      <div className="portfolio-page-container ">

        <div className="grid grid-cols-3 gap-[20px] pb-[20px]">
          <div className="pl-[50px] shadow-lg rounded-[8px] p-[30px] w-full bg-white flex flex-col">
            <div className="font-semibold headings-portfolio-page">Total portfolio value</div>
            <div className="text-[32px] font-semibold text-green-700 flex items-center h-full">
              ${isLoading || error ? '0' : userPortfolio.totalBalanceInUSD}
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
            <HoldingsGraph isLoading={isLoading}/>
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

            <HistoryGraph isLoading={isLoading} />
          </div>

        </div>



      </div>

    </>
  )
}