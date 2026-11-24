import { useState } from "react";
import PricingPlans from "@/features/pricing/PricingPlans";
import PlanComparison from "@/features/pricing/PlanComparison";
import CallToAction from "@/features/callToAction/CallToAction";

const Subscription = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  return (
    <>
      <PricingPlans
        billingPeriod={billingPeriod}
        onBillingPeriodChange={setBillingPeriod}
      />
      <PlanComparison billingPeriod={billingPeriod} />
      <CallToAction />
    </>
  );
};

export default Subscription
