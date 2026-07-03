"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "CMI Prototype",
    description:
      "A full homepage redesign for Carring Minds International, built in one day before any brief was given. The most relevant sample we can show you.",
    type: "Web Design · Healthcare",
    image: "/portfolio/carring-minds.webp",
    url: "https://carringmindsinternational-agenticbros.netlify.app",
  },
  {
    title: "Likhit Pen",
    description:
      "Premium stationery e-commerce store with product showcase and smooth checkout experience.",
    type: "Ecommerce",
    image: "/portfolio/likhit-pens.webp",
    url: "https://likhit-pens-website.vercel.app/",
  },
  {
    title: "Yaatra Express",
    description:
      "Travel & transport website optimised for mobile with clean layouts and route information.",
    type: "Static · Mobile-first",
    image: "/portfolio/yaatra-express.webp",
    url: "https://yaatraexpress.com",
  },
  {
    title: "Sundarban Xpress",
    description:
      "Nature & travel site for Sundarban tours, built for performance and mobile users.",
    type: "Static · Mobile-first",
    image: "/portfolio/sundarban.webp",
    url: "https://sundarbanxpress.in",
  },
  {
    title: "Saumok Portfolio",
    description:
      "Personal portfolio with rich scroll animations, showcasing design and development work.",
    type: "Portfolio · Animation-rich",
    image: "/portfolio/saumok.webp",
    url: "https://saumok-portfolio.vercel.app/",
  },
  {
    title: "Leadstiq",
    description:
      "Full CRM system with conversion-focused landing page — lead management built for growing sales teams.",
    type: "CRM · SaaS",
    image: "/portfolio/leadstiq.webp",
    url: "https://leadstiq.vercel.app",
  },
  {
    title: "Icreations",
    description:
      "Minimalist interior design studio website — elegant portfolio showcase with clean typography.",
    type: "Static · Interior Design",
    image: "/portfolio/icreations.webp",
    url: "https://icreationsinterior.com/",
  },
  {
    title: "Pinaka Studios",
    description:
      "Film studio website with dramatic scroll-frame animation sequences and cinematic presentation.",
    type: "Static · Scroll Animation",
    image: "/portfolio/pinaka-studio.webp",
    url: "https://pinaka-studio.netlify.app/",
  },
  {
    title: "Pen Utsav",
    description:
      "Interactive event website — gallery showcase, schedule, and registration all in one place.",
    type: "Event · Interactive",
    image: "/portfolio/pen-utsav.webp",
    url: "https://penutsav-shrish.netlify.app",
  },
];

function PortfolioCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group glass-panel rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-cyber-cyan/60 hover:shadow-[0_16px_48px_rgba(0,240,255,0.1)] cursor-pointer no-underline"
    >
      {/* Thumbnail */}
      <div
        className="h-36 flex-none relative overflow-hidden border-b border-white/[0.06]"
        style={{
          backgroundImage: `url('${project.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Shimmer sweep on hover */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
          }}
        />
        {/* Dark overlay so top of screenshot is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-2.5 flex-1">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-white/40 bg-white/[0.05] rounded-full px-2.5 py-0.5 whitespace-nowrap">
            {project.type}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-cyber-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan flex-none animate-pulse" />
            Live
          </span>
        </div>

        <h3 className="font-heading text-[15.5px] font-bold text-white leading-snug">
          {project.title}
        </h3>

        <p className="text-[13.5px] text-white/50 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Visit link */}
        <div className="mt-3 pt-3 border-t border-white/[0.06]">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-cyber-cyan group-hover:text-white transition-colors duration-150">
            Visit site
            <svg
              className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 11 11"
              fill="none"
            >
              <path
                d="M2 9L9 2M9 2H4M9 2V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="max-w-[1100px] mx-auto px-7">
        <ScrollReveal>
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-cyber-cyan block mb-5">
            Our work
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <h2 className="font-heading text-4xl md:text-[3.2rem] font-extrabold text-white leading-[1.15] tracking-tight mb-6">
            Some of our works.
            <span className="block mt-3 text-[0.6em] font-medium text-cyber-cyan tracking-[-0.02em]">
              A showcase of our shipped projects and active builds.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <p className="text-[1.05rem] text-white/55 leading-[1.75] max-w-2xl mb-16">
            We&apos;re professionals, but friendly ones. The work below is what we
            can share openly — none of it is under NDA. Our other client work
            exists but we respect confidentiality, same as we would for you.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <PortfolioCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
    </section>
  );
}
