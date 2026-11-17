import Button from "@/components/ui/button/Button";
import Section from "@/layout/Section";
import { useState } from "react";
import FaqItem from "./FaqItem";

const faqData = [
  {
    id: "1",
    question: "What is StreamVibe?",
    answer:
      "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    isOpen: true,
  },
  {
    id: "2",
    question: "How much does StreamVibe cost?",
    answer:
      "StreamVibe offers flexible subscription plans with affordable monthly and annual pricing options to fit your viewing preferences.",
    isOpen: false,
  },
  {
    id: "3",
    question: "What content is available on StreamVibe?",
    answer:
      "StreamVibe provides a vast library of movies, TV shows, exclusive originals, and documentaries across multiple genres.",
    isOpen: false,
  },
  {
    id: "4",
    question: "How can I watch StreamVibe?",
    answer:
      "StreamVibe is accessible on smartphones, tablets, laptops, smart TVs, and streaming devices using our app or web player.",
    isOpen: false,
  },
  {
    id: "5",
    question: "How do I sign up for StreamVibe?",
    answer:
      "StreamVibe registration is quick and easy by visiting our website or app and creating an account with your email address.",
    isOpen: false,
  },
  {
    id: "6",
    question: "What is the StreamVibe free trial?",
    answer:
      "StreamVibe offers a limited-time free trial for new members to explore our entire catalog before starting a paid subscription.",
    isOpen: false,
  },
  {
    id: "7",
    question: "How do I contact StreamVibe customer support?",
    answer:
      "StreamVibe customer support is available 24/7 through live chat, email, and our online help center to assist you with any issues.",
    isOpen: false,
  },
  {
    id: "8",
    question: "What are the StreamVibe payment methods?",
    answer:
      "StreamVibe accepts major credit cards, debit cards, digital wallets, and online payment gateways for secure transactions.",
    isOpen: false,
  },
];

const Faqs = () => {
  const [faqs, setFaqs] = useState(faqData);

  const handleToggle = (id) => {
    setFaqs(
      faqs.map((faq) => ({
        ...faq,
        isOpen: faq.id === id ? !faq.isOpen : false,
      })),
    );
  };

  return (
    <Section id="faq">
      <div className="flex flex-col gap-y-10 md:gap-y-12.5 lg:gap-y-15 2xl:gap-y-20">
        <div className="flex items-center justify-between gap-5 flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-y-2.5 md:max-w-8/10">
            <h2 className="typo text-2xl font-bold lg:text-[28px] 2xl:text-[38px]">
              We Provide you streaming experience across various devices.
            </h2>
            <p className="body-text">
              With StreamVibe, you can enjoy your favorite movies and TV shows
              anytime, anywhere. Our platform is designed to be compatible with
              a wide range of devices, ensuring that you never miss a moment of
              entertainment.
            </p>
          </div>
          <Button to="/support" variant="primary">
            Ask a Question
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-2 2xl:gap-20">
          <div className="flex flex-col">
            {faqs.slice(0, 4).map((faq) => (
              <div key={faq.id} className="py-5 first:pt-0 relative group/faq">
                <FaqItem faq={faq} onToggle={handleToggle} />
                <span className="absolute inset-[auto_0_0_0] translate-y-1/2 h-px bg-linear-to-r from-transparent from-0% via-brand-45/50 via-20% to-transparent to-90% md:group-last/faq:hidden"></span>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {faqs.slice(4, 8).map((faq) => (
              <div key={faq.id} className="py-5 first:pt-0 relative group/faq">
                <FaqItem faq={faq} onToggle={handleToggle} />
                <span className="absolute inset-[auto_0_0_0] translate-y-1/2 h-px bg-linear-to-r from-transparent from-0% via-brand-45/50 via-20% to-transparent to-90% group-last/faq:hidden"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Faqs;
