
import { Link } from "react-router-dom";
import Logo from "/blob.svg";
import {
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <div className="hidden md:flex justify-center pt-4 roboto-condensed-regular">
      <header className=" min-w-[90vw]  min-h-[50px] flex justify-between items-center px-4 rounded-lg md:fixed md:top-10 ">
        <Link to="/">
          <div className=" gap-5 items-center justify-center text-lg hidden md:flex">
            <img src={Logo} alt="Cinema Base" className="h-10 w-10" />
            <h6 className="oswald-light">Cinema Land</h6>
          </div>
        </Link>
        <nav className="flex gap-20 *:uppercase text-sm">
          <SignedOut>
            <Button>
              <SignInButton mode="modal"/>
            </Button>
          </SignedOut>
        </nav>
      </header>
    </div>
  );
}

export default Header