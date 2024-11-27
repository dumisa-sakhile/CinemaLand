import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {  searchMovies } from "@/components/Api";
import MovieCard from "@/components/MovieCard";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import MovieFooter from "@/components/MovieFooter";
import { toast } from "sonner";
import Pagination from "@/components/Pagination";

const MovieSearch = () => {
  document.title = "Cinema Land | Search Movies";
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(9);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["search", search, pageNumber],
    queryFn: () => searchMovies(pageNumber, search),
    placeholderData: keepPreviousData,
    enabled: false,
  });


  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);
    }
    if (isLoading) {
      toast.info("Loading data...");
    }
    if (isError) {
      toast.error(`Error loading data: ${error.message}`);
    }
  }, [data, isLoading, isError, error]);

  useEffect(() => {
    toast.success(
      "Welcome to the Search Movies Page! Please enter your search query above."
    );
  }, []);

  useEffect(() => {
    refetch();
  }, [pageNumber, refetch]);

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.warning(
        "No search results found. Try searching for something else."
      );
    }
  }, [data]);

  useEffect(() => {
    search.trim() ?? toast.info(`Search results for: ${search}`);
  }, [data]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto items-center">
      {/* search */}
      <aside className="flex flex-row gap-2 items-center justify-center  py-4 w-[90%] rounded">
        <h6 className="text-md font-bold oswald-regular text-[#FACC15] ">
          Movies Search Page
        </h6>

        <section className="max-w-md mx-auto w-[450px]">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-white sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-white border border-[#27272a] rounded-lg bg-[#1C1917]  focus:ring-[#FACC15] focus:border-[#FACC15] focus:outline-none"
              placeholder="Search Mockups, Logos..."
              value={search}
              onChange={handleSearch}
              autoComplete="off"
            />
            <button
              type="button"
              className="text-black absolute end-2.5 bottom-2.5 bg-[#FACC15] hover:bg-[#FACC15]/80 focus:ring-4 focus:outline-none focus:ring-[#FACC15]/50 font-medium rounded-lg text-sm px-4 py-2"
              onClick={() => {
                setPageNumber(1);
                refetch();
              }}
              disabled={search.trim() === ""}>
              Search
            </button>
          </div>
        </section>

        <p className="text-md oswald-regular">
          Search For the Movie{" "}
          <span className="text-[#FACC15] uppercase">{search}</span>
        </p>
      </aside>
      {/* search */}

      <main className="flex flex-row flex-wrap gap-10 min-w-[500px] p-10 pb-[40px]  rounded-lg justify-center items-center bg-[#000000]">
        {isLoading && <Skeleton />}
        {isError && <ApiError error={error.message} />}

        {data?.results.length === 0 && <Skeleton />}

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

      <div className="relative z-20 w-full flex items-center justify-center bg-black py-20">
        <MovieFooter />
      </div>

      {/* Display popular movies */}
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

export default MovieSearch;
