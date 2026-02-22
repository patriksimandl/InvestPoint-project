type PortfolioOverlayProps ={
  price: number,
  userTotalValue: number,
  userCashBalance: number
}

export function PortfolioOverlay({price, userTotalValue, userCashBalance}: PortfolioOverlayProps){
  const nextCash = price > 0 ? userCashBalance - price : userCashBalance;
  return (
    <div className="fixed hidden md:block z-102 right-[-90vw] sm:right-[-60vw] md:right-[-30vw] lg:right-[-20vw] shadow-md top-[50%] bg-slate-50/90 translate-y-[-50%] w-[90vw] sm:w-[60vw] md:w-[30vw] lg:w-[20vw] h-[auto] rounded-l-[16px] p-6 sm:p-7 translate-x-[-100%] transition-all border border-slate-200/70">
      <div className="text-[16px] font-semibold text-slate-900">Portfolio Overview</div>
      <div className="mt-4 rounded-[12px] bg-white border border-slate-200/70 p-4">
        <div className="text-[12px] uppercase tracking-[0.2em] text-slate-500">Cash Balance</div>
        <div className="text-[20px] font-semibold text-slate-900 mt-2">${Number(userCashBalance.toFixed(2))}</div>
        {price > 0 && (
          <div className="text-[12.5px] text-slate-500 mt-2">
            After trade: <span className="font-semibold text-slate-900">${nextCash.toFixed(2)}</span>
          </div>
        )}
      </div>
      <div className="mt-3 rounded-[12px] bg-white border border-slate-200/70 p-4">
        <div className="text-[12px] uppercase tracking-[0.2em] text-slate-500">Portfolio Value</div>
        <div className="text-[20px] font-semibold text-slate-900 mt-2">${(Number(userTotalValue)).toFixed(2)}</div>
      </div>
    </div>
  )
}