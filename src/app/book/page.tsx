"use client";

import React, { useEffect, useState } from "react";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const daysAhead = 7;

  const availableTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

  const generateDates = () => {
    const dates: Date[] = [];
    for (let i = 0; i < daysAhead; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          email: userEmail,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(data.message || "❌ Bokningen misslyckades.");
      }
    } catch (err) {
      alert("❌ Serverfel vid bokning.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); // måste sättas i LoginRegister

    if (token && email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <section id="booking">
      <div className="section-container">
        <div className="text-content">
          <h2>Boka tid</h2>
          {!userEmail ? (
            <p className="warning">🔒 Du måste vara inloggad för att boka en tid.</p>
          ) : !submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="calendar-grid">
                <div className="header">
                  <div></div>
                  {availableTimes.map((time) => (
                    <div key={time} className="time-cell">
                      {time}
                    </div>
                  ))}
                </div>
                {generateDates().map((date) => {
                  const iso = date.toISOString().split("T")[0];
                  const label = date.toLocaleDateString("sv-SE", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  });

                  return (
                    <div className="row" key={iso}>
                      <div className="date-label">{label}</div>
                      {availableTimes.map((time) => {
                        const isSelected = selectedDate === iso && selectedTime === time;
                        return (
                          <div
                            key={time}
                            className={`time-slot ${isSelected ? "selected" : ""}`}
                            onClick={() => handleSelect(iso, time)}
                          >
                            {isSelected ? "✔" : ""}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {selectedDate && selectedTime && (
                <>
                  <p>📧 Bokas av: <strong>{userEmail}</strong></p>
                  <button type="submit">Bekräfta bokning</button>
                </>
              )}
            </form>
          ) : (
            <p className="success">
              ✅ Tack {userEmail}, du har bokat {selectedDate} kl {selectedTime}.
            </p>
          )}
        </div>

        <div className="image-content">
          <img src="/images/tandlakare-bild.jpg" alt="Bokning" />
        </div>
      </div>

      <style jsx>{`
        #booking {
          padding: 40px 20px;
          background-color: #f9f9f9;
        }

        .section-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        @media (min-width: 768px) {
          .section-container {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .text-content {
          flex: 1;
          max-width: 600px;
        }

        .image-content {
          flex: 1;
        }

        .image-content img {
          width: 100%;
          border-radius: 10px;
          object-fit: cover;
        }

        form {
          margin-top: 20px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-bottom: 20px;
        }

        .header {
          display: contents;
        }

        .time-cell,
        .date-label {
          font-weight: bold;
          text-align: center;
          padding: 6px 4px;
          background-color: #eaeaea;
          border-radius: 4px;
        }

        .row {
          display: contents;
        }

        .time-slot {
          padding: 12px;
          background-color: #fff;
          border: 1px solid #ccc;
          text-align: center;
          cursor: pointer;
          border-radius: 4px;
        }

        .time-slot:hover {
          background-color: #e0e0e0;
        }

        .selected {
          background-color: #0070f3;
          color: #fff;
          font-weight: bold;
        }

        button[type="submit"] {
          padding: 12px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button[type="submit"]:hover {
          background-color: #005bb5;
        }

        .success {
          margin-top: 20px;
          font-size: 18px;
          color: green;
        }

        .warning {
          background-color: #fff3cd;
          color: #856404;
          padding: 10px;
          border: 1px solid #ffeeba;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default Booking;
