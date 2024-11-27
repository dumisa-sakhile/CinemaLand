import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import Meta from "@/components/Meta";

const Signin = () => {

  return (
    <>
      <Meta
        title="Cinema Land | Log in"
        description="Discover new favorites, explore genres, and join a community of film enthusiasts. Your ultimate cinema destination, curated just for you."
        canonicalUrl="https://cinema-land.vercel.app/login"
      />
      <motion.div
        className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[500px] lg:min-h-screen lg:min-w-[500px] lg:py-0 min-w-[350px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <motion.div
          className="w-full bg-[#1C1917] border border-[#27272a] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 "
          initial={{ rotate: 340 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#FACC15] md:text-2xl text-center">
              Sign in to your account
            </h1>

            <div className="flex items-center justify-center">
              <button className="px-4 py-2 border flex gap-2 bg-slate-50 border-slate-700 rounded-lg text-gray-700 hover:border-slate-500 hover:text-gray-800 hover:bg-slate-300 hover:shadow transition duration-150">
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>

            <h6 className="text-sm font-light text-white w-full flex justify-center items-center gap-2">
              {" "}
              or login with email and password{" "}
            </h6>

            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-[#27272a] border border-gray-900 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-[#27272a] border border-gray-900 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800  accent-[#FACC15]"
                      required
                      checked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>

                <Link to="/reset-password">
                  <span className="text-sm hover:underline text-[#FACC15]">
                    Forgot password?
                  </span>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center">
                <Button type="submit">Sign in</Button>
              </div>
              <p className="text-sm font-light text-gray-400 w-full flex justify-center items-center gap-2">
                <span>Don’t have an account yet?</span>{" "}
                <Link to="/signup">
                  {" "}
                  <span className="font-medium  hover:underline text-[#FACC15]">
                    Sign up
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Signin;
