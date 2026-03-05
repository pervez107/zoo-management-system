import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, Lock, ShieldCheck, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast'; // Import toast

const Payment = () => {
  const { bookingId } = useParams(); 
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // VALIDATION: Format Card Number (adds space every 4 digits, blocks letters)
  const handleCardChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 '); 
    if (formattedValue.length <= 19) setCardNumber(formattedValue);
  };

  // VALIDATION: Format Expiry (adds slash, blocks letters)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; 
    }
    if (value.length <= 5) setExpiry(value);
  };

  // VALIDATION: Format CVV (blocks letters)
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 3) setCvv(value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a loading toast for the payment process
    const toastId = toast.loading('Processing your secure payment...');

    // Simulate network delay for realism
    setTimeout(async () => {
      try {
        // Call backend to mark ticket as PAID
        const res = await axios.post('http://localhost:5000/api/tickets/pay', { bookingId });
        
        // Success Toast
        toast.success('Payment Successful! Enjoy your visit ', { id: toastId });
        
        // Redirect to the final Ticket Page
        navigate(`/ticket/${res.data.ticketId}`);
        
      } catch (error) {
        console.error("Payment failed", error);
        // Error Toast
        toast.error("Payment Failed. Please check your card details.", { id: toastId });
        setLoading(false);
      }
    }, 2000); 
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 md:p-8 relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cb2a6a8a3ce?q=80&w=2071&auto=format&fit=crop')" 
      }}
    >
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="md:w-5/12 bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-10 md:p-12 text-white flex flex-col justify-center">
          <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4 leading-tight">Secure <br/><span className="text-blue-400">Checkout</span></h2>
          <p className="text-gray-300 mb-8 text-sm leading-relaxed">
            Your transaction is protected with 256-bit SSL encryption. We do not store your credit card details.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Instant Ticket Delivery</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Fraud Protection</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">24/7 Booking Support</span>
            </div>
          </div>
        </div>

        <div className="md:w-7/12 bg-white p-8 md:p-12 flex flex-col justify-center">
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
            <div className="flex gap-2">
              <div className="bg-gray-100 p-1.5 rounded"><CreditCard className="w-6 h-6 text-gray-600"/></div>
            </div>
          </div>
          
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm font-bold text-yellow-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <p>This is a demo environment. Please enter dummy numbers (e.g., 4242 4242...) and do not use a real credit card.</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-5">
            
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400" /> Card Number
              </label>
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full border-2 border-gray-100 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:ring-0 focus:border-blue-500 outline-none transition-all font-mono text-gray-700 tracking-wider text-lg"
                required
                value={cardNumber}
                onChange={handleCardChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full border-2 border-gray-100 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:ring-0 focus:border-blue-500 outline-none transition-all font-mono text-gray-700 tracking-wider text-lg text-center"
                  required
                  value={expiry}
                  onChange={handleExpiryChange}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                  <Lock className="w-4 h-4 text-gray-400" /> CVV
                </label>
                <input 
                  type="text" 
                  placeholder="123" 
                  className="w-full border-2 border-gray-100 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:ring-0 focus:border-blue-500 outline-none transition-all font-mono text-gray-700 tracking-wider text-lg text-center"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || cardNumber.length < 19 || expiry.length < 5 || cvv.length < 3}
              className="w-full mt-4 flex justify-center items-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all disabled:bg-gray-400 shadow-[0_8px_20px_0_rgba(37,99,235,0.3)] hover:-translate-y-1"
            >
              {loading ? 'Processing Securely...' : 'Complete Payment'} 
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1 font-medium">
              <Lock className="w-3 h-3" /> Payments are secure and encrypted.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;