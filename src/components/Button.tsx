import React from "react";

interface ButtonProps {
  name: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  name,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  const baseStyles = `
    px-4 py-2 
    rounded-md 
    bg-primary
    text-white
    font-medium 
    transition-colors 
    duration-200 
    focus:outline-none 
    hover:bg-primary
    active:primary
  `;

  const disabledStyles = `
    bg-gray-400 
    text-gray-600 
    cursor-not-allowed 
    hover:bg-gray-400
  `;

  const buttonStyles = disabled
    ? `${baseStyles} ${disabledStyles} ${className}`
    : `${baseStyles}  ${className}`;

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
