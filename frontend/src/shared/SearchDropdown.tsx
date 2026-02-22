import { NavLink } from 'react-router';
import type { StockData } from '../pages/PortfolioPage/types';

type StockWithLogo = StockData & { logoURL: string };

type SearchDropdownProps = {
  isDropDownOpen: boolean;
  filteredData: StockWithLogo[];
  onClose: () => void;
  onStockClick: () => void;
  setIsDropDownOpen: (value: boolean) => void;
};

export function SearchDropdown({ 
  isDropDownOpen, 
  filteredData, 
  onClose, 
  onStockClick,
  setIsDropDownOpen 
}: SearchDropdownProps) {
  if (!isDropDownOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/25 z-98 transition-opacity duration-300"
        onClick={() => setIsDropDownOpen(false)}
      />
      {filteredData.length > 0 ? (
        <div className="fixed top-[100px] md:top-[120px] left-0 right-0 z-99 w-[calc(100%-40px)] mx-auto max-w-7xl px-[14px] md:px-[22px]">
          <div className="bg-white rounded-[12px] shadow-xl border border-slate-200">
            <div className="max-h-[400px] overflow-y-auto">
              {filteredData.map((stock) => {
                const pricesToday = stock.data.data[0];
                return (
                  <NavLink
                    key={stock.symbol}
                    to={`/stocks/${stock.symbol}`}
                    onClick={onStockClick}
                    className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex items-center w-[42px] h-[42px] rounded-[10px] bg-slate-50 border border-slate-200 justify-center flex-shrink-0">
                        <img src={stock.logoURL} alt={stock.name} className="w-[28px]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="font-bold text-[17px] truncate leading-tight text-slate-900">
                          {stock.symbol}
                        </div>
                        <div className="text-[13.5px] text-slate-500 truncate leading-tight">
                          {stock.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-[16px]">
                        ${(Number(pricesToday.close)).toFixed(2)}
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#9ca3af" className="flex-shrink-0 group-hover:fill-blue-600 group-hover:translate-x-1 transition-all hidden sm:block">
                      <path d="m321-80-71-71 329-329-329-329 71-71 400 400-400 400Z" />
                    </svg>
                  </NavLink>
                );
              })}
            </div>
            <NavLink
              to="/stocks"
              onClick={onClose}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-blue-50 text-blue-600 font-semibold text-[14px] transition-colors group cursor-pointer border-t border-slate-100"
            >
              <span>Show more</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor" className="group-hover:translate-x-1 transition-all">
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400-400 400Z" />
              </svg>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="fixed top-[100px] md:top-[120px] left-0 right-0 z-99 w-[calc(100%-40px)] mx-auto max-w-7xl px-[14px] md:px-[22px]">
          <div className="bg-white rounded-[12px] shadow-xl border border-slate-200 py-12 px-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#d1d5db" className="mx-auto mb-4">
              <path d="M796-121L533-384q-30 24-69 38t-79 14q-109 0-184.5-75.5T125-592q0-109 75.5-184.5T385-852q109 0 184.5 75.5T645-592q0 40-14 79t-38 69l263 263-60 60ZM385-392q75 0 127.5-52.5T565-572q0-75-52.5-127.5T385-752q-75 0-127.5 52.5T205-572q0 75 52.5 127.5T385-392Z" />
            </svg>
            <p className="text-slate-600 font-medium">No stocks found</p>
            <p className="text-slate-500 text-sm mt-1">Try searching with a different name or symbol</p>
          </div>
        </div>
      )}
    </>
  );
}
