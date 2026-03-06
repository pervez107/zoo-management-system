import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, Users, DollarSign, CheckCircle, AlertCircle, Eye, ArrowRight } from 'lucide-react';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get logged in user's email
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tickets/user/${user.email}`);
        setTickets(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets", error);
        setLoading(false);
      }
    };
    if (user) fetchMyTickets();
  }, [user]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
    </div>
  );

  return (
    <div 
      className="relative min-h-screen bg-fixed bg-cover bg-center pb-16"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop')",
      }}
    >
      {/* FIXED OVERLAY - This is the fix! It now stays glued to the screen while you scroll */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90 pointer-events-none z-0"></div>

      {/* CONTENT CONTAINER - Added relative and z-10 so it scrolls smoothly over the fixed background */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
        
        {/* GLASSMORPHISM HEADER */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 flex items-center justify-center md:justify-start gap-4 drop-shadow-lg">
              <Ticket className="w-12 h-12 text-green-400" /> My Explorer Passes
            </h1>
            <p className="text-green-100 text-lg font-light">Manage your zoo adventures and download your digital tickets.</p>
          </div>
          <div className="mt-6 md:mt-0">
             <Link to="/book" className="flex items-center gap-2 bg-green-500 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                Book Another Visit <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </div>

        {/* TICKETS GRID */}
        {tickets.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-16 rounded-3xl shadow-2xl text-center max-w-2xl mx-auto">
            <Ticket className="w-20 h-20 text-gray-400 mx-auto mb-6 opacity-50" />
            <h2 className="text-3xl font-bold text-white mb-3">No Adventures Yet</h2>
            <p className="text-gray-300 mb-8 text-lg">It looks like you haven't planned any wild experiences. Let's fix that!</p>
            <Link to="/book" className="inline-block bg-green-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-400 transition-all">
              Start Your Journey
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tickets.map((ticket) => (
              /* REAL TICKET STUB DESIGN */
              <div key={ticket._id} className="relative group">
                
                {/* The Ticket Card */}
                <div className="flex flex-col sm:flex-row bg-[#fdfbf7] rounded-2xl shadow-xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-300 border border-gray-200">
                  
                  {/* Left Side (Info) */}
                  <div className="p-6 sm:w-2/3">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono text-gray-400 text-sm font-bold tracking-widest">
                        PASS #{ticket.ticketId || ticket._id.substring(0,8)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 ${
                        ticket.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {ticket.paymentStatus === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {ticket.paymentStatus}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-gray-800 mb-4 uppercase tracking-tight">Zoo General Admission</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-600 font-medium">
                        <div className="bg-gray-100 p-2 rounded-lg"><Calendar className="w-5 h-5 text-gray-500" /></div>
                        {new Date(ticket.visitDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-600 font-medium">
                        <div className="bg-gray-100 p-2 rounded-lg"><Users className="w-5 h-5 text-gray-500" /></div>
                        {ticket.adultCount} Adult(s), {ticket.childCount} Child(ren)
                      </div>
                    </div>
                  </div>

                  {/* Divider with Cutouts (The "Tear" line) */}
                  <div className="relative flex items-center sm:flex-col justify-center">
                    {/* Top Cutout */}
                    <div className="absolute top-0 -mt-3 sm:mt-0 sm:-top-3 sm:left-1/2 sm:-translate-x-1/2 w-6 h-6 bg-gray-900 rounded-full z-10"></div>
                    
                    {/* Dashed Line */}
                    <div className="w-full sm:w-px h-px sm:h-full border-t-2 sm:border-l-2 border-dashed border-gray-300 my-4 sm:my-0 sm:mx-4"></div>
                    
                    {/* Bottom Cutout */}
                    <div className="absolute bottom-0 -mb-3 sm:mb-0 sm:-bottom-3 sm:left-1/2 sm:-translate-x-1/2 w-6 h-6 bg-gray-900 rounded-full z-10"></div>
                  </div>

                  {/* Right Side (Price & Action) */}
                  <div className="p-6 sm:w-1/3 bg-gray-50 flex flex-col justify-center items-center text-center">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Total</p>
                    <div className="text-4xl font-black text-green-600 mb-6 flex items-start justify-center">
                      <span className="text-2xl mt-1 mr-1">₹</span>{ticket.totalAmount}
                    </div>

                    {ticket.paymentStatus === 'Paid' ? (
                      <Link to={`/ticket/${ticket.ticketId}`} className="w-full flex justify-center items-center gap-2 bg-gray-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
                        <Eye className="w-4 h-4" /> View Pass
                      </Link>
                    ) : (
                      <Link to={`/payment/${ticket._id}`} className="w-full flex justify-center items-center gap-2 bg-yellow-400 text-gray-900 py-3 px-4 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg">
                        <DollarSign className="w-4 h-4" /> Pay Now
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;