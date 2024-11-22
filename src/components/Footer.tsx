import {Link} from "react-router-dom";


const Footer = () => {
  return (
    <footer className=" w-[90%] lg:w-600px] shadow m-4 bg-[#1C1917] border border-[#27272a] rounded-lg">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © {new Date().getFullYear()}&nbsp;
          <Link to="/">
            <span className="hover:underline text-[#FACC15]">Cinema Land</span>
          </Link>
          . All Rights Reserved.
        </span>
        <span>
          Made with <span className="text-[#FACC15]">❤️</span>by{" "}
          <span className="hover:underline text-[#FACC15]">
            <a href="https://github.com/dumisa-sakhile" target="_blank">
              Dumisa
            </a>
          </span>
        </span>
      </div>
    </footer>
  );
}

export default Footer