// ** Custom Components
import Container from "../../components/Container";

// ** Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ApprovePage = () => {
  const userInfo = useSelector((state: RootState) => state.user.info);
  const basketInfo = useSelector((state: RootState) => state.basket);
  const checkoutInfo = useSelector((state: RootState) => state.checkout);

  console.log(userInfo);
  console.log(basketInfo);
  console.log(checkoutInfo);

  return (
    <section className="flex-1 bg-gray-100">
      <Container className="max-w-5xl py-3 sm:py-6 space-y-4">
        <h1 className="text-center text-3xl font-semibold text-very-dark-blue">
          Approve Your Order
        </h1>
        <div className="p-6 bg-white rounded-lg"></div>
      </Container>
    </section>
  );
};

export default ApprovePage;
