const Fieldset = ({ children, legend = "legend" }) => {
  return (
    <div className="relative bg-dark-08 sm:border sm:border-dark-15 p-10 sm:rounded-base md:rounded-xl">
      <div className="absolute top-0 left-0 translate-x-1/2 -translate-y-1/2 px-5 py-2 bg-brand-45 rounded-base typo text-base 2xl:text-lg">
        {legend}
      </div>
      <div className="w-full max-w-full">{children}</div>
    </div>
  );
};

export default Fieldset;
