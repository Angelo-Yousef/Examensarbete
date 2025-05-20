// src/components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="top-navbar">
      <div className="container">
        <div className="logo">
          <Link href="/">
            <img src="/images/logo.PNG" alt="Munhälsan i Lilla Edet" />
          </Link> 
        </div>
        <nav>
          <ul>
            <li><Link href="/about">Om oss</Link></li>
            <li><Link href="/behandlingar">Våra behandlingar</Link></li>
            <li><Link href="/contact">Kontakt</Link></li>
            <li><Link href="/login">Logga in</Link></li>
            <li><Link href="/book" className="book-button">Boka tid</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
