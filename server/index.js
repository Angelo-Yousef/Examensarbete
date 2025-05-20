require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./models/user'); // Användarmodell
const bookingRoutes = require('./routes/bookingRoutes'); // Bokningsrutter

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Anslut till MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB ansluten'))
  .catch((err) => console.error('❌ MongoDB-fel:', err));

// ROOT-rutt
app.get('/', (req, res) => {
  res.send('Välkommen till servern!');
});

// 📩 Kontaktformulär
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Alla fält krävs.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Skicka bekräftelse till användaren
    await transporter.sendMail({
      from: `"Din Klinik" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Tack för ditt meddelande',
      text: `Hej ${name},\n\nTack för att du kontaktade oss! Vi återkommer så snart vi kan.\n\nMeddelande:\n"${message}"`,
    });

    // Skicka kopia till kliniken
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: 'Nytt kontaktformulär',
      text: `Från: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ message: 'E-post skickad!' });
  } catch (error) {
    console.error('Nodemailer fel:', error);
    res.status(500).json({ error: 'Kunde inte skicka e-post.' });
  }
});

// 🔐 Registrera användare
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Alla fält krävs' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-post används redan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Registrering lyckades!' });
  } catch (error) {
    console.error('Registreringsfel:', error);
    res.status(500).json({ message: 'Serverfel vid registrering' });
  }
});

// 🔓 Logga in användare
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Fel e-post eller lösenord' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Fel e-post eller lösenord' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, email: user.email });
  } catch (error) {
    console.error('Inloggningsfel:', error);
    res.status(500).json({ message: 'Serverfel vid inloggning' });
  }
});

// 📅 Boknings-API (POST, GET, DELETE via bookingRoutes.js)
app.use('/api/bookings', bookingRoutes);

// 🚀 Starta servern
app.listen(PORT, () => {
  console.log(`✅ Servern körs på http://localhost:${PORT}`);
});
