import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";

export default function ViewReceipt() {
  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-bg-color text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full w-full p-5 flex flex-col justify-center items-center">
        <header className="flex justify-end w-[50%]">
          <button className="bg-[#458FF6] rounded-lg px-5 py-1 font-bold text-white cursor-pointer">
            Download Receipt
          </button>
        </header>

        <section className="w-[50%] flex-1 flex items-center mt-3 flex-col bg-[#E9F5FF] rounded-lg p-10">
          <h1 className="font-bold text-2xl">Payment Receipt</h1>

          <span className="py-3 px-5 border-y border-y-black w-full flex justify-between items-center my-10">
            <h3 className="text-xl">Description</h3>
            <h3 className="text-xl">Amount</h3>
          </span>

          <div className="w-full h-full flex flex-col justify-between items-center px-5">
            <ol className="flex flex-col w-full gap-2">
              <li className="flex w-full justify-between items-center font-bold">
                <label>Consultation Fee</label>
                <p>₱100.00</p>
              </li>
            </ol>

            <div className="w-full flex flex-col gap-3">
              <p>
                <b>Bill To:</b> <i>John Doe</i>
              </p>
              <p>
                <b>Payment Method</b> <i>Pay in Cash</i>
              </p>
              <p>
                <b>Date Paid:</b> <i>January 10, 2025</i>
              </p>
            </div>

            <i>Thank you for your payment!</i>
          </div>
        </section>
      </div>
    </main>
  );
}
