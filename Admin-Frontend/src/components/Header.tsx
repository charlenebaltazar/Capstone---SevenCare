import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Header({ active }: { active: string }) {
  const { refreshUser, user } = useUser();

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <header className="fixed top-0 w-full flex flex-row justify-between items-center pt-2 pb-0.5 px-20 z-50 bg-bg-color">
      <div className="flex flex-row  items-center">
        <img src="/assets/icons/icon.png" alt="icon" className="w-16" />
      </div>

      <nav className="flex flex-row items-center gap-6 text-sm font-bold">
        <Link
          to="/"
          className={`border-b-2 pb-0.5 hover:text-primary transition-colors duration-150 ${
            active === "home"
              ? "text-primary border-b-primary"
              : "border-b-transparent"
          }`}
        >
          Home
        </Link>

        <Link
          to="/about"
          className={`border-b-2 pb-0.5 hover:text-primary transition-colors duration-150  ${
            active === "about"
              ? "text-primary border-b-primary"
              : "border-b-transparent"
          }`}
        >
          About
        </Link>
        <Link
          to="/services"
          className={`border-b-2 pb-0.5 hover:text-primary transition-colors duration-150  ${
            active === "services"
              ? "text-primary border-b-primary"
              : "border-b-transparent"
          }`}
        >
          Services
        </Link>
        <Link
          to="/contact-us"
          className={`border-b-2 pb-0.5 hover:text-primary transition-colors duration-150  ${
            active === "contactUs"
              ? "text-primary border-b-primary"
              : "border-b-transparent"
          }`}
        >
          Contact Us
        </Link>

        {user ? (
          <Link
            to="/dashboard"
            className="bg-primary rounded-lg py-1 px-5 text-zinc-100"
          >
            Get Started
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-secondary rounded-lg py-1 px-5 text-zinc-100"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}