
const MovieHeaderComponent = ({title}: {title: string}) => {
  return (
    <header className="flex-nowrap absolute top-4 rounded-md left-[10%] flex flex-row gap-10 items-center justify-center px-4 h-[50px] w-[80%] bg-inherit">
      <h6 className="text-md font-bold oswald-regular text-[#FACC15] ">
    {title}
      </h6>
    </header>
  );
}

export default MovieHeaderComponent