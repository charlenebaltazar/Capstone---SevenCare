import { useState } from "react";
import Footer2 from "../../components/Footer2";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <main className="flex flex-col w-full h-screen font-roboto bg-zinc-100">
      <div className="flex-1 w-full flex justify-center items-center relative overflow-hidden">
        <div
          className={`absolute transition-transform duration-500 ease-in-out w-full flex justify-center ${
            activeSlide === 1 ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ForgotPasswordSlide
            email={email}
            setEmail={setEmail}
            setActiveSlide={setActiveSlide}
          />
        </div>

        <div
          className={`absolute transition-transform duration-500 ease-in-out w-full flex justify-center ${
            activeSlide === 2 ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ResetPasswordCodeSlide
            code={code}
            setCode={setCode}
            setActiveSlide={setActiveSlide}
          />
        </div>
      </div>

      <Footer2 />
    </main>
  );
}

function ForgotPasswordSlide({
  email,
  setEmail,
  setActiveSlide,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSlide(2);
  };

  return (
    <form className="w-1/4 bg-primaryLight/30 rounded-lg flex flex-col  items-center p-4 gap-2">
      <h1 className="font-bold text-lg">Forgot Password</h1>
      <p className="text-zinc-900">Enter your email address</p>
      <CustomInput
        type="email"
        name="email"
        placeholder="example@gmail.com"
        state={email}
        stateSetter={setEmail}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="py-2 bg-primary rounded-lg text-zinc-100 cursor-pointer w-full"
      >
        Continue
      </button>
    </form>
  );
}

function ResetPasswordCodeSlide({
  code,
  setCode,
  setActiveSlide,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSlide(2);
    navigate("/reset-password");
  };

  return (
    <form className="w-1/4 bg-primaryLight/30 rounded-lg flex flex-col  items-center p-4 gap-2">
      <h1 className="font-bold text-lg">Reset Code</h1>
      <p className="text-zinc-900">
        Enter the 6-digit code sent to your email.
      </p>
      <CustomInput
        type="text"
        name="code"
        placeholder="XXXXXX"
        state={code}
        stateSetter={setCode}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="py-2 bg-primary rounded-lg text-zinc-100 cursor-pointer w-full"
      >
        Continue
      </button>

      <p className="text-xs text-primary border-b hover:border-b-primary border-b-transparent transition-colors duration-150 cursor-pointer">
        Resend Code
      </p>
    </form>
  );
}
