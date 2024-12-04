import { Button } from "./ui/button";

interface PaginationType{
    pageNumber: number;
    totalPages: number;
    setPageNumber: (pageNumber: number) => void;
}
const Pagination = ({pageNumber, totalPages, setPageNumber} : PaginationType) => {
  return (
    <footer className="fixed bottom-2 w-full flex items-center justify-center  py-4    roboto-condensed-regular  bg-inherit shadow-lg ">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center bg-[#1C1917] border border-[#27272a] px-4 py-2 rounded">
        {/* Help text */}
        <span className="text-md text-white ">
          Showing{" "}
          <span className="font-semibold text-[#FACC15]">{pageNumber}</span> of{" "}
          <span className="font-semibold text-[#facc15]">{totalPages}</span>{" "}
          Pages
        </span>
        {/* Buttons */}
        <div className="inline-flex items-center justify-center gap-2 mt-2 xs:mt-0 w-[200px]">
          <Button
            className="w-[90px] text-rose-950"
            variant="destructive"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}>
            Prev
          </Button>
          <Button
            className="w-[90px]"
            disabled={pageNumber >= totalPages}
            onClick={() => setPageNumber(pageNumber + 1)}>
            Next
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Pagination