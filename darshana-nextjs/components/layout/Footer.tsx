import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Image
              src="/darshana-gal-ketayam-horizontol-white.svg"
              alt="Darshana Gal Ketayam"
              width={250}
              height={80}
              className="footer-logo"
            />
            <p>Crafting Timeless Stonework Since 1911</p>
          </div>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/#portfolio">Portfolio</Link>
            <Link href="/#services">Services</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Darshana Gal Ketayam. All rights reserved.</p>
          <p>
            Designed and Developed by{' '}
            <a
              href="https://creatxsoftware.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              CreatxSoftware
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
