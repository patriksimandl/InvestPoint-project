import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import './BuyOverlay.css'
import { PortfolioOverlay } from "./PortfolioOverlay";

type BuyOverlayProps = {
  symbol: string | undefined,
  name: string,
  setIsBuying: Dispatch<SetStateAction<boolean>>
  userCashBalance: number,
  userTotalValue: number,
  todayClosePrice: number
}

export function BuyOverlay({ symbol, name, setIsBuying, userCashBalance, userTotalValue, todayClosePrice }: BuyOverlayProps) {
  const [activeButton, setActiveButton] = useState('Buy');
  const [sliderValue, setSliderValue] = useState('0');
  const [price, setPrice] = useState(0);
  const [numberOfShares, setNumberOfShares] = useState(0);

  const buttons = ['Buy', 'Sell'];

  useEffect(() => {
    setPrice(userCashBalance * (Number(sliderValue) / 100));
    setNumberOfShares(price / todayClosePrice);
    console.log(sliderValue);
  }, [sliderValue]);


  useEffect(() => {
    setNumberOfShares(price / todayClosePrice);
    setSliderValue(String((price / userCashBalance) * 100));
  }, [price])




  function changePrice(value: number | string) {
    if (!/^\d*\.?\d{0,2}$/.test(String(value))) {
      value = String(value).slice(0, -1);
    }


    value = Number(value)


    if (value < 0) {
      setPrice(value);
    }
    else if (value > userCashBalance) {
      setPrice(userCashBalance);

    }
    else {
      setPrice(value)
      //setSliderValue(String((userCashBalance / price)*100));
    }

  }

  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 backdrop-blur-[0px] bg-black/20 w-full h-full z-101"></div>
      <div className="fixed z-102 left-[50%] shadow-lg top-[50%] bg-slate-100 translate-x-[-50%] translate-y-[-50%] w-[35vw] h-[auto] rounded-[8px] p-10">
        <button onClick={() => { setIsBuying(false) }} aria-label="Close" className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-black text-xl font-semibold mb-8">Buy {name} <span className="text-gray-500 font-normal">({symbol})</span></div>
        <div className="flex rounded-[8px] bg-white text-lg justify-around shadow-xl text-white  h-[5vh]">
          {buttons.map((button) => {
            return (
              <div onClick={() => { setActiveButton(button) }} className={`items-center flex justify-center w-[50%] ${activeButton === button ? 'bg-blue-800 text-white' : 'text-black'} rounded-${button === 'Buy' ? 'l' : 'r'}-[8px] cursor-pointer`}>
                {button}
              </div>
            )
          })}
        </div>

        <div className="flex justify-center text-lg mt-5 w-full items-center">
          <button className="flex px-3 py-1 bg-white rounded-[8px] shadow-lg hover:bg-gray-100 cursor-pointer">
            <div>
              Value
            </div>

            <div className="flex items-center w-[30px] relative">
              <svg className='' xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
            </div>
          </button>
        </div>
        <div className="flex flex-col items-center font-normal text-3xl mt-[40px]">
          <div className="flex justify-center">
            $<input value={price} type="number" className="w-[20%] text-nowrap outline-0" onChange={(event) => { changePrice(Number(event.currentTarget.value)) }} />
          </div>

          <div className="text-gray-500 text-xl mt-1">
            {numberOfShares.toFixed(2)} shares
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-[40px] relative">
          <input onChange={(event) => { setSliderValue(event.currentTarget.value) }} value={sliderValue} className='value-selector' type="range" />
          <div className="absolute slider-bar bg-blue-900 shadow-lg rounded-[8px] z-[-1] h-[10px]" style={{width: `${Number(sliderValue) + 0.2}%`}}></div>
          <div className="absolute slider-bar bg-white shadow-lg rounded-[8px] z-[-2] h-[10px] w-full" ></div>

        </div>

        <div className="con flex justify-center mt-[25px]">
          <button className="button-primary rounded-[8px] w-full">
            Confirm Buy
          </button>
        </div>
      </div>
      <PortfolioOverlay userCashBalance={userCashBalance} price={price} userTotalValue={userTotalValue} />

    </>

  )
}