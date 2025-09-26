import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { IAppointment } from "../../@types/interface";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import dayjs from "dayjs";
import Loading from "../../components/Loading";

export default function ViewAppointments() {
  const [showDeleteAppointmentModal, setShowDeleteAppointmentModal] =
    useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
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

  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-bg-color text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full  w-full p-5">
        <form className="flex  flex-col w-full h-full flex-1 mt-3">
          <h1 className="font-bold text-2xl">My Appointments</h1>
          <header className="grid grid-cols-6 mt-3 font-semibold">
            <h3>Reference Id</h3>
            <h3>Department</h3>
            <h3>Date</h3>
            <h3>Time</h3>
            <h3>Status</h3>
            <h3>Actions</h3>
          </header>

          <section className="flex flex-col gap-3 h-full w-full overflow-y-auto relative">
            {/* Delete Appointment Modal */}
            {selectedAppointment && showDeleteAppointmentModal && (
              <DeleteAppointmentModal
                selectedAppointment={selectedAppointment}
                setSelectedAppointment={setSelectedAppointment}
                setShowDeleteAppointmentModal={setShowDeleteAppointmentModal}
                setAppointments={setAppointments}
              />
            )}

            {loading ? (
              <Loading />
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="grid grid-cols-6 mt-3 bg-primaryLight/15 rounded-xl p-3"
                >
                  <p>{appt._id}</p>
                  <p>{appt.medicalDepartment.join(", ")}</p>
                  <p>
                    {
                      dayjs(appt.schedule)
                        .format("MM/DD/YY, h:mm A")
                        .split(", ")[0]
                    }
                  </p>
                  <p>
                    {
                      dayjs(appt.schedule)
                        .format("MM/DD/YY, h:mm A")
                        .split(", ")[1]
                    }
                  </p>
                  <p
                    className={`font-bold ${
                      appt.status === "Pending"
                        ? "text-primary"
                        : appt.status === "Approved"
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {appt.status}
                  </p>
                  <div className="flex gap-2 items-center">
                    <img src="/assets/icons/chat.png" alt="" />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAppointment(appt._id);
                        setShowDeleteAppointmentModal(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Trash2 className="text-red-500" />
                    </button>
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

function DeleteAppointmentModal({
  selectedAppointment,
  setSelectedAppointment,
  setShowDeleteAppointmentModal,
  setAppointments,
}: {
  selectedAppointment: string;
  setSelectedAppointment: React.Dispatch<React.SetStateAction<string>>;
  setShowDeleteAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
}) {
  const handleDeleteAppointment = async () => {
    try {
      await axios.delete(
        `${BACKEND_DOMAIN}/api/v1/appointments/${selectedAppointment}`,
        {
          withCredentials: true,
        },
      );

      setAppointments((prev) =>
        prev.filter((appt) => appt._id !== selectedAppointment),
      );

      setSelectedAppointment("");
      setShowDeleteAppointmentModal(false);
    } catch (error) {
      console.error("Failed to delete appointment", error);
    }
  };

  return (
    <dialog className="h-auto w-[40%] flex-col flex p-8 rounded-lg bg-[#E9F5FF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5">
      <div className="flex justify-center items-center gap-5">
        <img src="/assets/icons/trash.png" alt="" />
        <p className="italic">
          Are you sure you want to delete this appointment?
        </p>
      </div>
      <div className="flex justify-end items-center gap-5">
        <button
          type="button"
          onClick={handleDeleteAppointment}
          className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
        >
          OK
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedAppointment("");
            setShowDeleteAppointmentModal(false);
          }}
          className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
