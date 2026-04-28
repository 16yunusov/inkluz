// Mutaxasis ishchilar — Xavfsizlik middleware

const validator = require('validator');

// ID ni tekshirish (faqat raqam)
function validateId(id) {
  const n = parseInt(id, 10);
  return !isNaN(n) && n > 0 && String(n) === String(id);
}

// userId middleware — faqat o'z ma'lumotlariga kirish
function validateUserId(req, res, next) {
  const userId = req.params.userId;
  if (!userId) return next();
  if (!validateId(userId)) {
    return res.status(400).json({ error: 'Noto\'g\'ri foydalanuvchi ID' });
  }
  next();
}

// String sanitizatsiya (XSS oldini olish)
function sanitize(str, maxLen = 500) {
  if (str == null || typeof str !== 'string') return '';
  return validator.escape(str.trim().slice(0, maxLen));
}

// Email validatsiya
function isValidEmail(email) {
  return email && validator.isEmail(email);
}

// Parol talablari (kamida 6 belgi)
function isValidPassword(pwd) {
  return pwd && typeof pwd === 'string' && pwd.length >= 6;
}

module.exports = {
  validateId,
  validateUserId,
  sanitize,
  isValidEmail,
  isValidPassword
};
