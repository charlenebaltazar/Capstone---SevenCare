import { useState } from "react";
import Footer from "../../components/Footer";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { BACKEND_DOMAIN } from "../../data/data";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${BACKEND_DOMAIN}/api/v1/auth/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log("Login success:", response.data);

      navigate("/home");
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{ message?: string }>;
        setError(err.response?.data?.message ?? "Login failed.");
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
    <main className="flex flex-col w-full h-screen bg-zinc-100">
      <section className="w-full flex-1 p-8">
        <div className="bg-primaryLight/30 h-full w-full rounded-lg font-roboto text-zinc-900 py-3 px-5 flex flex-col gap-5 justify-center items-center">
          <header className="flex flex-col items-center">
            <img src="/assets/icons/icon.png" className="w-20" />
            <h1 className="font-bold text-xl">
              Welcome to <span className="text-[#458DFC]">SevenCare!</span>
            </h1>
            <h3 className="text-sm">
              Log in to your account using the form below.
            </h3>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center   lg:w-1/4 w-full gap-2"
          >
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

            <div className="flex flex-col w-full">
              <div className="w-full flex flex-row justify-between items-center">
                <label htmlFor="password">Password</label>
                <Link className="text-primary text-sm" to={"/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>
              <CustomInput
                type="password"
                name="password"
                placeholder=""
                state={password}
                stateSetter={setPassword}
              />
            </div>

            <div className="flex flex-row items-center gap-1 w-full">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember me
              </label>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`bg-primary rounded-xl w-full py-1.5  text-zinc-200 font-bold justify-center items-center flex ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Log In"
              )}
            </button>

            <footer className="w-full py-1 justify-center flex flex-row items-center gap-1 text-zinc-800 text-xs">
              <p>Don't have an account?</p>{" "}
              <Link className="text-primary" to={"/signup"}>
                Create Account
              </Link>
            </footer>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
