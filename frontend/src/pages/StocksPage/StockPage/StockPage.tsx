import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { MainMenu } from "../../../shared/MainMenu";
import { useParams } from "react-router";
import axios from "axios";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { StockGraph } from "./StockGraph";
import './StockPage.css'
import LoadingOverlay from "../../PortfolioPage/LoadingOverlay";
import { OperationTab } from "./OperationTab";
import { formatPrice } from "../formatPrice";
import { MarketOpening } from "./MarketOpening";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from "dayjs/plugin/timezone";
import { StockDetails } from "./StockDetails";
import { GraphZoom } from "./GraphZoom";
import { BuyOverlay } from "./BuyOverlay";
import { LoginOverlay } from "./LoginOverlay";
import { TransactionMessage } from "./TransactionMessage";

dayjs.extend(utc);
dayjs.extend(timezone);

type stockDataProps = {

  logoURL: string
  name: string
  symbol: string
  data: {
    meta: {}
    data: {
      date: string,
      close: number


    }[],
  },
  companyProfile: {
    marketCapitalization: number
  }

}

type StockPageProps = { isLogged: boolean; setIsLogged: Dispatch<SetStateAction<boolean>>; userEmail?: string | undefined; }

export function StockPage({ isLogged, setIsLogged, userEmail }: StockPageProps) {
  const [zoomButton, setZoomButton] = useState('6M');
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loginTransition,setLoginTransiton] = useState<boolean>(false);
  const [action,setAction] = useState('');
  const [transactionMessage, setTransactionMessage] = useState<boolean>(false);
  const { symbol } = useParams();

  const queryClient = useQueryClient();

  const [animateInMessage, setAnimateInMessage] = useState(false);
  const [buyingQuantities,setBuyingQuantities] = useState({
    price: undefined,
    numberOfShares: undefined
  })


  useEffect(()=>{
    if(transactionMessage){
      setAnimateInMessage(true);
    }
    else{
      
      setAnimateInMessage(false)
    }
  },[transactionMessage])




  const { data: stockData, isLoading, isError } = useQuery({
    queryKey: ['stockData', symbol],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/stocks/${symbol}`)

      //console.log(response.data);
      return response.data


    },
    enabled: !!symbol,
    staleTime: 1000 * 60 * 60
  })

  useEffect(() => {
    console.log(stockData);
  }, [stockData]);

  useEffect(() => {
    queryClient.setQueryData(['stockData', symbol], (oldData: stockDataProps) => {
      if (!oldData) {
        return oldData;
      }

      const isMarketCap = oldData?.companyProfile?.marketCapitalization;

      if (!isMarketCap) {
        return oldData;
      }



      //Convert market Cap to better unit
      if (oldData?.companyProfile?.marketCapitalization > 1000000000000) {
        return ({
          ...oldData,

          marketCapitalizationFormated: `${(oldData?.companyProfile.marketCapitalization / 1000000000000).toFixed(2)}T`,
        })
      }
      else if (oldData?.companyProfile?.marketCapitalization > 1000000000) {
        return ({
          ...oldData,


          marketCapitalizationFormated: `${(oldData?.companyProfile.marketCapitalization / 1000000000).toFixed(2)}M`,

        })
      }
      else {
        return ({
          ...oldData,
          marketCapitalizationFormated: oldData?.companyProfile.marketCapitalization
        })
      }
    })
  }, [stockData])





  const { data: marketInfo, isLoading: isLoadingMarketInfo } = useQuery({
    queryKey: ['marketInfo'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/market/info');
      return response.data
    },
    staleTime: 1000 * 60 * 5
  })

  const { data: userPortfolio, isLoading: isLoadingPortfolio, error } = useQuery({
    queryKey: ["userPortfolio"],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/portfolio', { withCredentials: true })

      return response.data;
    },


  });



  useEffect(() => {
    if (marketInfo) {
    }
  }, [marketInfo])


  const dataLength = stockData?.data?.data.length
  const lastIndex = dataLength - 1

  //Daychange price today - price yesterday


  const dayChange = stockData?.data?.data && stockData?.data?.data.length > 1 ? stockData?.data.data[0].close - stockData?.data.data[0].open : null;

  const marketStatus = marketInfo?.data.markets[0].status.status;
  const nextOpeningTime = dayjs(marketInfo?.data.markets[0].status.nextChange).tz('Europe/Prague').format(`ddd DD/MM H:m`)

  console.log(userPortfolio);
  console.log(typeof userPortfolio?.cashBalance);

  const title = `Invest Point - ${symbol}`
  return (

    <>

      {isLoading ? <LoadingOverlay /> : ''}
      {isBuying ? <BuyOverlay action={action} setIsBuying={setIsBuying} setBuyingQuantities={setBuyingQuantities} setAnimateInMessage={setAnimateInMessage} todayClosePrice={stockData?.data.data[0].close} symbol={symbol} name={stockData?.name} userCashBalance={Number((userPortfolio?.cashBalance))} transactionMessage={transactionMessage} userTotalValue={userPortfolio?.totalBalance} setTransactionMessage={setTransactionMessage} /> : ''}

      {transactionMessage ? <TransactionMessage animateInMessage={animateInMessage} setAnimateInMessage={setAnimateInMessage} transactionMessage={transactionMessage} setTransactionMessage={setTransactionMessage} symbol={symbol} buyingQuantities={buyingQuantities}/> :'' }
      
      


      <title>{title}</title>
      
      
      <LoginOverlay setShowLogin={setShowLogin} loginTransition={loginTransition} showLogin={showLogin} setLoginTransition={setLoginTransiton}/>

      <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />
      <div className="stock-page-container">
        <div className="w-full rounded-[8px] bg-white shadow-lg flex flex-col h-[75vh] p-[25px] ">
          <div className="flex flex-row h-[75vh]">
            <div className="w-[35%] flex flex-col">
              <div className=" flex flex gap-4 border-b-1 pb-[45px] border-gray-200">
                <div className="p-4 w-[100px] h-[140px] flex items-center">
                  <img src={stockData?.logoURL} className='w-full fill' />
                </div>
                <div className="flex flex-col mt-6">
                  <div className="flex  items-center gap-4">
                    <div className="text-[26px] font-semibold tracking-wide">
                      {stockData?.name}
                    </div>
                    <div className="text-gray-500 text-lg">
                      ({stockData?.symbol})
                    </div>
                  </div>
                  <div className="flex gap-5 items-center mt-[12px]">
                    <div className="font-semibold text-3xl tracking-wide">
                      ${stockData?.data.data[0].close}
                    </div>
                    <div className={`${dayChange ? dayChange >= 0 ? 'bg-green-600' : 'bg-red-600' : ''} text-white flex font-semibold px-3 py-[2px] rounded-[8px] text-lg h-[80%] text-nowrap items-center `}>
                      {dayChange ? formatPrice(dayChange) : ''}
                      <div className="font-normal ml-[10px]  flex align-center">
                        {dayChange ? (dayChange / (stockData.data.data[1].close / 100)).toFixed(2) : ''}%
                      </div>
                    </div>
                  </div>
                  <MarketOpening marketInfo={marketInfo} marketStatus={marketStatus} />

                </div>
              </div>
              <div className="border-b-1 border-gray-200 p-2 flex justify-between text-gray-700 text-md">
                <div>
                  Next market opening:
                </div>
                <div className="text-black">
                  {marketStatus && marketStatus === 'closed' ? `${nextOpeningTime}` : ''}
                </div>
              </div>
              <StockDetails prevClosePrice={stockData?.data.data[1].close} openPrice={stockData?.data.data[0].open} marketCap={stockData?.marketCapitalizationFormated} />
            </div>
            <div className="w-[65%] flex flex-col">

              <div className="h-[8%]">
                <GraphZoom zoomButton={zoomButton} setZoomButton={setZoomButton} lastIndex={lastIndex} />
              </div>
              <div className="h-[90%]">
                <StockGraph stockData={stockData?.data.data} lastIndex={lastIndex} setZoomButton={setZoomButton} />
              </div>
            </div>
          </div>
          <OperationTab setIsBuying={setIsBuying} isLogged={isLogged} setShowLogin={setShowLogin} showLogin={showLogin} setLoginTransition={setLoginTransiton} setAction={setAction}/>
        </div>
        <div className="bg-white rounded-[8px] mt-[20px] shadow-lg">
          dadw
        </div>
      </div>

    </>

  )
}