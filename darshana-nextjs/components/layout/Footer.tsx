import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>DARSHANA GAL KETAYAM</h3>
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
          <p>&copy; 2024 Darshana Gal Ketayam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
