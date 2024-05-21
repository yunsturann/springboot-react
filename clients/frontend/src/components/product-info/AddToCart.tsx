// ** React Imports
import { useState } from "react";

// ** Custom Components
import Button from "../ui/Button";

const AddToCart = () => {
  const [amount, setAmount] = useState(0);

  const handleDecrement = () => {
    if (amount === 0) return;
    setAmount(amount - 1);
  };

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex justify-between items-center bg-light-grayish-blue rounded-lg max-w-[280px]">
        <button
          className="px-4 min-w-12 hover:bg-grayish-blue h-full rounded-l-lg py-4 transition duration-300 
 "
          onClick={handleDecrement}
        >
          <img src="/images/icon-minus.svg" alt="minus-icon" />
        </button>
        <span className=" w-16 text-center">{amount}</span>
        <button
          className="px-4 min-w-12 hover:bg-grayish-blue h-full rounded-r-lg py-4 transition duration-300"
          onClick={handleIncrement}
        >
          <img src="/images/icon-plus.svg" alt="plus-icon" />
        </button>
      </div>
      <Button className="max-w-[280px] flex items-center justify-center gap-3 py-3">
        <img src="/images/icon-cart.svg" alt="cart-icon" />
        <p>Add to cart</p>
      </Button>
    </div>
  );
};

export default AddToCart;
