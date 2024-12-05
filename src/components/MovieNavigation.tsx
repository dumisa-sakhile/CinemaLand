import { NavLink } from "react-router-dom";
import Logo from "/blob.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  SignedIn,
  UserButton,
  useUser,
  useClerk
} from "@clerk/clerk-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";




const MovieNavigation = () => {
  const { user } = useUser();
  const { signOut, openSignIn, openUserProfile } = useClerk();

  useEffect(() => {
    if(user){
      toast.success(`Welcome to Cinema Land ${user?.fullName}`);
    }else{
      toast.warning(`Please sign in to access the Movie details page`);
    }
  }, [user]);


  return (
    <>
      <motion.nav
        className="fixed left-0 md:left-4 top-0  md:top-auto w-[70px] h-screen md:h-[90%] z-40 flex flex-col items-center justify-center bg-[#1C1917] bg-opacity-50 border border-[#27272a]"
        initial={{ scale: 2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Home */}
        <Tippy content="Go to Home" placement="right">
          <Link to="/movie">
            <div className="w-full -ml-4 absolute top-10  items-center justify-start text-lg flex  hover:scale-110">
              <img src={Logo} alt="Cinema Land" className="h-10 w-10" />
            </div>
          </Link>
        </Tippy>

        <header className="flex flex-col gap-8 p-4 roboto-condensed-regular capitalize text-[.9rem]  rounded-md">
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
                <i className="fi fi-rr-bomb text-lg"></i>
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
                <i className="fi fi-rr-fire-flame-curved text-lg"></i>
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
                <i className="fi fi-rs-medal text-lg"></i>
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
                <i className="fi fi-rr-calendar text-lg"></i>
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
                <i className="fi fi-ts-play-circle text-lg"></i>
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
                <i className="fi fi-ts-url text-lg"></i>
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
                <i className="fi fi-bs-filter-list text-lg"></i>
              </NavLink>
            </nav>
          </Tippy>
        </header>

        {!user && (
          <>
            <Tippy content="Sign In" placement="right">
              <footer
                className=" absolute bottom-10 flex items-center gap-2 justify-center cursor-pointer  hover:bg-opacity-100 w-[100px] h-[50px] text-lg inter-regular"
                onClick={() => openSignIn()}>
                <i className="fi fi-rs-sign-in-alt"></i>
              </footer>
            </Tippy>

            <footer
              className=" fixed top-5 right-10 hidden md:flex items-center gap-2 justify-center cursor-pointer  hover:bg-opacity-100 w-[100px] h-[50px] text-sm oswald-regular  rounded-md"
              onClick={() => openSignIn()}>
              <Button>Sign In</Button>
            </footer>
          </>
        )}

        {user && (
          <>
            <Tippy content="Profile Menu" placement="right">
              <footer
                className=" absolute bottom-10 flex items-center flex-col gap-2 justify-center cursor-pointer  hover:bg-opacity-100 w-[100px] h-[90px] text-sm inter-regular  rounded-md"
                onClick={() => openUserProfile()}>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </footer>
            </Tippy>

            <AlertDialog>
              <AlertDialogTrigger>
                <footer className=" fixed top-5 right-10 hidden md:flex items-center gap-2 justify-center cursor-pointer  hover:bg-opacity-100 w-[100px] h-[50px] text-sm oswald-regular">
                  <Button>Sign out</Button>
                </footer>
              </AlertDialogTrigger>
              <AlertDialogContent className="dark-mode">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to sign out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be signed out of your account and will have to log
                    in again to access all pages.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => signOut()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </motion.nav>
    </>
  );
};

export default MovieNavigation;
