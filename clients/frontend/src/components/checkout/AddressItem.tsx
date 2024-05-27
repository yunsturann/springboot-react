// ** Types
import { IAddress } from "../../types";

// ** Utils
import { cn } from "../../lib/utils";

// ** Icons
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";

// ** Third Party Components
import toast from "react-hot-toast";
import axios from "axios";
import React from "react";

interface AddressItemProps {
  addr: IAddress;
  isActive: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setAddress: React.Dispatch<React.SetStateAction<IAddress[]>>;
  index: number;
}

const AddressItem = (props: AddressItemProps) => {
  const { addr, isActive, setActiveIndex, index, setAddress } = props;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/private/contactinfo/${addr.id}`
      );
      if (res.status !== 200) {
        throw new Error("Failed to delete address");
      }
      toast.success("Address deleted successfully");
      setAddress((prev) => prev.filter((a) => a.id !== addr.id));
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  return (
    <li
      className={cn(
        "bg-slate-100 h-28 p-4 rounded-lg cursor-pointer border hover:border-primary-orange transition duration-300 ",
        {
          "border-primary-orange": isActive,
        }
      )}
      onClick={() => setActiveIndex(index)}
    >
      <header className="flex justify-between items-center">
        {/* Title */}
        <h3 className="text-sm font-bold flex  items-center gap-3">
          <FaLocationDot className="text-primary-orange" />
          {addr.title}
        </h3>
        {/* Options */}
        <div className="flex item-center gap-3 text-xl">
          <MdEdit className="hover:text-primary-orange transition duration-300" />
          <MdDelete
            className="hover:text-red-500 transition duration-300"
            onClick={handleDelete}
          />
        </div>
      </header>
      <p className="line-clamp-2 mt-2">{addr.address}</p>
    </li>
  );
};

export default AddressItem;
