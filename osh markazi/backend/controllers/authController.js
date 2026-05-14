const jwt = require('jsonwebtoken');
const users = require('../data/users');

exports.login = async (req, res) => {
    try {
        const { login, parol } = req.body;

        const user = users.find(u => u.login === login && u.parol === parol);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Login yoki parol noto'g'ri"
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: "Muvaffaqiyatli kirdingiz",
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};
