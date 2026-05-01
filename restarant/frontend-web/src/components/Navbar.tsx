import { Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { translations as t } from '../locales/uz';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="text-2xl font-extrabold text-secondary tracking-tight">
            GOURMET<span className="text-gray-900">EXPRESS</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-secondary font-medium">{t.nav.home}</Link>
            <Link to="/menu" className="text-gray-600 hover:text-secondary font-medium">{t.nav.menu}</Link>
            <Link to="/contact" className="text-gray-600 hover:text-secondary font-medium">{t.nav.contact}</Link>
            
            {/* Yangi Buyurtmalar tugmasi (Admin uchun yoki login qilganlar uchun) */}
            <Link to="/admin/orders" className="flex items-center gap-2 text-gray-600 hover:text-secondary font-bold">
              <ClipboardList className="w-5 h-5" />
              Buyurtmalar
            </Link>

            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-secondary transition-colors" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700">{user.name}</span>
                <button onClick={logout} className="text-red-500 font-bold hover:underline">{t.common.logout}</button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">{t.common.login}</Link>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg">
          <Link to="/" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t.nav.home}</Link>
          <Link to="/menu" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t.nav.menu}</Link>
          <Link to="/contact" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t.nav.contact}</Link>
          <Link to="/admin/orders" className="block text-secondary font-bold" onClick={() => setIsOpen(false)}>Buyurtmalar</Link>
          <Link to="/login" className="w-full btn-primary py-3 block text-center" onClick={() => setIsOpen(false)}>{t.common.login}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
