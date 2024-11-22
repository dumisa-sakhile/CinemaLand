const Skeleton = () => {
  return (
    <section className="flex items-center justify-center w-full h-screen flex-wrap">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="border border-[#27272a] shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-[#27272a] h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-[#27272a] rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#27272a] rounded col-span-2"></div>
                  <div className="h-2 bg-[#27272a] rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-[#27272a] rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skeleton;
