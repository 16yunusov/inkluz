const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ismingizni kiriting'],
  },
  phone: {
    type: String,
    required: [true, 'Telefon raqamingizni kiriting'],
  },
  location: {
    type: String,
    required: [true, 'Manzilni kiriting'],
    validate: {
      validator: function(v) {
        return v.toLowerCase().includes('shofirkon');
      },
      message: 'Biz faqat Shofirkon tumani bo‘ylab yetkazib beramiz!'
    }
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'cooking', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
