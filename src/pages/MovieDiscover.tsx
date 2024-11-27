import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/components/Api";
import MovieCard from "@/components/MovieCard";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import MovieFooter from "@/components/MovieFooter";
import { toast } from "sonner";
import Pagination from "@/components/Pagination";
import { motion } from "framer-motion";
import Meta from "@/components/Meta";

const MovieDiscover = () => {
  
  const [period, setPeriod] = useState<"week" | "day">("day");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(9);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["trending", period, pageNumber],
    queryFn: () => getTrendingMovies(period, pageNumber),
    placeholderData: keepPreviousData,
  });

  const handlePeriodChange = (newPeriod: "day" | "week") => {
    setPeriod(newPeriod);
    setPageNumber(1); // Reset page number when period changes
    refetch(); // Refetch data when period changes
  };

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);
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

  useEffect(() => {
    toast.success(
      "Welcome to the Trending Movies Page on TMDB. These trends are based on this day or week."
    );
  }, []);

   useEffect(() => {
     if (data) {
       setTotalPages(data.total_pages);
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

   useEffect(() => {
     toast.success(
       "Welcome to the Trending Movies Page on TMDB. These trends are based on this day or week."
     );
   }, []);

   useEffect(() => {
     toast.success(`Filtered according to trending movies this: ${period.toLocaleUpperCase()}.`);
   }, [period]);


  return (
    <>
      <Meta
        title={`Trending Movies this ${period.toUpperCase()}`}
        description="Discover your next favorite movie! Cinema Land is your ultimate destination for movie reviews, ratings, and recommendations. Explore now!"
        canonicalUrl={`https://cinema-land.vercel.app/movie/`}
      />
      <motion.div
        className="flex flex-col gap-4 w-full h-scree items-center overflow-auto py-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <aside className="flex flex-row gap-2 items-center justify-between w-[80%] rounded">
          <h6 className="text-md font-bold oswald-regular text-[#FACC15] ">
            Trending Movies Page
          </h6>

          <div className="relative z-20 min-w-[200px] flex items-center justify-between   rounded">
            <button
              className={`px-10 py-2 rounded-md flex items-center justify-center gap-4 ${
                period === "day"
                  ? "bg-[#FACC15] text-yellow-950"
                  : "bg-inherit text-white"
              }`}
              onClick={() => handlePeriodChange("day")}>
              Day
            </button>
            <button
              className={`px-10 py-2 rounded-md flex items-center justify-center gap-4 ${
                period === "week"
                  ? "bg-[#FACC15] text-yellow-950"
                  : "bg-inherit text-white"
              }`}
              onClick={() => handlePeriodChange("week")}>
              Week
            </button>
          </div>

          <p className="text-md">
            Trending movies on TMDB this{" "}
            <span className="text-[#FACC15] uppercase font-bold">{period}</span>
            .
          </p>
        </aside>

        <main className="flex flex-row flex-wrap gap-10 min-w-[500px] p-10 pb-[40px]  rounded-lg justify-center items-center bg-[#000000]">
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

export default MovieDiscover;
