import { Outlet } from "react-router-dom";
import { NavLink, useParams, useNavigate } from "react-router-dom";
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
import { getMovieVideos } from "@/components/Api";




const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  document.title = `Cinema Land | Movie Details | ${movieId}`;

  const { data : videoData, isLoading : videoLoading} = useQuery({
    queryKey: ["video", movieId],
    queryFn: () => getMovieVideos(movieId),
  });

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
    <motion.div
      className="absolute flex items-center justify-center w-full h-screen overflow-hidden"
      initial={{ scale: 2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}>
      {/* background image */}
      <img
        src="https://image.tmdb.org/t/p/original//hygkfPt0it7KLrXEMelzNQg5mM5.jpg"
        alt="backdrop image"
        className="w-full fixed top-0 left-0 -z-0"
      />
      {/* background image */}

      <main className="w-full h-screen flex flex-col items-center justify-center z-10 bg-black border border-[#27272a]  rounded-lg shadow absolute top-0 left-0 bg-opacity-20 overflow-auto">
        <motion.aside
          className="w-full fixed right-0 top-0 h-full flex flex-col items-start justify-start z-10  shadow  overflow-auto p-4 gap-10 bg-gradient-to-r from-black to-transparent pt-[30%] pl-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          {/* title */}
          <h1 className="text-5xl font-bold leading-none  text-[#FACC15] poppins-bold">
            The Black Phone
          </h1>

          {/* tagline */}
          <p className="text-lg poppins-normal">'Indodana yami iyeza'</p>

          {/* buttons website and add to watchlist */}
          <article className="flex items-center gap-4 roboto-condensed-regular *:flex *:items-center *:gap-2 text-lg">
            <Button>
              <FontAwesomeIcon icon={faLink} className="mr-2" />
              website
            </Button>
            <Button variant="outline" className="bg-transparent">
              <FontAwesomeIcon icon={faPlus} />
              add to watchlist
            </Button>
            {!videoLoading && (
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
                      Use the Next and Previous arrow on bottom of the video to
                      navigate through the playlist!
                    </p>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </article>

          {/* release date, rating, duration */}
          <article className="flex items-center gap-4 roboto-condensed-regular *:flex *:items-center *:gap-2 text-lg">
            <p>
              Released: <span className="text-[#FACC15]">12/12/2022</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />:
              <span className="text-[#FACC15]">07/10</span>
            </p>
            <p>
              Duration: <span className="text-[#FACC15]">2h 10m</span>
            </p>
          </article>

          {/* overview */}
          <p className="text-lg roboto-condensed-light text-justify w-full lg:w-1/2 text-white bg-[#1C1917] border border-[#27272a]  rounded-lg p-2 bg-opacity-10">
            <span>
              <span className="text-[#FACC15] oswald-regular">Overview: </span>
            </span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            commodi a libero dolores, distinctio molestiae perferendis dolorum
            ducimus pariatur deleniti, earum voluptas esse sed praesentium!
          </p>

          {/* genres */}
          <div className="flex flex-col gap-4 w-full">
            <h6 className="text-sm roboto-condensed-regular">Genres</h6>
            <ul className="flex gap-3 flex-wrap *:py-2 ]*:rounded-full *:bg-opacity-75 w-1/2 text-md  roboto-condensed-light  *:cursor-pointer text-[#FACC15] *:underline hover:*:text-white hover:*:no-underline">
              <li>Soul</li>
              <li>Drama</li>
              <li>Thriller</li>
            </ul>
          </div>

          {/* spokren languages */}
          <div className="flex flex-col gap-4 w-full">
            <h6 className="text-sm roboto-condensed-regular">
              Spoken languages
            </h6>
            <ul className="flex gap-3 flex-wrap *:py-2 ]*:rounded-full *:bg-opacity-75 w-1/2 text-md  roboto-condensed-light  *:cursor-pointer text-[#FACC15] *:underline hover:*:text-white hover:*:no-underline">
              <li>English</li>
              <li>Spanish</li>
              <li>French</li>
              <li>German</li>
              <li>Italian</li>
              <li>Chinese</li>
              <li>Japanese</li>
              <li>Korean</li>
            </ul>
          </div>

          {/* production companies */}
          <div className="flex flex-col gap-4 w-full">
            <h6 className="text-sm roboto-condensed-regular">
              Production companies
            </h6>
            <ul className="flex gap-3 flex-wrap *:py-2 ]*:rounded-full *:bg-opacity-75 w-1/2 text-md  roboto-condensed-light  *:cursor-pointer text-[#FACC15] *:underline hover:*:text-white hover:*:no-underline">
              <li>Netflix</li>
              <li>Blumhouse Productions</li>
              <li>Studio Ghibli</li>
              <li>The Walt Disney Studios</li>
              <li>Universal Pictures</li>
            </ul>
          </div>

          {/* production countries */}
          <div className="flex flex-col gap-4 w-full">
            <h6 className="text-sm roboto-condensed-regular">
              Production countries
            </h6>
            <ul className="flex gap-3 flex-wrap *:py-2 ]*:rounded-full *:bg-opacity-75 w-1/2 text-md  roboto-condensed-light  *:cursor-pointer text-[#FACC15] *:underline hover:*:text-white hover:*:no-underline">
              <li>United States</li>
              <li>Japan</li>
              <li>France</li>
              <li>Germany</li>
              <li>Italy</li>
              <li>China</li>
              <li>South Korea</li>
            </ul>
          </div>

          {/* home and back */}
          <div className="flex gap-4 w-[100px] absolute top-4 left-4">
            <Button className="w-full" onClick={() => navigate("/")}>
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
        </motion.aside>
      </main>
    </motion.div>
  );
};

export default MovieDetails;
