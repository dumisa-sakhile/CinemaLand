import { NavLink } from "react-router-dom";
import Logo from "/blob.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faStar,
  faFire,
  faBomb,
  faPlay,
  faCalendarCheck,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";




const MovieNavigation = () => {
  const { user } = useUser();

  useEffect(() => {
    if(user){
      toast.success(`Welcome to Cinema Base ${user.fullName}`);
    }else{
      toast.warning(`Please sign in to access the Movie details page`);
    }
  }, [user]);


  return (
    <>
      <motion.nav
        className="bg-[#1C1917] border border-[#27272a] fixed left-10 bottom-4  w-[60px] h-[90%] z-40  rounded-md"
        initial={{ scale: 2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Home */}
        <Tippy content="Go to Home" placement="right">
          <Link to="/movie">
            <div className=" gap-5 items-center justify-start text-lg flex pt-4 pl-4 hover:scale-110">
              <img src={Logo} alt="Cinema Base" className="h-10 w-10" />
            </div>
          </Link>
        </Tippy>

        <header className="flex flex-col gap-8 p-4 roboto-condensed-regular capitalize pt-10 text-[.9rem]">
          <Tippy content="Discover Movies" placement="right">
            <nav className="flex items-center justify-start gap-4 hover:scale-110">
              <NavLink
                to="/movie"
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }
                end>
                <FontAwesomeIcon icon={faBomb} size="lg" />
              </NavLink>
            </nav>
          </Tippy>

          <Tippy content="Popular Movies" placement="right">
            <nav className="flex items-center justify-start gap-4 hover:scale-110">
              <NavLink
                to="/movie/popular"
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }>
                <FontAwesomeIcon icon={faFire} size="lg" />
              </NavLink>
            </nav>
          </Tippy>

          <Tippy content="Top Rated Movies" placement="right">
            <nav className="flex items-center justify-start gap-4 hover:scale-110">
              <NavLink
                to="/movie/top-rated"
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }>
                <FontAwesomeIcon icon={faStar} size="lg" />
              </NavLink>
            </nav>
          </Tippy>

          <Tippy content="Upcoming Movies" placement="right">
            <nav className="flex items-center justify-start gap-4 hover:scale-110">
              <NavLink
                to="/movie/upcoming"
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }>
                <FontAwesomeIcon icon={faCalendarCheck} size="lg" />
              </NavLink>
            </nav>
          </Tippy>

          <Tippy content="Now Playing Movies" placement="right">
            <nav className="flex items-center justify-start gap-4 hover:scale-110">
              <NavLink
                to="/movie/now-playing"
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }>
                <FontAwesomeIcon icon={faPlay} size="lg" />
              </NavLink>
            </nav>
          </Tippy>

          <Tippy content="Search for Movies" placement="right">
            <nav className="flex items-center justify-start gap-4 hover:scale-110">
              <NavLink
                to="/movie/search"
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                {/* <span>search</span> */}
              </NavLink>
            </nav>
          </Tippy>

          <Tippy content="Filter Movies by Genre" placement="right">
            <nav className="flex items-center justify-start gap-4 hover:scale-110">
              <NavLink
                to="/movie/genre-filters"
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }>
                <FontAwesomeIcon icon={faFilter} size="lg" />
              </NavLink>
            </nav>
          </Tippy>
        </header>

        <Tippy content={user ? `Hello, ${user.fullName}` : "Sign In"} placement="right">
          <footer className="flex items-center justify-center absolute bottom-10 cursor-pointer  hover:scale-110 w-full">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </footer>
        </Tippy>
      </motion.nav>
    </>
  );
};

export default MovieNavigation;
