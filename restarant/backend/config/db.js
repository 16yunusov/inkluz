const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 soniya kutadi
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB ulanishda xato: ${err.message}`);
    console.log('DIQQAT: Onlayn baza ulanmadi. Tizim vaqtincha lokal rejimda ishlaydi.');
    // Bu yerda serverni to'xtatmaymiz, foydalanuvchi baribir saytni ko'ra olsin
  }
};

module.exports = connectDB;
