import { Link } from "react-router-dom";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { ChevronRight } from "lucide-react";

function Settings() {
  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2
        header="Settings"
        description="Manage system settings accross the platform."
      />
      <Sidebar />
      <div className="h-full w-full pt-5 px-10 pb-0 flex-1 min-h-0 flex flex-col border-t gap-4">
        <Link
          to="/profile"
          className="flex items-center justify-between border rounded-lg p-3 w-fit"
        >
          <div className="flex items-center gap-5">
            <img src="/assets/icons/profile.png" alt="" className="w-5" />
            <p className="font-bold mr-10 text-lg">Admin Profile</p>
          </div>

          <ChevronRight />
        </Link>

        <Link
          to="/manage-admins"
          className="flex items-center justify-between border rounded-lg p-3 w-fit"
        >
          <div className="flex items-center gap-5">
            <img src="/assets/icons/people.png" alt="" className="w-5" />
            <p className="font-bold mr-10 text-lg">Manage Admin Accounts</p>
          </div>

          <ChevronRight />
        </Link>

        <Link
          to="/manage-services"
          className="flex items-center justify-between border rounded-lg p-3 w-fit"
        >
          <div className="flex items-center gap-5">
            <img src="/assets/icons/heart.png" alt="" className="w-5" />
            <p className="font-bold mr-10 text-lg">Manage Services</p>
          </div>

          <ChevronRight />
        </Link>

        <Link
          to="/manage-doctors"
          className="flex items-center justify-between border rounded-lg p-3 w-fit"
        >
          <div className="flex items-center gap-5">
            <img src="/assets/icons/add.png" alt="" className="w-5" />
            <p className="font-bold mr-10 text-lg">Manage Doctors</p>
          </div>

          <ChevronRight />
        </Link>

        <Link
          to="/privacy-policy-and-terms-and-conditions"
          className="flex items-center justify-between border rounded-lg p-3 w-fit"
        >
          <div className="flex items-center gap-5">
            <img src="/assets/icons/handshake.png" alt="" className="w-5" />
            <p className="font-bold mr-10 text-lg">
              Privacy Policy & Terms and Conditions
            </p>
          </div>

          <ChevronRight />
        </Link>
      </div>
    </main>
  );
}

export default Settings;