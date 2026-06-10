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
}

export const services: Service[] = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description:
      "Crafting intuitive, pixel-perfect interfaces that convert visitors into loyal customers.",
    icon: "Palette",
  },
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Building blazing-fast, scalable web applications using cutting-edge technologies.",
    icon: "Code2",
  },
  {
    id: "saas",
    title: "SaaS Products",
    description:
      "End-to-end SaaS development — from MVP to market-ready platforms with robust architecture.",
    icon: "Layers",
  },
  {
    id: "ai",
    title: "AI Solutions",
    description:
      "Integrating AI and machine learning to automate workflows and unlock intelligent experiences.",
    icon: "Brain",
  },
  {
    id: "branding",
    title: "Branding",
    description:
      "Creating distinctive brand identities that resonate with your audience and stand out.",
    icon: "Sparkles",
  },
  {
    id: "automation",
    title: "Automation",
    description:
      "Streamlining operations with custom automation solutions that save time and reduce costs.",
    icon: "Zap",
  },
];

export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "OpenAI",
  "Stripe",
  "Vercel",
  "AWS",
];

export const testimonials = [
  {
    id: 1,
    quote:
      "WebLab transformed our idea into a polished product. The attention to detail and design quality exceeded our expectations.",
    author: "Arjun Mehta",
    role: "CEO, TechVentures",
    avatar: null,
  },
  {
    id: 2,
    quote:
      "The team's execution speed was exceptional. They delivered a complex SaaS platform in record time without compromising quality.",
    author: "Priya Sharma",
    role: "Founder, DataFlow",
    avatar: null,
  },
  {
    id: 3,
    quote:
      "One of the best development partners we've worked with. Their AI integrations brought our product to the next level.",
    author: "Rahul Kapoor",
    role: "CTO, InnovateLab",
    avatar: null,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into understanding your business, goals, target audience, and competition to shape the perfect strategy.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We craft a comprehensive roadmap, defining architecture, user flows, and technical requirements for success.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our designers create stunning, conversion-focused interfaces that bring your vision to life pixel by pixel.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Clean, scalable code meets cutting-edge technology. We build robust applications that perform flawlessly.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Rigorous testing, deployment optimization, and ongoing support ensure a seamless launch and beyond.",
  },
];

export const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Responsive Designs" },
];
