import Logo from "../ui/Logo";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";
import SideMenu from "../sidemenu/SideMenu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/utils/clsx";
import SearchOverlay from "./SearchOverlay";

const Header = () => {
  const { pathname } = useLocation();
  const { state: isOpen, toggle, setFalse } = useToggle(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setFalse();
    setSearchOpen(false);
  }, [pathname, setFalse]);

  return (
    <>
      <header
        className={cn(
          `${pathname === "/" ? "absolute inset-[0_0_auto_0]" : ""}`,
        )}
      >
        <div className="rs-container">
          <div className="flex items-center justify-between pt-10 pb-3.5 lg:py-6 2xl:py-7.5 relative">
            <Logo />
            <Navigation />
            <HeaderActions onToggle={toggle} onSearch={() => setSearchOpen(true)} />
          </div>
        </div>
      </header>
      <SideMenu isOpen={isOpen} onToggle={toggle} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
