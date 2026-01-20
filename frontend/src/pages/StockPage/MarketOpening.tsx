import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type MarketOpeningProps = {
  marketInfo: {
    data: {
      markets: {
        status: {
          status: string
          nextChange: string
        }
      }[]
    }
  },
  marketStatus: string
}


export function MarketOpening({ marketInfo, marketStatus }: MarketOpeningProps) {
  const nextOpeningTime = dayjs(marketInfo?.data.markets[0].status.nextChange).tz('Europe/Prague').format(`ddd DD/MM H:m`)


  return (
    <div className="flex mt-[6px]">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <div className={`${marketInfo ? marketStatus === 'open' ? 'bg-green-600' : 'bg-red-600' : 'bg-red-600'} w-3 h-3  rounded-4xl`}></div>

          <div className="text-lg text-gray-600 ">{marketStatus === 'open' ? 'Market open' : 'Market closed'}</div>
        </div>
        
      </div>
    </div>

  )
}