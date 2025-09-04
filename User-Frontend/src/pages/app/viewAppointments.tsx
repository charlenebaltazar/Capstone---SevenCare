import { Link } from "react-router-dom";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { IAppointment } from "../../@types/interface";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import dayjs from "dayjs";

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_DOMAIN}/api/v1/appointments`,
          { withCredentials: true },
        );
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-zinc-100 text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full  w-full p-5">
        <form className="flex  flex-col w-full h-full flex-1 mt-3">
          <h1 className="font-bold text-2xl">My Appointments</h1>
          <header className="grid grid-cols-4 mt-3 font-semibold">
            <h3>Reference Id</h3>
            <h3>Department</h3>
            <h3>Date and Time</h3>
            <h3>Actions</h3>
          </header>

          <section className="flex flex-col gap-3">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="grid grid-cols-4 mt-3 bg-primaryLight/15 rounded-xl p-3"
              >
                <p>{appt._id}</p>
                <p>{appt.medicalDepartment}</p>
                <p>{dayjs(appt.schedule).format("MM/DD/YY, h:mm A")}</p>
                <div className="flex gap-2 items-center">
                  <Link
                    to=""
                    className="bg-[#458FF6] rounded-lg px-2 font-bold text-white"
                  >
                    Pay Now
                  </Link>
                  <button className="cursor-pointer">
                    <Trash2 className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </form>
      </div>
    </main>
  );
}