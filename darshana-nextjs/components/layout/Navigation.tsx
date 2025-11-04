'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} id="nav">
      <div className="nav-container">
        <div className="nav-logo-wrapper">
          <Link href="/" className="nav-logo">
            <Image
              src="/darshana-gal-katayam-light.svg"
              alt="Darshana Gal Ketayam"
              className="logo-image"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
          <li><Link href="/" className="nav-link" onClick={closeMenu}>HOME</Link></li>
          <li><Link href="/#portfolio" className="nav-link" onClick={closeMenu}>PORTFOLIO</Link></li>
          <li><Link href="/#services" className="nav-link" onClick={closeMenu}>SERVICES</Link></li>
          <li><Link href="/articles" className="nav-link" onClick={closeMenu}>ARTICLES</Link></li>
          <li><Link href="/#about" className="nav-link" onClick={closeMenu}>ABOUT</Link></li>
          <li><Link href="/#contact" className="nav-link" onClick={closeMenu}>CONTACT</Link></li>
        </ul>
        <div
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          id="hamburger"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
