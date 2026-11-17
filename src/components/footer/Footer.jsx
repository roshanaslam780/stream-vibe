import Section from "@/layout/Section";
import { Link } from "react-router";
import { IconButton } from "../ui/button/Button";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/clsx";

const FooterContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-7.5">
      {children}
    </div>
  );
};

const FooterBlock = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-4 lg:gap-y-5 2xl:gap-y-6">
      {children}
    </div>
  );
};

const FooterBlockTitle = ({ children }) => {
  return (
    <h4 className="typo font-semibold text-base lg:text-lg 2xl:text-xl">
      {children}
    </h4>
  );
};

const FooterBlockList = ({ children, type }) => {
  return (
    <div
      className={cn(
        `flex ${type === "social" ? "flex-row gap-x-2 lg:gap-x-2.5 2xl:gap-x-3.5" : "flex-col gap-y-2 lg:gap-y-2.5 2xl:gap-y-3.5"}`,
      )}
    >
      {children}
    </div>
  );
};

const FooterBlockListItem = ({ children, target = "/" }) => {
  return (
    <Link
      to={target}
      className="typo text-sm lg:text-base 2xl:text-lg capitalize text-neutral-60 hover-underline block"
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark-06">
      <Section className="py-0!">
        <div className="py-12.5 lg:py-20 2xl:py-25">
          <FooterContainer>
            {/* Home Block */}
            <FooterBlock>
              <FooterBlockTitle>Home</FooterBlockTitle>
              <FooterBlockList>
                <FooterBlockListItem target="/#categories">
                  Categories
                </FooterBlockListItem>
                <FooterBlockListItem target="/#devices">
                  Devices
                </FooterBlockListItem>
                <FooterBlockListItem target="/#pricing">
                  Pricing
                </FooterBlockListItem>
                <FooterBlockListItem target="/#faq">FAQ</FooterBlockListItem>
              </FooterBlockList>
            </FooterBlock>

            {/* Movies Block */}
            <FooterBlock>
              <FooterBlockTitle>Movies</FooterBlockTitle>
              <FooterBlockList>
                <FooterBlockListItem target="/discover">
                  Gernes
                </FooterBlockListItem>
                <FooterBlockListItem target="/discover">
                  Trending
                </FooterBlockListItem>
                <FooterBlockListItem target="/discover">
                  New Release
                </FooterBlockListItem>
                <FooterBlockListItem target="/discover">
                  Popular
                </FooterBlockListItem>
              </FooterBlockList>
            </FooterBlock>

            {/* Shows Block */}
            <FooterBlock>
              <FooterBlockTitle>Shows</FooterBlockTitle>
              <FooterBlockList>
                <FooterBlockListItem target="/discover">
                  Gernes
                </FooterBlockListItem>
                <FooterBlockListItem target="/discover">
                  Trending
                </FooterBlockListItem>
                <FooterBlockListItem target="/discover">
                  New Release
                </FooterBlockListItem>
                <FooterBlockListItem target="/discover">
                  Popular
                </FooterBlockListItem>
              </FooterBlockList>
            </FooterBlock>

            {/* Support Block */}
            <FooterBlock>
              <FooterBlockTitle>Support</FooterBlockTitle>
              <FooterBlockList>
                <FooterBlockListItem target="/support">
                  Contact Us
                </FooterBlockListItem>
              </FooterBlockList>
            </FooterBlock>

            {/* Subscription Block */}
            <FooterBlock>
              <FooterBlockTitle>Subscvription</FooterBlockTitle>
              <FooterBlockList>
                <FooterBlockListItem target="/#pricing">
                  Plans
                </FooterBlockListItem>
                <FooterBlockListItem target="/#pricing">
                  Features
                </FooterBlockListItem>
              </FooterBlockList>
            </FooterBlock>

            {/* Connect With Us (Social) Block */}
            <FooterBlock>
              <FooterBlockTitle>Connect With Us</FooterBlockTitle>
              <FooterBlockList type="social">
                <IconButton variant="secondary">
                  <Icon icon="akar-icons:facebook-fill" />
                </IconButton>
                <IconButton variant="secondary">
                  <Icon icon="akar-icons:twitter-fill" />
                </IconButton>
                <IconButton variant="secondary">
                  <Icon icon="akar-icons:linkedin-box-fill" />
                </IconButton>
              </FooterBlockList>
            </FooterBlock>
          </FooterContainer>
        </div>
        <div className="py-5 md:pb-10 2xl:pb-12.5 2xl:pt-6 border-t border-dark-15">
          <div className="flex flex-wrap gap-5 justify-start">
            <p className="body-text me-auto">
              {`@${new Date().getFullYear()} streamvibe, All Rights Reserved`}
            </p>
            <ul className="flex items-center justify-center gap-0">
              <li className="px-4 2xl:px-5 first-of-type:ps-0 last-of-type:pe-0 not-last-of-type:border-r not-last-of-type:border-dark-15">
                <Link to="/terms-of-use" className="body-text hover-underline">
                  Terms Of Use
                </Link>
              </li>
              <li className="px-4 2xl:px-5 first-of-type:ps-0 last-of-type:pe-0 not-last-of-type:border-r not-last-of-type:border-dark-15">
                <Link
                  to="/privacy-policy"
                  className="body-text hover-underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="px-4 2xl:px-5 first-of-type:ps-0 last-of-type:pe-0 not-last-of-type:border-r not-last-of-type:border-dark-15">
                <Link to="/cookie-policy" className="body-text hover-underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;
