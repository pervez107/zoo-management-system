import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, PawPrint } from 'lucide-react';
import toast from 'react-hot-toast'; // Import toast

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Create a loading toast
    const toastId = toast.loading('Authenticating your explorer account...');

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save user data to LocalStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Success Notification
      toast.success(`Welcome back, ${res.data.user.name}!`, { id: toastId });

      // Small delay for the toast before redirecting
      setTimeout(() => {
        if (res.data.user.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/book";
        }
      }, 1000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid email or password";
      // Error Notification
      toast.error(errorMsg, { id: toastId });
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 md:p-8 relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop')" 
      }}
    >
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="md:w-5/12 bg-gradient-to-br from-green-900/95 to-green-800/95 p-10 md:p-12 text-white flex flex-col justify-center items-center text-center">
          <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 shadow-lg">
            <PawPrint className="w-10 h-10 text-green-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Welcome Back to the <span className="text-green-300">Wild</span></h2>
          <p className="text-green-100/80 text-lg font-light leading-relaxed mb-8">
            Log in to access your explorer dashboard, manage your tickets, and plan your next adventure.
          </p>
        </div>

        <div className="md:w-7/12 bg-white p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Account Login</h3>
          <p className="text-gray-500 mb-8 font-medium">Please enter your credentials to continue.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                required 
                className="w-full border-2 border-gray-100 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2 text-sm">
                <Lock className="w-4 h-4 text-gray-400" /> Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                className="w-full border-2 border-gray-100 bg-gray-50 p-3.5 rounded-xl focus:bg-white focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading} 
              className="w-full flex justify-center items-center gap-2 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-all disabled:bg-gray-400 shadow-[0_8px_20px_0_rgba(22,163,74,0.3)] hover:-translate-y-1"
            >
              {loading ? 'Authenticating...' : 'Secure Login'} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-green-600 font-bold hover:text-green-500 hover:underline transition-all">
                Create one here
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;