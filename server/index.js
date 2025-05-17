require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Välkommen till servern!');
});

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

    await transporter.sendMail({
      from: `"Din Klinik" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Tack för ditt meddelande',
      text: `Hej ${name},\n\nTack för att du kontaktade oss! Vi återkommer så snart vi kan.\n\nMeddelande:\n"${message}"`,
    });

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

app.listen(PORT, () => {
  console.log(`✅ Servern körs på http://localhost:${PORT}`);
});
