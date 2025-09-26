import { useState } from "react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { useUser } from "../../hooks/useUser";
import CustomInput from "../../components/CustomInput";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";

export default function Profile() {
  const { user } = useUser();

  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [address, setAddress] = useState(user?.address || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [password, setPassword] = useState("");

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

      await axios.patch(`${BACKEND_DOMAIN}/api/v1/users/update`, updateData, {
        withCredentials: true,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update user profile", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-bg-color text-zinc-900">
      <Header2 />
      <Sidebar />
      <form
        onSubmit={handleUpdateUser}
        className="h-full w-full p-5 flex flex-col justify-center items-center"
      >
        <header className="w-[50%] ">
          <h1 className="text-2xl font-bold">My Profile</h1>
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
