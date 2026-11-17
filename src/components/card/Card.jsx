import { cn } from "@/utils/clsx";

const Card = ({ children, className = "" }) => {
  return (
    <article
      className={cn(
        `bg-dark-10 border border-dark-15 rounded-base 2xl:rounded-xl flex flex-col gap-3 md:gap-4 2xl:gap-5 p-3 md:p-4 2xl:p-5  ${className}`,
      )}
    >
      {children}
    </article>
  );
};

export default Card;
