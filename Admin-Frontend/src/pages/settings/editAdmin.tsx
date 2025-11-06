import { useEffect, useState } from "react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import CustomInput from "../../components/CustomInput";
import axios, { AxiosError } from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAdmin() {
  const { id } = useParams<{ id: string }>();
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  interface UpdateUserPayload {
    firstname: string;
    surname: string;
    address: string;
    email: string;
    phoneNumber: string;
    password?: string;
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateData: UpdateUserPayload = {
        firstname,
        surname,
        address,
        email,
        phoneNumber,
      };

      if (password.trim() !== "") updateData.password = password;

      await axios.patch(`${BACKEND_DOMAIN}/api/v1/users/${id}`, updateData, {
        withCredentials: true,
      });

      alert("Account updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update user account", error);
      alert("Failed to update account.");
    }
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${BACKEND_DOMAIN}/api/v1/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setFirstname(res.data.data.firstname);
        setSurname(res.data.data.surname);
        setAddress(res.data.data.address);
        setEmail(res.data.data.email);
        setPhoneNumber(res.data.data.phoneNumber);
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
      <form
        onSubmit={handleUpdateUser}
        className="h-full w-full p-5 flex flex-col justify-center items-center"
      >
        <header className="w-[50%] ">
          <h1 className="text-2xl font-bold">{name}'s Profile</h1>
        </header>

        <section className="w-[50%] h-auto flex mt-3 gap-7 flex-col bg-[#E9F5FF] rounded-lg p-10">
          <div className="flex items-center">
            <b className="w-48">Name:</b>
            <div className="w-full flex gap-5">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
              />
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
              />
            </div>
          </div>

          <div className="flex items-center">
            <b className="w-48">Address:</b>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
            />
          </div>

          <div className="flex items-center">
            <b className="w-48">Email:</b>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
            />
          </div>

          <div className="flex items-center">
            <b className="w-48">Phone Number:</b>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
            />
          </div>

          <div className="flex items-center">
            <b className="w-48">Change Password:</b>
            <div className="flex-col flex w-full">
              <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                state={password}
                stateSetter={setPassword}
              />
            </div>
          </div>
        </section>

        <div className="w-[50%] flex justify-between items-center mt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-red-500 rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
