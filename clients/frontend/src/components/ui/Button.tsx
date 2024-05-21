// ** React Imports
import React, { forwardRef } from "react";

// ** Utils
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <button
      ref={ref}
      {...rest}
      className={cn(
        "w-full py-2.5 bg-orange-500 hover:bg-orange-400 transition duration-300 text-white font-medium rounded-lg tracking-wide",
        className
      )}
    />
  );
});

Button.displayName = "Button";

export default Button;
