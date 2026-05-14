const products = require('../data/products');

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};

// @desc    Create new product
// @route   POST /api/products
exports.createProduct = async (req, res) => {
    try {
        const { nomi, narxi, rasm, kategoriya, description } = req.body;

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            nomi,
            narxi: parseInt(narxi),
            rasm,
            kategoriya,
            description
        };

        products.push(newProduct);

        res.status(201).json({
            success: true,
            message: "Mahsulot qo'shildi",
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nomi, narxi, rasm, kategoriya, description } = req.body;

        const index = products.findIndex(p => p.id === parseInt(id));
        if (index === -1) return res.status(404).json({ success: false, message: "Mahsulot topilmadi" });

        products[index] = {
            ...products[index],
            nomi: nomi || products[index].nomi,
            narxi: narxi ? parseInt(narxi) : products[index].narxi,
            rasm: rasm || products[index].rasm,
            kategoriya: kategoriya || products[index].kategoriya,
            description: description || products[index].description
        };

        res.status(200).json({
            success: true,
            message: "Mahsulot yangilandi",
            data: products[index]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const index = products.findIndex(p => p.id === parseInt(id));
        
        if (index === -1) return res.status(404).json({ success: false, message: "Mahsulot topilmadi" });

        products.splice(index, 1);

        res.status(200).json({
            success: true,
            message: "Mahsulot o'chirildi"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};
