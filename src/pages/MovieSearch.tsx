import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {  searchMovies } from "@/components/Api";
import MovieCard from "@/components/MovieCard";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import MovieFooter from "@/components/MovieFooter";
import { toast } from "sonner";
import Pagination from "@/components/Pagination";
import { motion } from "framer-motion";
import Meta from "@/components/Meta";
import { useSearchParams } from "react-router-dom";

const MovieSearch = () => {
   const [searchParams, setSearchParams] = useSearchParams();
  
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
    if(search.length > 0) {
      toast.info(`Search results for: ${search.toUpperCase()}`);
    }
  }, [data]);

  useEffect(() => {
    setSearchParams(
      new URLSearchParams({
        with_search: String(search),
        page: String(pageNumber),
      })
    );
  }, [pageNumber, search, setSearchParams]);

  useEffect(() => {
    const currentPageNumber = searchParams.get("page");
    const currentSearch = searchParams.get("with_search");

    if (currentSearch) {
      setSearch(currentSearch);
    }
    if (currentPageNumber) {
      setPageNumber(Number(currentPageNumber));
    } else {
      setSearchParams(
        new URLSearchParams({
          page: String(1),
          with_search: String(""),
        })
      );
    }
  }, []);


  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Meta
        title={`Search for Movies`}
        description="Discover your next favorite movie! Cinema Land is your ultimate destination for movie reviews, ratings, and recommendations. Explore now!"
        canonicalUrl={`https://cinema-land.vercel.app/movie/search`}
      />

      <motion.div
        className="relative flex flex-col gap-4 w-full h-screen overflow-auto items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        {/* search */}
        <aside className="flex absolute -top-2 flex-row gap-2 items-center justify-center  py-4 w-[60%] rounded">
          <h6 className="text-md font-bold oswald-regular text-[#FACC15] hidden md:block">
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

          <p className="hidden md:block text-md oswald-regular overflow-hidden whitespace-nowrap text-ellipsis w-[150px]">
            Search :&nbsp;
            <span className="text-[#FACC15] uppercase">{search}</span>
          </p>
        </aside>
        {/* search */}

        <main className="flex flex-row flex-wrap gap-10 w-full pt-24 pb-[40px]  rounded-lg justify-center items-center">
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

        <div className="relative z-20 w-full flex items-center justify-center bg-[#1C1917] bg-opacity-75 pb-40">
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
      </motion.div>
    </>
  );
};

export default MovieSearch;
