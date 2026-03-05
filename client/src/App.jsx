import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PawPrint, Settings, User, LogOut, Ticket, Info } from 'lucide-react'; 
import { Toaster } from 'react-hot-toast'; // <-- NEW: Imported Toaster
import Home from './pages/Home';
import BookTicket from './pages/BookTicket';
import Payment from './pages/Payment';
import TicketResult from './pages/TicketResult';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import MyTickets from './pages/MyTickets';
import AboutUs from './pages/AboutUs';
import CategoryDetails from './pages/CategoryDetails';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; 
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        
        {/* NEW: Global Toaster Component for modern notifications */}
        <Toaster 
  position="top-right"
  toastOptions={{
    // Default options for all toasts
    style: {
      borderRadius: '12px',
      background: '#1f2937', // Dark gray/black background
      color: '#fff',
      fontWeight: '500',
      padding: '16px',
    },
    // Custom Success Styling
    success: {
      duration: 4000,
      iconTheme: {
        primary: '#22c55e', // Bright Green icon
        secondary: '#fff',
      },
      style: {
        border: '1px solid #22c55e', // Green border
      },
    },
    // Custom Error Styling
    error: {
      duration: 5000,
      iconTheme: {
        primary: '#ef4444', // Bright Red icon
        secondary: '#fff',
      },
      style: {
        border: '1px solid #ef4444', // Red border
      },
    },
  }}
/>

        {/* DYNAMIC NAVBAR - Upgraded with Vector Icons */}
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 text-white flex justify-between items-center sticky top-0 z-50 shadow-xl">
          
          {/* Logo Section */}
          <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-wider flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
            <PawPrint className="w-8 h-8 text-green-500" /> 
            Zoo<span className="text-green-500">System</span>
          </Link>
          
          {/* Links Section */}
          <div className="flex items-center gap-6 font-medium text-sm md:text-base">
            <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors hidden sm:block">Home</Link>
            
            <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors hidden sm:flex items-center gap-1">
               <Info className="w-4 h-4" /> About Us
            </Link>

            {user ? (
              <>
                {/* NEW: My Tickets link (Only shows if user is logged in) */}
                <Link to="/my-tickets" className="text-gray-300 hover:text-green-400 transition-colors hidden sm:block">
                  My Bookings
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin" className="text-yellow-400 flex items-center gap-2 hover:text-yellow-300 hover:bg-yellow-400/10 px-3 py-1.5 rounded-lg transition-all">
                    <Settings className="w-4 h-4" /> Admin
                  </Link>
                )}
                
                {/* User Badge */}
                <span className="text-gray-300 bg-gray-800 px-4 py-1.5 rounded-full border border-gray-700 hidden sm:flex items-center gap-2">
                  <User className="w-4 h-4 text-green-400" /> {user.name}
                </span>
                
                {/* Modern Logout Button */}
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-green-400 transition-colors">Login</Link>
                
                {/* Glowing Buy Ticket Button */}
                <Link to="/book" className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-green-500 hover:shadow-[0_0_15px_rgba(22,163,74,0.5)] transition-all">
                  <Ticket className="w-5 h-5" /> Buy Ticket
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/category/:categoryName" element={<CategoryDetails />} />

          <Route path="/book" element={<ProtectedRoute><BookTicket /></ProtectedRoute>} />
          <Route path="/my-tickets" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
          <Route path="/payment/:bookingId" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/ticket/:ticketId" element={<ProtectedRoute><TicketResult /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;