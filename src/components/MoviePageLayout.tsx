import { Outlet } from "react-router-dom"
import MovieNavigation from "./MovieNavigation";
import { motion } from "framer-motion"

const MoviePageLayout = () => {
  return (
    <motion.div
      className="min-w-full min-h-screen text-[#F2F2F2] roboto-condensed-regular flex  items-center justify-center rounded-lg gap-6 "
      initial={{ scale: 2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}>
      <MovieNavigation />


      <main className="bg-none lg:fixed lg:left-0 lg:top-0 w-full h-screen flex flex-col items-start justify-start p-4  pl-[100px] rounded-lg   bg-black">
        <Outlet />
      </main>
    </motion.div>
  );
}

export default MoviePageLayout