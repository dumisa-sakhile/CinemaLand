import Poster from "/profile.svg";


interface CastCardProps {
  name : string,
  character : string
  img : string
}


const CastCard = ({ name, character, img }: CastCardProps) => {
  return (
    <article className="flex flex-row items-center justify-start gap-2 roboto-condensed-normal tracking-wider text-sm shadow h-24 hover:scale-95 ease-in-out duration-300 bg-[#1C1917] border border-[#27272a]  rounded-md bg-opacity-75 min-w-[400px]">
      
        <img
          src={
            img
              ? `https://media.themoviedb.org/t/p/w66_and_h66_face${img}`
              : Poster
          }
          alt={`${name} poster`}
          className="w-24 h-24 object-cover rounded-l-md"
        />
      
      <div>
        <p className="min-w-48 pr-4">
          <span>Original Name : </span>{" "}
          <span className="text-[#FACC15]">{name}</span>
        </p>
        <p>
          Acts as : <span className="text-[#FACC15]">{character}</span>
        </p>
      </div>
    </article>
  );
};

export default CastCard