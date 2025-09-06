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

  const baseInputStyles = `
    w-full 
    pl-10
    pr-3 
    py-2
    border 
    border-light-gray
    rounded-md 
    font-medium 
    text-sm
    text-foreground
    focus:outline-none 
    disabled:bg-gray-100 
    disabled:cursor-not-allowed
    placeholder:text-muted-foreground
    placeholder:font-normal
    placeholder:text-sm
  `;

  const defaultInputStyles = `
   
  `;

  const errorInputStyles = `
    border-destructive
  `;

  const inputStyles = hasError
    ? `${baseInputStyles} ${errorInputStyles} ${className}`
    : `${baseInputStyles} ${defaultInputStyles} ${className}`;

  const containerStyles = `
    relative
    flex
    flex-col
    gap-2
  `;

  const iconStyles = `
    absolute
    left-3
    top-1/2
    transform
    -translate-y-1/2
    w-4
    h-4
    text-muted-foreground
    pointer-events-none
  `;

  return (
    <div className={containerStyles}>
      <div className="relative">
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
          className={inputStyles}
          onInvalid={(e) => e.preventDefault()}
        />
      </div>
      {hasError && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default SearchInput;
