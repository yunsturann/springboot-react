// ** React Imports
import React, { FC } from "react";

// ** Utils
import { cn } from "../lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("w-[94%] max-w-[1440px] mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
