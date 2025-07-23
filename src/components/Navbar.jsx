import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './Navbar.css';
import DarkLogo from '../assets/logos/AFBlack.svg';
import LightLogo from '../assets/logos/AFWhite.png';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Notes', path: '/notes' },
  { name: 'Blogs', path: '/blogs' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const location = useLocation();
  const isDarkPage = location.pathname.includes('/blogs') || location.pathname.includes('/about');

  return (
    <nav className={`navbarNav ${isDarkPage ? 'navbar-dark' : 'navbar-light'}`}>
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img
            src={isDarkPage ? LightLogo : DarkLogo}
            alt="Logo"
            className="logo-img"
            style={{ height: '60px', width: 'auto' }}
          />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Desktop Links */}
      <div className={`nav-links desktop-only ${isDarkPage ? 'text-light' : 'text-dark'}`}>
        {menuItems.map((item) => (
          <Link key={item.name} to={item.path}>
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`mobile-menu ${isDarkPage ? 'bg-dark text-light' : 'bg-light text-dark'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
