// ** React Imports
import { useRef, useState } from "react";

// ** Constants
import { products } from "../../constants";

// ** Custom Components
import Button from "../ui/Button";

// ** Custom Hooks
import { useClickOutside } from "../../hooks/use-click-outside";

const BasketMenu = () => {
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const iconRef = useRef<HTMLDivElement | null>(null);
  const basketRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(basketRef, (e) => {
    if (iconRef.current?.contains(e.target as Node)) return;
    setIsBasketOpen(false);
  });

  const toggleBasket = () => {
    setIsBasketOpen((prev) => !prev);
  };

  return (
    <>
      {/* BASKET ICON */}
      <div
        className="relative cursor-pointer hover:opacity-75 transition"
        onClick={toggleBasket}
        ref={iconRef}
      >
        <img
          src="/images/icon-cart.svg"
          alt="cart"
          className="size-[24px]"
          height={24}
          width={24}
        />
        {products.length > 0 ? (
          <span className="absolute -top-2 -right-2 z-10 px-2 bg-primary-orange/90 font-bold text-white text-xs rounded-full">
            {products.length}
          </span>
        ) : null}
      </div>
      {/* BASKET MENU */}
      {isBasketOpen ? (
        <div
          ref={basketRef}
          className="absolute top-full mt-3 max-md:left-3 right-3 md:w-[360px] md:-mt-4 md:right-10 rounded-lg shadow-xl min-h-52 border border-gray-200 bg-white flex flex-col justify-between"
        >
          {/* HEAD */}
          <div className="p-4 border-b border-gray-300">
            <h2 className="font-semibold ">Cart</h2>
          </div>
          {/* BODY */}
          {products.length > 0 ? (
            <>
              <div className="p-4 max-h-[440px] overflow-auto space-y-3">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-3"
                  >
                    {/* IMAGE */}
                    <div>
                      <img
                        src={item.image}
                        alt="product"
                        width={40}
                        height={40}
                        className="size-[40px] rounded-lg object-contain"
                      />
                    </div>
                    {/* DETAILS */}
                    <div className="flex-1 text-dark-grayish-blue">
                      <p>{item.name}</p>
                      <p>
                        {`$${item.price.toFixed(2)} x ${item.quantity}`}{" "}
                        <b className="text-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </b>
                      </p>
                    </div>
                    {/* DELETE */}
                    <div className="cursor-pointer hover:opacity-75 transition duration-75">
                      <img
                        src="/images/icon-delete.svg"
                        alt="delete-icon"
                        width={15}
                        height={15}
                        className="size-[15px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* CHECKOUT */}
              <div className="p-4">
                <Button className="mt-4">Checkout</Button>
              </div>
            </>
          ) : (
            <p className="p-4 text-center">Your cart is empty</p>
          )}
        </div>
      ) : null}
    </>
  );
};

export default BasketMenu;
