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

const MovieDiscover = () => {
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
    <div className="flex flex-col gap-4 w-full h-scree items-center overflow-auto py-4">
      <aside className="flex flex-row gap-2 items-center justify-between w-full rounded">
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

export default MovieDiscover;
