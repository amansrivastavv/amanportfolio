import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Button, Form, Toast } from "react-bootstrap";
import { FaPaperPlane, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "./ServicesCTA.css";

export default function ServicesCTA({
  contactEmail = "amansrivastav1203@gmail.com",
  analytics = null
}) {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", success: true });
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.message.trim() || form.message.length < 10)
      errs.message = "Message must be ≥ 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function submitToApi(payload) {
    return emailjs.send(
      "service_r1zb7ia",
      "template_l91y8x7",
      {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        title: "Hire Me Request (Services Page)",
        time: new Date().toLocaleString()
      },
      "Rfo3bmo7MPgSCBFne"
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);

    if (analytics?.track)
      analytics.track("contact_submit", { source: "services_cta" });

    try {
      await submitToApi(form);
      setToast({
        show: true,
        msg: "✅ Message sent — I’ll reply within 24 hours.",
        success: true
      });
      setShowModal(false);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setToast({
        show: true,
        msg: "⚠️ Could not send — opened your email client as fallback.",
        success: false
      });
      const subject = encodeURIComponent(`Inquiry from ${form.name} — Services`);
      const body = encodeURIComponent(`${form.message}\n\nContact: ${form.email}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    } finally {
      setSending(false);
    }
  }

  function handleSchedule() {
    if (analytics?.track)
      analytics.track("schedule_click", { source: "services_cta" });
    window.open("https://calendly.com/your-username/15min", "_blank", "noopener");
  }

  return (
    <div className="services-cta-wrapper text-center" aria-live="polite">
      {/* Animated Primary CTA */}
      <motion.button
        className="cta-primary glass-btn"
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,150,0.5)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => setShowModal(true)}
      >
        Hire me — let’s build <FaPaperPlane className="ms-2" />
      </motion.button>

      {/* Secondary CTA */}
      <motion.button
        className="cta-secondary gradient-btn ms-3"
        whileHover={{ y: -3 }}
        onClick={handleSchedule}
      >
        <FaCalendarAlt className="me-2" /> Schedule 15-min
      </motion.button>

      {/* Microcopy */}
      <p className="cta-sub mt-3 "style={{color: "#9ca3af"}}>
        <strong>Fast delivery</strong>: landing page in <strong>3–7 days</strong>.
        Flexible hourly / fixed pricing.
      </p>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              centered
              className="glass-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>🚀 Start your project</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Priya Verma"
                      value={form.name}
                      isInvalid={!!errors.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      isInvalid={!!errors.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Project brief</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Short summary of your project, goals, timeline..."
                      value={form.message}
                      isInvalid={!!errors.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button className="gradient-btn" type="submit" disabled={sending}>
                    {sending ? "Sending..." : "Send inquiry"}
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={4000}
          autohide
          bg={toast.success ? "success" : "danger"}
        >
          <Toast.Header>
            <FaCheckCircle className="me-2" />
            <strong className="me-auto">Aman</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.msg}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}
