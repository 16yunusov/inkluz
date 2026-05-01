import { motion } from 'framer-motion';
import { ChevronRight, Star, Clock, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { translations as t } from '../locales/uz';

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070" 
          alt="Premium Food" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              {t.home.heroTitle} <br /> 
              <span className="text-secondary">{t.home.heroSub}</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 opacity-90">
              Eng sara restoranlardan eng sara taomlarni yetkazib berishning eng tezkor yo‘li.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="btn-primary py-4 px-8 text-lg flex items-center justify-center">
                {t.home.orderNow} <ChevronRight className="ml-2" />
              </Link>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 py-4 px-8 rounded-full font-bold hover:bg-white/20 transition-all">
                {t.home.bookTable}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: <Clock className="w-8 h-8" />, title: t.home.fastDelivery, desc: 'O‘rtacha yetkazib berish: 30 daqiqa' },
          { icon: <Truck className="w-8 h-8" />, title: t.home.realTime, desc: 'Buyurtmani eshikkacha kuzatib boring' },
          { icon: <Star className="w-8 h-8" />, title: t.home.bestRated, desc: 'Eng sara restoranlar ro‘yxati' },
        ].map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="text-center space-y-4"
          >
            <div className="mx-auto w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-2xl text-secondary">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold">{f.title}</h3>
            <p className="text-gray-500">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
