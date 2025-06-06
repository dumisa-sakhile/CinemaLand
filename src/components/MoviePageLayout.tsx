import { useState } from "react";
import { Outlet } from "react-router-dom";
import MovieNavigation from "./MovieNavigation";
import { motion } from "framer-motion";
import OutdatedModal from "./OutdatedModal";

const MoviePageLayout = () => {
  const [showModal, setShowModal] = useState(true);

  // Optional: Prevent modal from being closed
  // Remove the onClose prop from OutdatedModal if you want it to always show

  return (
    <motion.div
      className="min-w-full min-h-screen text-[#F2F2F2] roboto-condensed-regular flex items-center justify-center rounded-lg gap-6"
      initial={{ scale: 2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}>
      {showModal && <OutdatedModal onClose={() => setShowModal(false)} />}
      <MovieNavigation />
      <main className="lg:fixed lg:left-0 lg:top-0 w-full h-screen flex flex-col items-start justify-start p-4 pl-[130px] bg-[#1C1917] bg-opacity-100">
        <Outlet />
      </main>
    </motion.div>
  );
};

export default MoviePageLayout;
