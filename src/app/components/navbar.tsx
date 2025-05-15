// src/components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="top-navbar">
      <div className="container">
        <div className="logo">
          <Link href="/">
            <img src="/images/tand.jpg" alt="Munhälsan i Lilla Edet" />
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link href="/about">Om oss</Link></li>
            <li><Link href="/behandlingar">Våra behandlingar</Link></li>
            <li><a href="#team">Vårt team</a></li>
            <li><a href="#reviews">Recensioner</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Kontakt</a></li>
            <li><a href="#book" className="book-button">Boka tid</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
