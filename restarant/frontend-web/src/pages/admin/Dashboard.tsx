import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: <Users />, color: 'bg-blue-500' },
    { label: 'Total Orders', value: '456', icon: <ShoppingBag />, color: 'bg-green-500' },
    { label: 'Total Revenue', value: '$12,345', icon: <DollarSign />, color: 'bg-purple-500' },
    { label: 'Active Tasks', value: '12', icon: <TrendingUp />, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`${stat.color} p-4 rounded-2xl text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold">
                    #{order}
                  </div>
                  <div>
                    <p className="font-bold">John Doe</p>
                    <p className="text-xs text-gray-500">2 mins ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Pending</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6">Popular Items</h3>
          <div className="space-y-4">
            {['Truffle Burger', 'Sushi Platter', 'Margherita Pizza'].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <p className="font-bold">{item}</p>
                <p className="text-secondary font-bold">45 sales</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
