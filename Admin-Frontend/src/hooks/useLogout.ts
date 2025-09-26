import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_DOMAIN } from "../data/data";

export const useLogout = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.post(
        `${BACKEND_DOMAIN}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return logoutUser;
};
