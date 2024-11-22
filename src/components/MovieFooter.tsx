import { Link } from "react-router-dom";

const MovieFooter = () => {
  return (
    <footer className="bg-[#1C1917] border-[#27272a] rounded-lg shadow m-4 border ">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between gap-2">
        <span className="text-sm sm:text-center text-white">
          © {new Date().getFullYear()}{" "}
          <span className="hover:underline text-[#FACC15]">
            <Link to="/">Cinema Land</Link>
          </span>
          . All Rights Reserved.{" "}
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0 gap-2">
          <li>
            API powered by{" "}
            <a
              href="http://www.themoviedb.org/"
              className="hover:underline text-[#FACC15]"
              target="_blank">
              TMDB
            </a>.
          </li>
          <li>
            Developed by{" "}
            <a
              href="https:github.com/dumisa-sakhile"
              className="hover:underline text-[#FACC15]"
              target="_blank">
              Dumisa
            </a>.
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default MovieFooter