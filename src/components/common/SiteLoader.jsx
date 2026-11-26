import Logo from "@/components/ui/Logo";

const SiteLoader = ({ label = "Loading StreamVibe" }) => (
  <div className="fixed inset-0 z-[200] flex min-h-svh items-center justify-center bg-dark-08" role="status" aria-live="polite">
    <div className="flex flex-col items-center gap-7 px-6 text-center">
      <Logo className="max-w-36" />
      <div className="relative size-12" aria-hidden="true">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-dark-20 border-t-brand-50" />
        <span className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-brand-80 [animation-direction:reverse] [animation-duration:900ms]" />
      </div>
      <p className="text-sm font-medium text-neutral-60">{label}</p>
      <span className="sr-only">{label}</span>
    </div>
  </div>
);

export default SiteLoader;
