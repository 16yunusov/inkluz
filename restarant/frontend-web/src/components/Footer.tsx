const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold mb-4">GOURMET EXPRESS</h3>
          <p className="text-sm leading-relaxed">
            Premium food delivery service bringing the best flavors of the city to your doorstep.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-secondary">Home</a></li>
            <li><a href="/menu" className="hover:text-secondary">Menu</a></li>
            <li><a href="/contact" className="hover:text-secondary">About Us</a></li>
            <li><a href="/contact" className="hover:text-secondary">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-secondary">Terms of Service</a></li>
            <li><a href="#" className="hover:text-secondary">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Get the latest updates and offers.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-secondary text-sm"
            />
            <button className="bg-secondary text-white px-4 py-2 rounded-r-lg font-bold">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; 2026 Gourmet Express. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
