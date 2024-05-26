import { FC } from "react";
import AddToCart from "./AddToCart";
import { IProduct } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addItem } from "../../store/basket-slice";

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const { company, name, description, discount, price } = product;

  const dispatch = useDispatch<AppDispatch>();

  const calculateWithoutDiscount = (price: number, discount: number) => {
    return (price * 100) / discount;
  };

  const addToBasket = (amount: number) => {
    dispatch(addItem({ product, quantity: amount }));
  };

  return (
    <div className="flex-1 flex flex-col justify-center md:px-8 xl:px-12 2xl:px-20">
      <h2 className="text-sm text-primary-orange font-bold">{company}</h2>
      <h1 className="text-4xl md:text-5xl font-semibold mt-4">{name}</h1>
      <p className="mt-8 text-dark-grayish-blue">{description}</p>
      <div className="flex items-center gap-4 mt-8">
        <p className="font-semibold  text-3xl tracking-wide">
          ${price.toFixed(2)}
        </p>
        <span className="text-primary-orange font-bold bg-orange-300/50 px-1.5 rounded-lg">
          {discount}%
        </span>
      </div>
      <p className="mb-8 mt-2 line-through text-gray-300 font-semibold tracking-wider">
        ${calculateWithoutDiscount(price, discount).toFixed(2)}
      </p>
      <AddToCart addToBasket={addToBasket} />
    </div>
  );
};

export default ProductInfo;
