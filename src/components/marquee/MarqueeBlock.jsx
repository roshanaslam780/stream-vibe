import MarqueeItem from "./MarqueeItem";

const MarqueeBlock = ({ movies, aspectRatio, size }) => {
  return (
    <rs-marquee-block className="flex items-stretch justify-start gap-x-2.5 2xl:gap-x-5 pe-2.5 2xl:pe-5 animation-marquee">
      {movies.map((movie) => {
        return (
          <MarqueeItem movie={movie} key={movie.id} aspectRatio={aspectRatio} size={size} />
        );
      })}
    </rs-marquee-block>
  );
};

export default MarqueeBlock;
