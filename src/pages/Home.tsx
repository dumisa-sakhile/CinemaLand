import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Meta from "@/components/Meta";

export default  function Home() {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/movie" />;
  }

  return (
    <>
      <Meta
        title="Cinema Land | Home"
        description="Discover new favorites, explore genres, and join a community of film enthusiasts. Your ultimate cinema destination, curated just for you."
        canonicalUrl="https://cinema-land.vercel.app/"
      />
      <motion.div
        className="flex flex-col items-center justify-start rounded-lg gap-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <section>
          <div>
            <div className="container flex flex-col items-center justify-center lg:min-h-screen overflow-auto px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-50 gap-8">
              <motion.h1
                className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-50 oswald-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-red-500"
                initial={{ scale: 2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}>
                Experience Cinema, Reimagined
              </motion.h1>
              <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-gray-50 roboto-condensed-light">
                Discover new favorites, explore genres, and join a community of
                film enthusiasts. Your ultimate cinema destination, curated just
                for you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/movie">
                  <Button>Let's Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
          <img
            src="https://source.unsplash.com/random/480x320"
            alt=""
            className="w-5/6 mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40"
          />
        </section>
      </motion.div>
    </>
  );
}
