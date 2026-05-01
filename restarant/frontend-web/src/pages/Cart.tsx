import { useState } from 'react';
import { ShoppingBag, MapPin, Phone, User, CheckCircle2 } from 'lucide-react';
import API from '../api';
import { translations as t } from '../locales/uz';

const Cart = () => {
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Shofirkon tumani, ');

  // Mock items for demo
  const cartItems = [
    { id: 1, name: 'Truffle Burger', price: 15, quantity: 2 },
    { id: 2, name: 'Margarita Pizza', price: 12, quantity: 1 }
  ];
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/orders', {
        name,
        phone,
        location,
        items: cartItems,
        totalPrice
      });
      setOrdered(true);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Xatolik yuz berdi. Manzilda "Shofirkon" so‘zi bo‘lishi shart.');
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
    return (
      <div className="min-h-[60vh] flex flex-center items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold">Rahmat!</h2>
          <p className="text-gray-500">Buyurtmangiz qabul qilindi. Tez orada operatorimiz siz bilan bog‘lanadi.</p>
          <a href="/menu" className="btn-primary inline-block px-8">Menyuga qaytish</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Sizning savatingiz</h1>
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-none">
              <div>
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.quantity} x ${item.price}</p>
              </div>
              <p className="font-bold text-secondary">${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xl font-bold">Jami:</span>
            <span className="text-3xl font-extrabold text-secondary">${totalPrice}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Yetkazib berish</h2>
        <form onSubmit={handleOrder} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Ismingiz</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input required type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12" placeholder="Ismingizni kiriting" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Telefon raqamingiz</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input required type="tel" className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12" placeholder="+998 90 123 45 67" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Manzil (Faqat Shofirkon tumani)</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input required type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
          </div>
          <button disabled={loading} type="submit" className="w-full btn-primary py-4 text-lg">
            {loading ? 'Yuborilmoqda...' : 'Buyurtma berish'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
