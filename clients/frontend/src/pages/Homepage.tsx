// ** Custom Components
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import ProductInfo from "../components/product-info/ProductInfo";
import ProductSlider from "../components/product-slider/ProductSlider";

// ** Constants
import { product } from "../constants";

const Homepage = () => {
  return (
    <div className="flex-1 flex items-center">
      <Container className="flex flex-col md:flex-row justify-between gap-y-12">
        <ProductSlider images={product.images} />
        <ProductInfo product={product} />
      </Container>
    </div>
  );
};

export default Homepage;
