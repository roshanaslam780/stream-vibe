import UtilityPage from "./UtilityPage";

const TermsOfUse = () => <UtilityPage eyebrow="Using StreamVibe" title="Terms of Use" updated="November 26, 2026" intro="These terms describe the basic expectations for using the StreamVibe website. By browsing the site, you agree to use its features responsibly and respect the rights of other users and content providers." sections={[
  { title: "About the service", paragraphs: ["StreamVibe is a movie and television discovery experience. It presents informational metadata and links to help visitors explore titles. Unless a separate agreement says otherwise, the site does not promise that a title is available to stream or that metadata is always complete or current."] },
  { title: "Responsible use", paragraphs: ["Use the site only for lawful purposes. Do not attempt to disrupt the service, bypass security, misuse forms, interfere with other visitors, or use automated methods that place unreasonable load on the site or its providers."] },
  { title: "Accounts and submissions", paragraphs: ["If an account or contact feature is offered, provide accurate information and use it respectfully. You are responsible for material you submit and must have the right to share it. Do not send unlawful, threatening, misleading, or harmful content."] },
  { title: "Content and external providers", paragraphs: ["The site design and StreamVibe branding belong to their respective owners. Movie and television names, artwork, and metadata may belong to studios, rights holders, or data providers. External services and destinations are governed by their own terms and policies."] },
  { title: "Availability and changes", paragraphs: ["Features may change, be temporarily unavailable, or be removed as the service evolves. Information is provided for discovery purposes and may contain errors. We may update these terms by publishing a revised version on this page."] },
  { title: "Contact", paragraphs: ["If you have a question about these terms or how to use the site, contact the StreamVibe team through the support page."] },
]} />;

export default TermsOfUse;
