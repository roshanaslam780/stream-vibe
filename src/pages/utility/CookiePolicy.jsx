import UtilityPage from "./UtilityPage";

const CookiePolicy = () => <UtilityPage eyebrow="Your browser choices" title="Cookie Policy" updated="November 26, 2026" intro="This policy explains how StreamVibe may use cookies and similar browser storage to keep the site working, remember preferences, and support optional features." sections={[
  { title: "Cookies and browser storage", paragraphs: ["Cookies are small text files stored by your browser. Similar technologies, including local storage, can remember settings or help a website operate. Their use depends on which features and services are enabled on the deployed site."] },
  { title: "Why they may be used", paragraphs: ["Essential storage may support navigation, security, and basic preferences. Optional analytics, if enabled, may help understand how visitors use the site. Embedded or external services may also use their own storage under their own policies."] },
  { title: "Third-party services", paragraphs: ["Media metadata and other features can come from external providers. Those providers may receive technical connection details when your browser requests their content. Their cookie and privacy practices are governed by their own notices."] },
  { title: "Managing your choices", paragraphs: ["Most browsers let you review, delete, or block cookies in their settings. Blocking essential storage can affect some site functions. If a consent control is presented, use it to manage optional cookies for that site."] },
  { title: "Updates and questions", paragraphs: ["We may update this page when site features or requirements change. The date above indicates its latest revision. For questions about cookies on StreamVibe, please contact us through the support page."] },
]} />;

export default CookiePolicy;
