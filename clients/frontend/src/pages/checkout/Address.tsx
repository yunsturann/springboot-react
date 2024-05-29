// ** React Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Custom Components
import Container from "../../components/Container";
import AddressModal from "../../components/checkout/AddressModal";
import AddressItem from "../../components/checkout/AddressItem";
import Button from "../../components/ui/Button";

// ** Icons
import { FaPlus } from "react-icons/fa6";

// ** Types
import { IAddress } from "../../types";
import { AppDispatch, RootState } from "../../store";

// ** Third Party Imports
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../store/checkout-slice";

const Address = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.info?.id);

  const [address, setAddress] = useState<IAddress[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/private/contactinfo/${userId}`,
          {
            withCredentials: true,
          }
        );
        if (res.status !== 200) {
          throw new Error("Failed to fetch address");
        }

        setAddress(res.data);
      } catch (error) {
        toast.error("Failed to fetch address");
      }
    };

    if (userId) fetchAddress();
  }, [userId]);

  if (!userId) return null;

  const handleContinuePayment = () => {
    if (!address[activeIndex])
      return toast.error("Please add or select an address");

    dispatch(addAddress(address[activeIndex]));

    navigate("/checkout/card");
  };

  return (
    <section className="flex-1 bg-gray-100">
      <Container className="max-w-5xl py-3 sm:py-6 space-y-4">
        <h1 className="text-center text-3xl font-semibold text-very-dark-blue">
          Select Your Address
        </h1>

        <ul className="p-6 bg-white rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add New Address */}
          <li
            className="bg-slate-100 h-28 p-4 rounded-lg flex items-center justify-center cursor-pointer border hover:border-primary-orange transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex flex-col items-center">
              <FaPlus className="text-primary-orange text-2xl" />
              <h3 className="text-sm font-bold ">Add New Address</h3>
            </div>
          </li>

          {/* Addresses */}
          {address?.map((addr, index) => {
            const isActive = index === activeIndex;

            return (
              <AddressItem
                key={addr.id}
                addr={addr}
                isActive={isActive}
                setActiveIndex={setActiveIndex}
                setAddress={setAddress}
                index={index}
              />
            );
          })}
        </ul>

        <div className="flex justify-end">
          <Button
            color="blue"
            className="md:w-1/2"
            onClick={handleContinuePayment}
          >
            Continue to Payment
          </Button>
        </div>
      </Container>
      {isModalOpen && (
        <AddressModal
          title="Add New Address"
          show={isModalOpen}
          setShow={setIsModalOpen}
          setAddress={setAddress}
          userId={userId}
        />
      )}
    </section>
  );
};

export default Address;
