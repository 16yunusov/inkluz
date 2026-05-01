import { useState, useEffect } from 'react';
import { Plus, Heart, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMenu } from '../api';

const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Salads', 'Sushi', 'Desserts', 'Beverages'];

const Menu = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMenu = async () => {
      setLoading(true);
      try {
        const query = activeCat === 'All' ? '' : `?category=${activeCat}`;
        const { data } = await fetchMenu(query);
        setItems(data.data);
      } catch (err) {
        console.error('Failed to fetch menu', err);
      } finally {
        setLoading(false);
      }
    };
    getMenu();
  }, [activeCat]);

  const filteredItems = items.filter((item: any) => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Our Menu</h1>
          <p className="text-gray-500">Delicious items crafted with passion.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for dishes..."
            className="pl-12 pr-6 py-4 bg-white rounded-2xl w-full md:w-80 border-none shadow-sm focus:ring-2 focus:ring-secondary/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-6 space-x-4 no-scrollbar mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
              activeCat === cat 
                ? 'bg-secondary text-white shadow-lg shadow-secondary/30' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-secondary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: any) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2rem] overflow-hidden group card-hover shadow-sm border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <span className="text-secondary">★</span> 4.8
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-secondary font-bold text-lg">${item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{item.description}</p>
                  
                  <button className="w-full btn-primary py-4 flex items-center justify-center gap-2 group">
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No items found in this category.
        </div>
      )}
    </div>
  );
};

export default Menu;
