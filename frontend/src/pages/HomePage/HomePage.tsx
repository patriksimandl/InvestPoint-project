import { NavLink } from 'react-router';
import { MainMenu } from '../../shared/MainMenu'
import './HomePage.css'
import type { Dispatch, SetStateAction } from 'react'
import { Features } from './Features';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ScrollStockPanel } from './ScrollStocksPanel.tsx';
import { BottomMenu } from '../../shared/BottomMenu';

type HomePageProps = {
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  userEmail: string | undefined;
}



export function HomePage({ isLogged, setIsLogged, userEmail }: HomePageProps) {
  



  const {data:tableStocksData} = useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/stocks')
      
      return response.data
    },
    //To refetch every 20 min
    staleTime: 1000 * 60 * 20,
    
  });



  return (
    <>
      <title>Home</title>
      <MainMenu isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />
      <div className=''>
        <div className='h-[45rem] bg-blue-200 mt-[-160px] pt-[160px] px-[8%]'>
          <div className='h-[30rem]'>
            <div className='flex flex-col'>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight flex flex-col ">
                <span className=''>Invest in Your</span>
                <span className=''>Future with</span>
                <span className="text-transparent bg-linear-to-br from-blue-500 to-indigo-900 text-transparent bg-clip-text ">Confidence</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0">
                Join millions of investors. Track real-time stock data, manage your portfolio, and discover global opportunities with our professional-grade trading platform.
              </p>
              <div className='flex gap-[30px]'>
                <NavLink to='/login' className='button-primary text-lg rounded-[8px] shadow-xl w-[190px] h-[60px] flex items-center shadow-lg shadow-blue-900/50'>
                  Get Started
                </NavLink>
                <NavLink to={'/stocks'} className='button-primary rounded-[8px] w-[180px] h-[60px] flex items-center text-lg text-black bg-white shadow-white/50'>Browse stocks</NavLink>
              </div>
            </div>
            <img className='h-[40%] rotate-[8deg] rounded-[8px] outline-[4px] absolute top-[260px] right-[200px]' src="https://res.cloudinary.com/dqdwgkwfn/image/upload/v1769445595/home_page_mobile_1_s2fvz1.webp" >
            </img>
          </div>

        </div>
        <ScrollStockPanel tableStocksData={tableStocksData}/>
        <Features />
        <div className="h-[34rem] rounded-[60px] outline-[3px] outline-slate-200 mx-[5%] p-15 shadow-2xl shadow-black/60 mb-10 flex relative">
          <div className='flex flex-col justify-center w-[40%]'>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Powerful Analytics at Your Fingertips</h2>
            <div className='ml-4'>
              <div className='flex gap-4 text-lg text-slate-600 py-2'>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#00c951" width='30px' height='30px' stroke="#00c951"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#00c951" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
                Addvanced Candlestick Charts
              </div>
              <div className='flex gap-4 text-lg text-slate-600 py-2'>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#00c951" width='30px' height='30px' stroke="#00c951"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#00c951" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
                Market Cap & valume insigths
              </div>
              <div className='flex gap-4 text-lg text-slate-600 py-2'>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#00c951" width='30px' height='30px' stroke="#00c951"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#00c951" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
                Addvanced Candlestick Charts
              </div>
            </div>
          </div>
          <div className='absolute h-[22rem] top-1/2 -translate-y-1/2  w-[50%] rounded-[50px] p-5 left-[42%] outline-[3px] outline-slate-300 '>
            <div className=''>

            </div>

          </div>

        </div>
      </div>
      <BottomMenu isLogged={isLogged}/>
    </>

  )
}