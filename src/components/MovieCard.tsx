import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import posterFallback from "/poster.png?url";

interface MovieType {
  id: string;
  title: string;
  releaseDate: Date;
  voteCount: number;
  rating: number;
  poster: string;
}
const MovieCard = ({
    id,
  title,
  releaseDate,
  voteCount,
  rating,
  poster,
}: MovieType) => {
  return (
    <Link to={`/movie/${id}`}>
      <motion.article
        className="relative w-[198px] min-h-[420px] text-center  rounded-sm  inter-regular hover:animate-pulse "
        whileHover={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <img
          loading="lazy"
          className="w-[198px] h-[319px] rounded-lg"
          src={
            poster
              ? `https://image.tmdb.org/t/p/w500/${poster}`
              : posterFallback
          }
        />

        <div className="w-full h-[144px]  rounded-b-md grid grid-rows-3 justify-start items-start p-2 gap-4 pb-6">
          <h6 className="text-gray-40 text-md  text-left overflow-hidden whitespace-nowrap text-ellipsis w-full text-gray-300">
            {title}
          </h6>

          <aside className=" text-gray-300 text-sm p-1 flex gap-2 items-center">
            {`${rating} (${voteCount})`}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#B89230">
              <path d="M480-320q48 0 85.5-28.5T620-422H340q17 45 54.5 73.5T480-320ZM380-480q25 0 42.5-17.5T440-540q0-25-17.5-42.5T380-600q-25 0-42.5 17.5T320-540q0 25 17.5 42.5T380-480Zm200 0q25 0 42.5-17.5T640-540q0-25-17.5-42.5T580-600q-25 0-42.5 17.5T520-540q0 25 17.5 42.5T580-480ZM305-704l112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
            </svg>
          </aside>
          <span className="text-gray-300 text-sm flex gap-2 items-center">
            {new Date(releaseDate)?.toLocaleDateString()}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#48752C">
              <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm0 200q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Z" />
            </svg>
          </span>
        </div>
      </motion.article>
    </Link>
  );
};

export default MovieCard