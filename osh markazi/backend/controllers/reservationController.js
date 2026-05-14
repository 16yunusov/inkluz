const reservations = require('../data/reservations');

// @desc    Get all reservations
// @route   GET /api/reservations
exports.getReservations = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi"
        });
    }
};

// @desc    Create new reservation
// @route   POST /api/reservation
exports.createReservation = async (req, res) => {
    try {
        const { ism, telefonRaqam, odamSoni, sana, vaqt } = req.body;
        
        const newReservation = {
            id: reservations.length + 1,
            ism,
            telefonRaqam,
            odamSoni,
            sana,
            vaqt,
            status: 'pending',
            createdAt: new Date()
        };

        reservations.push(newReservation);

        res.status(201).json({
            success: true,
            message: "Joy muvaffaqiyatli band qilindi",
            data: newReservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi"
        });
    }
};

// @desc    Update reservation status
// @route   PATCH /api/reservations/:id/status
exports.updateReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const reservation = reservations.find(r => r.id === parseInt(id));
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Joy topilmadi" });
        }

        reservation.status = status;
        res.status(200).json({
            success: true,
            message: `Holat "${status}" ga o'zgartirildi`,
            data: reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Xatolik yuz berdi"
        });
    }
};
