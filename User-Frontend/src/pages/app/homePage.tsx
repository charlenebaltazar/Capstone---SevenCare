import { Link } from "react-router-dom";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-zinc-100 text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full  w-full p-5 flex flex-col">
        <header>
          <h1 className="text-2xl font-bold">Hello, John Doe</h1>
          <h2>
            Welcome to{" "}
            <span className="text-primary font-bold">SevenCare!</span>
          </h2>
        </header>

        <section className="grid grid-cols-3 gap-8 grid-rows-2 w-full flex-1 mt-3">
          <Link
            to="/appointments/create"
            className="border border-zinc-400 rounded-xl flex flex-col justify-center items-center gap-3 hover:scale-105 transition-all duration-150"
          >
            <img src="/assets/icons/schedule.png" alt="" />
            <p className="font-ribeye">Make an Appointment</p>
          </Link>
          <Link
            to=""
            className="border border-zinc-400 rounded-xl flex flex-col justify-center items-center gap-3 hover:scale-105 transition-all duration-150"
          >
            <img src="/assets/icons/list.png" alt="" />
            <p className="font-ribeye">My Appointment</p>
          </Link>
          <Link
            to=""
            className="border border-zinc-400 rounded-xl flex flex-col justify-center items-center gap-3 hover:scale-105 transition-all duration-150"
          >
            <img src="/assets/icons/transaction.png" alt="" />
            <p className="font-ribeye">My Transaction</p>
          </Link>

          <div className="col-span-3 flex flex-row justify-around">
            <Link
              to=""
              className="border border-zinc-400 rounded-xl flex flex-col justify-center items-center gap-3 w-1/3 hover:scale-105 transition-all duration-150"
            >
              <img src="/assets/icons/transaction.png" alt="" />
              <p className="font-ribeye">My Profile</p>
            </Link>
            <Link
              to=""
              className="border border-zinc-400 rounded-xl flex flex-col justify-center items-center gap-3 w-1/3 hover:scale-105 transition-all duration-150"
            >
              <img src="/assets/icons/transaction.png" alt="" />
              <p className="font-ribeye">My Medical Records</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
