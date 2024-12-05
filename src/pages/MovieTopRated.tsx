import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "@/components/Api";
import MovieCard from "@/components/MovieCard";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import MovieFooter from "@/components/MovieFooter";
import { toast } from "sonner";
import Pagination from "@/components/Pagination";
import { motion } from "framer-motion";
import Meta from "@/components/Meta";
import MovieHeaderComponent from "@/components/MovieHeaderComponent";
import { useSearchParams } from "react-router-dom";

const MovieTopRated = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(9);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topRated", pageNumber],
    queryFn: () => getTopRatedMovies(pageNumber),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);
    }
  }, [data])

 useEffect(() => {
   if (isError) {
     toast.error(`Error loading data:  ${error.message}`);
   }
 }, [isError, error]);
 
   useEffect(() => {
     toast.success(
       "Welcome to the Top Rated Movies Page! Here you can find the most popular movies on TMDB."
     );
   }, []);

   useEffect(() => {
     setSearchParams(new URLSearchParams({ page: String(pageNumber) }));
   }, [pageNumber, setSearchParams]);

   useEffect(() => {
     const currentPageNumber = searchParams.get("page");
     if (currentPageNumber) {
       setPageNumber(Number(currentPageNumber));
     } else {
       setSearchParams(new URLSearchParams({ page: String(1) }));
     }
   }, []);


  return (
    <>
      <Meta
        title={`Top Rated Movies`}
        description="Discover your next favorite movie! Cinema Land is your ultimate destination for movie reviews, ratings, and recommendations. Explore now!"
        canonicalUrl={`https://cinema-land.vercel.app/movie/top-rated`}
      />
      <motion.div
        className="relative flex flex-col gap-4 w-full h-screen overflow-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <MovieHeaderComponent title="Top Rated Movies" />

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

export default MovieTopRated;
