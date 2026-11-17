import Button from "@/components/ui/button/Button";

const PricingCard = ({ plan }) => {
  return (
    <div className="bg-dark-10 border border-dark-15 rounded-base 2xl:rounded-xl p-6 lg:p-10 2xl:p-12.5">
      <div className="flex flex-col gap-y-7.5 xl:gap-y-10 2xl:gap-y-12.5">
        <div className="flex flex-col gap-y-2.5 lg:gap-y-3 2xl:gap-y-4">
          <h4 className="typo text-lg lg:text-xl 2xl:text-[24px] font-bold leading-normal">
            {plan.name}
          </h4>
          <p className="body-text">{plan.description}</p>
        </div>
        <div className="flex items-end justify-start gap-x-0.5">
          <h3 className="typo font-semibold text-[24px] lg:text-[30px] 2xl:text-[40px] leading-[90%] ">
            {plan.price}
          </h3>
          <span className="body-text inline-block leading-none text-sm lg:text-base 2xl:text-lg">
            /{plan.period}
          </span>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 2xl:gap-x-5">
          <Button to="/support" variant="secondary">
            Start Free Trial
          </Button>
          <Button to="/support" variant="primary">
            Choose Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
