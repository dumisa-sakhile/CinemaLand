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
import { useUser } from "@clerk/clerk-react";


const MovieDiscover = () => {
  const { user } = useUser();
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
    if (isError) {
      toast.error(`Error loading data:  ${error.message}`);
    }
  }, [isError, error]);

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
     toast.success(`Filtered according to trending movies this: ${period.toLocaleUpperCase()}.`);
   }, [period]);

    useEffect(() => {
      if (user) {
        toast.success(`Welcome to Cinema Land ${user.fullName}`);
      } else {
        toast.warning(`Please sign in to access the Movie details page`);
      }
    }, [user]);


  return (
    <>
      <Meta
        title={`Trending Movies this ${period.toUpperCase()}`}
        description="Discover your next favorite movie! Cinema Land is your ultimate destination for movie reviews, ratings, and recommendations. Explore now!"
        canonicalUrl={`https://cinema-land.vercel.app/movie/`}
      />
      <motion.div
        className="relative flex flex-col gap-4 w-full items-center overflow-auto py-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <aside className="flex-nowrap absolute top-4 rounded-md left-[6%] flex flex-col md:flex-row gap-10 items-center justify-start px-4 h-[50px] w-[80%] bg-inherit">
          <div
            className=" z-20 min-w-[200px] flex items-center justify-between   text-sm bg-[#1c1917] border
          border-[#27272a] bg-opacity-70 rounded-md oswald-regular">
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
          <p className="text-md oswald-light hidden md:block">
            {user && user.fullName && (
              <p className="text-md inline">
                Hello,&nbsp;
                <span className="text-[#FACC15] ">{user.fullName}</span>{" "}
                &nbsp;welcome&nbsp;on&nbsp;
              </p>
            )}
            Trending movies on TMDB this{" "}
            <span className="text-[#FACC15] uppercase font-bold">{period}</span>
            .{" "}
          </p>
        </aside>

        <main className="flex flex-row flex-wrap gap-10 w-full pt-24 pb-[40px]  rounded-lg justify-center items-center">
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

        <div className="relative z-20 w-full flex items-center justify-center bg-[#1C1917] bg-opacity-75 pb-40">
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
