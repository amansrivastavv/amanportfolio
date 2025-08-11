import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaCode, FaPaintBrush, FaRocket, FaSearch, FaMobileAlt, } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Services.css";
import ServicesCTA from "./ServicesCTA";
import Footer from "../../components/Footer";

gsap.registerPlugin(ScrollTrigger);


const SERVICES = [
  {
    id: "web",
    icon: <FaCode />,
    title: "Web Development",
    short: "Fast, maintainable React & Next.js apps with SEO & accessibility.",
    bullets: [
      "Component-driven architecture (Reusability + Testability)",
      "SSR/SSG with Next.js, API integration, CI/CD to Vercel",
      "Unit & e2e testing guidance (Jest / Playwright)",
    ],
    tech: ["React", "Next.js", "Tailwind",  "REST / GraphQL"],
    case: "Built a marketing site + dashboard for a SaaS — lowered TTFB by 45% and improved Lighthouse score from 45 → 92.",
  },
{
  id: "design",
  icon: <FaPaintBrush />,
  title: "UI / UX & Design Systems",
  short: "Crafting pixel-perfect interfaces, scalable design systems, and WCAG-compliant experiences.",
  bullets: [
    "Design tokens & reusable component library for faster scaling",
    "WCAG 2.1 compliance: contrast, keyboard navigation, semantic HTML",
    "High-fidelity prototypes with smooth developer handoff"
  ],
  tech: ["Figma", "Adobe XD", "Zeplin"],
  case: "Redesigned onboarding flow boosted user activation by 23% in 3 months."
},
  {
    id: "perf",
    icon: <FaRocket />,
    title: "Performance & SEO Optimization",
    short: "Performance-first websites: optimized images, caching, and audits.",
    bullets: [
      "Image optimization, code-splitting, and lazy-loading",
      "Critical CSS, preconnect, and resource prioritization",
      "Lighthouse & Google Core Web Vitals improvements",
    ],
    tech: ["Lighthouse", "Vercel", "CDN", "AWD/Edge"],
    case: "Cut bundle size by 60% and improved CLS/TTI metrics.",
  },
  {
  id: "design",
  icon: <FaPaintBrush />, // import { FaPaintBrush } from "react-icons/fa"
  title: "Graphic Design",
  short: "Eye-catching visuals & brand assets that tell your story.",
  bullets: [
    "Custom logo & brand identity creation",
    "Social media graphics, banners & marketing materials",
    "High-resolution print-ready designs (flyers, posters, packaging)",
  ],
  tech: ["Figma", "Adobe Photoshop", "Illustrator", "Canva"],
  case: "Redesigned a brand identity for a startup — increased brand recall by 60% and engagement on social media by 2x.",
},
{
  id: "app",
  icon: <FaMobileAlt />, // import { FaMobileAlt } from "react-icons/fa"
  title: "App Development",
  short: "High-performance, scalable mobile apps for iOS & Android.",
  bullets: [
    "Cross-platform development with React Native / Flutter",
    "Native integrations (push notifications, geolocation, camera)",
    "Optimized for speed, offline support & smooth animations",
  ],
  tech: ["React Native", "Flutter", "Firebase", "Node.js"],
  case: "Built a cross-platform fitness app — reduced load time from 5s to 1.2s and boosted daily active users by 35%.",
},

];

const containerFade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, y: -6, boxShadow: "0 18px 40px rgba(16,24,40,0.12)" },
};

export default function Services() {
  const ref = useRef(null);
  const [activeId, setActiveId] = useState(null); 
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Heading reveal
    gsap.fromTo(".services-underline .bar", 
  { scaleX: 0 }, 
  { scaleX: 1, duration: 1, ease: "power2.out" }
);

      // underline draw
      gsap.fromTo(
        ".services-underline .bar",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );

      // Cards stagger on enter
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        scale: 0.98,
        stagger: { each: 0.16 },
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <><section ref={ref} id="services" className="services-section">
      <Container>
        {/* HEAD */}
        <div className="services-head text-center mb-5">
          <motion.h2
            className="services-headline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="grad-text">Services</span>
          </motion.h2>

          <div className="services-underline mx-auto" aria-hidden>
            <div className="bar" />
          </div>

          <motion.p className="services-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
            I help startups and product teams craft performant, accessible, and scalable digital products — combining pixel-perfect UI design with robust, production-grade architecture to accelerate growth.
          </motion.p>
        </div>

        {/* CARDS */}
        <motion.div className="services-grid" variants={containerFade} initial="hidden" animate="show">
          <Row className="g-4">
            {SERVICES.map((s, i) => (
              <Col key={s.id} md={4} sm={6} xs={12}>
                <motion.div
                  className="service-card"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" ? setActiveId(s.id) : null)}
                  onClick={() => setActiveId(s.id)}
                  variants={cardVariant}
                  whileHover="hover"
                  aria-describedby={`service-${s.id}-desc`}
                >
                  <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable={false} scale={1.02}>
                    <div className="card-inner p-4 h-100 d-flex flex-column">
                      <div className="icon-wrap">{s.icon}</div>

                      <h3 className="card-title mt-3">{s.title}</h3>
                      <p id={`service-${s.id}-desc`} className="card-short text-white">
                        {s.short}
                      </p>

                      <ul className="card-bullets mt-3">
                        {s.bullets.map((b, idx) => (
                          <li key={idx} className="text-white small">
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto d-flex align-items-center justify-content-between pt-3">
                        <div className="tech-chips" aria-hidden>
                          {s.tech.map((t) => (
                            <span key={t} className="chip">
                              {t}
                            </span>
                          ))}
                        </div>

                        <button
                          className="btn btn-sm btn-outline-primary details-btn"
                          onClick={(ev) => {
                            ev.stopPropagation();
                            setActiveId(s.id);
                          } }
                          aria-label={`Open details for ${s.title}`}
                        >
                          Details <FaSearch className="ms-2" />
                        </button>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* CTA */}
        {/* The new advanced Hire Me section */}
        <section className="services-cta-section">
          <ServicesCTA
            contactEmail="your@email.com"
            analytics={{
              track: (event, data) => {
                console.log(`Analytics Event: ${event}`, data);
              }
            }} />
        </section>
      </Container>

      {/* MODAL DETAILS */}
      <AnimatePresence>
        {activeId && (
          <ServiceModal
            key={activeId}
            service={SERVICES.find((x) => x.id === activeId)}
            onClose={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </section><Footer /></>
  );
}

function ServiceModal({ service, onClose }) {
  if (!service) return null;
  return (
    <Modal show={true} onHide={onClose} centered aria-labelledby={`modal-${service.id}-title`}>
      <Modal.Header closeButton>
        <Modal.Title id={`modal-${service.id}-title`}>{service.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{service.short}</p>

        <h6>What I deliver</h6>
        <ul>
          {service.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <h6>Tech & tools</h6>
        <div className="mb-3">
          {service.tech.map((t) => (
            <span className="chip me-2" key={t}>
              {t}
            </span>
          ))}
        </div>

        <h6>Case study</h6>
        <p className="text-muted">{service.case}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            window.location.href = `mailto:amansrivastav1203@gmail.com?subject=Inquiry about ${encodeURIComponent(service.title)}`;
          }}
        >
          Discuss project
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

