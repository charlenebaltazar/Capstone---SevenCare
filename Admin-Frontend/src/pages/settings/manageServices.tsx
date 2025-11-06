import { HeartPlus, Pen, Trash } from "lucide-react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { BACKEND_DOMAIN } from "../../data/data";

interface Service {
  _id: string;
  name: string;
  price: number;
  status: string;
}

function ManageServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${BACKEND_DOMAIN}/api/v1/services`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setServices(res.data.data || []);
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

    fetchServices();
  }, []);

  const handleDeleteService = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_DOMAIN}/api/v1/services/${id}`, {
        withCredentials: true,
      });

      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== id),
      );
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
      <Header2 header="Services" description="Manage clinic services." />
      <Sidebar />
      <div className="h-full w-full p-5 pb-0 flex-1 min-h-0 flex flex-col border-t">
        <nav className="flex items-center justify-end">
          <Link
            to="/add-service"
            className="flex items-center gap-2 mb-2 justify-end px-2 py-1 rounded-lg bg-primary text-white w-fit"
          >
            <HeartPlus className="w-5" />
            <p className="font-bold text-lg">Add Service</p>
          </Link>
        </nav>

        <header className="grid grid-cols-4 font-bold">
          <p>Service</p>
          <p>Price</p>
          <p>Status</p>
          <p>Actions</p>
        </header>

        <section className="flex flex-col gap-3 mt-3">
          {loading ? (
            <p className="text-center text-zinc-500">Loading services...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : services.length === 0 ? (
            <p className="text-center text-zinc-500">No services found.</p>
          ) : (
            services.map((service, i) => (
              <div key={i} className="grid grid-cols-4">
                <p>{service.name}</p>
                <p>₱ {service.price}</p>
                <p
                  className={`font-bold ${
                    service.status === "Available"
                      ? "text-green-500"
                      : "text-red-400"
                  }`}
                >
                  {service.status}
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/services/${service._id}/edit`}
                    title="Edit account"
                    className="cursor-pointer text-green-500"
                  >
                    <Pen />
                  </Link>
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    title="Delete service"
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

export default ManageServices;
