import { useEffect, useState } from "react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import axios, { AxiosError } from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewAdmin() {
  const { id } = useParams<{ id: string }>();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${BACKEND_DOMAIN}/api/v1/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setAddress(res.data.data.address);
        setEmail(res.data.data.email);
        setPhoneNumber(res.data.data.phoneNumber);
        setGender(res.data.data.gender);
        setBirthDate(res.data.data.birthDate);
        setName(`${res.data.data.firstname} ${res.data.data.surname}`);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const err = e as AxiosError<{ message?: string }>;
          setError(err.response?.data?.message ?? "Fetch failed.");
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred.");
        }
        console.log(error);
      }
    };

    fetchAdmin();
  }, [id]);

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2
        header="Admin Profile"
        description="Edit admin account details."
      />
      <Sidebar />
      <div className="h-full w-full p-5 flex flex-col justify-center items-center">
        <header className="w-[50%] flex items-center justify-center relative">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-primary rounded-lg px-5 py-1 font-bold text-white cursor-pointer absolute left-0"
          >
            Return{" "}
          </button>
          <h1 className="text-2xl font-bold">{name}'s Profile</h1>
          <div />
        </header>

        <section className="w-[50%] h-auto flex mt-3 gap-7 flex-col bg-[#E9F5FF] rounded-lg p-10">
          <div className="flex items-center">
            <b className="w-48">Name:</b>
            <div className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white">
              {name}
            </div>
          </div>

          <div className="flex items-center">
            <b className="w-48">Gender:</b>
            <div className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white">
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </div>
          </div>

          <div className="flex items-center">
            <b className="w-48">Birth Date:</b>
            <div className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white">
              {birthDate}
            </div>
          </div>

          <div className="flex items-center">
            <b className="w-48">Address:</b>
            <div className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white">
              {address}
            </div>
          </div>

          <div className="flex items-center">
            <b className="w-48">Email:</b>
            <div className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white">
              {email}
            </div>
          </div>

          <div className="flex items-center">
            <b className="w-48">Phone Number:</b>
            <div className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white">
              {phoneNumber}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
