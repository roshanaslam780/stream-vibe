import { Icon } from "@iconify/react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/layout/Section";

const UtilityPage = ({ eyebrow, title, intro, updated, sections }) => (
  <Section>
    <div className="mx-auto max-w-5xl">
      <div className="mb-7 rounded-2xl border border-dark-15 bg-linear-to-br from-dark-10 to-dark-06 p-5 sm:p-8 lg:p-10">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: title }]} />
        <div className="mt-8 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-45">{eyebrow}</p>
          <h1 className="typo text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="body-text mt-4 text-base sm:text-lg">{intro}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs text-neutral-60 sm:text-sm"><Icon icon="lucide:calendar-days" className="size-4" aria-hidden="true" />Last updated: {updated}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <nav aria-label={`${title} sections`} className="rounded-xl border border-dark-15 bg-dark-10 p-4 lg:sticky lg:top-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-60">On this page</p>
          <ul className="flex flex-wrap gap-2 lg:flex-col">{sections.map((section, index) => <li key={section.title}><a href={`#policy-section-${index + 1}`} className="text-sm text-neutral-70 transition-colors hover:text-white hover:underline">{section.title}</a></li>)}</ul>
        </nav>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <section id={`policy-section-${index + 1}`} key={section.title} className="scroll-mt-8 rounded-xl border border-dark-15 bg-dark-10 p-5 sm:p-7">
              <h2 className="typo text-lg font-bold sm:text-xl">{section.title}</h2>
              <div className="mt-3 space-y-3">{section.paragraphs.map((paragraph) => <p key={paragraph} className="body-text">{paragraph}</p>)}</div>
              {section.items && <ul className="mt-4 space-y-2">{section.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-60"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-45" />{item}</li>)}</ul>}
            </section>
          ))}
          <div className="rounded-xl border border-brand-45/25 bg-brand-45/5 p-5 sm:p-6">
            <h2 className="typo text-lg font-bold">Questions about this page?</h2>
            <p className="body-text mt-2">If anything here is unclear, our support page is the best place to get in touch.</p>
            <a href="/support" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-80">Contact support <Icon icon="lucide:arrow-up-right" className="size-4" /></a>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default UtilityPage;
