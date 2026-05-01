import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, Link as LinkIcon } from 'lucide-react';
import API from '../../api';

const ManageMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Burgers');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/menu');
      setItems(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/menu', {
        name,
        price: Number(price),
        category,
        description,
        image: imageUrl // Link ko'rinishida yuboriladi
      });
      setShowModal(false);
      fetchItems();
      // Reset form
      setName(''); setPrice(''); setDescription(''); setImageUrl('');
    } catch (err) {
      alert('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Haqiqatdan ham o‘chirmoqchimisiz?')) {
      try {
        await API.delete(`/menu/${id}`);
        fetchItems();
      } catch (err) {
        alert('O‘chirishda xatolik');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menyuni boshqarish</h1>
          <p className="text-gray-500">Taomlarni qo‘shish, tahrirlash va o‘chirish</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Yangi taom qo‘shish
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-6">Yangi taom qo‘shish</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Taom nomi" className="w-full bg-gray-50 border-none rounded-xl p-4" value={name} onChange={e => setName(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Narxi ($)" className="w-full bg-gray-50 border-none rounded-xl p-4" value={price} onChange={e => setPrice(e.target.value)} />
                <select className="w-full bg-gray-50 border-none rounded-xl p-4" value={category} onChange={e => setCategory(e.target.value)}>
                  <option>Burgers</option>
                  <option>Pizza</option>
                  <option>Salads</option>
                  <option>Sushi</option>
                  <option>Desserts</option>
                  <option>Beverages</option>
                </select>
              </div>
              <textarea placeholder="Tavsif" className="w-full bg-gray-50 border-none rounded-xl p-4" rows={3} value={description} onChange={e => setDescription(e.target.value)}></textarea>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Rasm linki (URL)
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="https://example.com/image.jpg" 
                  className="w-full bg-gray-50 border-none rounded-xl p-4" 
                  value={imageUrl} 
                  onChange={e => setImageUrl(e.target.value)} 
                />
              </div>
              <button type="submit" className="w-full btn-primary py-4 mt-4">Saqlash</button>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-secondary" /></div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700">Taom</th>
                <th className="px-6 py-4 font-bold text-gray-700">Kategoriya</th>
                <th className="px-6 py-4 font-bold text-gray-700">Narxi</th>
                <th className="px-6 py-4 font-bold text-gray-700">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item: any) => (
                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} className="w-10 h-10 object-cover rounded-lg" alt="" />
                      <span className="font-semibold text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 font-bold text-secondary">${item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageMenu;
