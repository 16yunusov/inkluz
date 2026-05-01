import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-extrabold mb-6">Get in Touch</h1>
          <p className="text-gray-500 mb-10 leading-relaxed text-lg">
            Have questions about our menu, catering, or reservations? We'd love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                <MapPin />
              </div>
              <div>
                <h3 className="font-bold">Our Location</h3>
                <p className="text-gray-500">123 Gourmet Street, Food City, FC 12345</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                <Phone />
              </div>
              <div>
                <h3 className="font-bold">Phone Number</h3>
                <p className="text-gray-500">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                <Mail />
              </div>
              <div>
                <h3 className="font-bold">Email Address</h3>
                <p className="text-gray-500">hello@gourmetexpress.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">First Name</label>
                <input type="text" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-secondary/20" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Last Name</label>
                <input type="text" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-secondary/20" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input type="email" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-secondary/20" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Message</label>
              <textarea rows={4} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-secondary/20" placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="w-full btn-primary py-5 text-lg">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
