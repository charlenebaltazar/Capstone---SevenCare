import { useUser } from "../hooks/useUser";

export default function Header2() {
  const { user } = useUser();

  return (
    <header className="flex justify-between items-center mb-10">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Front Desk Dashboard</h1>
        <h2 className="text-2xl ">{`Welcome, ${
          user?.firstname || ""
        }! Manage appointments and assist patients.`}</h2>
      </div>

      <div className="flex items-center gap-3 text-xl">
        <img src="/assets/icons/calendar.png" alt="" />
        <p>
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </header>
  );
}