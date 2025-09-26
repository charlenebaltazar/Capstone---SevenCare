import { useNavigate } from "react-router-dom";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { BACKEND_DOMAIN, medicalDepartments } from "../../data/data";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useUser } from "../../hooks/useUser";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import dayjs, { Dayjs } from "dayjs";
import {
  LocalizationProvider,
  StaticDatePicker,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CreateAppointment() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activePage, setActivePage] = useState(1);
  const [medicalDepartment, setMedicalDepartment] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const appointmentData = {
      medicalDepartment,
      date: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
      time: selectedTime ? selectedTime.format("HH:mm") : null,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    };
    console.log(appointmentData);

    try {
      const response = await axios.post(
        `${BACKEND_DOMAIN}/api/v1/appointments/create`,
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log("Appointment is scheduled:", response.data);

      navigate("/home");
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{ message?: string }>;
        setError(
          err.response?.data?.message ??
            "Failed to create appointment. Please try again.",
        );
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-bg-color text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full  w-full p-8 flex flex-col">
        <header>
          <h1 className="text-2xl font-bold">{`Hello, ${
            user?.firstname || ""
          } ${user?.surname || ""}`}</h1>
          <h2>
            Welcome to{" "}
            <span className="text-primary font-bold">SevenCare!</span>
          </h2>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex  flex-col w-full mt-10 border border-zinc-400"
        >
          <header className="flex items-center justify-between text-xl bg-primary p-3 text-white">
            <p>
              Olympus Medical Clinic: <b>Book Online</b>
            </p>

            {activePage === 1 ? (
              <button
                type="button"
                onClick={() => setActivePage(2)}
                className="flex items-center cursor-pointer"
              >
                Next <ChevronRight />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActivePage(1)}
                className="flex items-center cursor-pointer"
              >
                <ChevronLeft />
                Go Back
              </button>
            )}
          </header>

          <section className="grid grid-cols-2 p-5 bg-zinc-100 border-b-zinc-400 border-b">
            <h3 className="flex justify-center items-center">
              <div
                className={`p-2 rounded-full w-10 flex items-center justify-center mr-2 ${
                  activePage === 1 ? "bg-primary text-white" : "bg-zinc-400"
                }`}
              >
                1
              </div>{" "}
              Confirm Date & Time
            </h3>
            <h3 className="flex justify-center items-center">
              <div
                className={`p-2 rounded-full w-10 flex items-center justify-center mr-2 ${
                  activePage === 2 ? "bg-primary text-white" : "bg-zinc-400"
                }`}
              >
                2
              </div>{" "}
              Select Service
            </h3>
          </section>

          {activePage === 1 && (
            <section className="w-full grid grid-cols-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="p-4 bg-primary/5">
                  <StaticDatePicker
                    defaultValue={dayjs("2022-04-17")}
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                  />
                </div>
                <div className="p-4 bg-primary/5">
                  <StaticTimePicker
                    orientation="portrait"
                    value={selectedTime}
                    onChange={(newTime) => setSelectedTime(newTime)}
                  />
                </div>
              </LocalizationProvider>
            </section>
          )}

          {activePage === 2 && (
            <section className="h- mt-5">
              <h3 className="p-3 font-bold text-xl flex items-center gap-4">
                {" "}
                <img src="/assets/icons/pencil.png" alt="" /> Select Service(s):{" "}
              </h3>
              <div className="p-3 grid grid-cols-3 grid-rows-3 gap-3 mt-4">
                {medicalDepartments.map((department, i) => (
                  <div key={i} className="flex flex-row items-center gap-2">
                    <input
                      type="checkbox"
                      name="medicalDepartment"
                      value={department.label}
                      checked={medicalDepartment.includes(department.label)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (medicalDepartment.includes(value)) {
                          setMedicalDepartment(
                            medicalDepartment.filter((d) => d !== value),
                          );
                        } else {
                          if (medicalDepartment.length < 3) {
                            setMedicalDepartment([...medicalDepartment, value]);
                          }
                        }
                      }}
                      id={department.name}
                    />
                    <label htmlFor={department.name}>{department.label}</label>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="bg-green-800 w-full text-white font-bold py-3 mt-5 cursor-pointer flex items-center justify-center gap-2"
              >
                SUBMIT <ArrowRight />
              </button>
            </section>
          )}

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </main>
  );
}
