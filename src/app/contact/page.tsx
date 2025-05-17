"use client";

import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(false);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        setError(data.error || 'Något gick fel.');
      }
    } catch (err) {
      setError('Kunde inte skicka formuläret.');
    }
  };

  return (
    <section id="contact">
      <div className="section-container">
        <div className="image-content">
          <img src="/images/SAM_0004.JPG" alt="Kontakt" />
        </div>
        <div className="text-content">
          <h2>Kontakta oss</h2>
          <p>Telefon: 0520‑140 80</p>
          <p>Email: info@munhalsanle.se</p>
          <p>Adress: Edsgatan 1a, 46331 Lilla Edet</p>
        </div>
      </div>

      <div className="contact-container">
        <h2>Skicka ett meddelande</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ditt namn"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Din e-post"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Ditt meddelande"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Skicka</button>
        </form>

        {sent && <p className="success">✅ Ditt meddelande har skickats! Du får ett bekräftelsemail snart.</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Inline scoped CSS */}
      <style jsx>{`
        #contact {
          padding: 40px 20px;
          background-color: #f9f9f9;
        }

        .section-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }

        .image-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .text-content {
          text-align: center;
        }

        .text-content h2 {
          font-size: 28px;
          margin-bottom: 10px;
        }

        .text-content p {
          font-size: 18px;
          margin: 5px 0;
        }

        .contact-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          font-family: Arial, sans-serif;
        }

        .contact-container h2 {
          text-align: center;
          color: #333;
        }

        form input,
        form textarea {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        form textarea {
          resize: vertical;
          min-height: 150px;
        }

        button {
          width: 100%;
          padding: 12px;
          background-color: #0070f3;
          color: #fff;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #005bb5;
        }

        .success {
          color: green;
          margin-top: 15px;
          text-align: center;
        }

        .error {
          color: red;
          margin-top: 15px;
          text-align: center;
        }

        @media (min-width: 768px) {
          .section-container {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 40px;
          }

          .image-content,
          .text-content {
            flex: 1;
          }

          .text-content {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
