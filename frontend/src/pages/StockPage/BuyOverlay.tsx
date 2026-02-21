import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import './BuyOverlay.css'
import { PortfolioOverlay } from "./PortfolioOverlay";
import { ChangeUnit } from "./ChangeUnit";
import { transaction } from "./transaction";
import { useQuery, useQueryClient } from "@tanstack/react-query";


type BuyOverlayProps = {
  symbol: string,
  name: string,
  setIsBuying: Dispatch<SetStateAction<boolean>>
  userCashBalance: number,
  userTotalValue: number,
  todayClosePrice: number
  action: string
}

export function BuyOverlay({ symbol,setAnimateInMessage, name, setIsBuying, userCashBalance, userTotalValue, todayClosePrice, action, setTransactionMessage, setBuyingQuantities }: BuyOverlayProps) {
  const [activeButton, setActiveButton] = useState<'Buy' | 'Sell'>('Buy');
  const [activeUnit, setActiveUnit] = useState<'Value' | 'Quantity'>('Value');
  const [value, setValue] = useState(0);

  const buttons = ['Buy', 'Sell'];

  const queryClient = useQueryClient();


  const maxShares = Number((userCashBalance / todayClosePrice).toFixed(2));


  /*useEffect(() => {
    console.log(maxShares);
  }, [maxShares])
  */

  useEffect(() => {
    if (action) {
      if (action === 'Sell') {
        setActiveButton('Sell');
      }
    }

  }, [action])

  function snapZero(num: number, eps = 0.1) {
    return Math.abs(num) < eps ? 0 : num;
  }


  //derivated state
  //Use it when there is only one state of true and the other things can calculate from it
  //variable is calculating based on how does state changes 
  const price = snapZero(
    activeUnit === 'Value'
      ? Number(value.toFixed(2))
      : Number((value * todayClosePrice).toFixed(2)), todayClosePrice / 100)

  const numberOfShares = snapZero(
    activeUnit === 'Quantity'
      ? Number(value.toFixed(2))
      : Number((value / todayClosePrice).toFixed(2))
  )


  const percent = snapZero(
    activeUnit === 'Value'
      ? (price / userCashBalance) * 100
      : (numberOfShares / maxShares) * 100
    , 0.1)


  async function makeTransaction() {
    const response = await transaction(activeButton, price, numberOfShares, symbol)

    if (response.status === 201) {
      queryClient.invalidateQueries({ queryKey: ['userPortfolio'] });


      setBuyingQuantities({ price, numberOfShares }) 
      setTransactionMessage(true)
      setTimeout(() => {
        //animate out
        setAnimateInMessage(false)
        //hide 
        setTimeout(()=>{
          setTransactionMessage(false)
        },500)
      }, 4000);

      setIsBuying(false);
    }
  }



  function changeValue(value: string | number) {
    value = Number(value);



    if (value > (activeUnit === 'Value' ? userCashBalance : maxShares)) {
      setValue(activeUnit === 'Value' ? userCashBalance : maxShares);
    }
    else if (value < 0) {
      setValue(0)
    }

    else {
      setValue(value);
    }


  }

  


  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 backdrop-blur-[0px] bg-black/20 w-full h-full z-101"></div>
      <div className="fixed z-102 left-[50%] shadow-lg top-[50%] bg-slate-100 translate-x-[-50%] translate-y-[-50%] w-[94vw] sm:w-[80vw] md:w-[55vw] lg:w-[35vw] h-[auto] max-h-[90vh] overflow-auto rounded-[8px] p-6 sm:p-8">
        <button onClick={() => { setIsBuying(false) }} aria-label="Close" className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-black text-xl font-semibold mb-8">Buy {name} <span className="text-gray-500 font-normal">({symbol})</span></div>
        <div className="flex rounded-[8px] bg-white text-lg justify-around shadow-xl text-white  h-[5vh]">
          {buttons.map((button) => {
            const actionButtonStyle =
              button === 'Buy'
                ? {
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                }
                : {
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                };

            return (
              <div onClick={() => { setActiveButton(button) }} style={actionButtonStyle} className={`items-center flex justify-center w-[50%] ${activeButton === button ? 'bg-blue-800 text-white' : 'text-black'} cursor-pointer`} >
                {button}
              </div>
            )
          })}
        </div>

        <ChangeUnit activeUnit={activeUnit} setActiveUnit={setActiveUnit} setValue={setValue} />

        <div className="flex flex-col items-center font-normal text-3xl mt-[40px]">
          <div className="flex justify-center">

            {activeUnit === 'Value'
              ?
              <>
                $<input value={price} type="number" step={'100'} className=" text-nowrap  outline-0" style={{ width: `${String(price).length + 1}ch` }} onChange={(event) => {
                  changeValue(event.target.value);
                }} />
              </>
              :

              <>
                <input value={numberOfShares} step={'0.1'} type="number" className=" text-nowrap1 outline-0" style={{ width: `${String(numberOfShares).length + 1}ch` }} onChange={(event) => { changeValue(event.target.value) }} />
                shares
              </>
            }


          </div>

          <div className="text-gray-500 text-xl mt-1">
            {activeUnit === 'Value' ? `≈ ${numberOfShares.toFixed(2)} shares` : `≈ $${price}`}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-[40px] relative">
          <input onChange={(event) => {/* setSliderValue(Number(event.currentTarget.value))*/
            const pct = Number(event.target.value);






            if (activeUnit === 'Value') {

              setValue((pct / 100) * userCashBalance)
            }
            else {
              setValue((pct / 100) * maxShares)
            }


          }} value={percent} className='value-selector' type="range" />
          <div className="absolute slider-bar bg-blue-900 shadow-lg rounded-[8px] z-[-1] h-[10px]" style={{ width: `${Number(percent) + 0.1}%` }}></div>
          <div className="absolute slider-bar bg-white shadow-lg rounded-[8px] z-[-2] h-[10px] w-full" ></div>

        </div>


        <div className="con flex justify-center mt-[25px]">
          <button onClick={makeTransaction} className="button-primary rounded-[8px] w-full">
            {activeButton === 'Buy' ? 'Confirm Buy' : 'Confirm Sell'}
          </button>
        </div>
      </div>

      <PortfolioOverlay userCashBalance={userCashBalance} price={price} userTotalValue={userTotalValue} />

    </>

  )
}