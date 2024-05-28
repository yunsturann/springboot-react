// ** React Imports
import React, { forwardRef } from "react";

// ** Utils
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "orange" | "blue" | "red";
}

const colors = {
  orange: "bg-orange-500 hover:bg-orange-400 focus:ring-orange-500 text-white",
  blue: "bg-blue-500 hover:bg-blue-400 focus:ring-blue-500 text-white",
  red: "bg-red-500 hover:bg-red-400 focus:ring-red-500 text-white",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, color = "orange", ...rest } = props;

  return (
    <button
      ref={ref}
      {...rest}
      className={cn(
        "w-full py-2.5 transition duration-300 font-medium rounded-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-opacity-50",
        colors[color],
        className
      )}
    />
  );
});

Button.displayName = "Button";

export default Button;
