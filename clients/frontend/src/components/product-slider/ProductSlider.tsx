// ** React Imports
import { FC, useState } from "react";

// ** utils
import { cn } from "../../lib/utils";

// ** Custom Components
import Modal from "./ProductModal";

interface ProductSliderProps {
  images: {
    thumbnail: string;
    full: string;
  }[];
}

const ProductSlider: FC<ProductSliderProps> = (props) => {
  const { images } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex-1 flex flex-col px-0 md:px-8 xl:px-12 2xl:px-20 gap-y-6">
      <div className="h-[360px] sm:h-[400px] lg:h-[420px] xl:h-[500px] relative rounded-lg">
        <img
          src={images[currentIndex].full}
          alt="product-full"
          className="absolute size-full rounded-lg md:cursor-pointer bg-cover bg-center"
          onClick={() => {
            if (window.innerWidth >= 768) {
              setShowModal(true);
            }
          }}
        />
        <div
          className="absolute md:hidden left-2 top-1/2 translate-y-[-50%] size-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:bg-opacity-50 transition duration-300"
          onClick={handlePrevious}
          draggable
        >
          <img
            src="/images/icon-previous.svg"
            alt="previous-icon"
            className="mr-1"
          />
        </div>
        <div
          className="absolute md:hidden right-2 top-1/2 translate-y-[-50%]  size-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:bg-opacity-50 transition duration-300"
          onClick={handleNext}
          draggable
        >
          <img src="/images/icon-next.svg" alt="next-icon" className="ml-1" />
        </div>
      </div>
      <div className="hidden md:flex gap-4 justify-between items-center">
        {images.map((image, index) => (
          <div key={index} onClick={() => setCurrentIndex(index)}>
            <img
              src={image.thumbnail}
              alt="thumbnail"
              className={cn(
                "size-[120px] object-contain rounded-lg cursor-pointer hover:opacity-50 transition",
                {
                  "opacity-50": currentIndex === index,
                }
              )}
            />
          </div>
        ))}
      </div>
      <Modal images={images} show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default ProductSlider;
