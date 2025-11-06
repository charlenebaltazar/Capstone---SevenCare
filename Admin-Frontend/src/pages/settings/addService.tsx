import { useState, type FormEvent } from "react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import Select, { type SingleValue } from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";

const statusOption = [
  { value: "Available", label: "Available" },
  { value: "Not Available", label: "Not Available" },
];

type OptionType = {
  value: string;
  label: string;
};

function AddService() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState<SingleValue<OptionType>>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_DOMAIN}/api/v1/services/add`,
        {
          name,
          price,
          status: status?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log("✅ Service created:", res.data);
      navigate(-1);
    } catch (err) {
      console.error("❌ Error creating service:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2
        header="Service"
        description="Add services that your clinic offers."
      />
      <Sidebar />
      <div className="h-full w-full p-5 pb-0 flex-1 min-h-0 flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="h-full w-full p-5 flex flex-col justify-center items-center"
        >
          <section className="w-[50%] h-auto flex mt-3 gap-7 flex-col bg-[#E9F5FF] rounded-lg p-10">
            <div className="flex items-center">
              <b className="w-48">Name:</b>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Service Name"
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
              className="bg-red-500 rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer flex justify-center w-40"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Service"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddService;
