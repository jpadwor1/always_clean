export const PLANS = [
  {
    name: "Small Pools",
    type: "Regular Pool Cleaning",
    price: 100,
    priceFrequency: "per month",
    description: "Designed for smaller pools less than 10,000 gallons",
    features: [
      "Test and chemically balance water (tailored for residential needs)",
      "Clean skimmer and pump basket",
      "Brush tile band and siding",
      "Vacuum as necessary",
      "Weekly debris removal",
    ],
    bookingLink: "/booking",
    learnMoreLink: "/services/regular-cleaning",
    priceIds: {
      test: "price_1OelNvDAvxyq4Y7vw5eO9Y86",
      production: "price_1OmKZuDAvxyq4Y7vB88OkIfZ",
    },
  },
  {
    name: "Play Pools",
    type: "Regular Pool Cleaning",
    price: 145,
    priceFrequency: "per month",
    description: "Ideal for residential pools, chemicals included",
    features: [
      "Test and chemically balance water (tailored for residential needs)",
      "Clean skimmer and pump basket",
      "Brush tile band and siding",
      "Vacuum as necessary",
      "Weekly debris removal",
    ],
    bookingLink: "/booking",
    learnMoreLink: "/services",
    priceIds: {
      test: "price_1OelNvDAvxyq4Y7vw5eO9Y86",
      production: "price_1OenuvDAvxyq4Y7voul8c3Nw",
    },
  },
  {
    name: "Diving or Extra Large",
    price: 175,
    priceFrequency: "per month",
    description: "Designed for larger pools",
    features: [
      'All features in "Play Pools" plan',
      "Enhanced chemical balancing for larger water volumes",
      "Additional vacuuming due to larger surface area",
      "Additional Feature: Monthly equipment performance check",
    ],
    bookingLink: "/booking",
    learnMoreLink: "/services/regular-cleaning",
    priceIds: {
      test: "",
      production: "",
    },
  },
  // {
  //   name: 'Commercial and Community Pools',
  //   price: 'Call',
  //   priceSuffix: 'for quote',
  //   description: 'Custom services for high-traffic pools',
  //   features: [
  //     'All features in lower level plans',
  //     'Custom scheduling options',
  //     'Tailored services for high-traffic pools',
  //     'High-capacity skimmer and filter cleaning',
  //     'Full deck and surrounding area cleaning',
  //     'And more...',
  //   ],
  //   callToAction: 'Call 520-525-5956',
  //   learnMoreLink: '/services',
  //   priceIds: {
  //     test: '',
  //     production: '',
  //   },
  // },
];

export const STRIPE_PLANS = [
  {
    name: "SPECIAL",
    type: "Regular Pool Cleaning",
    price: 99,
    priceIds: {
      test: "price_1OelNvDAvxyq4Y7vw5eO9Y86",
      production: "price_1OenuvDAvxyq4Y7voul8c3Nw",
    },
  },
  {
    name: "WINTER SPECIAL",
    type: "Regular Pool Cleaning",
    price: 125,
    priceIds: {
      test: "price_1OelNvDAvxyq4Y7vw5eO9Y86",
      production: "price_1OmKZuDAvxyq4Y7vB88OkIfZ",
    },
  },
  {
    name: "STANDARD",
    type: "Regular Pool Cleaning",
    price: 145,
    priceIds: {
      test: "price_1OelNvDAvxyq4Y7vw5eO9Y86",
      production: "price_1P7lgWDAvxyq4Y7vcYvg8xXR",
    },
  },
  {
    name: "Military Discount",
    type: "Regular Pool Cleaning",
    price: 115,
    priceIds: {
      test: "price_1OelNvDAvxyq4Y7vw5eO9Y86",
      production: "price_1P4VeqDAvxyq4Y7vpbLVc4jF",
    },
  },
  {
    name: "ENHANCED",
    price: 175,
    priceIds: {
      test: "",
      production: "",
    },
  },
  {
    name: "COMMERCIAL",
    price: 500,
    priceIds: {
      test: "",
      production: "",
    },
  },
];

export const customerData = [
  {
    firstName: "John",
    lastName: "Padworski",
    address: "2268 Seagull ct. San Jacinto, CA 92582",
    phoneNumber: "520-525-5956",
    email: "johnpadworski@gmail.com",
    serviceDay: "Monday",
    outstandingBalance: "125.00",
  },
  {
    firstName: "Emily",
    lastName: "Chen",
    address: "3421 Pine Street, Seattle, WA 98101",
    phoneNumber: "206-555-0123",
    email: "emily.chen@example.com",
    serviceDay: "Wednesday",
    outstandingBalance: "200.00",
  },
  {
    firstName: "Carlos",
    lastName: "Gonzalez",
    address: "789 Birch Avenue, Austin, TX 78701",
    phoneNumber: "512-555-4567",
    email: "carlos.gonzalez@example.com",
    serviceDay: "Friday",
    outstandingBalance: "150.00",
  },
  {
    firstName: "Aisha",
    lastName: "Kumar",
    address: "654 Elm Road, Atlanta, GA 30301",
    phoneNumber: "404-555-7890",
    email: "aisha.kumar@example.com",
    serviceDay: "Tuesday",
    outstandingBalance: "175.00",
  },
  {
    firstName: "Liam",
    lastName: "Smith",
    address: "1010 Maple Drive, Denver, CO 80201",
    phoneNumber: "303-555-1234",
    email: "liam.smith@example.com",
    serviceDay: "Thursday",
    outstandingBalance: "300.00",
  },
];
