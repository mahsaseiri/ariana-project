import React from "react";
import { searchIcon } from "../icons";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = "",
  name = "search",
}) => {
  const hasError = !!error;


  const containerStyles = `
    flex
    flex-col
    gap-2
  `;

  const inputContainerStyles = `
    flex
    items-center
    gap-2
    border
    border-sidebar-border
    rounded-lg
    px-3
    h-10

  `;

  const iconStyles = `
    w-4
    h-4
    text-muted-foreground
    flex-shrink-0
  `;

  return (
    <div className={containerStyles}>
      <div className={inputContainerStyles}>
        <img src={searchIcon} alt="Search" className={iconStyles} />
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none font-medium text-sm text-foreground placeholder:text-muted-foreground placeholder:font-normal placeholder:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          onInvalid={(e) => e.preventDefault()}
        />
      </div>
      {hasError && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default SearchInput;
