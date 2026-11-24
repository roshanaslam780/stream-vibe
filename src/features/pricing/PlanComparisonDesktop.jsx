const featureRows = [
  { key: "price", label: "Price" },
  { key: "content", label: "Content" },
  { key: "devices", label: "Devices" },
  { key: "freeTrial", label: "Free Trial" },
  { key: "cancelAnytime", label: "Cancel Anytime" },
  { key: "hdr", label: "HDR" },
  { key: "dolbyAtmos", label: "Dolby Atmos" },
  { key: "adFree", label: "Ad - Free" },
  { key: "offlineViewing", label: "Offline Viewing" },
  { key: "familySharing", label: "Family Sharing" },
];

const PlanComparisonDesktop = ({ plans }) => (
  <div className="hidden overflow-hidden rounded-xl border border-dark-15 bg-dark-06 md:block">
    <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
      <thead className="bg-dark-10">
        <tr>
          <th scope="col" className="w-[25%] border-b border-r border-dark-15 px-4 py-5 text-base font-semibold text-white md:px-5 lg:px-6 lg:py-6 lg:text-lg">
            Features
          </th>
          {plans.map((plan) => (
            <th key={plan.id} scope="col" className="w-[25%] border-b border-r border-dark-15 px-4 py-5 text-base font-semibold text-white last:border-r-0 md:px-5 lg:px-6 lg:py-6 lg:text-lg">
              <span className="inline-flex flex-wrap items-center gap-2.5">
                {plan.name.replace(/\s+Plan$/, "")}
                {plan.popular && (
                  <span className="rounded-sm bg-brand-45 px-2.5 py-1 text-xs font-semibold text-white">
                    Popular
                  </span>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {featureRows.map((feature) => (
          <tr key={feature.key} className="last:[&>th]:border-b-0 last:[&>td]:border-b-0">
            <th scope="row" className="border-b border-r border-dark-15 px-4 py-5 text-left text-sm font-medium leading-relaxed text-neutral-60 md:px-5 lg:px-6 lg:py-6 lg:text-base">
              {feature.label}
            </th>
            {plans.map((plan) => {
              const value = feature.key === "price"
                ? `${plan.price}/${plan.period === "year" ? "Year" : "Month"}`
                : plan.features?.[feature.key] || "—";
              return (
                <td key={plan.id} className={`border-b border-r border-dark-15 px-4 py-5 text-sm leading-relaxed last:border-r-0 md:px-5 lg:px-6 lg:py-6 lg:text-base ${feature.key === "price" ? "font-semibold text-neutral-95" : "text-neutral-60"}`}>
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PlanComparisonDesktop;
