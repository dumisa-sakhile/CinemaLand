import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "@/components/Api";
import MovieCard from "@/components/MovieCard";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import MovieFooter from "@/components/MovieFooter";
import { toast } from "sonner";
import Pagination from "@/components/Pagination";

const MovieNowPlaying = () => {
  document.title = "Cinema Land | Now Playing Movies";
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(9);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["nowPlaying", pageNumber],
    queryFn: () => getNowPlayingMovies(pageNumber),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data?.total_pages);
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
       "Welcome to the Now Playing Movies Page! Here you can find the most popular movies on TMDB."
     );
   }, []);

  {
  }

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <header className="flex flex-col gap-2 items-center justify-center text-center">
        <h6 className="text-sm font-bold oswald-regular text-[#FACC15] ">
          Now Playing Movies Page
        </h6>
      </header>
      <main className="flex flex-row flex-wrap gap-10 min-w-[500px] p-10 pb-[40px]  rounded-lg justify-center items-center bg-[#000000]">
        {isLoading && <Skeleton />}

        {isError && <ApiError error={error.message} />}

        {data?.results?.map((movie: any) => (
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
    </div>
  );
};

export default MovieNowPlaying;
