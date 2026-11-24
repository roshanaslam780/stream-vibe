import MovieMarquee from "@/components/marquee/MovieMarquee";
import Section from "@/layout/Section";
import Faqs from "@/features/faqs/Faqs";
import CallToAction from "@/features/callToAction/CallToAction";
import SupportContactForm from "@/features/support/SupportContactForm";

const Support = () => (
  <>
    <Section>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.7fr)] lg:items-stretch xl:gap-8">
        <div className="flex min-w-0 flex-col justify-between gap-7 lg:py-3">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-45">
              We’re here to help
            </p>
            <h1 className="typo text-3xl font-bold leading-tight sm:text-4xl 2xl:text-5xl">
              Welcome to our support page!
            </h1>
            <p className="body-text mt-4 max-w-xl">
              Tell us what you need help with and our support team will get back to you.
            </p>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-xl border border-dark-15 bg-dark-06">
            <div className="absolute inset-0 flex items-center">
              <MovieMarquee marqueeCount={4} aspectRatio="portrait" size="xs" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-dark-06/20 via-transparent to-dark-06/35" />
          </div>
        </div>

        <SupportContactForm />
      </div>
    </Section>

    <Faqs />
    <CallToAction />
  </>
);

export default Support;
