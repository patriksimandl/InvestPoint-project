import { MainMenu } from "../../shared/MainMenu";
import './StocksPage.css'
import { StockContainer } from "./StockContainer";
import dayjs from "dayjs";


type StocksPageProps =
  {
    logged: boolean,
    tableStocksData: {

      name: string,
      symbol: string,
      logoURL: string;
      data: {
        "Time Series (Daily)": any
      }

    }[]
  }



export function StocksPage({ logged, tableStocksData }: StocksPageProps) {

  const dateForPrice = dayjs().format('YYYY-MM-DD');


  return (
    <>
      <MainMenu />
      {logged ? <div className="w-[25%] bg-white h-[82vh] rounded-[8px] fixed right-[8%] z-2 top-[130px] p-[20px] flex flex-col shadow-lg">
        <div className="font-semibold text-[22px]">Portfolio</div>
        <div className="">
          <div className="text-[15px] text-gray-600 mt-[15px]">Your Balance</div>
          <div className="text-[20px] font-semibold">$12 942</div>


        </div>
        <div className="flex  h-full justify-center">
          <button className="button-primary  self-end w-[12vw]">
            View More
            <div className="flex items-center ml-[4px]">
              <img className="h-[20px]" src="/arrow-right-icon-white.svg"></img>
            </div>
          </button>
        </div>

      </div> : ''}
      <div className="w-full bg-sky-200 bg-linear-to-br from-sky-300 to-blue-800 fixed top-[0px] h-[160px] content-end px-[8%] z-[0] text-white ">
        <div className={`grid grid-cols-3  mb-[10px] font-semibold ${logged ? 'w-[69%]' : `w-full`}`}>
          <div className="ml-[90px]">Share</div>
          <div className="ml-[98px]">Price</div>
          <div></div>
        </div>
      </div>
      <div className="stocks-page-container bg-gray-100 flex ">
        <div className={logged ? `w-[68%]` : `w-full`}>

          <div className="stocks-grid ">
            {tableStocksData.map((Stock: {
              symbol: string,
              name: string,
              logoURL: string,
              data: {
                "Time Series (Daily)": any
                  
                
              }
            }) => {
              return <StockContainer name={Stock.name} symbol={Stock.symbol} logoURL={Stock.logoURL} prices={Stock.data["Time Series (Daily)"][dateForPrice]} />
            })}

          </div>
        </div>

      </div>
    </>

  )
}