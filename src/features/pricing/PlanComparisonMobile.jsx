import { useState } from "react";

const mobileFeatures = [
  { key: "price", label: "Price" },
  { key: "freeTrial", label: "Free Trial" },
  { key: "content", label: "Content", fullWidth: true },
  { key: "devices", label: "Devices", fullWidth: true },
  { key: "cancelAnytime", label: "Cancel Anytime" },
  { key: "hdr", label: "HDR" },
  { key: "dolbyAtmos", label: "Dolby Atmos" },
  { key: "adFree", label: "Ad - Free" },
  { key: "offlineViewing", label: "Offline Viewing" },
  { key: "familySharing", label: "Family Sharing" },
];

const PlanComparisonMobile = ({ plans }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(
    plans.find((plan) => plan.popular)?.id || plans[0]?.id,
  );
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId)
    || plans.find((plan) => plan.popular)
    || plans[0];

  if (!selectedPlan) return null;

  return (
    <div className="md:hidden">
      <div className="mb-5 flex rounded-lg border border-dark-15 bg-dark-06 p-1.5">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            aria-pressed={selectedPlan.id === plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={`min-h-11 flex-1 rounded-md px-2 text-sm transition-colors ${
              selectedPlan.id === plan.id
                ? "bg-dark-15 text-white"
                : "text-neutral-60 hover:text-white"
            }`}
          >
            {plan.name.replace(/\s+Plan$/, "")}
          </button>
        ))}
      </div>

      <dl className="grid grid-cols-2 gap-x-5 gap-y-6 rounded-xl border border-dark-15 bg-dark-06 p-5 sm:p-6">
        {mobileFeatures.map((feature) => {
          const value = feature.key === "price"
            ? `${selectedPlan.price}/${selectedPlan.period === "year" ? "Year" : "Month"}`
            : selectedPlan.features?.[feature.key] || "—";

          return (
            <div key={feature.key} className={feature.fullWidth ? "col-span-2" : "min-w-0"}>
              <dt className="mb-1.5 text-sm text-neutral-60">{feature.label}</dt>
              <dd className="text-sm leading-relaxed text-white">{value}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default PlanComparisonMobile;
