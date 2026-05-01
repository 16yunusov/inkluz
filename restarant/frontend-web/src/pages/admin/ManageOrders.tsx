import { useState, useEffect } from 'react';
import { Eye, CheckCircle, Clock, Truck, Loader2, Phone, MapPin, User, Calendar } from 'lucide-react';
import API from '../../api';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/orders');
      setOrders(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      alert('Statusni yangilab bo‘lmadi');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">BUYURTMALAR</h1>
          <p className="text-gray-500 mt-2 font-medium">Barcha buyurtmalar va mijozlar ma’lumotlari</p>
        </div>
        <div className="bg-secondary/10 text-secondary px-6 py-2 rounded-2xl font-bold">
          Jami: {orders.length} ta
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-secondary w-12 h-12" /></div>
        ) : (
          orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-100 hover:border-secondary/30 transition-all group">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                
                {/* Mijoz Ma'lumotlari */}
                <div className="flex-1 space-y-4 border-r border-gray-100 pr-8">
                  <div className="flex items-center gap-3 text-secondary">
                    <User className="w-6 h-6" />
                    <span className="text-xs font-black uppercase tracking-widest">Mijoz ma’lumotlari</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{order.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-2xl">
                      <Phone className="w-5 h-5 text-green-500" />
                      <span className="font-bold">{order.phone}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600 bg-gray-50 p-3 rounded-2xl">
                      <MapPin className="w-5 h-5 text-red-500 mt-1" />
                      <span className="font-medium text-sm leading-relaxed">{order.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 p-3">
                      <Calendar className="w-5 h-5" />
                      <span className="text-xs font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Buyurtma Tarkibi */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 text-secondary">
                    <Eye className="w-6 h-6" />
                    <span className="text-xs font-black uppercase tracking-widest">Buyurtma tarkibi</span>
                  </div>
                  <div className="bg-gray-50/50 rounded-2xl p-4 space-y-3">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-800">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                        <span className="font-black text-secondary">${item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-lg font-black text-gray-900 uppercase">Jami summasi:</span>
                      <span className="text-2xl font-black text-secondary">${order.totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Status va Amallar */}
                <div className="flex flex-col justify-center items-center gap-6 lg:w-48">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`w-full px-6 py-4 rounded-3xl text-sm font-black uppercase tracking-widest border-none cursor-pointer shadow-lg transition-all ${
                      order.status === 'pending' ? 'bg-yellow-400 text-white shadow-yellow-200' :
                      order.status === 'cooking' ? 'bg-blue-500 text-white shadow-blue-200' :
                      order.status === 'delivered' ? 'bg-green-500 text-white shadow-green-200' :
                      'bg-gray-400 text-white'
                    }`}
                  >
                    <option value="pending">Kutilmoqda</option>
                    <option value="cooking">Tayyorlanmoqda</option>
                    <option value="delivered">Yetkazildi</option>
                    <option value="cancelled">Bekor qilindi</option>
                  </select>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-secondary font-bold transition-colors">
                    <Truck className="w-5 h-5" />
                    Kuryerga berish
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {!loading && orders.length === 0 && (
          <div className="p-20 text-center text-gray-400 italic">Hozircha buyurtmalar mavjud emas</div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
