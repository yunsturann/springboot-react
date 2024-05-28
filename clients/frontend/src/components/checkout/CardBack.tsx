import React from "react";
import { useFormContext } from "react-hook-form";
import { ICardInfo } from "./CardForm";

const CardBack = () => {
  const { watch } = useFormContext<ICardInfo>();

  const cvc = watch("cvc");

  return (
    <div className="relative bottom-6 left-4 lg:left-1/2 lg:top-3 ">
      <img
        src="/images/bg-card-back.png"
        alt="Card Back"
        width={320}
        height={220}
      />
      <p className="absolute top-[44%] right-10 text-sm text-white tracking-widest font-semibold">
        {cvc || "•••"}
      </p>
    </div>
  );
};

export default CardBack;
