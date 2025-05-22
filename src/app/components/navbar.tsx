'use client';
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="top-navbar">
      <div className="container">
        <div className="logo">
          <Link href="/">
            <img src="/images/logo.PNG" alt="Munhälsan i Lilla Edet" />
          </Link>
        </div>

        {/* Hamburger-knapp för mobil */}
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li>
              <Link href="/about">Om oss</Link>
            </li>
            <li>
              <Link href="/behandlingar">Våra behandlingar</Link>
            </li>
            <li>
              <Link href="/contact">Kontakt</Link>
            </li>
            <li>
              <Link href="/login">Logga in</Link>
            </li>
            <li>
              <Link href="/book" className="book-button">
                Boka tid
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
