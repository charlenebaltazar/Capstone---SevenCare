import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CustomInput from "../../components/CustomInput";

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 bg-bg-color">
      <Header active="contactUs" />
      <section className="flex flex-col flex-1 w-full items-center">
        <div className="flex flex-col items-center top-18">
          <h1 className="text-zinc-950 font-bold text-2xl">
            Contact <span className="text-primary">Us</span>
          </h1>
          <div className="h-1  w-1/2 bg-primary mt-2" />
        </div>

        <h2 className="font-semibold w-1/2 text-center mt-3 text-sm">
          Not sure where to begin? Our team at SevenCare is here to assist you
          with care and compassion. We’re happy to listen, answer your
          questions, and guide you to the right medical services based on your
          needs.
        </h2>

        <form className="w-1/3 bg-primaryLight/30 h-auto p-3 mt-4 flex flex-col justify-center gap-2.5 rounded-lg">
          <CustomInput
            type="text"
            name="fullName"
            state={fullName}
            stateSetter={setFullName}
            placeholder="Full Name"
          />

          <CustomInput
            type="email"
            name="email"
            state={email}
            stateSetter={setEmail}
            placeholder="Email"
          />

          <p className="font-bold text-sm">What can we help you with?</p>

          <textarea
            name="content"
            id="content"
            rows={5}
            placeholder="Type your message here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-zinc-100 border rounded-lg outline-none px-2 py-0.5 focus:border-primary transition-colors border-zinc-400 resize-none"
          />

          <button
            type="submit"
            className="px-3 py-0.5 bg-primary rounded-lg text-zinc-100 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}