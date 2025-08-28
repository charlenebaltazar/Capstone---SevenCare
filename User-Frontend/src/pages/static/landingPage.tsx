import Footer2 from "../../components/Footer2";
import Header from "../../components/Header";

export default function LandingPage() {
  return (
    <main className="flex flex-col w-full h-screen font-roboto bg-zinc-100">
      <Header active="home" />
      <section className="flex-1 flex w-full flex-row justify-center items-center gap-5">
        <aside className="flex-col flex gap-2 justify-center items-center w-52">
          <img src="/assets/icons/statoscope.png" />
          <button className="w-full py-2 bg-primary rounded-lg text-zinc-50">
            Make an Appointment
          </button>
        </aside>

        <h1 className="text-5xl leading-16">
          <span className="text-primary">THE MEDICAL CLINIC </span>
          <br />
          THAT YOU CAN
          <br />
          TRUST
        </h1>
      </section>
      <Footer2 />
    </main>
  );
}
