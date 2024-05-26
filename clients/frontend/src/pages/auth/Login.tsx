// ** Custom Components
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

// ** Third Party Imports
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login successful");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-slate-400 h-screen w-full flex items-center justify-center px-8">
      <div className="w-full max-w-[600px] bg-white p-6 rounded-xl space-y-4">
        <h1 className="font-bold text-center text-2xl">Login</h1>
        <form className="flex flex-col gap-y-3" onSubmit={handleLogin}>
          <Input label="Username" type="text" name="username" />
          <Input label="Password" type="password" name="password" />
          <Button type="submit" className="w-full mt-">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
