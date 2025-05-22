'use client';

import React, { useEffect, useState } from 'react';

// Definiera typ för en bokning
interface Booking {
  _id: string;
  date: string;
  time: string;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) return;

    setEmail(userEmail);

    fetch(`http://localhost:5000/api/bookings/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => {
        console.error('Fel vid hämtning av bokningar:', err);
      });
  }, []);

  const handleDeleteBooking = async (bookingId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      } else {
        alert('❌ Kunde inte avboka bokningen.');
      }
    } catch (err) {
      alert('❌ Serverfel vid avbokning.');
    }
  };

  return (
    <div className="my-bookings">
      <h2>📅 Mina bokningar</h2>
      {bookings.length === 0 ? (
        <p>Inga bokningar hittades.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <span>
                <strong>{booking.date.split('T')[0]}</strong> kl {booking.time}
              </span>
              <button
                className="cancel-button"
                onClick={() => handleDeleteBooking(booking._id)}
                aria-label={`Avboka bokning den ${booking.date.split('T')[0]} kl ${booking.time}`}
              >
                Avboka
              </button>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .my-bookings {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .my-bookings h2 {
          margin-bottom: 15px;
          color: #0070f3;
          text-align: center;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .booking-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
          font-size: 16px;
          color: #333;
        }

        .booking-item:last-child {
          border-bottom: none;
        }

        .cancel-button {
          background-color: #ff4d4f;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .cancel-button:hover {
          background-color: #d9363e;
        }

        .cancel-button:focus {
          outline: 2px solid #d9363e;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<{ [key: string]: string[] }>({});
  const [submitted, setSubmitted] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date();
  const daysAhead = 7;
  const availableTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'];

  const generateDates = () => {
    const dates: Date[] = [];
    const start = new Date(today);
    start.setDate(today.getDate() + weekOffset * 7);

    for (let i = 0; i < daysAhead; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const isTimeBooked = (date: string, time: string) => {
    return bookedTimes[date]?.includes(time);
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email || !token) return;

    setUserEmail(email);

    fetch(`http://localhost:5000/api/bookings/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const booked: { [key: string]: string[] } = {};
        data.forEach((booking: Booking) => {
          const date = booking.date.split('T')[0];
          if (!booked[date]) {
            booked[date] = [];
          }
          booked[date].push(booking.time);
        });
        setBookedTimes(booked);
      })
      .catch((err) => {
        console.error('Fel vid hämtning av bokningar:', err);
      });
  }, []);

  const handleSelect = (date: string, time: string) => {
    if (isTimeBooked(date, time)) {
      alert('Den här tiden är redan bokad!');
      return;
    }
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail || !selectedDate || !selectedTime) return;

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        alert(data.message || '❌ Bokningen misslyckades.');
      }
    } catch (err) {
      alert('❌ Serverfel vid bokning.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
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
              <div className="week-navigation">
                <button
                  type="button"
                  onClick={() => setWeekOffset((prev) => prev - 1)}
                  disabled={weekOffset === 0}
                >
                  ← Föregående
                </button>
                <span>
                  Vecka från {generateDates()[0].toLocaleDateString('sv-SE')}
                </span>
                <button type="button" onClick={() => setWeekOffset((prev) => prev + 1)}>
                  Nästa →
                </button>
              </div>

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
                  const iso = date.toISOString().split('T')[0];
                  const label = date.toLocaleDateString('sv-SE', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  });

                  return (
                    <div className="row" key={iso}>
                      <div className="date-label">{label}</div>
                      {availableTimes.map((time) => {
                        const isSelected = selectedDate === iso && selectedTime === time;
                        const isBooked = isTimeBooked(iso, time);
                        return (
                          <div
                            key={time}
                            className={`time-slot ${isSelected ? 'selected' : ''} ${
                              isBooked ? 'booked' : ''
                            }`}
                            onClick={() => handleSelect(iso, time)}
                            style={{ cursor: isBooked ? 'not-allowed' : 'pointer' }}
                          >
                            {isSelected ? '✔' : ''}
                            {isBooked ? ' (Bokad)' : ''}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {selectedDate && selectedTime && (
                <>
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

        <div className="my-bookings-container">
          <MyBookings />
        </div>
      </div>

      <style jsx>{`
        #booking {
          padding: 40px 20px;
          background-color: #f9f9f9;
          font-family: Arial, sans-serif;
        }

        .section-container {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .text-content {
          flex: 2;
          max-width: 600px;
        }

        .my-bookings-container {
          flex: 1;
          max-width: 400px;
          min-width: 280px;
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
          user-select: none;
        }

        .time-slot:hover {
          background-color: #e0e0e0;
        }

        .time-slot.booked {
          background-color: #f8d7da;
          cursor: not-allowed;
          color: #a94442;
        }

        .selected {
          background-color: #0070f3;
          color: #fff;
          font-weight: bold;
        }

        .week-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          gap: 10px;
          flex-wrap: wrap;
        }

        .week-navigation button {
          padding: 8px 12px;
          background-color: #f0f0f0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          user-select: none;
        }

        .week-navigation button:hover:not(:disabled) {
          background-color: #ddd;
        }

        .week-navigation button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .week-navigation span {
          font-weight: bold;
          white-space: nowrap;
        }

        button[type='submit'] {
          padding: 12px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          max-width: 250px;
          margin-top: 10px;
          user-select: none;
          transition: background-color 0.3s ease;
        }

        button[type='submit']:hover {
          background-color: #005bb5;
        }

        .success {
          margin-top: 20px;
          font-size: 18px;
          color: green;
          font-weight: 600;
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

export default BookingForm;
