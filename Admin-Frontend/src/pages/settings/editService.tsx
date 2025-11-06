import { useEffect, useState } from "react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import axios, { AxiosError } from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import { useNavigate, useParams } from "react-router-dom";
import Select, { type SingleValue } from "react-select";

const statusOption = [
  { value: "Available", label: "Available" },
  { value: "Not Available", label: "Not Available" },
];

type OptionType = {
  value: string;
  label: string;
};

export default function EditService() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState<SingleValue<OptionType>>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  interface UpdateServicePayload {
    name: string;
    price: number;
    status: string;
  }

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateData: UpdateServicePayload = {
        name,
        price,
        status: status?.value ?? "",
      };

      await axios.patch(`${BACKEND_DOMAIN}/api/v1/services/${id}`, updateData, {
        withCredentials: true,
      });

      alert("Service updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update service", error);
      alert("Failed to update service.");
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${BACKEND_DOMAIN}/api/v1/services/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setName(res.data.data.name);
        setPrice(res.data.data.price);
        setStatus({ value: res.data.data.status, label: res.data.data.status });
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const err = e as AxiosError<{ message?: string }>;
          setError(err.response?.data?.message ?? "Fetch failed.");
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred.");
        }
        console.log(error);
      }
    };

    fetchService();
  }, [id]);

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2 header="Service" description="Edit service details." />
      <Sidebar />
      <form
        onSubmit={handleUpdateService}
        className="h-full w-full p-5 flex flex-col justify-center items-center"
      >
        <header className="w-[50%] ">
          <h1 className="text-2xl font-bold"> Edit {name}</h1>
        </header>

        <section className="w-[50%] h-auto flex mt-3 gap-7 flex-col bg-[#E9F5FF] rounded-lg p-10">
          <div className="flex items-center">
            <b className="w-48">Name:</b>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
            />
          </div>

          <div className="flex items-center">
            <b className="w-48">Price:</b>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
            />
          </div>

          <div className="flex items-center">
            <b className="w-48">Status:</b>
            <Select
              options={statusOption}
              value={status}
              onChange={setStatus}
              className="w-full"
            />
          </div>
        </section>

        <div className="w-[50%] flex justify-between items-center mt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-red-500 rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
