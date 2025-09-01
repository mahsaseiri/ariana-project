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
    font-medium 
    transition-colors 
    duration-200 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:ring-offset-2
  `;

  const defaultStyles = `
    bg-blue-600 
    text-white 
    hover:bg-blue-700 
    active:bg-blue-800
  `;

  const disabledStyles = `
    bg-gray-400 
    text-gray-600 
    cursor-not-allowed 
    hover:bg-gray-400
  `;

  const buttonStyles = disabled
    ? `${baseStyles} ${disabledStyles} ${className}`
    : `${baseStyles} ${defaultStyles} ${className}`;

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
