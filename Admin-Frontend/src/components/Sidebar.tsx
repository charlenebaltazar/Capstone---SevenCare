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
    <nav className="w-76 h-screen fixed z-30 left-0 top-0 py-10 px-5 flex flex-col justify-between items-center text-sm border-r-12 border-r-[#B3B3B3] overflow-auto">
      <div className="flex flex-col  items-center border-b border-b-zinc-300 pb-5">
        <img
          src={`/assets/icons/${user?.gender === "male" ? "boy" : "girl"}.png`}
          alt="girl.png"
          className="w-1/2"
        />

        <p className="text-lg">{`${user?.firstname || ""} ${
          user?.surname || ""
        }`}</p>

        <b className="text-[#064712] text-2xl">Front Desk</b>
      </div>

      <div className="flex flex-col justify-center gap-8 text-2xl">
        <Link
          to="/dashboard"
          className="flex items-center gap-6 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <img src="/assets/icons/dashboard.png" alt="" />
          <p className="text-[#212121]">Dashboard</p>
        </Link>
        <Link
          to="/appointments"
          className="flex items-center gap-6 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <img src="/assets/icons/appointment.png" alt="" />
          <p className="text-[#212121]">Appointments</p>
        </Link>

        <Link
          to="/dashboard"
          className="flex items-center gap-6 hover:text-primary hover:scale-105 transition-all duration-150 mt-8"
        >
          <img src="/assets/icons/people.png" alt="" />
          <p className="text-[#212121]">Patient</p>
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-6 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <img src="/assets/icons/add.png" alt="" />
          <p className="text-[#212121]">Reports</p>
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-6 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <img src="/assets/icons/settings.png" alt="" />
          <p className="text-[#212121]">Settings</p>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-3.5 border-t border-t-zinc-400 w-full pt-10">
        <button
          onClick={logout}
          className="flex flex-col items-center gap-2 hover:scale-105 transition-all duration-150 text-red-500 font-bold cursor-pointer"
        >
          <LogOut className="scale-x-[-1] h-10 w-8" />
          <p className="text-lg">Log Out</p>
        </button>
      </div>
    </nav>
  );
}
