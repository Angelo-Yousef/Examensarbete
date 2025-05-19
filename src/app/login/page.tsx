"use client";
import React, { useState, useEffect } from 'react';

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [loggedInEmail, setLoggedInEmail] = useState('');

  useEffect(() => {
    // Kontrollera om användaren redan är inloggad via localStorage
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setLoggedInEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(isLogin ? '✅ Inloggad!' : '✅ Registrerad!');
        if (isLogin) {
          // Spara både token och email i localStorage vid inloggning
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', data.email);  // Spara användarens e-post
          setLoggedInEmail(data.email);  // Uppdatera UI med den inloggade användarens e-post
        }
      } else {
        setMessage(data.message || 'Något gick fel.');
      }
    } catch (err) {
      setMessage('❌ Serverfel.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // Ta bort e-posten från localStorage
    setLoggedInEmail('');
    setMessage('🚪 Utloggad.');
  };

  return (
    <div className="login-wrapper">
      <div className="auth-container">
        {loggedInEmail ? (
          <div>
            <h2>Välkommen, {loggedInEmail}!</h2>
            <button onClick={handleLogout}>Logga ut</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Logga in' : 'Registrera dig'}</h2>
            <input
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLogin ? 'Logga in' : 'Registrera'}</button>
            <p
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
              }}
              style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
            >
              {isLogin ? 'Inget konto? Registrera här' : 'Har du ett konto? Logga in'}
            </p>
            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
          </form>
        )}
      </div>

      <style jsx>{`
        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: calc(100vh - 80px); /* Anpassa efter höjd på navbar */
          padding-top: 100px; /* Flytta ner från navbar */
          background-color: #f5f5f5;
        }

        .auth-container {
          max-width: 400px;
          width: 100%;
          padding: 30px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background: #fff;
          text-align: center;
        }

        input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        button {
          width: 100%;
          padding: 12px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default LoginRegister;
