import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface ReviewsType{
    author: string;
    createdAt: Date ;
    updatedAt: Date;
    rating?: number | undefined;
    content: string;
    url : string;
}

const ReviewCard = ({ author, createdAt, updatedAt, rating, content, url} : ReviewsType) => {
  return (
    <motion.article
      className="bg-[#1C1917] border border-[#27272a]  rounded-lg p-4 bg-opacity-75 w-[500px] md:w3/4 lg:w3/4 flex flex-col items-start justify-start gap-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {/* review by and profile */}
      <header className="flex gap-2 items-center justify-start text-sm oswald-light w-full">
        <h2 className=" text-2xl  roboto-condensed-regular text-[#FACC15]">
          Review by {author}
        </h2>
      </header>

      {/* review header, created at, updated at, rating */}
      <header className="flex gap-5 items-center justify-start text-sm roboto-condensed-regular w-full ">
        {/* Author */}
        <div className="flex gap-2 items-start justify-start flex-col">
          <span>Author: </span> <span className="text-[#FACC15]">{author}</span>
        </div>

        {/* Created at */}
        <div className="flex gap-2 items-start justify-start flex-col">
          <span>Created on: </span>{" "}
          <span className="text-[#FACC15]">
            {new Date(createdAt)?.toLocaleDateString()}
          </span>
        </div>

        {/* Updated at */}
        <div className="flex gap-2 items-start justify-start flex-col">
          <span>Updated on: </span>{" "}
          <span className="text-[#FACC15]">
            {new Date(updatedAt)?.toLocaleDateString()}
          </span>
        </div>

        {/* Rating */}
        <div className="flex gap-2 items-start justify-start flex-col">
          <span>Rating: </span>
          <span className="text-[#FACC15]">{rating}/10</span>
        </div>

        <span></span>
      </header>

      {/* review body */}
      <p
        className="text-md roboto-condensed-light text-justify"
        dangerouslySetInnerHTML={{
          __html:
            content && content.length > 50 * 5
              ? content.substring(0, content.indexOf(" ", 50 * 5)) + "..."
              : content,
        }}
      />

      <div className="w-full flex items-center justify-end">
        <Button
          variant="link"
          className="absolute top-10 right-4"
          disabled={!url}>
          <a href={url} target="_blank" className="w-full h-full">
            Read more
          </a>
        </Button>
      </div>
    </motion.article>
  );
}

export default ReviewCard