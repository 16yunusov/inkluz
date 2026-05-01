import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Utensils, ShoppingBag, Users, Calendar, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', path: '/admin' },
    { icon: <Utensils />, label: 'Manage Menu', path: '/admin/menu' },
    { icon: <ShoppingBag />, label: 'Manage Orders', path: '/admin/orders' },
    { icon: <Users />, label: 'Manage Users', path: '/admin/users' },
    { icon: <Calendar />, label: 'Reservations', path: '/admin/reservations' },
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen sticky top-0 flex flex-col text-white">
      <div className="p-8">
        <h2 className="text-xl font-bold text-secondary">ADMIN PANEL</h2>
      </div>

      <nav className="flex-grow px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                  location.pathname === item.path
                    ? 'bg-secondary text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-8 border-t border-gray-800">
        <button className="flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors">
          <LogOut />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
