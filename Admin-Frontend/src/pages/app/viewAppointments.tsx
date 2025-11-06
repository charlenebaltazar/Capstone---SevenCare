import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { ChevronDown, Check } from "lucide-react";
import { useEffect, useState } from "react";
import type { IAppointment } from "../../@types/interface";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import dayjs from "dayjs";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import type { MultiValue, SingleValue } from "react-select";
import { AllFilter, PendingFilter } from "../../components/Filter";

type OptionType = {
  value: string;
  label: string;
};

export default function ViewAppointments() {
  const [appointmentType, setAppointmentType] = useState(
    "Today's Appointments",
  );
  const [activeDropDown, setActiveDropDown] = useState(false);

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2
        header="Appointments"
        description="Manage appointments and assist patients."
      />
      <Sidebar />
      <div className="h-full w-full p-5 pb-0 flex-1 min-h-0 flex flex-col">
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setActiveDropDown((prev) => !prev)}
            className={`border border-zinc-400 items-center gap-3 inline-flex w-fit rounded-full px-4 py-1 cursor-pointer hover:bg-zinc-100 duration-150 ease-in-out transition-colors ${
              activeDropDown ? "bg-zinc-100" : ""
            }`}
          >
            <p className="font-bold text-2xl">{appointmentType}</p>
            <ChevronDown
              className={`transition-transform duration-150 ease-in-out ${
                activeDropDown ? "rotate-180" : ""
              }`}
            />
          </button>

          <ul
            className={`absolute mt-2 flex flex-col gap-2 p-3 bg-white z-20 shadow-xl ${
              activeDropDown ? "" : "hidden"
            }`}
          >
            {[
              "Today's Appointments",
              "Appointment Requests",
              "All Appointments",
            ].map((type) => (
              <li
                key={type}
                onClick={() => {
                  setAppointmentType(type);
                  setActiveDropDown(false);
                }}
                className="flex gap-5 items-center hover:bg-zinc-100 transition-colors ease-in-out duration-150 cursor-pointer"
              >
                <p
                  className={`text-lg ${
                    appointmentType === type ? "text-zinc-400" : ""
                  }`}
                >
                  {type}
                </p>
                {appointmentType === type && (
                  <Check className="text-zinc-400" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {appointmentType === "Today's Appointments" && <TodayAppointment />}
        {appointmentType === "Appointment Requests" && <AppointmentRequest />}
        {appointmentType === "All Appointments" && <AllAppointments />}
      </div>
    </main>
  );
}

function TodayAppointment() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(0);

  const onPageChange = (page: number) => setCurrentPage(page);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_DOMAIN}/api/v1/appointments/today/approved`,
        { withCredentials: true },
      );
      setAppointments(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.total);
      setPerPage(response.data.limit);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  const handleAction = async (id: string, action: string) => {
    try {
      await axios.patch(
        `${BACKEND_DOMAIN}/api/v1/appointments/${id}/${action}`,
        {},
        { withCredentials: true },
      );
      fetchAppointments();
    } catch (error) {
      console.error("Failed to mark appointment as no-show", error);
    }
  };

  return (
    <section className="flex flex-col gap-3 h-full w-full overflow-y-auto relative">
      {loading ? (
        <Loading />
      ) : (
        <>
          <header className="grid grid-cols-5 mt-3 font-semibold gap-3 flex-none">
            <h3>Patient Name</h3>
            <h3>Department</h3>
            <h3>Date and Time</h3>
            <h3>Status</h3>
            <h3>Actions</h3>
          </header>

          <section className="flex-1 overflow-y-auto min-h-0">
            {appointments
              .sort(
                (a, b) =>
                  new Date(b.schedule).getTime() -
                  new Date(a.schedule).getTime(),
              )
              .map((appt) => (
                <div
                  key={appt._id}
                  className="grid grid-cols-5 mt-3 bg-primaryLight/15 rounded-xl p-3 overflow-auto gap-3"
                >
                  <p>{appt.patientName}</p>
                  <p>{appt.medicalDepartment.join(", ")}</p>
                  <p>{dayjs(appt.schedule).format("MM/DD/YY, h:mm A")}</p>
                  <p
                    className={`font-bold ${
                      appt.status === "Pending"
                        ? "text-primary"
                        : appt.status === "Approved" ||
                          appt.status === "Completed"
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {appt.status === "Approved" ? "Ongoing" : appt.status}
                  </p>
                  {appt.status === "Approved" && (
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => handleAction(appt._id, "completed")}
                        className="w-fit rounded-lg px-3 font-bold cursor-pointer text-white bg-primary"
                      >
                        COMPLETED
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(appt._id, "noshow")}
                        className="w-fit rounded-lg px-3 font-bold cursor-pointer text-white bg-red-500"
                      >
                        NO SHOW
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </section>

          <footer className="flex-none mt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              perPage={perPage}
              onPageChange={onPageChange}
            />
          </footer>
        </>
      )}
    </section>
  );
}

