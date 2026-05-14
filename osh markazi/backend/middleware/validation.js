const validateReservation = (req, res, next) => {
    const { ism, telefonRaqam, odamSoni, sana, vaqt } = req.body;

    if (!ism || !telefonRaqam || !odamSoni || !sana || !vaqt) {
        return res.status(400).json({ 
            success: false, 
            message: "Iltimos, barcha maydonlarni to'ldiring." 
        });
    }

    // Simple phone validation (+998...)
    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(telefonRaqam.replace(/\s/g, ''))) {
        return res.status(400).json({ 
            success: false, 
            message: "Telefon raqami noto'g'ri formatda. (+998XXXXXXXXX)" 
        });
    }

    next();
};

const validateOrder = (req, res, next) => {
    const { ism, telefonRaqam, manzil, buyurtma } = req.body;

    if (!ism || !telefonRaqam || !manzil || !buyurtma) {
        return res.status(400).json({ 
            success: false, 
            message: "Iltimos, barcha maydonlarni to'ldiring." 
        });
    }

    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(telefonRaqam.replace(/\s/g, ''))) {
        return res.status(400).json({ 
            success: false, 
            message: "Telefon raqami noto'g'ri formatda. (+998XXXXXXXXX)" 
        });
    }

    next();
};

module.exports = { validateReservation, validateOrder };
