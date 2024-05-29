// ** React Imports
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

// ** Third Party Imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import axios from "axios";
import { handleUserNameInput } from "../../lib/utils";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().optional(),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\(\d{3}\)-\d{3}-\d{4}$/, "Phone must be like (555)-555-5555"),
});

type TRegisterForm = yup.InferType<typeof schema>;

const initialValues: TRegisterForm = {
  name: "",
  surname: "",
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  phone: "",
};

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const { phone: phoneNumber } = watch();

  useEffect(() => {
    const pressedKey = phoneNumber?.slice(-1);
    // if not an digit, dont set value
    if (isNaN(Number(pressedKey)) || pressedKey === " ") {
      setValue("phone", phoneNumber.slice(0, -1));
      return;
    }
    if (phoneNumber.length === 1) {
      setValue("phone", `(${phoneNumber}`);
      return;
    }
    if (phoneNumber.length === 5) {
      setValue("phone", `${phoneNumber.slice(0, 4)})-${pressedKey}`);
      return;
    }
    if (phoneNumber.length === 10) {
      setValue("phone", `${phoneNumber.slice(0, 9)}-${pressedKey}`);
      return;
    }
  }, [phoneNumber, setValue]);

  const onSubmit = async (data: TRegisterForm) => {
    const { confirmPassword, ...restData } = data;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        restData
      );

      toast.success(response.data);
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-700 h-screen w-full flex items-center justify-center px-8">
      <div className="w-full max-w-[600px] bg-white p-6 rounded-xl space-y-4">
        <h1 className="font-bold text-center text-2xl">Register</h1>
        <form
          className="flex flex-col gap-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name Surname */}
          <div className="flex max-sm:flex-col justify-between gap-x-12 gap-y-3">
            <Input
              {...register("name")}
              label="Name"
              type="text"
              error={errors.name?.message}
              necessary
            />
            <Input
              {...register("surname")}
              label="Surname"
              type="text"
              error={errors.surname?.message}
            />
          </div>

          {/* Username */}
          <Input
            {...register("username")}
            label="Username"
            type="text"
            error={errors.username?.message}
            necessary
            onInput={handleUserNameInput}
          />

          {/* Password & Confirm */}
          <div className="flex max-sm:flex-col justify-between gap-x-12 gap-y-3">
            <Input
              {...register("password")}
              label="Password"
              type="password"
              error={errors.password?.message}
              necessary
            />
            <Input
              {...register("confirmPassword")}
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword?.message}
              necessary
            />
          </div>

          {/* Email */}
          <Input
            {...register("email")}
            label="Email"
            type="email"
            error={errors.email?.message}
            necessary
          />

          {/* Phone */}
          <Input
            {...register("phone")}
            label="Phone"
            type="text"
            error={errors.phone?.message}
            maxLength={14}
            necessary
          />

          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            Register
          </Button>
        </form>
        <Link to="/auth/login">
          <p className="text-center  text-slate-600 mt-4">
            Already have an account?{" "}
            <span className="text-blue-600">Login</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