function AppointmentRequest() {
  const [showDeleteAppointmentModal, setShowDeleteAppointmentModal] =
    useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState(false);
  const [date, setDate] = useState("");
  const [services, setServices] = useState<MultiValue<OptionType>>([]);

  const onPageChange = (page: number) => setCurrentPage(page);

  const fetchAppointments = async () => {
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());

      if (date) params.append("date", date);

      if (services.length > 0)
        services.forEach((service) => params.append("service", service.value));

      const response = await axios.get(
        `${BACKEND_DOMAIN}/api/v1/appointments/pending?${params.toString()}`,
        { withCredentials: true },
      );

      setAppointments(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.total);
      setPerPage(response.data.limit);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  const handleAction = async (id: string, action: "approve" | "decline") => {
    try {
      await axios.patch(
        `${BACKEND_DOMAIN}/api/v1/appointments/${id}/${action}`,
        {},
        { withCredentials: true },
      );

      fetchAppointments();
    } catch (error) {
      console.error(`Failed to ${action} appointment`, error);
    }
  };

  return (
    <section className="flex flex-col h-full w-full relative">
      {/* Decline Appointment Modal */}
      {selectedAppointment && showDeleteAppointmentModal && (
        <DeclineAppointmentModal
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
          setShowDeleteAppointmentModal={setShowDeleteAppointmentModal}
          setAppointments={setAppointments}
          fetchAppointments={fetchAppointments}
        />
      )}

      <PendingFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        date={date}
        setDate={setDate}
        services={services}
        setServices={setServices}
        fetchAppointments={fetchAppointments}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <header className="grid grid-cols-4 mt-3 font-semibold gap-3 flex-none">
            <h3>Patient Name</h3>
            <h3>Department</h3>
            <h3>Date and Time</h3>
            <h3 className="flex justify-center">Actions</h3>
          </header>

          <section className="flex-1 overflow-y-auto min-h-0">
            {appointments
              .sort(
                (a, b) =>
                  new Date(b.schedule).getTime() -
                  new Date(a.schedule).getTime(),
              )
              .map((appt) => (
                <div
                  key={appt._id}
                  className="grid grid-cols-4  mt-3 bg-primaryLight/15 rounded-xl p-3 gap-3"
                >
                  <p>{appt.patientName}</p>
                  <p>{appt.medicalDepartment.join(", ")}</p>
                  <p>{dayjs(appt.schedule).format("MM/DD/YY, h:mm A")}</p>
                  <div className="flex flex-wrap gap-2 justify-center items-center">
                    <button
                      type="button"
                      onClick={() => handleAction(appt._id, "approve")}
                      className="w-fit rounded-lg px-3 font-bold cursor-pointer text-white bg-primary"
                    >
                      APPROVE
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAppointment(appt._id);
                        setShowDeleteAppointmentModal(true);
                      }}
                      className="w-fit rounded-lg px-3 font-bold cursor-pointer text-white bg-red-500"
                    >
                      DECLINE
                    </button>
                  </div>
                </div>
              ))}
          </section>

          <footer className="flex-none mt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              perPage={perPage}
              onPageChange={onPageChange}
            />
          </footer>
        </>
      )}
    </section>
  );
}

