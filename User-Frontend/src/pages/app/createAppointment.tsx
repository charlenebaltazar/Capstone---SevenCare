import { Link } from "react-router-dom";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { medicalDepartments } from "../../data/data";
import { useState } from "react";

export default function CreateAppointment() {
  const [medicalDepartment, setMedicalDepartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [useRegisteredContact, setUseRegisteredContact] = useState(false);

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

        <form className="flex  flex-col w-full flex-1 mt-3 bg-primaryLight/15 rounded-xl p-3">
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

          <section className="w-full flex flex-row justify-end items-center mt-10">
            <div className="flex flex-row items-center gap-3">
              <Link
                to={"/home"}
                className="bg-primary py-2 px-4 text-zinc-100 font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </Link>
              <button className="bg-primary py-2 px-4 text-zinc-100 font-bold rounded-xl cursor-pointer">
                Submit
              </button>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
