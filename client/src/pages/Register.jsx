import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, UserPlus, AlertCircle, Leaf } from 'lucide-react';
import toast from 'react-hot-toast'; //

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to the backend
      await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // Success notification
      toast.success('Registration successful! Please log in.'); 
      navigate('/login');
    } catch (err) {
      // Error notification
      toast.error(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 md:p-8 relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=2069&auto=format&fit=crop')" 
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm pointer-events-none"></div>

      {/* Main Container - Two Column Split */}
      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT COLUMN - Branding */}
        <div className="md:w-5/12 bg-gradient-to-br from-green-900/95 to-green-800/95 p-10 md:p-12 text-white flex flex-col justify-center items-center text-center">
          <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 shadow-lg">
            <Leaf className="w-10 h-10 text-green-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Join the <span className="text-green-300">Pack</span></h2>
          <p className="text-green-100/80 text-lg font-light leading-relaxed mb-8">
            Create an account to book tickets seamlessly, manage your visits, and support wildlife conservation.
          </p>
        </div>

        {/* RIGHT COLUMN - The Form */}
        <div className="md:w-7/12 bg-white p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h3>
          <p className="text-gray-500 mb-8 font-medium">Fill in your details to start your adventure.</p>
          
          {/* Note: Standard error div removed as toast replaces it */}

          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Name Input */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                <User className="w-4 h-4 text-gray-400" /> Full Name
              </label>
              <input 
                type="text" 
                name="name"
                required 
                placeholder="John Doe"
                className="w-full border-2 border-gray-100 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input 
                type="email" 
                name="email"
                required 
                placeholder="you@example.com"
                className="w-full border-2 border-gray-100 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                <Lock className="w-4 h-4 text-gray-400" /> Password
              </label>
              <input 
                type="password" 
                name="password"
                required 
                placeholder="••••••••"
                className="w-full border-2 border-gray-100 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-all disabled:bg-gray-400 shadow-[0_8px_20px_0_rgba(22,163,74,0.3)] hover:-translate-y-1 mt-2"
            >
              {loading ? 'Creating Account...' : 'Register'} <UserPlus className="w-5 h-5" />
            </button>
          </form>

          {/* Login Redirect */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Already part of the pack?{' '}
              <Link to="/login" className="text-green-600 font-bold hover:text-green-500 hover:underline transition-all">
                Login here
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;