// ** Redux Imports
import { useSelector } from "react-redux";
import { RootState } from "../store";

// ** Custom Components
import Container from "../components/Container";
import Button from "../components/ui/Button";

// ** Third Party Components
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state: RootState) => state.user.info);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? Your orders will be canceled as well."
      )
    )
      return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/private/user/${userInfo!.id}`,
        { withCredentials: true }
      );

      await handleLogout();
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Error deleting account");
    }
  };

  return (
    <section className="flex-1 bg-gray-100">
      <Container className="max-w-xl py-3 sm:py-6 ">
        <h1 className="text-center text-3xl font-semibold text-very-dark-blue mb-4">
          My Profile
        </h1>
        <div className="shadow-purple-200/50 p-8 bg-white rounded-lg flex flex-col gap-y-4 ">
          <div>
            <h3 className="font-semibold text-gray-500">Username</h3>
            <p className="text-lg font-semibold text-very-dark-blue">
              {userInfo?.username}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Name</h3>
            <p className="text-lg font-semibold text-very-dark-blue">
              {userInfo?.name}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Lastname</h3>
            <p className="text-lg font-semibold text-very-dark-blue">
              {userInfo?.lastName}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Email</h3>
            <p className="text-lg font-semibold text-very-dark-blue">
              {userInfo?.email}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Phone</h3>
            <p className="text-lg font-semibold text-very-dark-blue">
              {userInfo?.phoneNumber}
            </p>
          </div>
          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-y-2 gap-x-6 items-center mt-4">
            <Button color="blue" onClick={handleLogout}>
              Logout
            </Button>

            <Button color="red" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
