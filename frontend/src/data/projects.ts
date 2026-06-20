export interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  link: string;
  images: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "tabun-chai",
    number: "01",
    title: "Tabun Chai",
    type: "Restaurant Website",
    description:
      "Premium restaurant website with modern UI, menu showcase, responsive experience, and strong visual storytelling.",
    link: "https://tabun-chai.vercel.app/",
    images: [
      "/workpics/tabun-1.png",
      "/workpics/tabun-2.png",
      "/workpics/tabun-3.png",
      "/workpics/tabun-4.png",
      "/workpics/tabun-5.png",
      "/workpics/tabun-6.png",
    ],
    featured: true,
  },
  {
    id: "dropiq",
    number: "02",
    title: "DropIQ",
    type: "SaaS Platform",
    description:
      "Modern SaaS dashboard and analytics platform focused on lead generation and conversion tracking.",
    link: "https://dropiq-nine.vercel.app/",
    images: [
      "/workpics/dropiq-1.png",
      "/workpics/dropiq-2.png",
      "/workpics/dropiq-3.png",
      "/workpics/dropiq-4.png",
      "/workpics/dropiq-5.png",
    ],
    featured: true,
  },
  {
    id: "narayana-school-ctr",
    number: "03",
    title: "Narayana School Chittoor",
    type: "Educational Website",
    description:
      "A high-end, professional educational website built for Narayana Schools (Chittoor branch). Features a clean minimalist dark mode, custom GSAP animations, and Lenis smooth scrolling.",
    link: "https://narayanaschoolctr.vercel.app",
    images: [
      "/workpics/narayana-1.png",
    ],
    featured: true,
  },
];

export interface Founder {
  id: string;
  name: string;
  role: string;
  image: string;
  portfolio: string;
  linkedin: string;
}

export const founders: Founder[] = [
  {
    id: "chethan-akash",
    name: "Chethan Akash",
    role: "Founder",
    image: "/workpics/chethan-akash.png",
    portfolio: "https://chethanakash.vercel.app/",
    linkedin: "https://www.linkedin.com/in/chethan-akash/",
  },
  {
    id: "sai-videsh",
    name: "Sai Videsh",
    role: "Founder",
    image: "/workpics/sai-videsh.png",
    portfolio: "https://saividesh.vercel.app/",
    linkedin: "https://www.linkedin.com/in/sai-videsh-ssv/",
  },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  note?: string;
  comingSoon?: boolean;
  bonus?: boolean;
}

export const services: Service[] = [
  {
    id: "seo-aeo",
    title: "Brand Audit and Custom Stratergy",
    description:
      "A Detailed Audit will be conducted for brand, as an extension of generic audit, to know more details about it. After that a custom stratergy will be made according to the metrics we got from audit.",
    icon: "Search",
  },
  {
    id: "ui-design",
    title: "UI Designs for brand site",
    description:
      "Pixel-perfect visual designs crafted around your brand theme,like colours, typography, design palette, and identity, so every screen feels unmistakably yours.",
    icon: "Palette",
  },
  {
    id: "ux-strategy",
    title: "UX & Conversion Strategy",
    description:
      "Conversion-focused layouts and user flows refined through real-user pen testing, ensuring every interaction feels intuitive and drives results.",
    icon: "MousePointerClick",
  },
  {
    id: "seo-dev",
    title: "SEO-First Development",
    description:
      "Your finalised design built with clean, semantic code that Google crawlers and AI search engines can easily understand about your business.",
    icon: "Code2",
  },
  {
    id: "aeo",
    title: "GEO and AEO",
    description:
      "Generative Engine Optimisation and Answer Engine Optimisation will be implemented for brands, on a specific long term contract and if asked by the brand.",
    icon: "Search",
  },
  {
    id: "faq-whatsapp",
    title: "FAQ Bot & WhatsApp Agent",
    description:
      "Smart FAQ chatbot and WhatsApp agent setup for your website, handle customer queries instantly, 24/7, without manual effort.",
    icon: "MessageCircle",
  },
  {
    id: "gbp-automation",
    title: "Google Business Profile",
    description:
      "Google Business Profile optimisation and WhatsApp Business number automation setup, included as a bonus for every brand we work with.",
    icon: "Zap",
  },
  {
    id: "ai-review-capture",
    title: "AI Review Capture System",
    description:
      "Directly capture everyone who visits your site with minimal details, automatically store them in your CRM, and facilitate seamless review collection.",
    icon: "Brain",
  },
  {
    id: "ai-lead-nurturing",
    title: "AI Lead Nurturing System",
    description:
      "Automatically follow up with old leads, re-engage cold contacts, and automate nurturing workflows to increase client retention.",
    icon: "Zap",
  },
];

