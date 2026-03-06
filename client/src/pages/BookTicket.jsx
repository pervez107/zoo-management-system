import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Ticket as TicketIcon, User, Mail, Calendar, Users, DollarSign, Clock, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast'; // Import toast

const BookTicket = () => {
  const navigate = useNavigate();
  
  // 1. Get the logged-in user from LocalStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};

  // 2. Pre-fill the form with the user's actual name and email
  const [formData, setFormData] = useState({
    visitorName: user.name || '',
    email: user.email || '',
    visitDate: '',
    adultCount: 1,
    childCount: 0
  });

  const [loading, setLoading] = useState(false);

  // Price Constants
  const TICKET_PRICE = 20; // $20 per adult

  // GET TODAY'S DATE in YYYY-MM-DD format to disable past dates
  const today = new Date().toISOString().split('T')[0];

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate Total Price
  const totalPrice = formData.adultCount * TICKET_PRICE;

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Create a loading toast
    const toastId = toast.loading('Initiating your booking...');

    try {
      // Send data to backend
      const res = await axios.post('http://localhost:5000/api/tickets/book', formData);
      
      toast.success('Booking details saved!', { id: toastId });
      
      // Navigate to payment
      navigate(`/payment/${res.data.bookingId}`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMsg, { id: toastId });
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 md:p-8 relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=2070&auto=format&fit=crop')" 
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm pointer-events-none"></div>

      {/* Main Container - Two Column Split */}
      <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT COLUMN - Information & Perks */}
        <div className="md:w-5/12 bg-gradient-to-br from-green-900/90 to-green-800/90 p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20 shadow-lg">
              <TicketIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">Secure Your<br/><span className="text-green-300">Wild Journey</span></h2>
            <p className="text-green-100/80 mb-8 text-lg font-light leading-relaxed">
              Book your tickets in advance to skip the lines and guarantee your entry to the most immersive wildlife experience.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-800 p-2 rounded-full mt-1"><Clock className="w-5 h-5 text-green-300" /></div>
                <div>
                  <h4 className="font-bold text-lg">Skip the Line</h4>
                  <p className="text-sm text-green-200/70">Go straight to the entrance with digital passes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-800 p-2 rounded-full mt-1"><Leaf className="w-5 h-5 text-green-300" /></div>
                <div>
                  <h4 className="font-bold text-lg">Support Conservation</h4>
                  <p className="text-sm text-green-200/70">10% of all ticket sales go directly to wildlife rescue.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-800 p-2 rounded-full mt-1"><ShieldCheck className="w-5 h-5 text-green-300" /></div>
                <div>
                  <h4 className="font-bold text-lg">Secure Booking</h4>
                  <p className="text-sm text-green-200/70">Your data and payment are 100% encrypted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - The Form */}
        <div className="md:w-7/12 bg-white p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            Reservation Details
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="visitorName" 
                  required
                  value={formData.visitorName} 
                  className="w-full border-2 border-gray-100 bg-gray-50 p-3 rounded-xl focus:bg-white focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" /> Account Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  readOnly 
                  value={formData.email} 
                  className="w-full border-2 border-gray-100 p-3 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed outline-none font-medium"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" /> Visit Date
              </label>
              <input 
                type="date" 
                name="visitDate" 
                required
                min={today} 
                className="w-full border-2 border-gray-100 bg-gray-50 p-3 rounded-xl focus:bg-white focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                onChange={handleChange}
              />
            </div>

            {/* Counts */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 border-2 border-gray-100 p-4 rounded-xl transition-all focus-within:border-green-500 focus-within:bg-white">
                <label className="flex justify-between items-center text-gray-700 font-bold mb-2 text-sm w-full">
                  <span className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /> Adults</span>
                  <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs">₹20</span>
                </label>
                <input 
                  type="number" 
                  name="adultCount" 
                  min="1"
                  value={formData.adultCount}
                  className="w-full bg-transparent text-xl font-bold text-gray-800 outline-none"
                  onChange={handleChange}
                />
              </div>
              
              <div className="bg-gray-50 border-2 border-gray-100 p-4 rounded-xl transition-all focus-within:border-green-500 focus-within:bg-white">
                <label className="flex justify-between items-center text-gray-700 font-bold mb-2 text-sm w-full">
                  <span className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /> Children</span>
                  <span className="text-gray-500 bg-gray-200 px-2 py-0.5 rounded text-xs">Free</span>
                </label>
                <input 
                  type="number" 
                  name="childCount" 
                  min="0"
                  value={formData.childCount}
                  className="w-full bg-transparent text-xl font-bold text-gray-800 outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gray-100 my-4"></div>

            {/* Total Price & Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-1">Total Amount</p>
                <div className="text-4xl font-black text-gray-900 flex items-start">
                  <span className="text-2xl mt-1 mr-1 text-green-500">₹</span>{totalPrice}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto flex-1 flex justify-center items-center gap-2 bg-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-green-500 transition-all disabled:bg-gray-400 shadow-[0_8px_20px_0_rgba(22,163,74,0.3)] hover:-translate-y-1"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;