import { type ChangeEvent } from 'react';
import SearchIcon from '../assets/search-icon.svg';

type SearchBarProps = {
  inputValue: string;
  isSearchFocused: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (key: string) => void;
  setIsSearchFocused: (value: boolean) => void;
  onClear: () => void;
};

export function SearchBar({ 
  inputValue, 
  isSearchFocused, 
  handleInputChange, 
  handleKeyDown,
  setIsSearchFocused, 
  onClear 
}: SearchBarProps) {
  return (
    <div className={`search-bar-container flex relative transition-all duration-300`} style={{ width: `${isSearchFocused ? '280px' : '200px'}` }}>
      <input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(event) => handleKeyDown(event.key)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => !inputValue && setIsSearchFocused(false)}
        className="rounded-[30px] p-[8px] h-[49.5px] pl-[22px] pr-[45px] bg-gray-100 outline-none text-[14.5px] transition-all focus:bg-white focus:ring-2 focus:ring-blue-400 focus:shadow-md w-full"
        placeholder='Search for Stock'
      />
      {inputValue && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      )}
      {!inputValue && (
        <img src={SearchIcon} className='w-7 absolute right-4 search-icon cursor-pointer' alt="Search" />
      )}
    </div>
  );
}
