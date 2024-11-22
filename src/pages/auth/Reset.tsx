import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {motion} from "framer-motion";


const Reset = () => {
  
 
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[600px] lg:min-h-screen lg:min-w-[500px] lg:py-0 min-w-[350px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      <motion.div
        className="w-full bg-[#1C1917] border border-[#27272a]  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
        initial={{ rotate: 340 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5 }}>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
            <span className="text-[#FACC15] ">Reset Password</span>
          </h1>
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
                className="bg-[#27272a] border border-gray-900 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 accent-[#FACC15]"
                  required
                  checked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-300">
                  I accept the{" "}
                  <a
                    className="font-medium text-[#FACC15] hover:underline"
                    href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <Button type="submit">Send reset link</Button>
            </div>
            <p className="text-sm font-light text-gray-400">
              Already have an account?{" "}
              <Link to="/login">
                <span className="font-medium text-[#FACC15] hover:underline">
                  Login here
                </span>
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reset;
