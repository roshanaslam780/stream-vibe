import Marquee from "./Marquee";

const MovieMarquee = ({ marqueeCount = 4, aspectRatio = "portrait" }) => {
  return (
    <div className="flex flex-col w-full max-w-full gap-y-2.5 2xl:gap-y-5">
      {Array.from({ length: marqueeCount }, (_, idx) => {
        const dir = idx % 2 === 0 ? "ltr" : "rtl";
        return (
          <Marquee
            pageNo={idx + 1}
            speed={180}
            direction={dir}
            key={idx}
            aspectRatio={aspectRatio}
          />
        );
      })}
    </div>
  );
};

export default MovieMarquee;
