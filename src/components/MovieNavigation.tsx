import { NavLink } from "react-router-dom";
import Logo from "/blob.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  faStar,
  faFire,
  faBomb,
  faPlay,
  faCalendarCheck,
  faFilter,
  faFilePen,
  faBookmark,
  faRightFromBracket,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";



const MovieNavigation = () => {
  return (
    <>
      <motion.nav
        className="bg-[#1C1917] border border-[#27272a] fixed left-10 bottom-4  w-[60px] h-[90%] z-40  rounded-md"
        initial={{ scale: 2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Home */}
        <Tippy content="Go to Home" placement="right">
          <Link to="/">
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

        <Drawer>
          <DrawerTrigger>
            {" "}
            <Tippy content="Profile Menu" placement="right">
              <footer className="flex items-center justify-center absolute bottom-10 cursor-pointer  hover:scale-110 w-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </footer>
            </Tippy>
          </DrawerTrigger>
          <DrawerContent className=" bg-black border-none text-white bg-opacity-75">
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
              <nav className="flex flex-col items-center justify-center gap-4 w-full">
                <ul
                  id="dropdownMenu"
                  className="shadow-lg bg-[#1C1917] border border-[#27272a] text-white py-2  rounded-lg max-h-96 overflow-auto w-[300px] roboto-condensed-light">
                  <li className="py-6 px-5 flex items-center text-white text-md border-b border-b-[#27272a]">
                    Profile Menu, Sakhile Dumisa
                  </li>

                  <li className="py-4 px-5 flex items-center hover:bg-[#27272a] text-white text-md cursor-pointer gap-8">
                    <FontAwesomeIcon icon={faFilePen} />
                    Edit Profile
                  </li>

                  <li className="py-4 px-5 flex items-center hover:bg-[#27272a] text-white text-md cursor-pointer gap-8">
                    <FontAwesomeIcon icon={faBookmark} />
                    My Favorites
                  </li>

                  <li className="py-4 px-5 flex items-center hover:bg-[#27272a] text-white text-md cursor-pointer gap-8">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    Support
                  </li>

                  <li className="py-4 px-5 flex items-center hover:bg-[#27272a] text-white text-md cursor-pointer gap-8">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Logout
                  </li>
                </ul>
              </nav>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose></DrawerClose>
              <p className="roboto-condensed-light w-full text-center py-8">All rights reserved © {new Date().getFullYear()} <span className="hover:underline text-[#FACC15]">Cinema Land</span></p>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </motion.nav>
    </>
  );
};

export default MovieNavigation;
