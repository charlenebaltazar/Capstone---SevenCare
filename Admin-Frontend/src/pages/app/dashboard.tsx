import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header2 from "../../components/Header2";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import dayjs, { Dayjs } from "dayjs";

interface IAppointmentSummary {
  today: number;
  cancelled: number;
  pending: number;
}

interface TodayAppointment {
  _id: string;
  patientName: string;
  medicalDepartment: string[];
  schedule: string;
}

export default function DashboardPage() {
  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-76 bg-bg-color text-zinc-900">
      <Sidebar />
      <div className="h-full  w-full p-4 flex flex-col">
        <Header2 />
        <AppointmentSummary />
        <Dashboard />
      </div>
    </main>
  );
}

function AppointmentSummary() {
  const [summary, setSummary] = useState<IAppointmentSummary>({
    today: 0,
    cancelled: 0,
    pending: 0,
  });

  const fetchSummary = async () => {
    try {
      const todayRes = await axios.get(
        `${BACKEND_DOMAIN}/api/v1/appointments/today/approved`,
        { withCredentials: true },
      );

      const cancelledRes = await axios.get(
        `${BACKEND_DOMAIN}/api/v1/appointments/cancelled`,
        { withCredentials: true },
      );

      const pendingRes = await axios.get(
        `${BACKEND_DOMAIN}/api/v1/appointments/pending`,
        { withCredentials: true },
      );

      setSummary({
        today: todayRes.data.results,
        cancelled: cancelledRes.data.results,
        pending: pendingRes.data.results,
      });
    } catch (error) {
      console.error("Failed to fetch appointment summary", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <section className="w-full h-auto grid grid-cols-3 gap-4">
      <div className="flex items-center rounded-xl bg-[#1270B0] pl-5">
        <div className="border w-full h-full rounded-xl bg-white p-3 flex flex-col gap-3">
          <header className="flex justify-between items-center w-full">
            <b className="text-3xl">{summary.today}</b>
            <img src="/assets/icons/calendar2.png" alt="" />
          </header>
          <p className="text-xl">TODAY APPOINTMENTS</p>
        </div>
      </div>

      <div className="flex items-center rounded-xl bg-[#F51D2C] pl-5">
        <div className="border w-full h-full rounded-xl bg-white p-3 flex flex-col gap-3">
          <header className="flex justify-between items-center w-full">
            <b className="text-3xl">{summary.cancelled}</b>
            <img src="/assets/icons/calendar3.png" alt="" />
          </header>
          <p className="text-xl">CANCELLED PATIENTS</p>
        </div>
      </div>

      <div className="flex items-center rounded-xl bg-[#53C32A] pl-5">
        <div className="border w-full h-full rounded-xl bg-white p-3 flex flex-col gap-3">
          <header className="flex justify-between items-center w-full">
            <b className="text-3xl">{summary.pending}</b>
            <img src="/assets/icons/calendar4.png" alt="" />
          </header>
          <p className="text-xl">PENDING CONFIRMATIONS</p>
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  return (
    <section className="grid grid-cols-3 gap-8 w-full flex-1 mt-5 mb-10">
      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          <AvailableDoctors />
          <AvailableServices />
          <Reviews />
        </div>
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <TodayAppointment />
        <div className="p-4 border border-zinc-400 rounded-lg">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              defaultValue={dayjs("2022-04-17")}
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </LocalizationProvider>
        </div>
      </div>
    </section>
  );
}

function AvailableDoctors() {
  return (
    <div className="flex flex-col bg-[#E7F0FE] p-3 rounded-xl border border-zinc-300">
      <header className="items-center justify-between flex gap-8">
        <b className="text-xl">Available Doctors</b>
        <Link to={""} className="bg-[#1270B0] px-3 py-1 text-white rounded-lg">
          View All
        </Link>
      </header>
      <ol className="flex flex-col gap-2 mt-2">
        <li
          className="bg-[#DAE1EB] rounded-lg p-2
              "
        >
          <h4 className="text-2xl">Dr. John Doe</h4>
          <span className="text-red-500">Doctor of OB-Gyne</span>
          <p>Available Time: 10:00 AM - 6:00 PM</p>
          <p>Available Day: Monday - Thursday</p>
        </li>
        <li
          className="bg-[#DAE1EB] rounded-lg p-2
              "
        >
          <h4 className="text-2xl">Dr. John Doe</h4>
          <span className="text-red-500">Doctor of OB-Gyne</span>
          <p>Available Time: 10:00 AM - 6:00 PM</p>
          <p>Available Day: Monday - Thursday</p>
        </li>
      </ol>
    </div>
  );
}

function AvailableServices() {
  return (
    <div className="flex flex-col bg-[#E7F0FE] p-3 rounded-xl border border-zinc-300">
      <header className="items-center justify-between flex gap-8">
        <b className="text-xl">Available Services</b>
        <Link to={""} className="bg-[#1270B0] px-3 py-1 text-white rounded-lg">
          View All
        </Link>
      </header>
      <ul className="flex flex-col gap-1 mt-2">
        <li>Ultrasound</li>
        <li>Consultation</li>
        <li>Family Planning</li>
        <li>Prenatal Check Up</li>
      </ul>
    </div>
  );
}

function Reviews() {
  return (
    <div className="flex flex-col p-3 rounded-xl border border-zinc-300 mb-5">
      <b className="text-xl">Patients Review</b>

      <div className="grid grid-cols-4 grid-rows-4 col gap-2 mt-2">
        <p>Excellent</p>
        <div className="col-span-3 rounded-full items-center flex">
          <span className="rounded-full bg-[#381F69] w-[100%] h-1/2"></span>
        </div>
        <p>Great</p>
        <div className="col-span-3 rounded-full items-center flex">
          <span className="rounded-full bg-[#53C32A] w-[40%] h-1/2"></span>
        </div>
        <p>Good</p>
        <div className="col-span-3 rounded-full items-center flex">
          <span className="rounded-full bg-[#EF8418] w-[70%] h-1/2"></span>
        </div>
        <p>Average</p>
        <div className="col-span-3 rounded-full items-center flex">
          <span className="rounded-full bg-[#7356F3] w-[20%] h-1/2"></span>
        </div>
      </div>
    </div>
  );
}

function TodayAppointment() {
  const [appointments, setAppointments] = useState<TodayAppointment[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await axios.get(
          `${BACKEND_DOMAIN}/api/v1/appointments/today/approved`,
          { withCredentials: true },
        );
        console.log(res.data.data);
        setAppointments(res.data.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    }

    fetchAppointments();
  }, []);

  return (
    <div className="border border-zinc-400 rounded-lg bg-[#E0F7FF] flex flex-col">
      <header className="items-center justify-between flex gap-8 p-3 border-b border-b-zinc-400">
        <b className="text-xl">Today Appointments</b>
        <Link
          to={"/appointments"}
          className="bg-[#1270B0] px-3 py-1 text-white rounded-lg"
        >
          View All
        </Link>
      </header>

      <section className="flex flex-col gap-2 mt-3 p-3">
        <header className="grid grid-cols-3">
          <p>Patient Name</p>
          <p>Department</p>
          <p>Time</p>
        </header>

        <ol className="flex flex-col gap-2">
          {appointments.map((appt) => (
            <li className="grid grid-cols-3">
              <b>{appt.patientName}</b>
              <b>{appt.medicalDepartment.join(", ")}</b>
              <div>
                <b className="bg-[#B2D7FE] text-primary px-2 py-1">
                  {new Date(appt.schedule).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </b>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
