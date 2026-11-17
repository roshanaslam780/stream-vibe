import React, { useState, useEffect } from "react";
import { cn } from "@/utils/clsx"; // Adjust to your utility import

const CustomPagination = ({ swiper, length = 5 }) => {
  const [activeIndex, setActiveIndex] = useState(swiper?.activeIndex || 0);

  useEffect(() => {
    if (!swiper) return;

    // Set initial index
    setActiveIndex(swiper.activeIndex);

    // Update state when slide changes
    const handleSlideChange = () => {
      setActiveIndex(swiper.activeIndex);
    };

    swiper.on("slideChange", handleSlideChange);

    // Cleanup listener on unmount
    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper]);

  const handleClick = (index) => {
    swiper?.slideTo(index);
  };

  return (
    <div className="flex items-center justify-between gap-1">
      {Array.from({ length }, (_, index) => {
        return (
          <button
            key={index}
            type="button"
            className={cn(
              "custom-bullet",
              activeIndex === index && "active"
            )}
            // aria-index={index + 1}
            // aria-slide-to={index}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default CustomPagination;
