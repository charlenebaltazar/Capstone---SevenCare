import Footer2 from "../../components/Footer2";
import Header from "../../components/Header";

export default function Services() {
  return (
    <main className="flex flex-col w-full h-auto font-roboto pt-18 bg-bg-color">
      <Header active="services" />
      <section className="h-screen flex w-full flex-col items-center gap-3 relative">
        <div className="flex flex-col items-center">
          <h1 className="text-zinc-950 font-bold text-2xl">
            Our <span className="text-primary">Services</span>
          </h1>
          <div className="h-1  w-1/2 bg-primary mt-2" />
        </div>

        <h2 className="font-semibold w-1/2 text-center text-sm">
          We provide to you the best choices for you. Adjust it to your health
          needs and make sure your undergo treatment with our highly qualified
          doctors you can consult with us which type of service is suitable for
          your health
        </h2>

        <section className="grid grid-cols-3 grid-rows-3 gap-3 w-1/2 mt-2">
          {Array.from({ length: 9 }, (_, i) => (
            <div className="flex justify-center items-center">
              <img
                key={i}
                src={`/assets/images/service${i + 1}.png`}
                className="w-3/4"
              />
            </div>
          ))}
        </section>
      </section>
      <Footer2 />
    </main>
  );
}
