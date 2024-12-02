import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMoviesCategory } from "@/components/Api";
import MovieCard from "@/components/MovieCard";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import MovieFooter from "@/components/MovieFooter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import { motion } from "framer-motion";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Meta from "@/components/Meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const MovieCategory = () => {
  const [searchParams, _] = useSearchParams();
  const {category, categoryId} = useParams();
  const navigate = useNavigate();
  

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(9);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", category, categoryId, pageNumber],
    queryFn: () => getMoviesCategory(pageNumber, category, categoryId),
    placeholderData: keepPreviousData,
  });

useEffect(() => {
  if (data) {
    setTotalPages(data.total_pages);
    toast.success(`Movie Category filtered by the ${searchParams.get("type")} of
            ${searchParams.get("name")}`);
  }
}, [data]);

useEffect(() => {
  if (isLoading) {
    toast.info("Loading data...");
  }
}, [isLoading]);

useEffect(() => {
  if (isError) {
    toast.error(`Error loading data:  ${error.message}`);
  }
}, [isError, error]);


  return (
    <>
      <Meta
        title={`${searchParams.get("name")} ${searchParams.get("type")} movies`}
        description="Discover your next favorite movie! Cinema Land is your ultimate destination for movie reviews, ratings, and recommendations. Explore now!"
        canonicalUrl={`https://cinema-land.vercel.app/movie/${category}/${categoryId}?type=${searchParams.get(
          "type"
        )}`}
      />
      <motion.div
        className="absolute top-0 flex flex-col gap-4 w-full h-screen items-center overflow-auto py-4 pb-0 pt-[35px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>

        <aside className="fixed top-0 flex flex-row gap-2 items-center justify-center w-full rounded bg-black z-10 py-4">
          <h1 className="text-md font-bold text-[#FACC15] oswald-regular pt-4">
            Movie Category filtered by the {searchParams.get("type")} :&nbsp;
            {searchParams.get("name")}
          </h1>

          {/* home and back */}
          <div className="flex gap-4 w-[100px] absolute top-4 left-4">
            <Button className="w-full" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHouse} />
              <span className="text-lg oswald-regular">Home</span>
            </Button>
            <Button
              className="w-full bg-transparent"
              variant="outline"
              onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faBackward} />
              <span className="text-lg oswald-regular">Back</span>
            </Button>
          </div>
        </aside>

        <main className="flex flex-row flex-wrap gap-10 min-w-full   p-10 pb-[40px]  rounded-lg justify-center items-center bg-[#000000] ">
          {isLoading && <Skeleton />}
          {isError && <ApiError error={error.message} />}

          {data?.results.map((movie: any) => (
            <MovieCard
              key={movie.id}
              voteCount={movie.vote_count}
              id={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
              poster={movie.poster_path}
            />
          ))}
        </main>
        {/* Display popular movies */}

        <div className="relative z-20 w-full flex items-center justify-center bg-black py-20">
          <MovieFooter />
        </div>

        {/* Pagination */}
        {!isError && !isLoading && (
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            setPageNumber={setPageNumber}
          />
        )}
        {/* Pagination */}
      </motion.div>
    </>
  );
};

export default MovieCategory;
