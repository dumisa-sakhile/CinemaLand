import { motion } from "framer-motion";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom"
import Meta from "@/components/Meta";
const NotFound = () => {
 
  return (
    <>
      <Meta
        title="Not Found"
        description="Cinema Land - The ultimate destination for movie reviews, ratings, and recommendations. Discover your next favorite film now!"
        canonicalUrl={`https://cinema-land.vercel.app/404`}
      />
      <motion.div
        className="flex flex-col items-center justify-start rounded-lg gap-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <section>
          <div>
            <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32text-gray-50 gap-8">
              <motion.h1
                className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl oswald-bold text-[#FACC15]"
                initial={{ scale: 2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}>
                Oops, Page Not Found
              </motion.h1>

              <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-gray-50 roboto-condensed-regular">
                It seems you&apos;re lost in Cinema Land.The page you are
                looking for was not found.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/movie">
                  <Button className="py-4 px-8">Go Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}

export default NotFound