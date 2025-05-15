// src/app/about.tsx

import React from "react";

const About = () => {
  return (
    <div>
      {/* About Yara */}
      <section id="about">
        <div className="section-container">
          <div className="text-content">
            <h2>Yara</h2>
            <h3>Legitimerad Tandläkare</h3>
            <p>
              Noggrann, professionell med många års erfarenhet, kombinerar hon teknisk skicklighet med empati vilket gör att alla patienter känner sig sedda och väl omhändertagna. 
              Med ett mjukt bemötande och ett genuint intresse för människor, 
              skapar hon en trygg och avslappnad stämning, även för den som vanligtvis tycker att ett tandläkarbesök känns nervöst. 
              Yara har en unik förmåga att lyssna, förklara på ett begripligt sätt och anpassa behandlingen efter varje individs behov.
              Brinner för kirurgi och protetik.
            </p>
          </div>
          <div className="image-content">
            <img src="/images/mobil 1 (1)redigerad 1.jpg" alt="Yara" />
          </div>
        </div>
      </section>

      {/* About Emelie */}
      <section id="about">
        <div className="section-container">
          <div className="image-content">
            <img src="/images/val no 1 redigerad 1.JPG" alt="Emelie" />
          </div>
          <div className="text-content">
            <h2>Emelie</h2>
            <h3>Tandsköterska</h3>
            <p>
              En tandsköterska som gör hela besöket lite lättare med sitt glada humör, smittsamma skratt och varma bemötande får hon alla patienter att känna sig välkomna 
              direkt. Med stor yrkesskicklighet och ett hjärta för service assisterar Emelie tandläkaren med trygg hand, samtidigt som hon alltid har ett vänligt ord eller ett 
              uppmuntrande leende redo. Hennes energi och omtanke gör henne inte bara till en uppskattad kollega, utan också till en person som många patienter minns och ser 
              fram emot att träffa igen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
