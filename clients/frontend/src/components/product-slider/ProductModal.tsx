// ** React Imports
import React, { useState } from "react";

// ** Prop Interface
interface ProductModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  images: {
    thumbnail: string;
    full: string;
  }[];
}

const ProductModal = (props: ProductModalProps) => {
  const { images, show, setShow } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  if (!show) return null;

  const activeImage = images[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <div className="hidden md:flex fixed inset-0 w-full h-screen bg-black/60  items-center justify-center">
      {/* Modal Inner */}
      <div className="min-h-[50%]">
        {/* Modal Header */}
        <header>
          <img
            src="/images/icon-close.svg"
            alt="close-icon"
            className="size-4 ml-auto cursor-pointer hover:opacity-50 transition duration-300"
            onClick={onClose}
          />
        </header>
        {/* Modal Body */}
        <div className="relative mt-4">
          {/* Main Image */}
          <div>
            <img
              src={activeImage.full}
              alt="active"
              className="rounded-xl size-[500px] object-cover"
            />
          </div>
          {/* Next & Before Btns */}
          <div
            className="absolute left-0 top-1/2 translate-y-[-50%] size-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:bg-opacity-50 transition duration-300 transform -translate-x-1/2"
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
            className="absolute right-0 top-1/2 translate-y-[-50%] size-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:bg-opacity-50 transition duration-300 transform translate-x-1/2"
            onClick={handleNext}
            draggable
          >
            <img src="/images/icon-next.svg" alt="next-icon" className="ml-1" />
          </div>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-center items-center gap-5 mt-6">
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={index} className="relative">
                <img
                  src={image.thumbnail}
                  alt="thumbnail"
                  className="rounded-xl size-20 cursor-pointer hover:opacity-70 transition duration-300"
                  onClick={() => setActiveIndex(index)}
                />
                {isActive && (
                  <div className="absolute inset-0 bg-white/60 rounded-xl"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
