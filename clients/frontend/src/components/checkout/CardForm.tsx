import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ** Third Party Imports
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

// ** Custom Components
import Input from "../ui/Input";
import Button from "../ui/Button";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addCard } from "../../store/checkout-slice";
import { clearBasket } from "../../store/basket-slice";

export const formSchema = yup.object().shape({
  cardholder: yup.string().required("Can't be blank"),
  cardNumber: yup
    .string()
    .required()
    .length(19, "Only 16 digits")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Only digits and space"),
  expDate: yup.object().shape({
    month: yup
      .string()
      .required("Can't be blank")
      .matches(/^\d+$/, "Only digits are allowed"),
    year: yup
      .string()
      .required("Can't be blank")
      .matches(/^\d+$/, "Only digits are allowed"),
  }),
  cvc: yup
    .string()
    .required("Can't be blank")
    .length(3, "Only 3 digits")
    .matches(/^\d+$/, "Only digits are allowed"),
});

export type ICardInfo = yup.InferType<typeof formSchema>;

const CardForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector((state: RootState) => state.user.info?.id);
  const basketItem = useSelector((state: RootState) => state.basket);
  const contactInfoId = useSelector(
    (state: RootState) => state.checkout.address.id
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext<ICardInfo>();

  const { cardNumber } = watch();

  useEffect(() => {
    setValue("cardNumber", formatCardNumber(cardNumber!));
  }, [cardNumber, setValue]);

  const onSubmit = async (data: ICardInfo) => {
    dispatch(addCard(data));
    // navigate("/checkout/approve");

    const quantity = basketItem[0].quantity;

    try {
      const res = await axios.post(
        "/api/private/orders",
        {
          userId,
          contactInfoId,
          quantity,
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Order has been placed successfully");
        dispatch(clearBasket());
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order");
    }
  };

  // format card number
  const formatCardNumber = (value: string) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || ""
    );
  };

  return (
    <form
      className="w-full max-w-[400px] flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("cardholder")}
        label="Cardholder name"
        placeholder="e.g. Yunus Turan"
        maxLength={50}
        error={errors.cardholder?.message}
      />
      <Input
        {...register("cardNumber")}
        label="Card number"
        placeholder="e.g. 1234 5678 9123 0000"
        maxLength={19}
        error={errors.cardNumber?.message}
      />

      <div className="flex justify-between items-start gap-3">
        {/* DATE SECTION */}
        <div className="flex flex-col basis-1/2 relative">
          <p className="block font-medium text-gray-700 dark:text-white mb-2 text-sm ">
            Exp.Date(MM/YY)
          </p>
          {/* INPUTS IN DATE */}
          <div className="flex gap-1.5 ">
            <Input
              {...register("expDate.month")}
              placeholder="MM"
              maxLength={2}
            />
            <Input
              {...register("expDate.year")}
              placeholder="YY"
              maxLength={2}
            />
          </div>
          {/* ERROR MESSAGE */}
          {errors.expDate?.month || errors.expDate?.year ? (
            <p className="text-red-500 text-sm mt-1">
              {errors.expDate?.month?.message || errors.expDate?.year?.message}
            </p>
          ) : null}
        </div>
        {/* CVC SECTION */}
        <div className="basis-1/2">
          <Input
            {...register("cvc")}
            label="Cvc"
            placeholder="e.g. 123"
            maxLength={3}
            error={errors.cvc?.message}
          />
        </div>
      </div>

      <Button disabled={isSubmitting} type="submit">
        Confirm
      </Button>
    </form>
  );
};

export default CardForm;