export const technologies = [
  "Figma",
  "Framer",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "Vercel",
];

export const testimonials = [
  {
    id: 1,
    quote:
      "His dedication towards work is what inspires me, like the order was given and within 2 days, he delivered a cleanly designed Customer page for my cafe, and also gave constant support for update cycles and bugs that users encountered. He was also ready to add AI automation of booking system with a whatsapp chat bot integration to the system.",
    author: "S Ramesh",
    role: "Owner, Tabun Chai",
    avatar: null,
    rating: 5.0,
  },
  {
    id: 2,
    quote:
      "To be honest, we were struggling with our online coffee bean sales since our site was very slow. These guys did a complete makeover in just a week. Now, customers tell us the cart flow is super smooth on their phone. Even when we wanted small text changes at midnight, they replied and sorted it immediately.",
    author: "Karthik Gowda",
    role: "Partner, Malnad Estates & Roasters",
    avatar: null,
    rating: 4.8,
  },
  {
    id: 3,
    quote:
      "Really happy with the website design they did. It's clean and actually matches our cafe's industrial theme. They also set up the automated review system which has helped us collect Google reviews without us asking each customer manually. Solid support all through the launch.",
    author: "Marcus Thorne",
    role: "Founder, Black Oak Espresso",
    avatar: null,
    rating: 4.6,
  },
  {
    id: 4,
    quote:
      "I'm not a tech person at all, but they explained everything so simply. The new layout is gorgeous and we are getting double the bookings for our weekend barista workshops. Whenever there's a small issue, they fix it before I even check. Highly recommended for local businesses.",
    author: "Elena Rostova",
    role: "Owner, Brew Craft",
    avatar: null,
    rating: 4.8,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Brand Audit",
    description:
      "We run an in-depth audit of your current digital setup to see where you stand, what is holding you back, and how your brand is perceived.",
  },
  {
    number: "02",
    title: "Strategy Building",
    description:
      "We sit down and map out a clear action plan based on the audit findings, outlining how we will turn visitors into customers.",
  },
  {
    number: "03",
    title: "Mockups & Wireframes",
    description:
      "Before jumping into code, we create clean wireframes and custom UI mockups so you can see exactly how the layout will feel.",
  },
  {
    number: "04",
    title: "UX & Visual Design",
    description:
      "We bring the wireframes to life with your brand colors, focusing entirely on ease-of-use and clear paths for users to take action.",
  },
  {
    number: "05",
    title: "SEO-First Development",
    description:
      "We write clean, lightweight code structured so that Google crawlers and AI search engines can read and index your business details instantly.",
  },
  {
    number: "06",
    title: "Non-Tech SEO",
    description:
      "We handle the on-page and off-page details like content layout, metadata, search console setup, and copy that appeals to actual humans.",
  },
  {
    number: "07",
    title: "GEO & AEO",
    description:
      "On long-term contracts, we optimise your brand for modern Generative Search Engines (GEO) and AI Answer Engines (AEO) so AI recommends you.",
  },
  {
    number: "08",
    title: "Custom AI Systems",
    description:
      "If requested, we build custom AI review collection, lead capturing tools, or internal Agentic AI workflows tailored to your business needs.",
  },
];

export const stats = [
  { value: 8, suffix: "+", label: "Projects Delivered" },
  { value: 97, suffix: "%", label: "Client Satisfaction" },
  { value: 6, suffix: "+", label: "Months Experience" },
  { value: 100, suffix: "%", label: "Responsive Designs" },
];
