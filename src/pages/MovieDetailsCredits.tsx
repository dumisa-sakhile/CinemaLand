import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "@/components/Api";
import { useParams } from "react-router-dom";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import CastCard from "@/components/CastCard";

const MovieDetailsCredits = () => {
  const { movieId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["credits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });


  


  return (
    <motion.section
      className="flex flex-wrap items-start justify-start w-full gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {isLoading && <Skeleton />}
      {isError && <ApiError error={error} />}

      {data?.cast.map((credits: any) => (
        <CastCard
          key={credits.cast_id}
          name={credits?.name}
          character={credits?.character}
          img={credits?.profile_path}
        />
      ))}

      
    </motion.section>
  );
};

export default MovieDetailsCredits;
