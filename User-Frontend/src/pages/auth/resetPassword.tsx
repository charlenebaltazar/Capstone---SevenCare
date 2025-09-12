import { useState } from "react";
import Footer2 from "../../components/Footer2";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <main className="flex flex-col w-full h-screen font-roboto bg-bg-color">
      <div className="flex-1 w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-1/4 bg-primaryLight/15 rounded-lg flex flex-col  items-center p-7 gap-2"
        >
          <h1 className="font-bold text-lg">New Password</h1>
          <p className="text-[#4C9C48] bg-[#C0F4C7] p-3 text-center">
            Please create a new password that you don't use on any other site.
          </p>
          <CustomInput
            type="password"
            name="password"
            state={password}
            stateSetter={setPassword}
          />
          <button
            type="submit"
            className="py-2 bg-primary rounded-lg text-zinc-100 cursor-pointer w-full font-bold"
          >
            Change Password
          </button>
        </form>
      </div>

      <Footer2 />
    </main>
  );
}