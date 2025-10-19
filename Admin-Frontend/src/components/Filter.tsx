import Select, { type MultiValue, type SingleValue } from "react-select";
import { Funnel } from "lucide-react";

const medicalServices = [
  { value: "Consultation", label: "Consultation" },
  { value: "Vaccination", label: "Vaccination" },
  { value: "Medical Certificate", label: "Medical Certificate" },
  { value: "Laboratory", label: "Laboratory" },
  { value: "Holistic Care", label: "Holistic Care" },
  { value: "Circumcision/TULI", label: "Circumcision/TULI" },
  { value: "Medical Check Up", label: "Medical Check Up" },
  { value: "Prenatal Check Up", label: "Prenatal Check Up" },
  { value: "Family Planning", label: "Family Planning" },
];

const statusOption = [
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
  { value: "No Show", label: "No Show" },
  { value: "Cancel", label: "Cancelled" },
  { value: "Approved", label: "Ongoing" },
];

type OptionType = {
  value: string;
  label: string;
};

export function PendingFilter({
  activeFilter,
  setActiveFilter,
  date,
  setDate,
  services,
  setServices,
  fetchAppointments,
}: {
  activeFilter: boolean;
  date: string;
  services: MultiValue<OptionType>;
  setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setServices: React.Dispatch<React.SetStateAction<MultiValue<OptionType>>>;
  fetchAppointments: () => Promise<void>;
}) {
  return (
    <div
      className={`flex absolute -top-18 z-50 transition-all duration-150 ease-in-out ${
        activeFilter ? "-right-10" : "-right-86"
      }`}
    >
      <button
        onClick={() => setActiveFilter((prev) => !prev)}
        className="border border-l border-r-0 rounded-l-full p-3 bg-white cursor-pointer h-14 absolute -left-12"
      >
        <Funnel />
      </button>

      <section className="border flex flex-col p-3 bg-white w-76 gap-2">
        <h3 className="font-bold text-2xl mb-1">Filter</h3>
        <div className="flex gap-9 items-center">
          <label htmlFor="filter-date">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            className="px-2 py-0.5 outline-none border border-zinc-300 rounded-md w-full"
          />
        </div>

        <div className="flex gap-5 items-center">
          <label htmlFor="filter-date">Service</label>
          <Select
            isMulti
            options={medicalServices}
            value={services}
            onChange={setServices}
            className="w-full"
          />
        </div>

        <div className="flex gap-5 items-center justify-end mt-1 pr-1">
          <button
            onClick={() => {
              fetchAppointments();
              setActiveFilter((prev) => !prev);
            }}
            className="bg-primary px-2 py-0.5 rounded-lg text-white font-bold cursor-pointer"
          >
            Apply Filter
          </button>
          <button
            onClick={() => {
              setDate("");
              setServices([]);
              fetchAppointments();
              setActiveFilter((prev) => !prev);
            }}
            className="text-primary font-bold cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      </section>
    </div>
  );
}

export function AllFilter({
  activeFilter,
  setActiveFilter,
  date,
  setDate,
  status,
  setStatus,
  services,
  setServices,
  fetchAppointments,
}: {
  activeFilter: boolean;
  date: string;
  status: SingleValue<OptionType>;
  services: MultiValue<OptionType>;
  setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setServices: React.Dispatch<React.SetStateAction<MultiValue<OptionType>>>;
  setStatus: React.Dispatch<React.SetStateAction<SingleValue<OptionType>>>;
  fetchAppointments: () => Promise<void>;
}) {
  return (
    <div
      className={`flex absolute -top-18 z-50 transition-all duration-150 ease-in-out ${
        activeFilter ? "-right-10" : "-right-86"
      }`}
    >
      <button
        onClick={() => setActiveFilter((prev) => !prev)}
        className="border border-l border-r-0 rounded-l-full p-3 bg-white cursor-pointer h-14 absolute -left-12"
      >
        <Funnel />
      </button>

      <section className="border flex flex-col p-3 bg-white w-76 gap-2">
        <h3 className="font-bold text-2xl mb-1">Filter</h3>
        <div className="flex gap-9 items-center">
          <label htmlFor="filter-date">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date"
            id="date"
            className="px-2 py-1 outline-none border border-zinc-300 rounded-md w-full"
          />
        </div>

        <div className="flex gap-7 items-center">
          <label htmlFor="filter-date">Status</label>
          <Select
            options={statusOption}
            value={status}
            onChange={setStatus}
            className="w-full"
          />
        </div>

        <div className="flex gap-5 items-center">
          <label htmlFor="filter-date">Service</label>
          <Select
            isMulti
            options={medicalServices}
            value={services}
            onChange={setServices}
            className="w-full"
          />
        </div>

        <div className="flex gap-5 items-center justify-end mt-1 pr-1">
          <button
            onClick={() => {
              fetchAppointments();
              setActiveFilter((prev) => !prev);
            }}
            className="bg-primary px-2 py-0.5 rounded-lg text-white font-bold cursor-pointer"
          >
            Apply Filter
          </button>
          <button
            onClick={() => {
              setDate("");
              setServices([]);
              setStatus(null);
              fetchAppointments();
              setActiveFilter((prev) => !prev);
            }}
            className="text-primary font-bold cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      </section>
    </div>
  );
}
