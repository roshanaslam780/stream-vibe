import { cn } from "@/utils/clsx";
import { Icon } from "@iconify/react";

const FaqItem = ({ faq, onToggle }) => {
  return (
    <div className="flex flex-col w-full max-w-full">
      <button
        className="flex items-center justify-start gap-4 2xl:gap-6 cursor-pointer"
        onClick={() => onToggle(faq.id)}
      >
        <div className="w-11 h-11.5 lg:w-12.5 lg:h-13.5 2xl:w-15 2xl:h-16 shrink-0 flex-center bg-dark-12 typo text-base 2xl:text-xl font-semibold border border-dark-15 rounded-md">
          {`0${faq.id}`}
        </div>
        <h3 className="typo text-base md:text-lg lg:text-xl 2xl:text-[22px] grow text-start">
          {faq.question}
        </h3>
        <div className="size-8 flex-center">
          <Icon
            className="size-5 lg:size-6"
            icon={faq.isOpen ? "akar-icons:minus" : "akar-icons:plus"}
          />
        </div>
      </button>
      <div
        className={cn(
          `overflow-hidden transition-all duration-250 ease-(--transition-1) grid ${
            faq.isOpen
              ? "grid-rows-[1fr] max-sm:pt-4"
              : "grid-rows-[0fr] max-sm:pt-0"
          }`,
        )}
      >
        <p
          className={cn(
            `body-text min-h-0 sm:ms-14 lg:ms-17.5 2xl:ms-21 transition-all duration-250 ease-(--transition-1) ${
              faq.isOpen
                ? "opacity-100 visible"
                : "opacity-1 invisible"
            }`,
          )}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

export default FaqItem;
