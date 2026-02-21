export function Features() {

  const featuresContent = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#1d40af"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z"/></svg>,
      header: "Global Stocks",
      content: "Trade stocks from major international exchanges including NYSE, NASDAQ, and LSE with minimal fees."

    }, {
      icon: <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#1d40af"><path d="M520-520h278q-15-110-91.5-186.5T520-798v278Zm-80 358v-636q-121 15-200.5 105.5T160-480q0 122 79.5 212.5T440-162Zm80 0q110-14 187-91t91-187H520v278Zm-40-318Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z"/></svg>,
      header: "Diversified ETFs",
      content: "Access hundreds of managed funds across tech, energy, and emerging markets to balance your portfolio."

    }, {
      icon: <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#1d40af"><path d="M653.33-160v-280H800v280H653.33Zm-246.66 0v-640h146.66v640H406.67ZM160-160v-440h146.67v440H160Z"/></svg>,
      header: "Candlestick Charts",
      content: "Shows price movement over time, where each candle represents the open, high, low, and close prices for a given period."

    }
  ]




  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px]">
          <div className="text-center pb-12 pt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to grow your wealth</h2>
            <p className="text-slate-500 text-lg dark:text-slate-400 max-w-2xl mx-auto">Access professional tools and real-time insights to make smarter investment decisions every single day.</p>
          </div>
        </div>
      </div>
      <div className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-auto gap-5 md:gap-6">
        {featuresContent.map((feature) => {
          return (
            <div className="flex shadow-md flex-col  transition-all hover:scale-[1.04] hover:shadow-xl w-full h-full bg-slate-100 rounded-[12px] p-5 md:p-6">
              <div className="flex items-center justify-center h-[4rem] w-[4rem] bg-blue-100 rounded-[12px]">
                {feature.icon}
              </div>
              <div className="font-bold text-blue-900 text-xl mt-4">
                {feature.header}
              </div>
              <div className="mt-3 text-lg text-slate-600 text-sm">
                {feature.content}
              </div>
            </div>
          )
        })}

          </div>
        </div>
      </div>
    </>
  )
}