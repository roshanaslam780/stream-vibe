import abstract from "@/assets/svgs/abstract-design.svg";
import MovieMarquee from "@/components/marquee/MovieMarquee";
import Button from "@/components/ui/button/Button";
import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section className="w-full h-150 md:h-212 2xl:h-270 max-w-[2560px] mx-auto bg-dark-06 grid grid-cols-1 grid-rows-1 overflow-hidden">
      <div className=" col-start-1 row-start-1 row-span-1 col-span-1 flex items-center">
        <MovieMarquee />
      </div>
      <div className="col-start-1 row-start-1 col-span-1 row-span-1 z-2 bg-[linear-gradient(to_bottom,#141414_0%,#141414a6_50%,#141414a6_25%,#141414_85%)]">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-50 lg:w-75 2xl:w-100 m-auto">
            <img
              src={abstract}
              alt="ABSTRACT DESIGN"
              className="w-full h-full"
            />
          </div>
          <div className="w-full max-w-285 mx-auto px-4 text-center">
            <h1 className="typo font-bold text-[28px] lg:text-[48px] 2xl:text-[58px] mb-2.5 2xl:mb-3.5">
              The Best Streaming Experience
            </h1>
            <p className="body-text max-sm:line-clamp-3 mb-7.5 lg:mb-10 2xl:mb-12.5">
              StreamVibe is the best streaming experience for watching your
              favorite movies and shows on demand, anytime, anywhere. With
              StreamVibe, you can enjoy a wide variety of content, including the
              latest blockbusters, classic movies, popular TV shows, and more.
              You can also create your own watch lists, so you can easily find
              the content you want to watch.
            </p>
            <Button>
              <Icon icon="at-icons:play" className="size-5 2xl:size-6" />
              Start Watching Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
