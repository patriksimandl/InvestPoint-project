import { useContext, useEffect, useState } from "react";
import { MainMenu } from "../../shared/MainMenu";
import { useParams } from "react-router";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StockGraph } from "./StockGraph";
import './StockPage.css'
import LoadingOverlay from "../PortfolioPage/LoadingOverlay";
import { OperationTab } from "./OperationTab";
import { formatPrice } from "../StocksPage/formatPrice";
import { MarketOpening } from "./MarketOpening";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from "dayjs/plugin/timezone";
import { StockDetails } from "./StockDetails";
import { GraphZoom } from "./GraphZoom";
import { BuyOverlay } from "./BuyOverlay";
import { LoginOverlay } from "./LoginOverlay";
import { TransactionMessage } from "./TransactionMessage";
import { Portfolio } from "../PortfolioPage/Portfolio";
import { BottomMenu } from "../../shared/BottomMenu";
import { IsLoggedContext } from "../../App";

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

export function StockPage() {
  const { isLogged } = useContext(IsLoggedContext)!;
  const [zoomButton, setZoomButton] = useState('6M');
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loginTransition, setLoginTransiton] = useState<boolean>(false);
  const [action, setAction] = useState('');
  const [transactionMessage, setTransactionMessage] = useState<boolean>(false);
  const { symbol } = useParams();

  const queryClient = useQueryClient();


  const [animateInMessage, setAnimateInMessage] = useState(false);
  const [buyingQuantities, setBuyingQuantities] = useState({
    price: 0,
    numberOfShares: 0
  })


  if(!symbol) return

  useEffect(() => {
    if (transactionMessage) {
      setAnimateInMessage(true);
    }
    else {

      setAnimateInMessage(false)
    }
  }, [transactionMessage])




  const { data: stockData, isLoading } = useQuery({
    queryKey: ['stockData', symbol],
    queryFn: async () => {
      // const response = await axios.get(`http://localhost:3000/stocks/${symbol}`)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks/${symbol}`)

      //console.log(response.data);
      return response.data


    },
    enabled: !!symbol,
    staleTime: 1000 * 60 * 60
  })

  

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





  const { data: marketInfo } = useQuery({
    queryKey: ['marketInfo'],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/market/info');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/market/info`);
      return response.data
    },
    staleTime: 1000 * 60 * 5
  })

  const { data: userPortfolio } = useQuery({
    queryKey: ["userPortfolio"],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/api/portfolio', { withCredentials: true })
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio`, { withCredentials: true })
      const data = response.data;
      return new Portfolio(
        data.userId,
        data.totalBalance,
        data.cashBalance,
        data.totalBalanceHistory,
        data.cashBalanceHistory,
        data.stockHoldings,
        data.transactionHistory

      )
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


  const holding = symbol && userPortfolio?.stockHoldings && typeof userPortfolio.stockHoldings === 'object' && !Array.isArray(userPortfolio.stockHoldings)
    ? userPortfolio.stockHoldings[symbol]
    : undefined;
  const canSell = !!holding && Number(holding.quantity) > 0;

  const todayClosePrice = Number(stockData?.data?.data?.[0]?.close ?? 0);
  const title = `Invest Point - ${symbol}`
  return (

    <>

      {isLoading ? <LoadingOverlay /> : ''}
      {isBuying ? <BuyOverlay action={action} setIsBuying={setIsBuying} setBuyingQuantities={setBuyingQuantities} setAnimateInMessage={setAnimateInMessage} todayClosePrice={todayClosePrice} symbol={symbol} name={stockData?.name} userCashBalance={Number((userPortfolio?.cashBalance))} userTotalValue={Number(userPortfolio?.totalBalance ?? 0)} setTransactionMessage={setTransactionMessage} canSell={canSell} /> : ''}

      {transactionMessage ? <TransactionMessage animateInMessage={animateInMessage} setTransactionMessage={setTransactionMessage} symbol={symbol} buyingQuantities={buyingQuantities} /> : ''}




      <title>{title}</title>


      <LoginOverlay setShowLogin={setShowLogin} loginTransition={loginTransition} showLogin={showLogin} setLoginTransition={setLoginTransiton} />

      <MainMenu />
      <div className="stock-page-container mb-10">
        <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px]">
          <div className="w-full rounded-[8px] bg-white shadow-lg flex flex-col h-auto lg:h-[650px] p-4 sm:p-5 md:p-[22px]">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[75vh] gap-4 md:gap-6">
            <div className="w-full lg:w-[36%] flex flex-col">
              <div className="flex flex-row items-start gap-4 sm:gap-6 border-b-1 pb-6 sm:pb-10 border-gray-200 flex-wrap sm:flex-nowrap">
                <div className="p-3 sm:p-4 w-[96px] h-[96px] sm:w-[110px] sm:h-[140px] flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                  <img src={stockData?.logoURL} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex flex-col gap-3 sm:gap-4 sm:mt-1 min-w-[200px] flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="text-[22px] sm:text-[26px] font-semibold tracking-wide">
                      {stockData?.name}
                    </div>
                    <div className="text-gray-500 text-[15px] sm:text-lg">
                      ({stockData?.symbol})
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    <div className="font-semibold text-[26px] sm:text-3xl tracking-wide">
                      ${stockData?.data.data[0].close}
                    </div>
                    <div className={`${dayChange ? dayChange >= 0 ? 'bg-green-600' : 'bg-red-600' : ''} text-white flex font-semibold px-3 py-[2px] rounded-[8px] text-[14px] sm:text-lg h-[80%] text-nowrap items-center`}>
                      {dayChange ? formatPrice(dayChange) : ''}
                      <div className="font-normal ml-[10px] flex align-center">
                        {dayChange ? (dayChange / (stockData.data.data[1].close / 100)).toFixed(2) : ''}%
                      </div>
                    </div>
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-slate-500">
                    <MarketOpening marketInfo={marketInfo} marketStatus={marketStatus} />
                  </div>
                </div>
              </div>
              <div className="border-b-1 border-gray-200 p-2 flex justify-between text-gray-700 text-md text-nowrap">
                <div>
                  Next market opening:
                </div>
                <div className="text-black">
                  {marketStatus && marketStatus === 'closed' ? `${nextOpeningTime}` : ''}
                </div>
              </div>
              <StockDetails prevClosePrice={stockData?.data.data[1].close} openPrice={stockData?.data.data[0].open} marketCap={stockData?.marketCapitalizationFormated} />
            </div>
            <div className="w-full lg:w-[64%] flex flex-col">

              <div className="h-auto md:h-[8%] mb-2 md:mb-0">
                <GraphZoom zoomButton={zoomButton} setZoomButton={setZoomButton} lastIndex={lastIndex} />
              </div>
              <div className="h-[350px] min-[520px]:h-[400px] sm:h-[450px] md:h-[450px]">
                <StockGraph stockData={stockData?.data.data} lastIndex={lastIndex} setZoomButton={setZoomButton} />
              </div>
            </div>
          </div>
          <OperationTab setIsBuying={setIsBuying} isLogged={isLogged} setShowLogin={setShowLogin} showLogin={showLogin} setLoginTransition={setLoginTransiton} setAction={setAction} canSell={canSell} />
        </div>
        </div>
        {/*<div className="bg-white rounded-[8px] mt-[20px] shadow-lg">
          dadw
        </div>*/}
      </div>
      <BottomMenu />

    </>

  )
}