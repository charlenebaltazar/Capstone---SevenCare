import { Search } from "lucide-react";
import { useUser } from "../hooks/useUser";

export default function Header2() {
  const { user } = useUser();

  const capitalize = (str: string) => str.charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 left-0 w-full flex flex-row justify-between items-center pt-2 pb-0.5 px-20 z-50 bg-zinc-100 border-b border-b-zinc-300">
      <img src="/assets/icons/icon.png" alt="icon" className="w-16" />

      <Searchbar />

      <p className="w-10 h-10 p-2 bg-[#69DCFC] rounded-full flex justify-center items-center font-bold text-lg">
        {user?.firstname ? capitalize(user.firstname) : ""}
      </p>
    </header>
  );
}

function Searchbar() {
  return (
    <div className="w-1/3 flex flex-row justify-center items-center relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-3 py-0.5 outline-none border border-zinc-500 rounded-full"
      />
      <Search className="absolute right-2.5 w-5 text-zinc-500" />
    </div>
  );
}
