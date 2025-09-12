import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";

export default function ViewMedicalRecord() {
  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-bg-color text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full w-full p-5 flex flex-col justify-center items-center">
        <header className="flex justify-end w-[50%]">
          <button className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer">
            Download Medical Record
          </button>
        </header>

        <section className="w-[50%] flex-1 flex items-center mt-3 flex-col bg-[#E9F5FF] rounded-lg p-10">
          <h1 className="font-bold text-2xl">Medical Record</h1>
          <p className="italic text-justify my-5 text-lg">
            The following information is a comprehensive medical record of the
            patient, intended for professional use only.
          </p>

          <h2 className=" font-bold text-lg py-3 border-y border-y-black w-full flex justify-center items-center my-10">
            Patient Information
          </h2>

          <div className="w-full flex flex-col gap-3">
            <p>
              <b>Name:</b>
            </p>
            <p>
              <b>Date of Birth:</b>
            </p>
            <p>
              <b>Contact Number:</b>
            </p>
            <p>
              <b>Email:</b>
            </p>
            <p className="h-24">
              <b>Address:</b>
            </p>
            <p>
              <b>Diagnosis / Medical History:</b>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}