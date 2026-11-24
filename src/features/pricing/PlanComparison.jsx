import Section from "@/layout/Section";
import pricingPlans from "./plans";
import PlanComparisonDesktop from "./PlanComparisonDesktop";
import PlanComparisonMobile from "./PlanComparisonMobile";

const PlanComparison = ({ billingPeriod = "monthly" }) => {
  const selectedPlans = pricingPlans.find((group) => group.billingCycle === billingPeriod)
    ?? pricingPlans[0];

  return (
    <Section>
      <div className="mb-7 flex flex-col gap-2.5 md:mb-10">
        <h2 className="typo text-2xl font-bold lg:text-[28px] 2xl:text-[38px]">
          Compare our plans and find the right one for you
        </h2>
        <p className="body-text">
          StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that’s right for you.
        </p>
      </div>
      <PlanComparisonDesktop plans={selectedPlans.plans} />
      <PlanComparisonMobile plans={selectedPlans.plans} />
    </Section>
  );
};

export default PlanComparison;
