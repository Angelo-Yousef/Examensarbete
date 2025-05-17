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
            <li><Link href="/contact">Kontakt</Link></li>
            <li>
              <a
                href="https://www.muntra.com/tandlakare/yara-ibrahim/p/6857?language=sv"
                className="book-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boka tid
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
