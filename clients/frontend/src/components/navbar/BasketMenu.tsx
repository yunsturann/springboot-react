// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Button from "../ui/Button";

// ** Custom Hooks
import { useClickOutside } from "../../hooks/use-click-outside";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { removeItem } from "../../store/basket-slice";

const BasketMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const basketProducts = useSelector((state: RootState) => state.basket);

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

  const handleDelete = (index: number) => {
    dispatch(removeItem(index));
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
        {basketProducts.length > 0 ? (
          <span className="absolute -top-2 -right-2 z-10 px-2 bg-primary-orange/90 font-bold text-white text-xs rounded-full">
            {basketProducts.length}
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
          {basketProducts.length > 0 ? (
            <>
              <div className="p-4 max-h-[440px] overflow-auto space-y-3">
                {basketProducts.map(({ product, quantity }, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-3"
                  >
                    {/* IMAGE */}
                    <div>
                      <img
                        src={product.images[0].thumbnail}
                        alt="product"
                        width={40}
                        height={40}
                        className="size-[40px] rounded-lg object-contain"
                      />
                    </div>
                    {/* DETAILS */}
                    <div className="flex-1 text-dark-grayish-blue">
                      <p>{product.name}</p>
                      <p>
                        {`$${product.price.toFixed(2)} x ${quantity}`}{" "}
                        <b className="text-black">
                          ${(product.price * quantity).toFixed(2)}
                        </b>
                      </p>
                    </div>
                    {/* DELETE */}
                    <div
                      className="cursor-pointer hover:opacity-75 transition duration-75"
                      onClick={() => handleDelete(index)}
                    >
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
