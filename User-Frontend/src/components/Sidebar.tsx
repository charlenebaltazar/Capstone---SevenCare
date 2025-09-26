import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import { useLogout } from "../hooks/useLogout";

export default function Sidebar() {
  const navigate = useNavigate();
  const logout = useLogout();

  const { refreshUser, user } = useUser();
  useEffect(() => {
    const checkUser = async () => {
      if ((await refreshUser()) === null) navigate("/");
    };

    checkUser();
  }, []);

  return (
    <nav className="w-56 h-screen fixed z-30 left-0 top-0 pt-20 py-10 flex flex-col   justify-between items-center bg-[#C7DDFE] text-sm">
      <img
        src={`/assets/icons/${user?.gender === "male" ? "boy" : "girl"}.png`}
        alt="girl.png"
        className="w-1/2"
      />

      <div className="flex flex-col items-center justify-center gap-8">
        <Link
          to="/home"
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <img src="/assets/icons/home.png" alt="" />
          <p className="font-bold text-lg text-[#212121]">Home</p>
        </Link>
        {/* <Link
          to="/"
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <Bell />
          <p>Notification</p>
        </Link> */}
        <Link
          to="/"
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <img src="/assets/icons/feedback.png" alt="" />
          <p className="font-bold text-lg text-[#212121]">Feedback</p>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-3.5">
        <button
          onClick={logout}
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150 text-red-500 font-bold"
        >
          <LogOut className="scale-x-[-1] h-10 w-8" />
          <p className="text-lg">Log Out</p>
        </button>
      </div>
    </nav>
  );
}
