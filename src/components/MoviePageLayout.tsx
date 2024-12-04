import { Outlet } from "react-router-dom"
import MovieNavigation from "./MovieNavigation";
import { motion } from "framer-motion"

const MoviePageLayout = () => {
  const backgroundList: string[] = [
    "https://image.tmdb.org/t/p/original//dvBCdCohwWbsP5qAaglOXagDMtk.jpg",
    "https://image.tmdb.org/t/p/original//9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
    "https://image.tmdb.org/t/p/original//euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
    "https://image.tmdb.org/t/p/original//c6nouvFYnmNO50WQDLcKMI3p0jA.jpg",
    "https://image.tmdb.org/t/p/original//iYLKMV7PIBtFmtygRrhSiyzcVsF.jpg",
    "https://image.tmdb.org/t/p/original//nazLAYvFewST34QMueOq4MlYKoc.jpg",
  ];
  return (
    <motion.div
      className="min-w-full min-h-screen text-[#F2F2F2] roboto-condensed-regular flex  items-center justify-center rounded-lg gap-6 "
      initial={{ scale: 2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}>
      <img
        src={backgroundList[Math.floor(Math.random() * backgroundList.length)]}
        alt="backdrop image"
        className="w-full h-screen fixed top-0 left-0 -z-0"
      />
      <MovieNavigation />

      <main className="lg:fixed lg:left-0 lg:top-0 w-full h-screen flex flex-col items-start justify-start p-4  pl-[130px] bg-[#1C1917] bg-opacity-85">
        <Outlet />
      </main>
    </motion.div>
  );
}

export default MoviePageLayout