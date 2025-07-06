import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/pages.css";

const FloatingContactForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_r1zb7ia", // Service ID
        "template_l91y8x7", // Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: "Contact Us: Message",
          time: new Date().toLocaleString(),
        },
        "Rfo3bmo7MPgSCBFne" // Public key
      )
      .then(() => {
        setStatus("Message sent! ✅");
        setFormData({ name: "", email: "", message: "" });
        setShowSuccessPopup(true);

        setTimeout(() => {
          setShowSuccessPopup(false);
          setShowForm(false);
          setStatus("");
        }, 3000);
      })
      .catch((error) => {
        setStatus("Failed to send ❌");
        console.error("EmailJS error:", error);
      });
  };

  return (
    <>
      {/* 📩 Floating Button */}
      <div style={{ position: "fixed", bottom: "100px", right: "25px", zIndex: 9999 }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="tooltip-label"
          style={{
            background: "#fff",
            color: "#000",
            padding: "6px 12px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            position: "absolute",
            bottom: "70px",
            right: "0",
            fontSize: "0.85rem",
          }}
        >
          Contact Me
        </motion.div>

        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          className="floating-btn"
          style={{
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #0dcaf0, #6610f2)",
            color: "#fff",
            fontSize: "1.5rem",
            border: "none",
            boxShadow: "0 0 15px rgba(102, 16, 242, 0.6)",
          }}
        >
          ✉️
        </motion.button>
      </div>

      {/* 📬 Contact Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="position-fixed top-50 start-50 translate-middle"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 0 30px rgba(0,0,0,0.4)",
              color: "#fff",
              zIndex: 10000,
              width: "90vw",
              maxWidth: "420px",
            }}
          >
            <div className="form-header d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 text-white">Let’s Connect</h5>
              <button
                className="btn-close btn-close-white"
                onClick={() => setShowForm(false)}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="form-control"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="btn btn-primary w-100"
              >
                Send Message 🚀
              </motion.button>

              {status && <p className="text-light text-center mt-3">{status}</p>}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Thank You Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            onClick={() => setShowSuccessPopup(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="position-fixed top-50 start-50 translate-middle"
            style={{
              background: "#1f1f1f",
              color: "#fff",
              padding: "30px",
              borderRadius: "20px",
              zIndex: 10001,
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
              textAlign: "center",
              maxWidth: "400px",
              width: "90vw",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{ fontSize: "2rem", marginBottom: "10px" }}
            >
              🎉
            </motion.div>
            <h5>Thank you for contacting us!</h5>
            <p className="mb-0">We’ll get back to you shortly.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingContactForm;
