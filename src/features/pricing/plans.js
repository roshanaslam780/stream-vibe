const pricingPlans = [
  {
    billingCycle: "monthly",
    title: "Monthly Plans",
    plans: [
      {
        id: "basic-monthly",
        name: "Basic Plan",
        description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        price: "$9.99",
        period: "month",
        freeTrialText: "Start Free Trial",
        choosePlanText: "Choose Plan",
      },
      {
        id: "standard-monthly",
        name: "Standard Plan",
        description: "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
        price: "$12.99",
        period: "month",
        freeTrialText: "Start Free Trial",
        choosePlanText: "Choose Plan",
      },
      {
        id: "premium-monthly",
        name: "Premium Plan",
        description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
        price: "$14.99",
        period: "month",
        freeTrialText: "Start Free Trial",
        choosePlanText: "Choose Plan",
      },
    ],
  },
  {
    billingCycle: "yearly",
    title: "Yearly Plans",
    plans: [
      {
        id: "basic-yearly",
        name: "Basic Plan",
        description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        price: "$99.99",
        period: "year",
        freeTrialText: "Start Free Trial",
        choosePlanText: "Choose Plan",
      },
      {
        id: "standard-yearly",
        name: "Standard Plan",
        description: "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
        price: "$129.99",
        period: "year",
        freeTrialText: "Start Free Trial",
        choosePlanText: "Choose Plan",
      },
      {
        id: "premium-yearly",
        name: "Premium Plan",
        description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
        price: "$149.99",
        period: "year",
        freeTrialText: "Start Free Trial",
        choosePlanText: "Choose Plan",
      },
    ],
  },
];

export default pricingPlans