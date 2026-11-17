import MovieMarquee from "@/components/marquee/MovieMarquee";
import Button from "@/components/ui/button/Button";
import Section from "@/layout/Section";

const CallToAction = () => {
  return (
    <Section>
      <div className="rounded-xl bg-dark-06 border border-dark-15 overflow-hidden relative z-1">
        <div className="absolute -z-1 w-full h-[150%] top-1/2 left-1/2 -translate-1/2">
          <MovieMarquee marqueeCount={6} aspectRatio="landscape" />
        </div>
        <div className="py-12.5 px-7.5 sm:py-15 md:py-20 2xl:py-25 sm:px-10 md:px-15 2xl:px-20 bg-linear-to-b sm:bg-linear-to-r from-dark-06 to-brand-45/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-12.5">
          <div className="flex flex-col gap-y-2.5 text-center sm:text-start">
            <h3 className="typo text-[24px] md:text-[28px] 2xl:text-[48px] font-bold">
              Start your free trial today!
            </h3>
            <p className="body-text">
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
          </div>
          <Button to="/support">Start a Free Trail</Button>
        </div>
      </div>
    </Section>
  );
};

export default CallToAction;
