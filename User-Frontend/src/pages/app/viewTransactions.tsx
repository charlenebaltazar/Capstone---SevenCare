import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import type { ITransactions } from "../../@types/interface";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import dayjs from "dayjs";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

export default function ViewTransactions() {
  const [appointments, setAppointments] = useState<ITransactions[]>([
    {
      _id: "txn123",
      appointmentId: "appt123",
      amount: 1500,
      modeOfPayment: "Cash",
      status: "Paid",
      createdAt: new Date("2025-09-01T09:30:00Z"),
    },
    {
      _id: "txn456",
      appointmentId: "appt456",
      amount: 2500,
      modeOfPayment: "GCash",
      status: "Pending",
      createdAt: new Date("2025-09-05T13:15:00Z"),
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_DOMAIN}/api/v1/transactions`,
          { withCredentials: true },
        );
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-bg-color text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full  w-full p-5">
        <form className="flex  flex-col w-full h-full flex-1 mt-3">
          <h1 className="font-bold text-2xl">My Transactions</h1>
          <header className="grid grid-cols-5 mt-3 font-semibold">
            <h3>Transaction Id</h3>
            <h3>Amount</h3>
            <h3>Mode of Payment</h3>
            <h3>Status</h3>
            <h3>Date Paid</h3>
          </header>

          <section className="flex flex-col gap-3 h-full w-full overflow-y-auto relative">
            {loading ? (
              <Loading />
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="grid grid-cols-5 mt-3 bg-primaryLight/15 rounded-xl p-3"
                >
                  <p>{appt._id}</p>
                  <p>{appt.amount}</p>
                  <p>{appt.modeOfPayment}</p>
                  <p>{appt.status}</p>
                  <div className="flex gap-4 items-center">
                    <p>{dayjs(appt.createdAt).format("MM/DD/YY, h:mm A")}</p>
                    <Link
                      to={`/transactions/${appt._id}/receipt`}
                      className="cursor-pointer"
                    >
                      <img
                        src="/assets/icons/print.png"
                        alt=""
                        className="w-5"
                      />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </section>
        </form>
      </div>
    </main>
  );
}
