import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {  getUpcomingMovies } from "@/components/Api";
import MovieCard from "@/components/MovieCard";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import MovieFooter from "@/components/MovieFooter";
import { toast } from "sonner";

const MovieUpcoming = () => {
  document.title = "Cinema Land | Upcoming Movies";
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(9);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcoming", pageNumber],
    queryFn: () => getUpcomingMovies(pageNumber),
    placeholderData: keepPreviousData,
  });

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
      "Welcome to the Upcoming Movies Page! Here you can find the most popular movies on TMDB."
    );
  }, []);

  {
   
  }

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <header className="flex flex-col gap-2 items-center justify-center text-center">
        <h6 className="text-sm font-bold oswald-regular text-[#FACC15] ">
          Upcoming Movies Page
        </h6>
      </header>

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
        <footer className="fixed bottom-2 w-full flex items-center justify-center  py-4    roboto-condensed-regular  bg-inherit shadow-lg ">
          <div className="flex flex-row gap-6 items-center justify-center bg-[#1C1917] border border-[#27272a] px-32 py-4 rounded">
            {/* Help text */}
            <span className="text-sm text-gray-400 ">
              Showing{" "}
              <span className="font-semibold text-white">{pageNumber}</span> to
              of <span className="font-semibold text-white">{totalPages}</span>{" "}
              Entries
            </span>
            {/* Buttons */}
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-red-600 rounded-s hover:bg-red-700"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(pageNumber - 1)}>
                Prev
              </button>
              <button
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-green-600 border-0 border-s border-gray-700 rounded-e hover:bg-gree7-900"
                disabled={pageNumber >= totalPages}
                onClick={() => setPageNumber(pageNumber + 1)}>
                Next
              </button>
            </div>
          </div>
        </footer>
      )}
      {/* Pagination */}
    </div>
  );
};

export default MovieUpcoming;
