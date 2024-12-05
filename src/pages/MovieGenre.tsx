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
import Meta from "@/components/Meta";
import { useSearchParams } from "react-router-dom";

const MovieGenre = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [genreId, setGenreId] = useState<number>(28);
  const [genreType, setGenreType] = useState<string>("Action");

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(9);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["genre", genreId, pageNumber],
    queryFn: () => getMoviesByGenre(pageNumber, genreId),
    placeholderData: keepPreviousData,
  });

  const handleGenreChange = (id: number, name: string) => {
    setGenreId(id);
    setGenreType(name)
    setPageNumber(1); // Reset page number when genre changes
  };
  {
  }

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
     toast.info(`Movies filtered by Genre: ${genreType}`);
   }, [genreId, genreType]);

   useEffect(() => {

    setSearchParams(
      new URLSearchParams({
        with_genre_type: String(genreType),
        with_genre_id: String(genreId),
        page: String(pageNumber),
      })
    );

   }, [pageNumber, genreId, genreType]);

   useEffect(() => {
     const currentPageNumber = searchParams.get("page");
     const currentGenreType = searchParams.get("with_genre_type");
     const currentGenreId = searchParams.get("with_genre_id");

     if (currentGenreType && currentGenreId) {
       handleGenreChange(Number(currentGenreId), currentGenreType);
     }
     if (currentPageNumber) {
       setPageNumber(Number(currentPageNumber));
     } else {
      setSearchParams(
        new URLSearchParams({
          page: String(1),
          with_genre_id: String(28),
          with_genre_type: String("Action"),
        })
      );

     }
   }, []);


  return (
    <>
      <Meta
        title={`${genreType} Genre Filtered Movies`}
        description="Discover your next favorite movie! Cinema Land is your ultimate destination for movie reviews, ratings, and recommendations. Explore now!"
        canonicalUrl={`https://cinema-land.vercel.app/movie/genre-filter`}
      />

      <motion.div
        className="relative flex flex-col gap-4 w-full h-screen items-center overflow-auto py-4 pb-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <aside className="flex-nowrap absolute top-2 rounded-md left-[6%] flex flex-row gap-2 items-start justify-start h-[50px] w-[80%] bg-[#1C1917] bg-opacity-50 border border-[#27272a]">
          <ul className="hide-scrollbar overflow-auto h-full w-full  flex flex-row gap-1 items-start justify-start roboto-condensed-medium  rounded py-2 px-2 text-sm">
            {Array.from(GenreData()).map(
              (genre: { id: number; name: string }) => (
                <Button
                  key={genre.id}
                  id={genre.id.toLocaleString()}
                  className={
                    genre.id === genreId
                      ? "bg-[#FACC15] border border-yellow-900 text-yellow-950 rounded-lg inline-block"
                      : "roboto-condensed-medium bg-transparent text-white"
                  }
                  onClick={() => handleGenreChange(genre.id, genre.name)}>
                  {genre.name}
                </Button>
              )
            )}
          </ul>
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

export default MovieGenre;
