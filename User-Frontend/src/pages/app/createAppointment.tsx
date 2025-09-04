import { Link, useNavigate } from "react-router-dom";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { BACKEND_DOMAIN, medicalDepartments } from "../../data/data";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function CreateAppointment() {
  const navigate = useNavigate();
  const [medicalDepartment, setMedicalDepartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [useRegisteredContact, setUseRegisteredContact] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const appointmentData = {
      medicalDepartment,
      date,
      time,
      email,
      phoneNumber,
      useRegisteredContact,
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
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-zinc-100 text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full  w-full p-5 flex flex-col">
        <header className="border-2 border-[#458FF6] rounded-lg flex justify-center items-center">
          <p className="text-center py-2">
            Please review the details of your appointment. Keep in mind that
            this appointment is non - transferable.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex  flex-col w-full flex-1 mt-3 bg-primaryLight/15 rounded-xl p-3"
        >
          <p className="font-bold">
            Which medical department would you like to make an appointment for?
          </p>
          <section className="grid grid-cols-3 grid-rows-3 gap-3">
            {medicalDepartments.map((department) => (
              <div className="flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="medicalDepartment"
                  value={department.label}
                  checked={medicalDepartment === department.label}
                  onChange={(e) => setMedicalDepartment(e.target.value)}
                  id={department.name}
                />
                <label htmlFor={department.name}>{department.label}</label>
              </div>
            ))}
          </section>

          <p className="font-bold mt-3">
            What date and time works best for you?
          </p>
          <div className="flex flex-row gap-3">
            <label htmlFor="appointmentDate">Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-2 py-1 bg-zinc-100 rounded-lg outline-none border border-transparent focus:border-primary duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-row gap-3 mt-2">
            <label htmlFor="appointmentTime">Time</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-2 py-1 bg-zinc-100 rounded-lg outline-none border border-transparent focus:border-primary duration-150 ease-in-out"
            />
          </div>

          <p className="font-bold mt-3">Where should we contact you?</p>
          <div className="flex flex-row gap-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              disabled={useRegisteredContact}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 py-1 bg-zinc-100 rounded-lg outline-none border border-transparent focus:border-primary duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-row gap-3 mt-2">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              disabled={useRegisteredContact}
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="px-2 py-1 bg-zinc-100 rounded-lg outline-none border border-transparent focus:border-primary duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-row items-center gap-1 w-full">
            <input
              type="checkbox"
              name="registeredContact"
              id="registeredContact"
              checked={useRegisteredContact}
              onChange={(e) => setUseRegisteredContact(e.target.checked)}
            />
            <label htmlFor="registeredContact" className="text-sm">
              Use registered contact details
            </label>
          </div>

          {error && (
            <p className="text-red-500 w-full flex justify-center items-center mt-3">
              {error}
            </p>
          )}

          <section className="w-full flex flex-row justify-end items-center mt-10">
            <div className="flex flex-row items-center gap-3">
              <Link
                to={"/home"}
                className="bg-primary py-2 px-4 text-zinc-100 font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-primary py-2 px-4 text-zinc-100 font-bold rounded-xl cursor-pointer"
              >
                Submit
              </button>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
