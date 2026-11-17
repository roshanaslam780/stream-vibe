import { cn } from "@/utils/clsx";

const Section = ({ className = "", id, children, tag = "section" }) => {
  const Component = tag;
  return (
    <Component
      className={cn(
        `rs-container py-10 md:py-12 lg:py-14 2xl:py-16 ${className}`,
      )}
      id={id}
    >
      {children}
    </Component>
  );
};

export default Section;
