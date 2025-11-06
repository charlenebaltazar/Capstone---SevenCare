import { useState, type FormEvent } from "react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";

function AddAdmin() {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_DOMAIN}/api/v1/users/admins/create`,
        {
          firstname,
          surname,
          birthDate,
          gender,
          address,
          email,
          phoneNumber,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log("✅ Admin created:", res.data);
      navigate(-1);
    } catch (err) {
      console.error("❌ Error creating admin:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2
        header="Admin"
        description="Add admins to assist you in managing appointments."
      />
      <Sidebar />
      <div className="h-full w-full p-5 pb-0 flex-1 min-h-0 flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="h-full w-full p-5 flex flex-col justify-center items-center"
        >
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

            <div className="flex items-center w-full">
              <label htmlFor="birthDate" className="font-bold w-48">
                Birth Date:
              </label>
              <CustomInput
                type="text"
                name="birthDate"
                placeholder="MM/DD/YYYY"
                state={birthDate}
                stateSetter={setBirthDate}
              />
            </div>

            <div className="flex items-center w-full">
              <p className="font-bold w-48">Gender:</p>
              <div className="flex flex-row gap-3 w-full">
                <div className="flex flex-row gap-1 justify-center items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="male">Male</label>
                </div>

                <div className="flex flex-row gap-1 justify-center items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="female">Female</label>
                </div>
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
              <b className="w-48">Password:</b>
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
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer w-40 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddAdmin;
