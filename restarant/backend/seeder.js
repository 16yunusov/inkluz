const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('./models/Menu');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const menuItems = [
  {
    name: 'Truffle Wagyu Burger',
    description: 'Premium wagyu beef with black truffle sauce, caramelized onions, and swiss cheese.',
    price: 18.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800'
  },
  {
    name: 'Spicy Margherita',
    description: 'Fresh mozzarella, basil, and spicy calabrese salami on a thin crust.',
    price: 14.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800'
  },
  {
    name: 'Avocado Quinoa Bowl',
    description: 'Organic quinoa, fresh avocado, cherry tomatoes, and lemon-tahini dressing.',
    price: 12.00,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800'
  },
  {
    name: 'Premium Sushi Platter',
    description: 'A selection of fresh nigiri and maki rolls including salmon and tuna.',
    price: 32.00,
    category: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800'
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla bean ice cream.',
    price: 9.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800'
  },
  {
    name: 'Iced Matcha Latte',
    description: 'Premium grade matcha whisked with oat milk and a touch of honey.',
    price: 6.50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=800'
  }
];

const importData = async () => {
  try {
    await Menu.deleteMany();
    await Menu.insertMany(menuItems);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
