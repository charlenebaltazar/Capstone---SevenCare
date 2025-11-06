import { Trash, UserPen, UsersRound } from "lucide-react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../../data/data";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  schedule: Date;
}

function ManageDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${BACKEND_DOMAIN}/api/v1/doctors`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setDoctors(res.data.data || []);
      } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e)) {
          const err = e as AxiosError<{ message?: string }>;
          setError(err.response?.data?.message ?? "Fetch failed.");
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_DOMAIN}/api/v1/doctors/${id}`, {
        withCredentials: true,
      });

      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor._id !== id),
      );
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{ message?: string }>;
        alert(err.response?.data?.message ?? "Failed to delete doctor.");
      } else {
        alert("An unexpected error occurred while deleting the doctor.");
      }
    }
  };

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2
        header="Doctors"
        description="Manage doctors and their schedules."
      />
      <Sidebar />
      <div className="h-full w-full p-5 pb-0 flex-1 min-h-0 flex flex-col border-t">
        <nav className="flex items-center justify-end">
          <Link
            to="/add-doctor"
            className="flex items-center gap-2 mb-2 justify-end px-2 py-1 rounded-lg bg-primary text-white w-fit"
          >
            <UsersRound className="w-5" />
            <p className="font-bold text-lg">Add Doctor</p>
          </Link>
        </nav>

        <header className="grid grid-cols-4 font-bold">
          <p>Name</p>
          <p>Specialization</p>
          <p>Availale Schedule</p>
          <p>Actions</p>
        </header>

        <section className="flex flex-col gap-3 mt-3">
          {loading ? (
            <p className="text-center text-zinc-500">Loading doctors...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-zinc-500">No doctors found.</p>
          ) : (
            doctors.map((doctor, i) => (
              <div key={i} className="grid grid-cols-4">
                <p>{doctor.name}</p>
                <p>{doctor.specialization}</p>
                <p>
                  {new Date(
                    new Date(doctor.schedule).getTime() - 8 * 60 * 60 * 1000,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/doctors/${doctor._id}/edit`}
                    title="Edit doctor"
                    className="cursor-pointer text-green-500"
                  >
                    <UserPen />
                  </Link>
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id)}
                    title="Delete doctor"
                    className="cursor-pointer text-red-500"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default ManageDoctors;