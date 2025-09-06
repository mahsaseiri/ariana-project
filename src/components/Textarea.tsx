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
  rows = 3,
  resize = "none",
}) => {
  const hasError = !!error;

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
    placeholder:font-normal
    placeholder:text-sm
    resize-${resize}
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
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={textareaStyles}
        rows={rows}
        onInvalid={(e) => e.preventDefault()}
      />
      {hasError && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default Textarea;
