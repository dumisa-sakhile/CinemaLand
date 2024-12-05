import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {getMoviesReviews } from "@/components/Api";
import { useParams } from "react-router-dom";
import Skeleton from "@/components/Skeleton";
import ApiError from "@/components/ApiError";
import { useEffect } from "react";
import { toast } from "sonner";
import ReviewCard from "@/components/ReviewCard";

const MovieDetailsReviews = () => {
  const { movieId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", movieId],
    queryFn: () => getMoviesReviews(movieId),
  });

  useEffect(() => {
    if (isError) {
      toast.error(`Error loading data:  ${error.message}`);
    }
  }, [isError, error]);


  return (
    <motion.section
      className="flex flex-wrap items-start justify-start w-full gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {isLoading && <Skeleton />}
      {isError && <ApiError error={error} />}

      {data?.results.map((review: any) => (
        <ReviewCard
          key={review.id}
          author={review.author}
          createdAt={review.created_at}
          updatedAt={review.updated_at}
          rating={review?.author_details?.rating ? review.author_details.rating : 0}
          content={review.content}
          url={review.url}
        />
      ))}
    </motion.section>
  );
};

export default MovieDetailsReviews;
