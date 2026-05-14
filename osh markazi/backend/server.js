const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    if (req.method === 'POST') console.log('Body:', req.body);
    next();
});

// Static files (Frontend)
app.use(express.static(path.join(__dirname, '../')));

// Routes
app.use('/api', apiRoutes);

// Main website route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Admin panel route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Serverda ichki xatolik yuz berdi'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n🚀 Server ${process.env.NODE_ENV} rejimida ishga tushdi!`);
    console.log(`🔗 API silkasi: http://localhost:${PORT}`);
    console.log(`✨ Barcha buyurtmalar: http://localhost:${PORT}/api/orders\n`);
});
