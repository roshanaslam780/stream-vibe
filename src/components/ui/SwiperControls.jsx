import { Icon } from "@iconify/react";
import { IconButton } from "./button/Button";
import { cn } from "@/utils/clsx";

const controlVariants = {
  default: "p-2 lg:p-3 2xl:p-4 bg-dark-06 border border-dark-12 rounded-base 2xl:rounded-xl",
  rounded: "",
  buttons: "",
};

const SwiperControls = ({
  swiper,
  paginationRef,
  variant = "default",
  buttonShape = "square",
  showProgressBar,
  className = "",
}) => {
  const selectedVariant = Object.hasOwn(controlVariants, variant) ? variant : "default";
  const shouldShowProgressBar = showProgressBar ?? selectedVariant !== "buttons";
  const buttonRadius = buttonShape === "circle" ? "rounded-full" : "rounded-lg";

  const handleSwiperNext = (swiper) => {
    swiper?.slideNext();
  };

  const handleSwiperPrev = (swiper) => {
    swiper?.slidePrev();
  };

  return (
    <div className={cn(controlVariants[selectedVariant], className)}>
      <div className={cn(
        "flex items-center gap-2 lg:gap-3 2xl:gap-3",
        shouldShowProgressBar ? "justify-between" : "justify-center",
      )}>
        <IconButton
          variant="secondary"
          className={buttonRadius}
          onClick={() => handleSwiperPrev(swiper)}
        >
          <Icon icon="fa:angle-left" />
        </IconButton>
        {shouldShowProgressBar && <div className="custom-pagination" ref={paginationRef}></div>}
        <IconButton
          variant="secondary"
          className={buttonRadius}
          onClick={() => handleSwiperNext(swiper)}
        >
          <Icon icon="fa:angle-right" />
        </IconButton>
      </div>
    </div>
  );
};

export default SwiperControls;
