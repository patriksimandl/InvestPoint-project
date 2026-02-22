import { type ChangeEvent } from 'react';
import SearchIcon from '../assets/search-icon.svg';

type MobileSearchBarProps = {
  inputValue: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (key: string) => void;
  onClear: () => void;
};

export function MobileSearchBar({ inputValue, handleInputChange, handleKeyDown, onClear }: MobileSearchBarProps) {
  return (
    <div className="search-bar-container flex relative mb-5">
      <input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(event) => handleKeyDown(event.key)}
        className="rounded-[14px] p-[10px] h-[44px] pl-[16px] pr-[40px] bg-gray-100 outline-none text-[14px] w-full transition-all focus:bg-white focus:ring-2 focus:ring-blue-400 focus:shadow-md"
        placeholder='Search for Stock'
      />
      {inputValue && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      )}
      {!inputValue && (
        <img src={SearchIcon} className='w-5 absolute right-3 search-icon cursor-pointer' alt="Search" />
      )}
    </div>
  );
}
