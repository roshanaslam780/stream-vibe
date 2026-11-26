import { Icon } from "@iconify/react";
import { IconButton } from "@/components/ui/button/Button";

const HeaderActions = ({ onToggle, onSearch }) => {
  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center justify-center gap-x-2">
        <button
          type="button"
          aria-label="Open search"
          onClick={onSearch}
          className="size-8 2xl:size-10 flex-center bg-transparent text-white flex-center transition-colors ease-(--transition-1) duration-250 hover:bg-brand-45 rounded-base"
        >
          <Icon icon="akar-icons:search" className="size-5 2xl:size-6" />
        </button>
        <button
          type="button"
          className="size-8 2xl:size-10 flex-center bg-transparent text-white flex-center transition-colors ease-(--transition-1) duration-250 hover:bg-brand-45 rounded-base"
        >
          <Icon icon="lucide:bell" className="size-5 2xl:size-6" />
        </button>
      </div>
      <div className="flex items-center gap-x-4 lg:hidden">
        {/* Search Menu Toggle */}
        <IconButton type="button" variant="outline" aria-label="Open search" onClick={onSearch}>
          <Icon icon="akar-icons:search" className="size-6" />
        </IconButton>
        {/* Mobile Menu Toggle */}
        <IconButton type="button" variant="outline" onClick={() => onToggle()}>
          <Icon
            icon="heroicons:bars-3-bottom-right-16-solid"
            className="size-6"
          />
        </IconButton>
      </div>
    </>
  );
};

export default HeaderActions;
