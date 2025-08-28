import Footer2 from "../../components/Footer2";
import Header from "../../components/Header";
import { whyChooseUs } from "../../data/data";

export default function About() {
  return (
    <main className="flex flex-col w-full h-screen font-roboto bg-zinc-100">
      <Header active="about" />
      <section className="flex-1 flex w-full flex-row justify-center items-center gap-14 relative">
        <div className="flex flex-col items-center absolute top-18">
          <h1 className="text-zinc-950 font-bold text-2xl">
            About <span className="text-primary">Us</span>
          </h1>
          <div className="h-1  w-1/2 bg-primary mt-2" />
        </div>

        <aside className="flex-col flex gap-2 justify-center items-center w-1/3 relative">
          <img src="/assets/images/doctor.png" className="w-76 z-10" />
          <div className="w-full py-2 bg-[#53C32A] rounded-lg text-zinc-50 h-16 absolute -bottom-3" />
        </aside>

        <div className="flex flex-col justify-center">
          <h2 className="mb-6 font-bold text-xl">Why Choose Us?</h2>

          <ol className="flex flex-col gap-3.5">
            {whyChooseUs.map((text, i) => (
              <li key={i} className="flex-row flex items-center">
                <img
                  src="/assets/icons/check.png"
                  alt="check-icon"
                  className="w-8"
                />
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Footer2 />
    </main>
  );
}
