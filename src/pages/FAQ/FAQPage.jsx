import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import "./FAQPage.css";

gsap.registerPlugin(ScrollTrigger);

export default function FAQPage() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Most landing pages take 3–7 days. Larger sites or apps can take 2–6 weeks depending on complexity."
    },
    {
      q: "Do you work internationally?",
      a: "Yes! I work with clients globally, scheduling all meetings according to your timezone."
    },
    {
      q: "What’s your payment structure?",
      a: "Typically 50% upfront, 50% on completion. Larger projects can be broken into milestones."
    },
    {
      q: "Do you handle hosting and domains?",
      a: "Yes. I set up and manage hosting, domains, and deployment. You own everything — I just make it work."
    },
    {
      q: "What if I need ongoing support?",
      a: "I offer maintenance plans and retainers for updates, bug fixes, and feature improvements."
    }
  ];

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".faq-card");
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom"
      }
    });
  }, []);

  const toggleFAQ = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" style={{ background: "#111" }}>
      {/* Header */}
      <motion.div
        className="faq-header text-center"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="faq-glow"></div>
        <FaQuestionCircle size={50} className="text-primary mb-3" />
        <h1 className="fw-bold">Frequently Asked Questions</h1>
        <p className="faq-sub">
          Everything you need to know before starting a project with me.
        </p>
      </motion.div>

      {/* FAQ Cards */}
      <div className="container py-5" ref={containerRef}>
        <div className="row g-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="col-12 col-md-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div
                className={`faq-card p-4 ${activeIndex === idx ? "active" : ""}`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="faq-question">{faq.q}</h5>
                  <FaChevronDown
                    className={`chevron ${activeIndex === idx ? "rotate" : ""}`}
                  />
                </div>

                {activeIndex === idx && (
                  <div>
                    <p className="faq-answer mt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

<FAQPage />
