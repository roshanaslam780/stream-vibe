import { Icon } from "@iconify/react";
import Logo from "../ui/Logo";
import { IconButton } from "../ui/button/Button";
import { Link } from "react-router";

const SideMenu = ({ isOpen, onToggle }) => {
  const LinkStyles =
    "text-sm md:text-base text-neutral-60 font-default font-semibold hover-underline";
  const HeadingStyles =
    "text-base md:text-lg text-white font-default font-semibold";

  return (
    <aside
      className={`fixed inset-0 bg-dark-06/25 backdrop-blur-[2px] transition-all duration-250 ease-(--transition-1) ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className="absolute inset-0 z-1 bg-dark-06/25"
        onClick={() => onToggle()}
      ></div>
      <div
        className={`relative z-2 w-full h-full max-w-110 ms-auto bg-dark-06 border-s border-dark-15 transition-translate duration-250 ease-(--transition-1) ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="w-full h-full flex flex-col gap-0">
          <div className="w-full flex items-center justify-between p-6 md:p-8">
            <Logo />
            <div className="">
              <IconButton
                variant="secondary"
                className="rounded-full"
                onClick={() => onToggle()}
              >
                <Icon icon="at-icons:cross" />
              </IconButton>
            </div>
          </div>
          <div className="w-full grow border-y border-dark-15 p-6 md:p-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-y-4">
                <div className={HeadingStyles}>Home</div>
                <div className="flex flex-col gap-2">
                  <Link to="/#categories" className={LinkStyles}>
                    Categories
                  </Link>
                  <Link to="/#devices" className={LinkStyles}>
                    Devices
                  </Link>
                  <Link to="/#pricing" className={LinkStyles}>
                    Pricing
                  </Link>
                  <Link to="/#faq" className={LinkStyles}>
                    FAQ's
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className={HeadingStyles}>Movies</div>
                <div className="flex flex-col gap-2">
                  <Link to="/discover" className={LinkStyles}>
                    Genres
                  </Link>
                  <Link to="/discover" className={LinkStyles}>
                    Trending
                  </Link>
                  <Link to="/discover" className={LinkStyles}>
                    New Releases
                  </Link>
                  <Link to="/discover" className={LinkStyles}>
                    Popular
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className={HeadingStyles}>Shows</div>
                <div className="flex flex-col gap-2">
                  <Link to="/discover" className={LinkStyles}>
                    Genres
                  </Link>
                  <Link to="/discover" className={LinkStyles}>
                    Trending
                  </Link>
                  <Link to="/discover" className={LinkStyles}>
                    New Releases
                  </Link>
                  <Link to="/discover" className={LinkStyles}>
                    Popular
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className={HeadingStyles}>Support</div>
                <div className="flex flex-col gap-2">
                  <Link to="/support" className={LinkStyles}>
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className={HeadingStyles}>Subscription</div>
                <div className="flex flex-col gap-2">
                  <Link to="/#pricing" className={LinkStyles}>
                    Plans
                  </Link>
                  <Link to="/#pricing" className={LinkStyles}>
                    Features
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
              <div className={HeadingStyles}>Connect With Us</div>
              <div className="flex items-center justify-start gap-x-4">
                <IconButton variant="secondary">
                  <Icon icon="akar-icons:facebook-fill" />
                </IconButton>
                <IconButton variant="secondary">
                  <Icon icon="akar-icons:twitter-fill" />
                </IconButton>
                <IconButton variant="secondary">
                  <Icon icon="akar-icons:linkedin-box-fill" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
