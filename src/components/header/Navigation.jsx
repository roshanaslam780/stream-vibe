import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Navigation = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`p-2 bg-dark-08 border border-dark-15 rounded-base hidden lg:flex lg:items-center z-10 ${isScrolling ? "fixed top-5.5 left-1/2 -translate-x-1/2" : "absolute top-1/2 left-1/2 -translate-1/2"}`}
    >
      <NavLink className="navLink" to="/">
        Home
      </NavLink>
      <NavLink className="navLink" to="/discover">
        Discover
      </NavLink>
      <NavLink className="navLink" to="/support">
        Support
      </NavLink>
      <NavLink className="navLink" to="/subscription">
        Subscription
      </NavLink>
    </nav>
  );
};

export default Navigation;
