// ** React Imports
import { Navigate } from "react-router-dom";

// ** Custom Components
import CardBack from "../../components/checkout/CardBack";
import CardForm, {
  ICardInfo,
  formSchema,
} from "../../components/checkout/CardForm";
import CardFront from "../../components/checkout/CardFront";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

// ** Redux
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const initialFormValues: ICardInfo = {
  cardholder: "",
  cardNumber: "",
  expDate: {
    month: "",
    year: "",
  },
  cvc: "",
};

const CardPage = () => {
  const basketItem = useSelector((state: RootState) => state.basket);

  const methods = useForm<ICardInfo>({
    resolver: yupResolver(formSchema),
    defaultValues: initialFormValues,
  });

  if (basketItem.length === 0) {
    toast.error("Your basket is empty. Please add items to proceed.");
    return <Navigate to="/" replace />;
  }

  return (
    <FormProvider {...methods}>
      <main className="max-lg:flex-1 w-full h-full lg:h-[75vh] max-w-[1440px] mx-auto flex flex-col lg:flex-row max-lg:gap-12 bg-white text-lg ">
        <aside className="relative w-full max-lg:h-[40%] lg:w-[30%] flex items-center justify-center lg:justify-end bg-purple-900 bg-center bg-cover">
          {/* DESKTOP */}
          <div className="block relative">
            <CardFront />
            <CardBack />
          </div>
        </aside>
        <section className="w-full lg:w-[70%] flex items-center justify-center lg:ml-20 xl:ml-0 p-4 max-lg:mt-8">
          <CardForm />
        </section>
      </main>
    </FormProvider>
  );
};

export default CardPage;
