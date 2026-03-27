import { useSearchParams } from "react-router";

type SortMenuProps = {
  isOpen: boolean;
  onToggle: () => void;
  compact?: boolean;
};



export function SortMenu({ isOpen, onToggle, compact = false }: SortMenuProps) {

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSort = searchParams.get('sort');

  function addParams(param: string) {
    const params = new URLSearchParams(searchParams);
    params.set('sort', param);
    setSearchParams(params);
    onToggle();
  }



  return (
    <div className="relative">
      <button
        onClick={onToggle}
        type="button"
        aria-label="Filter stocks"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title="Filter"
        className={`inline-flex items-center justify-center rounded-[12px] border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/40 ${isOpen ? 'border-blue-300 bg-blue-50/80 text-blue-700 shadow-blue-100' : ''} ${compact ? 'h-[36px] w-[36px]' : 'h-[40px] gap-1.5 px-3'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path d="M3 5h18" />
          <path d="M6 12h12" />
          <path d="M10 19h4" />
        </svg>
        {!compact && <span className="text-[12px] font-semibold">Sort</span>}
        {!compact && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-[14px] w-[14px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>

      <div
        onClick={onToggle}
        className={`fixed left-0 right-0 bottom-0 top-0 bg-black/20 w-full h-full z-101 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      <div
        className={`fixed top-[0] bottom-0 right-0 w-[88vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-[420px] z-102 flex flex-col bg-white rounded-l-[8px] shadow-xl p-[15px] transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="menu"
        aria-label="Sort stocks"
      >
        <div className="flex items-start justify-between border-b border-slate-100 pb-3 mt-[2px]">
          <div>
            <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-blue-700">Sort Stocks</div>
            <div className="text-[12px] text-slate-500 mt-1">Choose how the stock list should be ordered.</div>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Close sort panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
              <path d="m18 6-12 12" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="pt-4 space-y-2">
          <button
            onClick={() => { addParams('price-asc') }}
            type="button"
            role="menuitemradio"
            aria-checked={selectedSort === 'price-asc'}
            className={`w-full rounded-[12px] px-3.5 py-3 text-left transition-all duration-150 ${selectedSort === 'price-asc' ? 'bg-blue-50 ring-1 ring-blue-200/80' : 'hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-blue-100 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[16px] w-[16px]" aria-hidden="true">
                  <path d="M12 19V5" />
                  <path d="m5 12 7-7 7 7" />
                </svg>
              </span>
              <div className="text-[15px] font-semibold text-slate-800">Price: low to high</div>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">Shows the lowest priced stocks first.</div>
          </button>
          <button
            onClick={() => { addParams('price-desc') }}
            type="button"
            role="menuitemradio"
            aria-checked={selectedSort === 'price-desc'}
            className={`w-full rounded-[12px] px-3.5 py-3 text-left transition-all duration-150 ${selectedSort === 'price-desc' ? 'bg-blue-50 ring-1 ring-blue-200/80' : 'hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-blue-100 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[16px] w-[16px]" aria-hidden="true">
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </span>
              <div className="text-[15px] font-semibold text-slate-800">Price: high to low</div>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">Shows the highest priced stocks first.</div>
          </button>
          <button
            onClick={() => { addParams('name-asc') }}
            type="button"
            role="menuitemradio"
            aria-checked={selectedSort === 'name-asc'}
            className={`w-full rounded-[12px] px-3.5 py-3 text-left transition-all duration-150 ${selectedSort === 'name-asc' ? 'bg-blue-50 ring-1 ring-blue-200/80' : 'hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-blue-50 text-blue-700 text-[11px] font-bold">A-Z</span>
              <div className="text-[15px] font-semibold text-slate-800">Name: A-Z</div>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">Alphabetical by company name.</div>
          </button>
          <button
            onClick={() => { addParams('name-desc') }}
            type="button"
            role="menuitemradio"
            aria-checked={selectedSort === 'name-desc'}
            className={`w-full rounded-[12px] px-3.5 py-3 text-left transition-all duration-150 ${selectedSort === 'name-desc' ? 'bg-blue-50 ring-1 ring-blue-200/80' : 'hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-blue-100 text-blue-700 text-[11px] font-bold">Z-A</span>
              <div className="text-[15px] font-semibold text-slate-800">Name: Z-A</div>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">Reverse alphabetical order.</div>
          </button>
        </div>
      </div>
    </div>
  );
}
