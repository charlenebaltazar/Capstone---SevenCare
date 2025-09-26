import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-primary h-[10%] flex flex-col justify-center font-roboto text-zinc-200 items-center py-3">
      <div>
        <Link to={"/about"}>About</Link> |{" "}
        <Link to={"/contact-us"}>Contact</Link>
      </div>
      <p>© Baltazar, Caayao, Celestra, Dabalos, Dizon, Lavitoria</p>
    </footer>
  );
}
