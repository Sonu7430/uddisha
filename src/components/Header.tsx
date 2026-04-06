import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { preloadBlogPage } from '../lib/preloaders';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAssessmentPage = location.pathname === '/assessment';

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll logic
  useEffect(() => {
    const controlNavbar = () => {
      if (isMenuOpen) return; // Don't hide header if mobile menu is open
      
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (isAssessmentPage) {
        setIsVisible(false);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, isAssessmentPage, isMenuOpen]);

  return (
    <>
      <nav className={`ud-nav ${!isVisible ? 'ud-nav--hidden' : ''} ${isMenuOpen ? 'ud-nav--open' : ''}`}>
        <Link to="/" className="ud-logo">
          Uddisha
          <div className="ud-logo-dot" />
        </Link>

        {/* Desktop Links */}
        <div className="ud-nav-links">
          <Link to="/assessment">Assessment</Link>
          <Link to="/careers">Careers</Link>
          <Link 
            to="/blog"
            onClick={() => {
              setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }, 50);
            }}
            onMouseEnter={preloadBlogPage}
          >
            Blog
          </Link>
          <Link to="/about">About</Link>
          <Link to="/assessment" className="ud-nav-cta">Start Free →</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="ud-nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`ud-mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="ud-mobile-links">
          <Link to="/assessment">Assessment</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/counselling">1:1 Counselling</Link>
          <Link to="/assessment" className="ud-mobile-cta">
            Start Free Assessment <ArrowRight size={18} />
          </Link>
        </div>
      </div>
      
      {/* Backdrop */}
      {isMenuOpen && <div className="ud-nav-backdrop" onClick={toggleMenu} />}
    </>
  );
};

export default Header;