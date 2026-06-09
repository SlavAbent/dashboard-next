export const AsideFoldersFallback = () => {
  return (
    <div className="border-bottom flex flex-col items-center gap-2 px-3 py-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-muted h-9 w-[216px] animate-pulse rounded-sm"
        />
      ))}
    </div>
  );
};
