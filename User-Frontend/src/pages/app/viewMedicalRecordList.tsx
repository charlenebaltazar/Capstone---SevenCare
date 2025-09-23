import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import type { IMedicalRecord } from "../../@types/interface";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import dayjs from "dayjs";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function ViewMedicalRecordList() {
  const [selectedRecord, setSelectedRecord] = useState("");
  const [showDeleteRecordModal, setShowDeleteRecordModal] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState<IMedicalRecord[]>([
    {
      _id: "dummy123",
      appointmentId: "appt123",
      status: "Completed",
      diagnosis: "Mild fever, prescribed paracetamol",
      createdAt: new Date("2025-09-01T10:30:00Z"),
    },
    {
      _id: "dummy456",
      appointmentId: "appt456",
      status: "Pending",
      diagnosis: "Check-up scheduled",
      createdAt: new Date("2025-09-05T14:00:00Z"),
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_DOMAIN}/api/v1/medical-records`,
          { withCredentials: true },
        );
        setMedicalRecords(response.data.data);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-bg-color text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full  w-full p-5">
        <form className="flex  flex-col w-full h-full flex-1 mt-3">
          <h1 className="font-bold text-2xl">My Medical Records</h1>
          <header className="grid grid-cols-4 mt-3 font-semibold">
            <h3>Reference Id</h3>
            <h3>Date and Time</h3>
            <h3>Status</h3>
            <h3>Action</h3>
          </header>

          <section className="flex flex-col gap-1 h-full w-full overflow-y-auto relative">
            {/* Delete Appointment Modal */}
            {selectedRecord && showDeleteRecordModal && (
              <DeleteRecordModal
                selectedRecord={selectedRecord}
                setSelectedRecord={setSelectedRecord}
                setShowDeleteRecordModal={setShowDeleteRecordModal}
              />
            )}

            {loading ? (
              <Loading />
            ) : (
              medicalRecords.map((record, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 mt-3 bg-primaryLight/15 rounded-xl p-3"
                >
                  <p>{record._id}</p>
                  <p>{dayjs(record.createdAt).format("MM/DD/YY, h:mm A")}</p>
                  <p>{record.status}</p>
                  <div className="flex gap-4 items-center">
                    <Link
                      to={`/medical-records/${record._id}`}
                      className="cursor-pointer"
                    >
                      <img
                        src="/assets/icons/print.png"
                        alt=""
                        className="w-5"
                      />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRecord(record._id);
                        setShowDeleteRecordModal(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Trash2 className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        </form>
      </div>
    </main>
  );
}

function DeleteRecordModal({
  selectedRecord,
  setSelectedRecord,
  setShowDeleteRecordModal,
}: {
  selectedRecord: string;
  setSelectedRecord: React.Dispatch<React.SetStateAction<string>>;
  setShowDeleteRecordModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log("selected appointment: ", selectedRecord);

  return (
    <dialog className="h-auto w-[40%] flex-col flex p-8 rounded-lg bg-[#E9F5FF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5">
      <div className="flex justify-center items-center gap-5">
        <img src="/assets/icons/trash.png" alt="" />
        <p className="italic">
          Are you sure you want to delete this medical record?
        </p>
      </div>
      <div className="flex justify-end items-center gap-5">
        <button className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer">
          OK
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedRecord("");
            setShowDeleteRecordModal(false);
          }}
          className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
