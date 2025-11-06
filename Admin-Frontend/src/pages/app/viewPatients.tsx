import { Eye } from "lucide-react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../../data/data";
import { Link } from "react-router-dom";

interface Patient {
  _id: string;
  firstname: string;
  surname: string;
  birthDate: Date;
}

function ViewPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${BACKEND_DOMAIN}/api/v1/users/patients`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setPatients(res.data.data || []);
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

    fetchPatients();
  }, []);

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2
        header="Patients"
        description="View patients registered in the system"
      />
      <Sidebar />
      <div className="h-full w-full p-5 pb-0 flex-1 min-h-0 flex flex-col border-t">
        <header className="grid grid-cols-3 font-bold">
          <p>Name</p>
          <p>Date of Birth</p>
          <p>Actions</p>
        </header>

        <section className="flex flex-col gap-3 mt-3">
          {loading ? (
            <p className="text-center text-zinc-500">Loading patients...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : patients.length === 0 ? (
            <p className="text-center text-zinc-500">No patients found.</p>
          ) : (
            patients.map((patient) => (
              <div className="grid grid-cols-3">
                <p>
                  {patient.firstname} {patient.surname}
                </p>
                <p>
                  {new Date(patient.birthDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/users/${patient._id}`}
                    title="View patient"
                    className="cursor-pointer text-primary"
                  >
                    <Eye />
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default ViewPatients;