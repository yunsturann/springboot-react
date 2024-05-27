// ** Custom Components
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal, { ModalProps } from "../ui/Modal";

// ** Third Party Components
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import axios from "axios";

// ** Types
import { IAddress } from "../../types";

interface AddressModalProps extends ModalProps {
  userId: number;
  setAddress: React.Dispatch<React.SetStateAction<IAddress[]>>;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Title is too long")
    .min(3, "Title is too short"),
  address: yup
    .string()
    .required("Address is required")
    .max(255, "Address is too long")
    .min(5, "Address is too short"),
});

type AddressForm = yup.InferType<typeof schema>;

const AddressModal = (props: AddressModalProps) => {
  const { userId, setAddress, ...rest } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AddressForm) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/private/contactinfo`,
        {
          ...data,
          userId,
        }
      );
      if (res.status !== 201) {
        throw new Error("Failed to add address");
      }
      setAddress((prev) => [...prev, res.data]);
      toast.success("Address added successfully");
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  return (
    <Modal {...rest}>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("title")}
          label="Title"
          error={errors.title?.message}
        />
        <Input
          {...register("address")}
          label="Address"
          error={errors.address?.message}
        />
        <Button
          type="submit"
          color="blue"
          disabled={isSubmitting}
          className="mt-2"
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default AddressModal;
