// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Hämtar token från Authorization-headern

  if (!token) {
    return res.status(401).json({ message: 'Inloggning krävs!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Ogiltig token.' });
    }
    req.user = user;  // Lägg till användarinformation i request-objektet
    next();  // Fortsätt till nästa middleware eller route
  });
};

module.exports = authenticateToken;
