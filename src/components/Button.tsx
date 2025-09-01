import React from "react";

interface ButtonProps {
  name: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  name,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  leftIcon,
  rightIcon,
  iconSize = 16,
}) => {
  const baseStyles = `
    px-4 py-2 
    rounded-md 
    bg-primary
    text-white
    font-medium 
    transition-colors 
    duration-200 
    active:primary
    flex items-center justify-center gap-2
  `;

  const disabledStyles = `
    bg-secondary
    !text-secondary-foreground
    cursor-not-allowed 
    hover:bg-secondary
  `;

  const buttonStyles = disabled
    ? `${baseStyles} ${disabledStyles} ${className}`
    : `${baseStyles}  ${className}`;

  const iconStyles = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon && (
        <span style={iconStyles} className="flex-shrink-0">
          {leftIcon}
        </span>
      )}
      <span className="flex-shrink-0">{name}</span>
      {rightIcon && (
        <span style={iconStyles} className="flex-shrink-0">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
