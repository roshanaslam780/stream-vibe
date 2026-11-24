import { useState } from "react";
import Section from "@/layout/Section";
import Button from "@/components/ui/button/Button";
import pricingPlans from "./plans";
import PricingCard from "./PricingCard";

const PricingPlans = ({ billingPeriod: controlledBillingPeriod, onBillingPeriodChange }) => {
  const [localBillingPeriod, setLocalBillingPeriod] = useState("monthly");
  const billingPeriod = controlledBillingPeriod ?? localBillingPeriod;
  const setBillingPeriod = onBillingPeriodChange ?? setLocalBillingPeriod;
  const selectedPlans = pricingPlans.find(
    (item) => item.billingCycle === billingPeriod,
  );

  return (
    <Section id="pricing">
      <div className="flex flex-col gap-y-10 md:gap-y-12.5 lg:gap-y-15 2xl:gap-y-20">
        <div className="flex items-center justify-between gap-5 flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-y-2.5 md:max-w-8/10">
            <h2 className="typo text-2xl font-bold lg:text-[28px] 2xl:text-[38px]">
              Choose the plan that's right for you
            </h2>
            <p className="body-text">
              Join StreamVibe and select from our flexible subscription options
              tailored to suit your viewing preferences. Get ready for non-stop
              entertainment!
            </p>
          </div>
          <div className="flex p-2 bg-dark-06 border border-dark-15 rounded-lg 2xl:rounded-base 2xl:p-2.5">
            <Button
              variant="toggle"
              active={billingPeriod === "monthly"}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant="toggle"
              active={billingPeriod === "yearly"}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 2xl:gap-7.5">
          {selectedPlans.plans.map((item) => (
            <PricingCard key={item.id} plan={item} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PricingPlans;
