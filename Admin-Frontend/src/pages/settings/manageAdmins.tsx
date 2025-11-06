import { Eye, Trash, UserPen } from "lucide-react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../../data/data";

interface Admin {
  _id: string;
  firstname: string;
  surname: string;
  email: string;
  createdAt: Date;
}

function ManageAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(`${BACKEND_DOMAIN}/api/v1/users/admins`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setAdmins(res.data.data || []);
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

    fetchAdmins();
  }, []);

  const handleDeleteAdmin = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_DOMAIN}/api/v1/users/${id}`, {
        withCredentials: true,
      });

      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin._id !== id));
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{ message?: string }>;
        alert(err.response?.data?.message ?? "Failed to delete admin.");
      } else {
        alert("An unexpected error occurred while deleting the admin.");
      }
    }
  };

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2
        header="Admin Accounts"
        description="Manage system admin accounts."
      />
      <Sidebar />
      <div className="h-full w-full p-5 pb-0 flex-1 min-h-0 flex flex-col border-t">
        <nav className="flex items-center justify-end">
          <Link
            to="/add-admin"
            className="flex items-center gap-2 mb-2 justify-end px-2 py-1 rounded-lg bg-primary text-white w-fit"
          >
            <img src="/assets/icons/user (1).png" alt="" className="w-5" />
            <p className="font-bold text-lg">Add Admin</p>
          </Link>
        </nav>

        <header className="grid grid-cols-4 font-bold">
          <p>Name</p>
          <p>Email</p>
          <p>Created At</p>
          <p>Actions</p>
        </header>

        <section className="flex flex-col gap-3 mt-3">
          {loading ? (
            <p className="text-center text-zinc-500">Loading admins...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : admins.length === 0 ? (
            <p className="text-center text-zinc-500">No admins found.</p>
          ) : (
            admins.map((admin, i) => (
              <div key={i} className="grid grid-cols-4">
                <p>
                  {admin.firstname} {admin.surname}
                </p>
                <p>{admin.email}</p>
                <p>
                  {new Date(admin.createdAt).toLocaleDateString("en-US", {
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
                    to={`/admins/${admin._id}`}
                    title="View Account"
                    className="cursor-pointer text-primary"
                  >
                    <Eye />
                  </Link>
                  <Link
                    to={`/admins/${admin._id}/edit`}
                    title="Edit account"
                    className="cursor-pointer text-green-500"
                  >
                    <UserPen />
                  </Link>
                  <button
                    onClick={() => handleDeleteAdmin(admin._id)}
                    title="Delete account"
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

export default ManageAdmins;