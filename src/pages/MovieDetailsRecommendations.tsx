import { motion } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getMoviesRecommendations } from "@/components/Api";
import { useParams } from "react-router-dom";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";


const MovieDetailsRecommendations = () => {

  const { movieId } = useParams();

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["recommendations",movieId],
  queryFn: () => getMoviesRecommendations(movieId),
});


  return (
    <motion.section
      className="flex flex-wrap items-center justify-center w-full gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {isLoading && <Skeleton />}
      {isError && <ApiError error={error} />}


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
        
    </motion.section>
  );
}

export default MovieDetailsRecommendations