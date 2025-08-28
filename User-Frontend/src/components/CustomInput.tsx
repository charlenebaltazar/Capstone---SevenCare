import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function CustomInput({
  type,
  name,
  placeholder,
  state,
  stateSetter,
}: {
  type: string;
  name: string;
  placeholder?: string;
  state: string;
  stateSetter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const birthdateRegex =
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={};':"\\|,.<>/?]).{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    stateSetter(value);

    if (name === "birthDate") {
      if (!birthdateRegex.test(value)) {
        setError("Use MM/DD/YYYY format.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setError(
          "Password must be at least 8 characters long, and include a mix of uppercase letters, numbers, and symbols."
        );
      } else {
        setError("");
      }
    }

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setError("Enter a valid email address.");
      } else {
        setError("");
      }
    }
  };

  return (
    <>
      <div className="w-full relative flex flex-row justify-center items-center">
        <input
          type={type !== "password" ? type : showPassword ? "text" : type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={state}
          onChange={handleChange}
          className={`bg-zinc-100 border rounded-lg outline-none px-2 py-0.5 focus:border-primary transition-colors duration-150 w-full  ease-in-out ${
            error ? "border-red-500" : "border-zinc-400"
          }`}
        />

        {type === "password" && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            onMouseDown={(e) => e.preventDefault()}
            className="right-2 absolute cursor-pointer"
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </div>
        )}
      </div>
      <p className="text-red-500 text-xs">{error}</p>
      {type === "password" && !error && (
        <p className="text-z-800 text-xs">
          Password must be at least 8 characters long, and include a mix of
          uppercase letters, numbers, and symbols.
        </p>
      )}
    </>
  );
}
