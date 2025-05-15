// src/app/page.tsx
"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section id="hero">
        <h1>Välkommen till Munhälsan i Lilla Edet</h1>
        <p>Din tandläkare med fokus på trygghet och kvalitet</p>
        <Link href="/behandlingar" className="cta-button">
          Se våra behandlingar
        </Link>
      </section>

      {/* Beskrivning */}
      <section id="beskrivning" className="section-container">
        <div className="text-content">
          <h2>Välkommen till Munhälsan där ditt leende står i centrum!</h2>
          <p>
            På Munhälsans klinik möts du av en varm och avslappnad atmosfär där
            patienterna känner sig trygga...
          </p>
          <p>
            Vi erbjuder allt från förebyggande tandvård och estetiska
            behandlingar till mer avancerad tandkirurgi –{" "}
            <Link href="/behandlingar">läs mer under fliken behandlingar</Link>.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team">
        <div className="section-container">
          <div className="text-content">
            <h2>Vårt Team</h2>
            <p>
              Vårt erfarna och vänliga team står alltid redo att ta hand om din
              munhälsa.
            </p>
            <Link href="/about">Om oss</Link>
          </div>
          <div className="image-content">
            <img src="/images/no 3 till ws.JPG" alt="Vårt team" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="section-container">
          <div className="image-content">
            <img src="/images/SAM_0004.JPG" alt="Kontakt" />
          </div>
          <div className="text-content">
            <h2>Kontakta oss</h2>
            <p>Telefon: 0520-XXX XXX</p>
            <p>Email: info@munhalsanlillaedet.se</p>
            <p>Adress: Lilla Edet, Sverige</p>
          </div>
        </div>
      </section>
    </main>
  );
}