function AllAppointments() {
  const [showDeleteAppointmentModal, setShowDeleteAppointmentModal] =
    useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(false);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<SingleValue<OptionType>>(null);
  const [services, setServices] = useState<MultiValue<OptionType>>([]);

  const fetchAppointments = async () => {
    try {
      const params = new URLSearchParams();

      if (date) params.append("date", date);
      if (status?.value) params.append("status", status.value);
      if (services.length > 0)
        params.append("service", services.map((s) => s.value).join(","));

      const response = await axios.get(
        `${BACKEND_DOMAIN}/api/v1/appointments/all?${params.toString()}`,
        { withCredentials: true },
      );
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // const handleAction = async (
  //   id: string,
  //   action: "approve" | "decline" | "completed" | "noshow",
  // ) => {
  //   try {
  //     await axios.patch(
  //       `${BACKEND_DOMAIN}/api/v1/appointments/${id}/${action}`,
  //       {},
  //       { withCredentials: true },
  //     );

  //     fetchAppointments();
  //   } catch (error) {
  //     console.error(`Failed to ${action} appointment`, error);
  //   }
  // };

  return (
    <section className="flex flex-col gap-3 h-full w-full pb-10 relative">
      {/* Decline Appointment Modal */}
      {selectedAppointment && showDeleteAppointmentModal && (
        <DeclineAppointmentModal
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
          setShowDeleteAppointmentModal={setShowDeleteAppointmentModal}
          setAppointments={setAppointments}
          fetchAppointments={fetchAppointments}
        />
      )}

      <AllFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        date={date}
        setDate={setDate}
        status={status}
        setStatus={setStatus}
        services={services}
        setServices={setServices}
        fetchAppointments={fetchAppointments}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <header className="grid grid-cols-4 mt-3 font-semibold gap-3">
            <h3>Patient Name</h3>
            <h3>Department</h3>
            <h3>Date and Time</h3>
            <h3>Status</h3>
          </header>

          <section className="h-full w-full flex flex-col overflow-y-auto">
            {appointments
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.schedule).getTime() -
                  new Date(a.schedule).getTime(),
              )
              .map((appt) => (
                <div
                  key={appt._id}
                  className="grid grid-cols-4  mt-3 bg-primaryLight/15 rounded-xl p-3 gap-3"
                >
                  <p>{appt.patientName}</p>
                  <p>{appt.medicalDepartment.join(", ")}</p>
                  <p>{dayjs(appt.schedule).format("MM/DD/YY, h:mm A")}</p>
                  <p
                    className={`font-bold ${
                      appt.status === "Pending"
                        ? "text-primary"
                        : appt.status === "Approved" ||
                          appt.status === "Completed"
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {appt.status === "Approved" ? "Ongoing" : appt.status}
                  </p>

                  {/* {appt.status === "Approved" && (
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => handleAction(appt._id, "completed")}
                        className="w-fit rounded-lg px-3 font-bold cursor-pointer text-white bg-primary"
                      >
                        COMPLETED
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(appt._id, "noshow")}
                        className="w-fit rounded-lg px-3 font-bold cursor-pointer text-white bg-red-500"
                      >
                        NO SHOW
                      </button>
                    </div>
                  )}

                  {appt.status === "Pending" && (
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => handleAction(appt._id, "approve")}
                        className="w-fit rounded-lg px-3 font-bold cursor-pointer text-white bg-primary"
                      >
                        APPROVE
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAppointment(appt._id);
                          setShowDeleteAppointmentModal(true);
                        }}
                        className="w-fit rounded-lg px-3 font-bold cursor-pointer text-white bg-red-500"
                      >
                        DECLINE
                      </button>
                    </div>
                  )} */}

                  {/* {appt.status !== "Approved" && appt.status !== "Pending" && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAppointment(appt._id);
                      setShowDeleteAppointmentModal(true);
                    }}
                    className="w-fit rounded-lg px-3 font-bold cursor-pointer"
                  >
                    <Trash2 className="text-red-500" />
                  </button>
                )} */}
                </div>
              ))}
          </section>
        </>
      )}
    </section>
  );
}

function DeclineAppointmentModal({
  selectedAppointment,
  setSelectedAppointment,
  setShowDeleteAppointmentModal,
  fetchAppointments,
}: {
  selectedAppointment: string;
  setSelectedAppointment: React.Dispatch<React.SetStateAction<string>>;
  setShowDeleteAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  fetchAppointments: () => Promise<void>;
}) {
  const handleDeclineAppointment = async () => {
    try {
      await axios.patch(
        `${BACKEND_DOMAIN}/api/v1/appointments/${selectedAppointment}/decline`,
        {},
        { withCredentials: true },
      );

      setSelectedAppointment("");
      setShowDeleteAppointmentModal(false);
      fetchAppointments();
    } catch (error) {
      console.error("Failed to delete appointment", error);
    }
  };

  return (
    <dialog className="h-auto w-[40%] flex-col flex p-8 rounded-lg bg-[#333333] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5">
      <div className="flex flex-col justify-center items-center gap-5">
        <p className="italic text-white">
          Are you sure you want to decline this appointment?
        </p>

        <textarea
          name="reason"
          id="reason"
          placeholder="Reason"
          className="border border-zinc-400 bg-white p-2 w-88 rounded-lg resize-none outline-none"
        />
      </div>
      <div className="flex justify-end items-center gap-5">
        <button
          type="button"
          onClick={handleDeclineAppointment}
          className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
        >
          YES
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedAppointment("");
            setShowDeleteAppointmentModal(false);
          }}
          className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-red-500 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}

// function DeleteAppointmentModal({
//   selectedAppointment,
//   setSelectedAppointment,
//   setShowDeleteAppointmentModal,
//   setAppointments,
// }: {
//   selectedAppointment: string;
//   setSelectedAppointment: React.Dispatch<React.SetStateAction<string>>;
//   setShowDeleteAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
//   setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
// }) {
//   const handleDeleteAppointment = async () => {
//     try {
//       await axios.delete(
//         `${BACKEND_DOMAIN}/api/v1/appointments/${selectedAppointment}`,
//         {
//           withCredentials: true,
//         },
//       );

//       setAppointments((prev) =>
//         prev.filter((appt) => appt._id !== selectedAppointment),
//       );

//       setSelectedAppointment("");
//       setShowDeleteAppointmentModal(false);
//     } catch (error) {
//       console.error("Failed to delete appointment", error);
//     }
//   };

//   return (
//     <dialog className="h-auto w-[40%] flex-col flex p-8 rounded-lg bg-[#E9F5FF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5">
//       <div className="flex justify-center items-center gap-5">
//         <img src="/assets/icons/trash.png" alt="" />
//         <p className="italic">
//           Are you sure you want to delete this appointment?
//         </p>
//       </div>
//       <div className="flex justify-end items-center gap-5">
//         <button
//           type="button"
//           onClick={handleDeleteAppointment}
//           className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
//         >
//           OK
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             setSelectedAppointment("");
//             setShowDeleteAppointmentModal(false);
//           }}
//           className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
//         >
//           Cancel
//         </button>
//       </div>
//     </dialog>
//   );
// }
