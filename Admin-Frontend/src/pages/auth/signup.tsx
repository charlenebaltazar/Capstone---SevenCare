import { useState } from "react";
import axios, { AxiosError } from "axios";
import Footer from "../../components/Footer";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_DOMAIN } from "../../data/data";

export default function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      firstname,
      surname,
      birthDate,
      gender,
      maritalStatus,
      address,
      email,
      phoneNumber,
      password,
      role: "admin"
    };

    try {
      const response = await axios.post(
        `${BACKEND_DOMAIN}/api/v1/auth/signup`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log("Signup success:", response.data);

      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{ message?: string }>;
        setError(err.response?.data?.message ?? "Signup failed.");
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full h-screen bg-bg-color">
      <section className="w-full flex-1 p-8">
        <div className="bg-primaryLight/30 h-full w-full rounded-lg font-roboto text-zinc-900 py-3 px-5 flex flex-col gap-5 justify-center items-center">
          <header className="flex flex-col items-center">
            <img src="/assets/icons/icon.png" className="w-20" />
            <h1 className="font-bold text-xl">
              Welcome to <span className="text-[#458DFC]">SevenCare!</span>
            </h1>
            <h3 className="text-sm">
              Create your account using the form below.
            </h3>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center   lg:w-1/2 w-full gap-1"
          >
            {/* First Row */}
            <section className="flex flex-row justify-center items-center gap-6 w-full">
              {/* First name */}
              <div className="flex flex-col w-full">
                <label htmlFor="firstname">First Name</label>
                <CustomInput
                  type="text"
                  name="firstname"
                  state={firstname}
                  stateSetter={setFirstname}
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col w-full">
                <label htmlFor="surname">Last Name</label>
                <CustomInput
                  type="text"
                  name="surname"
                  state={surname}
                  stateSetter={setSurname}
                />
              </div>
            </section>

            {/* Second Row */}
            <section className="flex flex-row justify-center items-start gap-6 w-full">
              {/* Birth Date */}
              <div className="flex flex-col w-full">
                <label htmlFor="birthDate">Birth Date</label>
                <CustomInput
                  type="text"
                  name="birthDate"
                  placeholder="MM/DD/YYYY"
                  state={birthDate}
                  stateSetter={setBirthDate}
                />
              </div>

              {/* Address */}
              <div className="flex flex-col w-full">
                <label htmlFor="address">Address</label>
                <CustomInput
                  type="text"
                  name="address"
                  placeholder="Street, Barangay, City, Province"
                  state={address}
                  stateSetter={setAddress}
                />
              </div>
            </section>

            {/* Third Row */}
            <section className="flex flex-row justify-center items-start gap-6 w-full">
              {/* Gender */}
              <div className="flex flex-col w-full">
                <p>Gender</p>
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

              {/* Marital Status */}
              <div className="flex flex-col w-full">
                <p>Marital Status</p>
                <div className="flex flex-row gap-3 w-full">
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <input
                      type="radio"
                      name="maritalStatus"
                      id="single"
                      value="single"
                      checked={maritalStatus === "single"}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    />
                    <label htmlFor="single">Single</label>
                  </div>

                  <div className="flex flex-row gap-1 justify-center items-center">
                    <input
                      type="radio"
                      name="maritalStatus"
                      id="married"
                      value="married"
                      checked={maritalStatus === "married"}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    />
                    <label htmlFor="married">Married</label>
                  </div>

                  <div className="flex flex-row gap-1 justify-center items-center">
                    <input
                      type="radio"
                      name="maritalStatus"
                      id="widowed"
                      value="widowed"
                      checked={maritalStatus === "widowed"}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    />
                    <label htmlFor="widowed">Widowed</label>
                  </div>
                </div>
              </div>
            </section>

            {/* Fourth Row */}
            <section className="flex flex-row justify-center items-start gap-6 w-full">
              {/* Email */}
              <div className="flex flex-col w-full">
                <label htmlFor="email">Email</label>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  state={email}
                  stateSetter={setEmail}
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col w-full">
                <label htmlFor="phoneNumber">Phone Number</label>
                <CustomInput
                  type="text"
                  name="phoneNumber"
                  placeholder="09XXXXXXXXX"
                  state={phoneNumber}
                  stateSetter={setPhoneNumber}
                />
              </div>
            </section>

            {/* Password */}
            <section className="flex flex-col w-full">
              <label htmlFor="password">Password</label>
              <CustomInput
                type="password"
                name="password"
                placeholder=""
                state={password}
                stateSetter={setPassword}
              />
            </section>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`bg-primary rounded-xl w-full py-1.5 mt-2.5 text-zinc-200 font-bold cursor-pointer ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>

            <footer className="w-full py-1 justify-center flex flex-row items-center gap-1 text-zinc-800 text-xs">
              <p>Already have an account?</p>{" "}
              <Link className="text-primary" to={"/login"}>
                Log In
              </Link>
            </footer>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}