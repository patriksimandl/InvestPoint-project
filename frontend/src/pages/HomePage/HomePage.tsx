import { NavLink } from 'react-router';
import { MainMenu } from '../../shared/MainMenu'
import './HomePage.css'
import { useContext, type Dispatch, type SetStateAction } from 'react'
import { Features } from './Features';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ScrollStockPanel } from './ScrollStocksPanel.tsx';
import { BottomMenu } from '../../shared/BottomMenu';
import { IsLoggedContext } from '../../App.tsx';

type HomePageProps = {
  userEmail: string | undefined;
}

export function HomePage({ userEmail }: HomePageProps) {




  const { data: tableStocksData } = useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      // const response = await axios.get('http://localhost:3000/stocks')
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks`)

      return response.data
    },
    //To refetch every 20 min
    staleTime: 1000 * 60 * 20,

  });


  const {isLogged,setIsLogged} = useContext(IsLoggedContext);

  return (
    <>
      <title>Home</title>
      <MainMenu userEmail={userEmail} />
      <div className=''>
        
        <div className='bg-blue-100 mt-[-120px] pt-[160px] pb-15 px-[20px] sm:px-[20px]'>
          <div className='h-auto  max-w-7xl mx-auto  '>
            <div className='flex flex justify-between h-auto  gap-10 relative'>
              <div className='lg:w-1/2 flex-col text-center lg:text-left md:mt-0  mt-12'>
                <h1 className="text-5xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight flex flex-col">
                  Invest in Your
                  Future with
                  <span className="text-transparent bg-linear-to-br from-blue-500 to-indigo-900 text-transparent bg-clip-text ">Confidence</span>
                </h1>
                <p className="text-base text-lg  sm:text-lg text-slate-600 dark:text-slate-400 mb-8 md:mb-10  mx-auto lg:mx-0 md:mt-0 mt-2">
                  Join millions of investors. Track real-time stock data, manage your portfolio, and discover global opportunities with our professional-grade trading platform.
                </p>
                <div className=' flex flex-col md:flex-row gap-[14px] sm:gap-[22px] items-center md:justify-center lg:items-start lg:justify-start'>
                  <NavLink to='/login' className='button-primary text-base sm:text-lg rounded-[10px] shadow-xl w-full md:max-w-[190px] h-[52px] sm:h-[56px] flex items-center shadow-blue-900/40'>
                    Get Started
                  </NavLink>
                  <NavLink to={'/stocks'} className='button-primary rounded-[10px] w-full md:max-w-[190px] h-[52px] sm:h-[56px] flex items-center text-base sm:text-lg text-black bg-white shadow-white/30 border border-slate-200'>
                    Browse stocks
                  </NavLink>
                </div>
              </div>
              <div className='lg:w-1/2 hidden lg:flex items-center justify-center'>
              <img className=' animate-float md:block h-[60%] lg:h-[65%] xl:h-[75%] rotate-[8deg] rounded-[25px] outline-[8px]  top-[100px] right-[2px] lg:right-[120px] ' src="https://res.cloudinary.com/dqdwgkwfn/image/upload/v1769445595/home_page_mobile_1_s2fvz1.webp" >
              </img>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden mt-20 mb-16">
          <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px]">
            <img
              className="w-[80%] max-w-[360px] mx-auto rotate-[8deg] transition animate-float rounded-[25px] outline-[8px] outline-slate-900 shadow-2xl shadow-black/25 block"
              src="https://res.cloudinary.com/dqdwgkwfn/image/upload/v1769445595/home_page_mobile_1_s2fvz1.webp"
              alt="InvestPoint mobile preview"
            />
          </div>
        </div>
        <ScrollStockPanel tableStocksData={tableStocksData} />
        <Features />
        <div className='bg-white pb-10'>
          <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px]">
            <div className="w-full rounded-[8px] bg-white shadow-lg flex flex-col h-auto md:h-[34rem] rounded-[32px] md:rounded-[60px] outline-[1px] md:outline-[2px] outline-slate-200 p-6 md:p-12 shadow-2xl shadow-black/40 flex flex-col md:flex-row gap-8 md:gap-10 relative">
            <div className='flex flex-col justify-center w-full md:w-[42%]'>
              <div className="text-[12px] uppercase tracking-[0.2em] text-slate-500 mb-3">Analytics Suite</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-slate-900">Powerful Analytics at Your Fingertips</h2>
              <p className="text-slate-600  text-lg leading-relaxed mb-6">Built-in insights help you spot trends, track momentum, and measure risk with clarity. Everything updates in real time so you can move fast and stay confident.</p>
              <div className='flex flex-col gap-3 '>
                <div className='flex gap-4 text-md text-slate-600'>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#00c951" width='30px' height='30px' stroke="#00c951"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#00c951" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
                  Advanced candlestick charts
                </div>
                <div className='flex gap-4 text-[16px] text-slate-600'>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#00c951" width='30px' height='30px' stroke="#00c951"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#00c951" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
                  Market cap and volume insights
                </div>
                <div className='flex gap-4 text-[16px] text-slate-600'>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#00c951" width='30px' height='30px' stroke="#00c951"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#00c951" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
                  Smart alerts and signals
                </div>
              </div>
            </div>
            <div className='h-auto w-full md:w-[50%] rounded-[24px] md:rounded-[40px] p-4 md:p-6 md:ml-auto bg-slate-50 border border-slate-200 shadow-inner'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-white rounded-[16px] p-4 border border-slate-200'>
                  <div className='text-[12px] uppercase tracking-[0.12em] text-slate-500'>Daily Volume</div>
                  <div className='text-2xl font-semibold text-slate-900 mt-2'>1.82M</div>
                  <div className='text-green-600 text-[14px] mt-1'>+12.4%</div>
                </div>
                <div className='bg-white rounded-[16px] p-4 border border-slate-200'>
                  <div className='text-[12px] uppercase tracking-[0.12em] text-slate-500'>Volatility</div>
                  <div className='text-2xl font-semibold text-slate-900 mt-2'>2.6%</div>
                  <div className='text-slate-500 text-[14px] mt-1'>30-day avg</div>
                </div>
                <div className='bg-white rounded-[16px] p-4 border border-slate-200'>
                  <div className='text-[12px] uppercase tracking-[0.12em] text-slate-500'>Market Cap</div>
                  <div className='text-2xl font-semibold text-slate-900 mt-2'>$1.24T</div>
                  <div className='text-slate-500 text-[14px] mt-1'>Large cap</div>
                </div>
                <div className='bg-white rounded-[16px] p-4 border border-slate-200'>
                  <div className='text-[12px] uppercase tracking-[0.12em] text-slate-500'>Trend Signal</div>
                  <div className='text-2xl font-semibold text-slate-900 mt-2'>Bullish</div>
                  <div className='text-green-600 text-[14px] mt-1'>Momentum rising</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <BottomMenu />
    </>

  )
}