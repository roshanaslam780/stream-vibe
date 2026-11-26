import UtilityPage from "./UtilityPage";

const PrivacyPolicy = () => <UtilityPage eyebrow="Your information" title="Privacy Policy" updated="November 26, 2026" intro="Your privacy matters. This page describes what information may be handled when you browse StreamVibe, contact support, or use services connected to the site." sections={[
  { title: "Information handled while browsing", paragraphs: ["Your browser and services it connects to may exchange technical details such as browser and device type, requested pages, approximate network information, and diagnostic events. This information can help deliver pages, troubleshoot errors, and protect the service."] },
  { title: "Information you provide", paragraphs: ["If you submit a support request, details you enter—such as your name, email address, and message—are used to understand and respond to it. Avoid including sensitive information that is not needed to explain your question. The handling of submissions depends on the support and hosting services configured for the deployed site."] },
  { title: "Media and external providers", paragraphs: ["StreamVibe may request movie and television metadata from external providers, including TMDB. Requests may include technical connection information and the search or title details needed to return content. External providers follow their own privacy practices."] },
  { title: "How information may be used", paragraphs: ["Information may be used to provide requested pages and features, answer support requests, diagnose failures, maintain security, and improve the service. The pages in this project can be browsed without creating an account."] },
  { title: "Retention and protection", paragraphs: ["Information should be kept only as long as needed for the purposes described or as required by the services used to operate the site. Safeguards should be applied, though no internet transmission or storage system can be guaranteed completely secure."] },
  { title: "Your choices and questions", paragraphs: ["You can limit cookies and browser storage through your browser settings. For questions about information you submitted through support, contact us with enough detail to identify the request. This notice may change as the product and its integrations change."] },
]} />;

export default PrivacyPolicy;
