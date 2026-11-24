import { Icon } from "@iconify/react";
import { Link } from "react-router";
import Button from "@/components/ui/button/Button";
import Logo from "@/components/ui/Logo";

const NotFound = () => (
  <main className="relative isolate flex min-h-dvh items-center overflow-hidden bg-dark-08">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/2 top-[44%] size-[min(85vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-45/10 blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-dark-06/80 to-transparent" />
    </div>

    <div className="rs-container flex min-h-dvh w-full flex-col">
      <header className="flex items-center py-6 md:py-8">
        <Logo className="max-w-28 sm:max-w-36" />
      </header>
      <section className="flex flex-1 flex-col items-center justify-center pb-16 text-center sm:pb-20 max-w-100 mx-auto">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dark-20 bg-dark-10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-60">
          <span className="size-1.5 rounded-full bg-brand-45" />
          Page not found
        </div>

        <h1 className="typo text-[clamp(7rem,24vw,13rem)] font-extrabold leading-[0.82] tracking-[-0.08em]">
          <span className="bg-linear-to-b from-white via-white to-neutral-60 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="typo mt-7 text-2xl font-bold sm:text-3xl md:text-4xl">
          Looks like this page went off script.
        </h2>
        <p className="body-text mt-3 max-w-lg px-2 mb-8">
          The link may be out of date, or this page may have moved. The good
          stuff is still here—let’s find your next watch.
        </p>

        <div className=" flex w-full flex-col justify-center gap-3 xs:w-auto xs:flex-row">
          <Button to="/" variant="primary">
            <Icon icon="lucide:house" aria-hidden="true" />
            Go back home
          </Button>
          <Button to="/discover" variant="secondary">
            <Icon icon="lucide:compass" aria-hidden="true" />
            Explore movies &amp; shows
          </Button>
        </div>
        <div className="mt-8 text-sm text-neutral-60 block">
          Need a hand?{" "}
          <Link
            to="/support"
            className="font-semibold text-white underline decoration-brand-45 underline-offset-4 hover:text-brand-80"
          >
            Visit support
          </Link>
        </div>
      </section>
    </div>
  </main>
);

export default NotFound;
