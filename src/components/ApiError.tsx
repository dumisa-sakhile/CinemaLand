import {motion} from "framer-motion";


const ApiError = ({error}: {error: any}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-start rounded-lg gap-6"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <section>
        <div>
          <div className="container flex flex-col items-center justify-center lg:min-h-[50%] px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-50 gap-8 ">
            <motion.h1
              className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-[#FACC15] oswald-bold "
              initial={{ scale: 2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}>
              Ooh no, Something went wrong
            </motion.h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-white roboto-condensed-light">
            Error: {error}
            </p>
           
          </div>
        </div>
    
      </section>
    </motion.div>
  );
}

export default ApiError