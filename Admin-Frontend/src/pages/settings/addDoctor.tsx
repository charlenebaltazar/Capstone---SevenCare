import { useState, type FormEvent } from "react";
import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";

function AddDoctor() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_DOMAIN}/api/v1/doctors/add`,
        {
          name,
          specialization,
          schedule,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log("✅ Doctor added:", res.data);
      navigate(-1);
    } catch (err) {
      console.error("❌ Error adding doctor:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col w-full h-screen font-roboto pl-80 p-4 bg-bg-color text-zinc-900 overflow-hidden">
      <Header2 header="Doctors" description="Add doctors and their schedule." />
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
                placeholder="Doctor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
              />
            </div>

            <div className="flex items-center">
              <b className="w-48">Specialization:</b>
              <input
                type="text"
                name="specialization"
                id="specialization"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
              />
            </div>

            <div className="flex items-center">
              <b className="w-48">Available Date & Time:</b>
              <input
                type="datetime-local"
                name="schedule"
                id="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="border border-zinc-400 rounded-lg outline-none px-2 py-1 w-full bg-white"
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
              className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer w-40 flex justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Add Doctor"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddDoctor;
