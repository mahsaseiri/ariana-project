import React from "react";

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  rows?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = "",
  name,
  rows = 1,
  resize = "none",
  maxLength,
}) => {
  const hasError = !!error;

  // Handle input change with character limit enforcement
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // If maxLength is specified, enforce it
    if (maxLength && newValue.length > maxLength) {
      return; // Don't update if exceeding max length
    }
    
    onChange(newValue);
  };

  const baseTextareaStyles = `
    w-full 
    px-3 
    py-2
    border-none
    outline-none
    font-medium 
    text-sm
    text-foreground
    bg-transparent
    disabled:bg-gray-100 
    disabled:cursor-not-allowed
    placeholder:text-muted-foreground
    placeholder:text-sm
    placeholder:font-semibold
    placeholder:text-[#B6B6B6]
    resize-none
  `;

  const defaultTextareaStyles = `
   
  `;

  const errorTextareaStyles = `
    border-destructive
  `;

  const textareaStyles = hasError
    ? `${baseTextareaStyles} ${errorTextareaStyles} ${className}`
    : `${baseTextareaStyles} ${defaultTextareaStyles} ${className}`;

  const containerStyles = `
    w-full
    flex
    flex-col
    gap-2
  `;

  return (
    <div className={containerStyles}>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className={textareaStyles}
        rows={rows}
        maxLength={maxLength}
        onInvalid={(e) => e.preventDefault()}
      />
      {hasError && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default Textarea;
