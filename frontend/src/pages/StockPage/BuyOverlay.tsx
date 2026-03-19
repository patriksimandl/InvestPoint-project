import { useEffect, useState, type Dispatch, type SetStateAction, useContext } from "react";
import './BuyOverlay.css'
import { PortfolioOverlay } from "./PortfolioOverlay";
import { ChangeUnit } from "./ChangeUnit";
import { transaction } from "./transaction";
import { useQueryClient } from "@tanstack/react-query";
import { TransactionContext } from "../../App";


type BuyOverlayProps = {
  symbol: string,
  name: string,
  setIsBuying: Dispatch<SetStateAction<boolean>>
  setTransactionMessage: Dispatch<SetStateAction<boolean>>
  setTransactionType: Dispatch<SetStateAction<'Buy' | 'Sell'>>
  setBuyingQuantities: Dispatch<SetStateAction<{ price: number; numberOfShares: number }>>
  userCashBalance: number,
  userTotalValue: number,
  todayClosePrice: number
  action: string
  canSell: boolean
  stockHoldings: Record<string, { quantity: number; avgBuyPricePerShare: number }> | null
}

export function BuyOverlay({ symbol, name, setIsBuying, userCashBalance, userTotalValue, todayClosePrice, action, setTransactionMessage, setTransactionType, setBuyingQuantities, canSell, stockHoldings }: BuyOverlayProps) {
  const [activeButton, setActiveButton] = useState<'Buy' | 'Sell'>('Buy');
  const [activeUnit, setActiveUnit] = useState<'Value' | 'Quantity'>('Value');
  const [value, setValue] = useState(0);
  const [sellAll, setSellAll] = useState(false);
  const [valueBeforeSellAll, setValueBeforeSellAll] = useState<number | null>(null);
  const [isLoadingTransactions, setIsLoadingTransaction] = useState(false);
  const { setAnimateInMessage } = useContext(TransactionContext)!;

  const buttons: Array<'Buy' | 'Sell'> = ['Buy', 'Sell'];

  const queryClient = useQueryClient();




  const maxShares = Number((userCashBalance / todayClosePrice).toFixed(2));

  const maxSymbolHoldingsShares = stockHoldings ? stockHoldings[symbol]?.quantity : 0;
  const maxSymbolHoldingsPrice = stockHoldings ? todayClosePrice * stockHoldings[symbol]?.quantity : 0;
  

  useEffect(() => {
    if (action === 'Sell' && canSell) {
      return setActiveButton('Sell');
    }
    
  }, [action, canSell])

  useEffect(()=>{
    setValue(0);
    setSellAll(false);
    setValueBeforeSellAll(null);
  },[activeButton])

  useEffect(() => {
    if (activeButton !== 'Sell' || !sellAll) {
      return;
    }

    setValue(activeUnit === 'Value' ? maxSymbolHoldingsPrice : maxSymbolHoldingsShares);
  }, [activeButton, activeUnit, sellAll, maxSymbolHoldingsPrice, maxSymbolHoldingsShares]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsBuying(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsBuying]);


  function snapZero(num: number, eps = 0.1) {
    return Math.abs(num) < eps ? 0 : num;
  }


  //derivated state
  //Use it when there is only one state of true and the other things can calculate from it
  //variable is calculating based on how does state changes 
  const price = snapZero(
    activeUnit === 'Value'
      ? Number(value.toFixed(2))
      : Number((value * todayClosePrice).toFixed(2))


    , todayClosePrice / 100)


  const numberOfShares = snapZero(
    activeUnit === 'Quantity'
      ? Number(value.toFixed(2))
      : Number((value / todayClosePrice).toFixed(2))

  )


  const percent = snapZero(
    activeButton === 'Buy' ?
      activeUnit === 'Value'
        ? (price / userCashBalance) * 100
        : (numberOfShares / maxShares) * 100
      :
      activeUnit === 'Value'
        ? (price / maxSymbolHoldingsPrice) * 100
        : (numberOfShares / maxSymbolHoldingsShares) * 100
    , 0.1)


  async function makeTransaction() {
    if (activeButton === 'Sell' && !canSell) {
      return;
    }

    setIsLoadingTransaction(true);
    const response = await transaction(activeButton, price, numberOfShares, symbol)
    setIsLoadingTransaction(false)

    if (response.status === 201) {
      queryClient.invalidateQueries({ queryKey: ['userPortfolio'] });
      queryClient.invalidateQueries({queryKey: ["transactionHistory"]});

      setTransactionType(activeButton)
      setBuyingQuantities({ price, numberOfShares })
      setTransactionMessage(true)
      
      setIsBuying(false);
      
      // Animate out the message after 4 seconds
      setTimeout(() => {
        setAnimateInMessage(false);
        // Hide after animation completes (500ms)
        setTimeout(() => {
          setTransactionMessage(false)
        }, 500)
      }, 4000);
    }
  }



  function changeValue(value: string | number) {
    value = Number(value);


    if (activeButton === 'Buy') {
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
    else{
      if(value > (activeUnit === 'Value' ? maxSymbolHoldingsPrice : maxSymbolHoldingsShares)){
        setValue(activeUnit ==='Value' ? maxSymbolHoldingsPrice : maxSymbolHoldingsShares);
      }
      else if(value<0){
        setValue(0);
      }
      else{
        setValue(value);
      }
    }


  }




  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-101"></div>
      <div className="fixed z-102 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[92vw] sm:w-[78vw] md:w-[52vw] lg:w-[34vw] max-h-[90vh] overflow-auto rounded-[22px] p-6 sm:p-8 bg-slate-50 border border-slate-200/70 shadow-xl">
        <button onClick={() => { setIsBuying(false) }} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors" disabled={isLoadingTransactions}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-slate-900 text-[20px] font-semibold mb-2">Trade {name} <span className="text-slate-500 font-normal">({symbol})</span></div>
        <div className="text-slate-500 text-[13px] mb-6">Choose action and amount</div>
        <div className="flex rounded-full bg-slate-100 p-1 text-[15px] font-semibold">
          {buttons.map((button) => {
            const isDisabled = button === 'Sell' && !canSell;

            return (
              <button
                key={button}
                onClick={() => { if (!isDisabled && !isLoadingTransactions) setActiveButton(button) }}
                disabled={isDisabled || isLoadingTransactions}
                className={`flex-1 py-2 rounded-full transition-all ${isDisabled || isLoadingTransactions
                  ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                  : activeButton === button
                    ? 'bg-blue-800 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-white'
                  }`}
                type="button"
              >
                {button}
              </button>
            )
          })}
        </div>

        <ChangeUnit activeUnit={activeUnit} setActiveUnit={setActiveUnit} setValue={setValue} />

        <div className="flex flex-col items-center font-normal text-3xl mt-[34px]">
          <div className="flex justify-center">

            {activeUnit === 'Value'
              ?
              <>
                $<input value={price} type="number" step={'100'} className=" text-nowrap  outline-0" style={{ width: `${String(price).length + 1}ch` }} onChange={(event) => {
                  setSellAll(false);
                  setValueBeforeSellAll(null);
                  changeValue(event.target.value);
                }} disabled={isLoadingTransactions} />
              </>
              :

              <>
                <input value={numberOfShares} step={'0.1'} type="number" className=" text-nowrap1 outline-0" style={{ width: `${String(numberOfShares).length + 1}ch` }} onChange={(event) => { setSellAll(false); setValueBeforeSellAll(null); changeValue(event.target.value) }} disabled={isLoadingTransactions} />
                shares
              </>
            }


          </div>

          <div className="text-slate-500 text-[17px] mt-1">
            {activeUnit === 'Value' ? `≈ ${numberOfShares.toFixed(2)} shares` : `≈ $${price}`}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-[36px] relative">
          <input onChange={(event) => {/* setSliderValue(Number(event.currentTarget.value))*/
            setSellAll(false);
            setValueBeforeSellAll(null);
            const pct = Number(event.target.value);



            if (activeButton === 'Buy') {




              if (activeUnit === 'Value') {
                setValue((pct / 100) * userCashBalance)

              }
              else {
                setValue((pct / 100) * maxShares)
              }
            }
            else {
              if (activeUnit === 'Value') {
                setValue((pct / 100) * maxSymbolHoldingsPrice);
              }
              else {
                setValue((pct / 100) * maxSymbolHoldingsShares)
              }

            }


          }} value={percent} className='value-selector' type="range" disabled={isLoadingTransactions} />
          <div className="absolute slider-bar bg-blue-800 shadow-sm rounded-[8px] z-[-1] h-[10px]" style={{ width: `${Number(percent) + 0.1}%` }}></div>
          <div className="absolute slider-bar bg-white border border-slate-200 rounded-[8px] z-[-2] h-[10px] w-full" ></div>

        </div>

        {activeButton === 'Sell' && canSell && (
          <label className={`mt-4 flex items-center justify-between rounded-xl border px-3 py-2 select-none transition-all ${isLoadingTransactions ? 'opacity-60 cursor-not-allowed border-slate-200 bg-slate-50' : sellAll ? 'border-blue-300 bg-blue-50/70 cursor-pointer' : 'border-slate-200 bg-white hover:border-slate-300 cursor-pointer'}`}>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-slate-800">Sell all</span>
              <span className="text-xs text-slate-500">
                {activeUnit === 'Value'
                  ? `Use full value: $${maxSymbolHoldingsPrice.toFixed(2)}`
                  : `Use full quantity: ${maxSymbolHoldingsShares.toFixed(2)} shares`}
              </span>
            </span>

            <span className="relative inline-flex items-center">
              <input
                type="checkbox"
                checked={sellAll}
                onChange={(event) => {
                  const checked = event.target.checked;

                  if (checked) {
                    setValueBeforeSellAll(value);
                    setSellAll(true);
                    return;
                  }

                  setSellAll(false);
                  if (valueBeforeSellAll !== null) {
                    setValue(valueBeforeSellAll);
                    setValueBeforeSellAll(null);
                    return
                  }
                  setValue(0);
                  setValueBeforeSellAll(0);
                }}
                disabled={isLoadingTransactions}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-blue-700 peer-disabled:bg-slate-200"></span>
              <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
            </span>
          </label>
        )}


        <div className="con flex justify-center mt-[26px]">
          <button onClick={makeTransaction} className={`button-primary rounded-[12px] w-full ${isLoadingTransactions ? 'opacity-70 cursor-wait' : ''}`} disabled={isLoadingTransactions}>
            {isLoadingTransactions ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent"></span>
                Processing...
              </span>
            ) : (
              activeButton === 'Buy' ? 'Confirm Buy' : 'Confirm Sell'
            )}
          </button>
        </div>
      </div>

      <PortfolioOverlay userCashBalance={userCashBalance} price={price} userTotalValue={userTotalValue} activeButton={activeButton} />

    </>

  )
}