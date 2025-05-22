
"use client"; 

import React from "react";
import Link from "next/link";

const Behandlingar = () => {
  return (
    <div>
      {/* Services Section */}
      <section id="services">
        <div className="section-container">
          <div className="text-content">
            <h2>Våra behandlingar</h2>
            <h1>Tandvårdsbehandlingar:</h1>
            <br />

            <p>Allmän tandvård och basundersökning</p>
            <p>Akut tandvård</p>
            <p>Mun rehabilitering</p>
            <p>Rotbehandling</p>
            <p>Förebyggande tandvård</p>
            <p>Avtagbar samt fast protetisk behandling</p>
            <p>Implantatkirurgi</p>
            <br />

            <h1>Estetiska tandvårdsbehandlingar:</h1>
            <p>Tandblekning</p>
            <p>Skalfasader och veneers</p>
            <p>Hollywood smile</p>
            <p>Osynlig tandställning</p>
            <br />

            <h1>Injektionsbehandlingar:</h1>
            <p>Botox behandling</p>
          </div>
          <div className="image-content">
            <img src="/images/logo.PNG" alt="Behandlingar" />
          </div>
        </div>
      </section>

      {/* Inline CSS */}
      <style jsx>{`
        #services .text-content h2 {
          font-size: 35px;
        }

        #services .text-content h1 {
          font-size: 30px;
        }

        #services .text-content p {
          font-size: 25px; /* Exempel på större text */
        }
      `}</style>
    </div>
  );
};

export default Behandlingar;
