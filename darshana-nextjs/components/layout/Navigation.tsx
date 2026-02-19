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
        <Link href="/" className="nav-logo">
          <Image
            src="/darshana-gal-ketayam-horizontol-white.svg"
            alt="Darshana Gal Ketayam"
            width={200}
            height={60}
            priority
          />
        </Link>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
          <li><Link href="/" className="nav-link" onClick={closeMenu}>HOME</Link></li>
          <li><Link href="/#portfolio" className="nav-link" onClick={closeMenu}>PORTFOLIO</Link></li>
          {/* <li><Link href="/articles" className="nav-link" onClick={closeMenu}>ARTICLES</Link></li> */}{/* TODO: Uncomment when articles section is ready */}
          <li><Link href="/about" className="nav-link" onClick={closeMenu}>ABOUT</Link></li>
          <li><Link href="/contact" className="nav-link" onClick={closeMenu}>CONTACT</Link></li>
          <li className="nav-cta-floating">
            <Link href="/custom-design" className="nav-floating-button" onClick={closeMenu}>
              <div className="nav-floating-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </li>
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
