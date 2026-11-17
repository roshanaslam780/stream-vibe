const DetailPanel = ({ title, action, children, className = "" }) => (
  <section
    className={`min-w-0 w-full max-w-full rounded-xl border border-dark-15 bg-dark-10 p-4 sm:p-5 md:p-7.5 ${className}`}
  >
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <h2 className="typo text-lg font-semibold md:text-xl">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

export default DetailPanel;
