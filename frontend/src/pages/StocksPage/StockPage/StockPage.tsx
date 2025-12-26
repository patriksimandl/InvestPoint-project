import { useEffect, type Dispatch, type SetStateAction } from "react";
import { MainMenu } from "../../../shared/MainMenu";
import { useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { StockGraph } from "./StockGraph";
import './StockPage.css'
import LoadingOverlay from "../../PortfolioPage/LoadingOverlay";
import { OperationTab } from "./OperationTab";


type StockPageProps = { isLogged: boolean; setIsLogged: Dispatch<SetStateAction<boolean>>; userEmail?: string | undefined; }

export function StockPage({ isLogged, setIsLogged, userEmail }: StockPageProps) {

  const { symbol } = useParams();

  const { data: stockData, isLoading, isError } = useQuery({
    queryKey: ['stockData', symbol],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/stocks/${symbol}`)
      return response.data
    },
    enabled: !!symbol,
    staleTime: 1000 * 60 * 60
  })

  useEffect(() => {
    console.log(stockData);
  }, [stockData]);

  const title =  `Invest Point - ${symbol}`
  return (
    
    <>
      
      {isLoading ? <LoadingOverlay /> : ''}
      <title>{title}</title>
      <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />
      <div className="stock-page-container">
        <div className="w-full rounded-[8px] bg-white shadow-lg flex flex-col h-[75vh] p-[20px]">
          <div className="flex flex-row h-[75vh]">
            <div className="w-[35%] flex flex-col">
              <div className="flex flex">
                <div>
                  <img src={stockData?.logoURL} className='h-[100px]' />
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div>
                      {stockData?.name}
                    </div>
                    <div>
                      ({stockData?.symbol})
                    </div>
                  </div>
                  <div>
                    ${stockData?.data.data[0].close}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div>
                  <div>
                    Prev close
                  </div>
                  <div>
                    ${stockData?.data.data[1].close}
                  </div>
                </div>
                <div>
                  <div className="">
                    Open
                  </div>
                  <div className="">
                    {stockData?.data.data[0].open}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[65%] flex flex-col">
              <div className="h-[20%]">
              </div>
              <div className="h-[80%]">
                <StockGraph stockData={stockData?.data.data} />
              </div>
            </div>
          </div>
          <OperationTab />
        </div>
        <div className="bg-white rounded-[8px] mt-[20px] shadow-lg">
          dadw
        </div>
      </div>

    </>

  )
}