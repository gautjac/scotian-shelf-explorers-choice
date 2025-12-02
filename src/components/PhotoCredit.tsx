interface PhotoCreditProps {
  credit: string;
}

export const PhotoCredit = ({ credit }: PhotoCreditProps) => {
  return (
    <div className="absolute bottom-0 right-0 bg-black/80 text-white px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs md:text-sm rounded-tl-lg italic">
      {credit}
    </div>
  );
};
