import './MainMenu.css'
import { NavLink, useNavigate } from 'react-router'
import { AccountMenu } from './AccountMenu';
import { useContext, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { IsLoggedContext, TableStocksDataContext } from '../App';
import type { StockData } from '../pages/PortfolioPage/types';
import { SearchBar } from './SearchBar';
import { MobileMenu } from './MobileMenu';
import { SearchDropdown } from './SearchDropdown';

type StockWithLogo = StockData & { logoURL: string };

export function MainMenu() {
  const { isLogged } = useContext(IsLoggedContext)!;
  const tableStocksData = useContext(TableStocksDataContext) as StockWithLogo[] | null;
  const mainMenu = useRef<HTMLDivElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const menuLinks = ['Portfolio', 'Stocks'];

  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<StockWithLogo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function menuTransition() {
      if (!mainMenu.current) return

      if (window.scrollY <= 30) {
        await setIsAtTop(true);
        mainMenu.current.classList.add('transition-all');
      }
      else {
        mainMenu.current.classList.add('transition-all');
      }

      const onScroll = () => { setIsAtTop(window.scrollY <= 30) }

      window.addEventListener('scroll', () => { onScroll() });
      return () => window.removeEventListener('scroll', () => { onScroll() })
    }

    menuTransition();
  }, [mainMenu])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileSearchExpanded && mobileSearchInputRef.current) {
      // Small delay to allow transition to start before focusing
      setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 100);
    }
  }, [isMobileSearchExpanded]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    filterStocks(event.target.value);
  }

  function filterStocks(value: string) {
    if (!tableStocksData) return

    if (value === '') {
      setIsDropDownOpen(false);
      return setFilteredData([]);
    }

    setIsDropDownOpen(true);
    value = value.toLowerCase();

    const filteredData = tableStocksData.filter((stock) => {
      return stock.name.toLowerCase().includes(value) || stock.symbol.toLowerCase().includes(value)
    })

    return setFilteredData(filteredData);
  }

  function handleKeyDown(key: string) {
    if (key === 'Enter') {
      navigate(`/stocks?search=${inputValue}`);
      setIsDropDownOpen(false);
      setFilteredData([]);
    }
  }

  function handleClearSearch() {
    setIsDropDownOpen(false);
    setIsSearchFocused(false);
    setIsMobileSearchExpanded(false);
    setInputValue('');
    setFilteredData([]);
  }

  function handleStockClick() {
    setInputValue('');
    setFilteredData([]);
  }

  function handleSearchClose() {
    setFilteredData([]);
  }

  const winUrl = window.location.pathname;

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-100">
        <div
          ref={mainMenu}
          className={`flex flex-row justify-between  h-[68px] md:h-[84px] items-center shadow-2xl transition-all duration-100 ${isAtTop ? 'bg-white rounded-[40px] md:rounded-[56px] w-[calc(100%-40px)] sm:w-[calc(100%-40px)]  mx-auto  my-4 md:my-6 max-w-7xl ' : 'w-full bg-white'}`}
          style={winUrl === '/' ? {} : { top: isAtTop ? '' : '0px', left: isAtTop ? '' : '0px', borderRadius: isAtTop ? '' : '0px', right: isAtTop ? '' : '0px', height: isAtTop ? '' : '100px' }}
        >
          <div className={`flex flex-row justify-between w-full items-center ${isAtTop ? '' : 'max-w-7xl mx-auto px-[20px] sm:px-[20px]'} px-[14px] md:px-[22px]`}>
            <div className="main-menu-left-container flex items-center gap-[14px] md:gap-[40px]">
              <NavLink to='/'>
                <img className={`w-[32vw] max-w-[170px] md:w-[10vw] c-sky-200`} src="/InvestPoint-logo-with-blacktext-removebg-preview.png" alt="Invest-point-logo" />
              </NavLink>
              <div className="hidden md:flex items-center gap-[40px]">
                {menuLinks.map((item) => {
                  return (
                    <NavLink key={item} className='main-menu-link' to={`/${item.toLowerCase()}`}>
                      {item}
                    </NavLink>
                  )
                })}
              </div>
            </div>
            <div className="main-menu-right-container hidden md:flex items-center gap-[30px]">
              <SearchBar
                inputValue={inputValue}
                isSearchFocused={isSearchFocused}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                setIsSearchFocused={setIsSearchFocused}
                onClear={handleClearSearch}
              />
              {isLogged ?
                <AccountMenu />
                :
                <NavLink className='button-primary' to={'/login'}>
                  Log in
                </NavLink>
              }
            </div>
            <div className="md:hidden flex items-center gap-1.5 flex-1 justify-end">
              <div className="flex relative items-center h-[32px]">
                {/* Search icon button - becomes search input */}
                <button
                  type="button"
                  className={`absolute right-0 p-1.5 rounded-[10px] hover:bg-slate-100 transition-all duration-400 ease-out z-10 ${isMobileSearchExpanded ? 'opacity-0 w-0 pointer-events-none scale-90' : 'opacity-100 w-auto scale-100'}`}
                  aria-label="Search"
                  onClick={() => setIsMobileSearchExpanded(true)}
                  disabled={isMobileSearchExpanded}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#111827">
                    <path d="M796-121L533-384q-30 24-69 38t-79 14q-109 0-184.5-75.5T125-592q0-109 75.5-184.5T385-852q109 0 184.5 75.5T645-592q0 40-14 79t-38 69l263 263-60 60ZM385-392q75 0 127.5-52.5T565-572q0-75-52.5-127.5T385-752q-75 0-127.5 52.5T205-572q0 75 52.5 127.5T385-392Z" />
                  </svg>
                </button>

                {/* Search input that expands from right to left */}
                <div className={`flex relative overflow-hidden transition-all duration-400 ease-out origin-right ${isMobileSearchExpanded ? 'w-full scale-100 opacity-100' : 'w-0 scale-95 opacity-0'}`}>
                  <input
                    ref={mobileSearchInputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(event) => handleKeyDown(event.key)}
                    className="rounded-[30px] py-[4px] mx-2 my-3 px-[12px] h-[32px] pr-[36px] bg-gray-100 outline-none text-[13px] transition-all duration-300 ease-out focus:bg-white focus:ring-2 focus:ring-blue-400 focus:shadow-md w-full"
                    placeholder='Search for Stock'
                  />
                  {inputValue && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  )}
                  {!inputValue && (
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#9ca3af" className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      <path d="M796-121L533-384q-30 24-69 38t-79 14q-109 0-184.5-75.5T125-592q0-109 75.5-184.5T385-852q109 0 184.5 75.5T645-592q0 40-14 79t-38 69l263 263-60 60ZM385-392q75 0 127.5-52.5T565-572q0-75-52.5-127.5T385-752q-75 0-127.5 52.5T205-572q0 75 52.5 127.5T385-392Z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Menu button */}
              <button
                type="button"
                className="p-1.5 rounded-[10px] hover:bg-slate-100 transition-all duration-400 ease-out flex-shrink-0"
                aria-label="Toggle menu"
                onClick={() => setIsMobileOpen((prev) => !prev)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#111827">
                  <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <MobileMenu
          isMobileOpen={isMobileOpen}
          menuLinks={menuLinks}
          onClose={() => setIsMobileOpen(false)}
        />
      </div>
      <SearchDropdown
        isDropDownOpen={isDropDownOpen}
        filteredData={filteredData}
        onClose={handleSearchClose}
        onStockClick={handleStockClick}
        setIsDropDownOpen={setIsDropDownOpen}
      />
    </>
  )
}
