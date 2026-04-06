import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="ud-footer">
            <div className="ud-footer-top">
                <div>
                    <div className="ud-footer-logo">Uddisha</div>
                    <div className="ud-footer-tagline">AI-powered career discovery for Indian students and professionals. Rise into the career you were meant to build.</div>
                </div>
                <div className="ud-footer-col">
                    <h4>Platform</h4>
                    <Link to="/assessment">AI Assessment</Link>
                    <Link to="/careers">Career Database</Link>
                    <Link to="/counselling">1:1 Counselling</Link>
                    <Link to="/blog">Career Blog</Link>
                    <Link to="/about">About Us</Link>
                </div>
                <div className="ud-footer-col">
                    <h4>Popular</h4>
                    <Link to="/blog">Careers after 12th</Link>
                    <Link to="/blog/data-science-career-2026">Data Science</Link>
                    <Link to="/blog/upsc-civil-services-career-2026">UPSC & Civil Services</Link>
                    <Link to="/blog/finance-career-paths-2026">Finance Careers</Link>
                </div>
                <div className="ud-footer-col">
                    <h4>Legal</h4>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/cookie-policy">Cookie Policy</Link>
                </div>
            </div>
            <div className="ud-footer-bottom">
                <div className="ud-footer-copy">© 2026 Uddisha. All rights reserved.</div>
                <div className="ud-footer-domain">uddisha.com</div>
            </div>
        </footer>
    );
};

export default Footer;
