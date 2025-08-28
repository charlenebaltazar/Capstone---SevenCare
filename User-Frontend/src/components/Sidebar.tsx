import { Bell, Home, LogOut, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="w-56 h-screen fixed z-30 left-0 top-0 pt-20 py-10 flex flex-col   justify-between items-center bg-primaryLight/20 text-sm">
      <img src="/assets/icons/girl.png" alt="girl.png" className="w-1/2" />

      <div className="flex flex-col items-center justify-center gap-3.5">
        <Link
          to="/home"
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <Home />
          <p>Home</p>
        </Link>
        <Link
          to="/"
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <Bell />
          <p>Notification</p>
        </Link>
        <Link
          to="/"
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <MessageSquare />
          <p>Feedback</p>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-3.5">
        <Link
          to="/"
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <Settings />
          <p>Settings</p>
        </Link>
        <Link
          to="/"
          className="flex flex-col items-center gap-2 hover:text-primary hover:scale-105 transition-all duration-150"
        >
          <LogOut className="scale-x-[-1]" />
          <p>Log Out</p>
        </Link>
      </div>
    </nav>
  );
}
