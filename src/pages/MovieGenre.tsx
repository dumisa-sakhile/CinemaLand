import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMoviesByGenre } from "@/components/Api";
import MovieCard from "@/components/MovieCard";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import MovieFooter from "@/components/MovieFooter";
import { toast } from "sonner";
import GenreData from "@/components/GenreData";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import { motion } from "framer-motion";

const MovieDiscover = () => {
  document.title = "Cinema Land | Movie Genres Filter";
  const [genreId, setGenreId] = useState<number>(28);
  const [genreType, setGenreType] = useState<string>("Action");

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(9);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["genre", genreId, pageNumber],
    queryFn: () => getMoviesByGenre(pageNumber, genreId),
    placeholderData: keepPreviousData,
  });

  const handleGenreChange = (id: number, name: string) => {
    setGenreId(id);
    setGenreType(name)
    setPageNumber(1); // Reset page number when genre changes
    refetch(); // Refetch data when genre changes
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
      "Welcome to the Genre Filtered Movies Page! Please use the Genre Filter to find your favorite movies."
    );
  }, []);

  useEffect(() => {
    toast.info(
      `Movies filtered by Genre: ${genreType}`
    );
  }, [genreId, genreType]);

  {
  }

  return (
    <motion.div className="flex flex-col gap-4 w-full h-scree items-center overflow-auto py-4 pb-0" initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <aside className=" absolute top-1 flex flex-row gap-2 items-center justify-between w-full rounded bg-black z-10">
        <ul className="hide-scrollbar flex-wrap flex flex-row gap-1 items-start justify-start roboto-condensed-light  rounded py-2 px-2 text-sm">
          {Array.from(GenreData()).map(
            (genre: { id: number; name: string }) => (
              <Button
                key={genre.id}
                id={genre.id.toLocaleString()}
                className={
                  genre.id === genreId
                    ? "bg-[#FACC15] border border-yellow-900 text-yellow-900 rounded-lg"
                    : "roboto-condensed-light bg-transparent text-white"
                }
                onClick={() => handleGenreChange(genre.id, genre.name)}>
                {genre.name}
              </Button>
            )
          )}
        </ul>
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
  );
};

export default MovieDiscover;
