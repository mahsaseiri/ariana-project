import React from "react";

interface InputProps {
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = "",
  name,
}) => {
  const hasError = !!error;

  const baseInputStyles = `
    w-full 
    px-3 
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

  const labelStyles = hasError
    ? "text-sm font-medium text-red-600"
    : "text-sm font-medium text-foreground";

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className={labelStyles}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={inputStyles}
        required={required}
        onInvalid={(e) => e.preventDefault()}
      />
      {hasError && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
