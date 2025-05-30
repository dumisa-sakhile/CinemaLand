import { Outlet } from "react-router-dom";
import { NavLink, useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faPlus,
  faStar,
  faBackward,
  faHouse,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player/youtube";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getMovieVideos } from "@/components/Api";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import { useEffect } from "react";
import { toast } from "sonner";
import { useLayoutEffect } from "react";
import Meta from "@/components/Meta";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import MovieFooter from "@/components/MovieFooter";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId),
  });
  const { data : videoData, isLoading : videoLoading} = useQuery({
    queryKey: ["video", movieId],
    queryFn: () => getMovieVideos(movieId),
  });


  useEffect(() => {
    if (isError) {
      toast.error(`Error movie details for ${movieId} Error:  ${error.message}`);
    }
  }, [isError, error]);

  useLayoutEffect(() => {
    toast.success(`Movie details for ${data?.title} loaded successfully!`);
  }, [data]);



  const videoUrls: string[] = videoData?.results
    .sort((a: any, b: any) => {
      if (a.type === "Extended Preview" && b.type !== "Extended Preview")
        return -1;
      if (a.type === "Trailer" && b.type === "Extended Preview") return 1;
      if (
        a.type === "Trailer" &&
        b.type !== "Extended Preview" &&
        b.type !== "Trailer"
      )
        return -1;
      if (a.type === "Clip" && b.type === "Trailer") return 1;
      if (
        a.type === "Clip" &&
        b.type !== "Extended Preview" &&
        b.type !== "Trailer" &&
        b.type !== "Clip"
      )
        return -1;
      return 0;
    })
    .map((video: any) => `https://www.youtube.com/watch?v=${video.key}`);

  return (
    <>
      <Meta
        title={`${data?.title}`}
        description={data?.overview}
        canonicalUrl={`https://cinema-land.vercel.app/movie/${movieId}`}
      />

      <motion.div
        className="absolute flex items-center justify-center w-full h-screen overflow-hidden"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        {/* background image */}
        <img
          src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
          alt="backdrop image"
          className="w-full h-screen fixed top-0 left-0 -z-0"
        />
        {/* background image */}

        <main className="w-full h-screen flex flex-col items-center justify-center z-10 bg-black border border-[#27272a]  rounded-lg shadow absolute top-0 left-0 bg-opacity-20 overflow-auto">
          <motion.aside
            className="w-full fixed right-0 top-0 h-full flex flex-col items-start justify-start z-10  shadow  overflow-auto p-4 gap-10 bg-gradient-to-r from-[#1C1917] to-transparent pt-[30%] pl-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            {isLoading && <Skeleton />}
            {isError && <ApiError error={error.message} />}
            {/* title */}
            <h1 className="text-5xl font-bold leading-none  text-[#FACC15] poppins-bold">
              {data?.title}
            </h1>

            {/* tagline */}
            <p className="text-lg poppins-normal">{data?.tagline}</p>

            {/* buttons website and add to watchlist */}
            <article className="flex items-center gap-4 roboto-condensed-regular *:flex *:items-center *:gap-2 text-lg">
              {data?.homepage && (
                <a href={data?.homepage} target="_blank">
                  <Button>
                    <FontAwesomeIcon icon={faLink} className="mr-2" />
                    website
                  </Button>
                </a>
              )}

              <Tippy content="Feature under construction!" placement="right">
                <Button variant="outline" className="bg-transparent">
                  <FontAwesomeIcon icon={faPlus} />
                  add to watchlist
                </Button>
              </Tippy>
              {!videoLoading && videoUrls.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      <FontAwesomeIcon icon={faVideo} />
                      Watch Videos
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px] bg-black border border-[#27272a] text-white">
                    <DialogHeader>
                      <DialogTitle>
                        <h6 className="roboto-condensed-regular text-md text-[#FACC15] w-full text-center">
                          Watch Movie Playlist of Videos
                        </h6>
                      </DialogTitle>
                      <DialogDescription>
                        <p className="roboto-condensed-regular text-sm text-white  w-full text-center">
                          Please note that the below is playlist, you can select
                          any video to play it.
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                    <ReactPlayer url={videoUrls} controls width="100%" />

                    <DialogFooter>
                      <p className="roboto-condensed-regular text-sm text-white w-full text-center">
                        Use the Next and Previous arrow on bottom of the video
                        to navigate through the playlist!
                      </p>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </article>

            {/* release date, rating, duration */}
            <article className="flex items-center gap-4 roboto-condensed-regular *:flex *:items-center *:gap-2 text-lg">
              <p>
                Released:{" "}
                <span className="text-[#FACC15]">{data?.release_date}</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />:
                <span className="text-[#FACC15]">{data?.vote_average}/10</span>
              </p>
              <p>
                Duration:{" "}
                <span className="text-[#FACC15]">{`${Math.floor(
                  data?.runtime / 60
                )}h ${data?.runtime % 60}m`}</span>
              </p>
            </article>

            {/* overview */}
            <p className="text-lg roboto-condensed-light text-justify w-full lg:w-1/2 text-white bg-[#1C1917] border border-[#27272a]  rounded-lg p-2 bg-opacity-10">
              <span>
                <span className="text-[#FACC15] oswald-regular">
                  Overview:{" "}
                </span>
              </span>
              {data?.overview}
            </p>

            {/* genres */}
            {data?.genres?.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                <h6 className="text-sm roboto-condensed-regular">Genres</h6>
                <ul className="flex gap-3 flex-wrap *:py-2 ]*:rounded-full *:bg-opacity-75 w-1/2 text-md  roboto-condensed-light  *:cursor-pointer text-[#FACC15] *:underline hover:*:text-white hover:*:no-underline">
                  {data?.genres?.map((genre: any) => (
                    <li key={genre.id}>
                      <Link
                        to={`/movie/with_genres/${genre.id}?type=genre&name=${genre.name}`}>
                        {genre.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* spoken languages */}
            {data?.spoken_languages?.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                <h6 className="text-sm roboto-condensed-regular">
                  Spoken languages
                </h6>
                <ul className="flex gap-3 flex-wrap *:py-2 ]*:rounded-full *:bg-opacity-75 w-1/2 text-md  roboto-condensed-light  *:cursor-pointer text-[#FACC15] *:underline hover:*:text-white hover:*:no-underline">
                  {data?.spoken_languages?.map((language: any) => (
                    <li key={language.english_name}>
                      <Link
                        to={`/movie/with_original_language/${language.iso_639_1}?type=language&name=${language.english_name}`}>
                        {language.english_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* production companies */}
            {data?.production_companies?.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                <h6 className="text-sm roboto-condensed-regular">
                  Production companies
                </h6>
                <ul className="flex gap-3 flex-wrap *:py-2 ]*:rounded-full *:bg-opacity-75 w-1/2 text-md  roboto-condensed-light  *:cursor-pointer text-[#FACC15] *:underline hover:*:text-white hover:*:no-underline">
                  {data?.production_companies?.map((company: any) => (
                    <li key={company.id}>
                      <Link
                        to={`/movie/with_companies/${company.id}?type=company&name=${company.name}`}>
                        {company.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* production countries */}
            {data?.production_countries?.length > 0 && (
              <div className="flex flex-col gap-4 w-full">
                <h6 className="text-sm roboto-condensed-regular">
                  Production countries
                </h6>
                <ol className="flex gap-3 flex-wrap *:py-2 ]*:rounded-full *:bg-opacity-75 w-1/2 text-md  roboto-condensed-light  *:cursor-pointer text-[#FACC15] *:underline hover:*:text-white hover:*:no-underline">
                  {data?.production_countries?.map((country: any) => (
                    <li key={country.iso_3166_1}>
                      <Link
                        to={`/movie/with_origin_country/${country.iso_3166_1}?type=country&name=${country.name}`}>
                        {country.name}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* home and back */}
            <div className="flex gap-4 w-[100px] absolute top-4 left-4">
              <Button className="w-full" onClick={() => navigate("/movie")}>
                <FontAwesomeIcon icon={faHouse} />
                <span className="text-lg oswald-regular">Home</span>
              </Button>
              <Button
                className="w-full bg-transparent"
                variant="outline"
                onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faBackward} />
                <span className="text-lg oswald-regular">Back</span>
              </Button>
            </div>

            {/* Header */}
            <header className="min-w-[400px]  min-h-[50px] flex justify-between items-center px-4  bg-opacity-50">
              <NavLink
                to={`/movie/${movieId}`}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300"
                  }`
                }
                end>
                {" "}
                Reviews{" "}
              </NavLink>

              <NavLink
                to={`/movie/${movieId}/credits`}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }>
                Credits
              </NavLink>

              <NavLink
                to={`/movie/${movieId}/recommendations`}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-2 rounded ${
                    isActive ? "bg-[#FACC15] text-black" : "text-gray-300" // Changed to pink
                  }`
                }>
                Recommendations
              </NavLink>
            </header>
            {/* Header */}

            <Outlet />

            <div className="relative z-20 w-full flex items-center justify-center pb-10">
              <MovieFooter/>
            </div>
          </motion.aside>
        </main>
      </motion.div>
    </>
  );
};

export default MovieDetails;
