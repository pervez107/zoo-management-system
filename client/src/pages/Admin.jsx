import { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, PlusCircle, Trash2, Image as ImageIcon, CheckCircle, List, Ticket, DollarSign, Users, Activity, Leaf, Filter } from 'lucide-react';
import toast from 'react-hot-toast'; 

const Admin = () => {
  const [animals, setAnimals] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // NEW: Initial load state
  
  // Filter State for the table
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', species: '', description: '', image: '', count: 1,
    category: 'Mammals', born: '', origin: ''
  });

  // Fetch all animals & tickets on load
  const fetchData = async () => {
    try {
      const [animalRes, ticketRes] = await Promise.all([
        axios.get('http://localhost:5000/api/animals'),
        axios.get('http://localhost:5000/api/tickets')
      ]);
      setAnimals(animalRes.data);
      setTickets(ticketRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
      toast.error("Failed to load database records."); 
    } finally {
      setInitialLoading(false); // Stop loader regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate Dashboard Metrics
  const totalRevenue = tickets
    .filter(t => t.paymentStatus === 'Paid')
    .reduce((sum, t) => sum + t.totalAmount, 0);
    
  const totalVisitors = tickets
    .filter(t => t.paymentStatus === 'Paid')
    .reduce((sum, t) => sum + t.adultCount + t.childCount, 0);

  // Filter Animals Logic
  const filteredAnimals = animals.filter(animal => {
    if (filterCategory === 'All') return true;
    return animal.category === filterCategory;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Upload Handler
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append('image', file);
    
    setUploading(true);
    const toastId = toast.loading('Uploading image...'); 

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('http://localhost:5000/api/upload', imageFormData, config);
      setFormData({ ...formData, image: `http://localhost:5000${data.imageUrl}` });
      setUploading(false);
      toast.success('Image uploaded successfully!', { id: toastId }); 
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error("Image upload failed!", { id: toastId }); 
    }
  };

  // Submit New Animal
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Please upload an image first!"); 

    try {
      await axios.post('http://localhost:5000/api/animals', formData);
      toast.success(`${formData.name} added to the sanctuary! 🦁`); 
      setFormData({ name: '', species: '', description: '', image: '', count: 1, category: 'Mammals', born: '', origin: '' }); 
      fetchData(); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding animal'); 
    }
  };

  // Delete Animal
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently remove this animal record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/animals/${id}`);
        toast.success("Record deleted successfully."); 
        fetchData(); 
      } catch (error) {
        toast.error("Error deleting animal"); 
      }
    }
  };

  // ==========================================
  // SKELETON LOADER UI (Shows while fetching data)
  // ==========================================
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10 pb-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="bg-slate-200 h-32 md:h-40 rounded-3xl w-full animate-pulse"></div>

          {/* KPI Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 animate-pulse">
                <div className="bg-slate-200 w-16 h-16 rounded-2xl"></div>
                <div className="space-y-3 flex-1">
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Layout Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Table Skeleton */}
            <div className="order-2 lg:order-1 lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-[850px] p-8 animate-pulse">
               <div className="h-8 bg-slate-200 rounded w-1/3 mb-10"></div>
               <div className="space-y-6 mt-12">
                 {[1,2,3,4,5,6].map(i => <div key={i} className="h-16 bg-slate-100 rounded-2xl w-full"></div>)}
               </div>
            </div>
            
            {/* Form Skeleton */}
            <div className="order-1 lg:order-2 lg:col-span-1 bg-white rounded-3xl shadow-xl border border-gray-100 h-[850px] p-8 animate-pulse">
               <div className="h-8 bg-slate-200 rounded w-1/2 mb-10"></div>
               <div className="space-y-6 mt-12">
                 <div className="h-12 bg-slate-100 rounded-xl w-full"></div>
                 <div className="h-12 bg-slate-100 rounded-xl w-full"></div>
                 <div className="h-12 bg-slate-100 rounded-xl w-full"></div>
                 <div className="h-24 bg-slate-100 rounded-xl w-full"></div>
                 <div className="h-32 bg-slate-200 border-2 border-dashed border-slate-300 rounded-xl w-full mt-8"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN COMPONENT UI
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl flex items-center justify-between bg-cover bg-[center_top_30%] relative overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="bg-yellow-500 p-4 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)] border border-yellow-400">
              <Settings className="w-8 h-8 text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-1">Command Center</h1>
              <p className="text-green-300 font-medium text-lg flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Global Zoo Management System
              </p>
            </div>
          </div>
        </div>

        {/* KPI METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-green-100 p-4 rounded-2xl"><Activity className="w-8 h-8 text-green-600"/></div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Animals</p>
              <h3 className="text-3xl font-black text-gray-800">{animals.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-blue-100 p-4 rounded-2xl"><Ticket className="w-8 h-8 text-blue-600"/></div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Bookings</p>
              <h3 className="text-3xl font-black text-gray-800">{tickets.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-yellow-100 p-4 rounded-2xl"><DollarSign className="w-8 h-8 text-yellow-600"/></div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-3xl font-black text-gray-800">${totalRevenue}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-purple-100 p-4 rounded-2xl"><Users className="w-8 h-8 text-purple-600"/></div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Visitors</p>
              <h3 className="text-3xl font-black text-gray-800">{totalVisitors}</h3>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT: TABLE ON LEFT, FORM ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: ANIMALS DATABASE TABLE */}
          <div className="order-2 lg:order-1 lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[850px]">
            
            <div className="p-6 md:p-8 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <List className="text-blue-400 w-7 h-7" /> Residents Database
                </h2>
                <p className="text-sm text-gray-400 font-medium mt-1">Manage all active zoo inhabitants below.</p>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)} 
                    className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block pl-9 pr-8 py-2.5 outline-none appearance-none cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Mammals">Mammals</option>
                    <option value="Birds">Birds</option>
                    <option value="Reptiles">Reptiles</option>
                    <option value="Aquatic">Aquatic</option>
                  </select>
                </div>
                <span className="hidden sm:inline-block bg-blue-500/20 text-blue-300 border border-blue-500/30 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm whitespace-nowrap">
                  {filteredAnimals.length} Records
                </span>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-gray-50 z-10">
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="p-5 font-bold">Resident Details</th>
                    <th className="p-5 font-bold">Category</th>
                    <th className="p-5 font-bold">Origin</th>
                    <th className="p-5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAnimals.length === 0 ? (
                    <tr><td colSpan="4" className="p-12 text-center text-gray-500 font-medium text-lg">No animals found in this category.</td></tr>
                  ) : (
                    filteredAnimals.map((animal) => (
                      <tr key={animal._id} className="hover:bg-green-50/50 transition-colors group">
                        <td className="p-5 flex items-center gap-5">
                          {/* OPTIMIZED: Lazy Loading & Async Decoding Added */}
                          <img 
                            src={animal.image} 
                            alt={animal.name} 
                            loading="lazy" 
                            decoding="async" 
                            className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow bg-gray-200" 
                          />
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{animal.name}</p>
                            <p className="text-xs text-green-600 font-bold tracking-wide">{animal.species}</p>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="bg-gray-100 text-gray-700 border border-gray-200 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                            {animal.category || 'Mammals'}
                          </span>
                        </td>
                        <td className="p-5 text-sm text-gray-600 font-medium truncate max-w-[150px]">
                          {animal.origin || 'Unknown'}
                        </td>
                        <td className="p-5 text-right">
                          <button onClick={() => handleDelete(animal._id)} className="bg-white border border-red-100 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-md">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: ADD ANIMAL FORM */}
          <div className="order-1 lg:order-2 lg:col-span-1 sticky top-24">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-[850px] flex flex-col">
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 text-white border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <PlusCircle className="text-green-400 w-7 h-7" /> Register Resident
                </h2>
                <p className="text-gray-400 text-sm mt-1">Add a new animal to the sanctuary system.</p>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-medium text-sm" placeholder="e.g. Leo" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-medium text-sm text-gray-700">
                        <option value="Mammals">Mammals</option>
                        <option value="Birds">Birds</option>
                        <option value="Reptiles">Reptiles</option>
                        <option value="Aquatic">Aquatic</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Species</label>
                    <input type="text" name="species" required value={formData.species} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-medium text-sm" placeholder="e.g. African Lion" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date of Birth</label>
                      <input type="date" name="born" required value={formData.born} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all text-xs font-medium text-gray-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quantity</label>
                      <input type="number" name="count" min="1" required value={formData.count} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-medium text-sm text-center" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Origin Details</label>
                    <input type="text" name="origin" required value={formData.origin} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all font-medium text-sm" placeholder="e.g. Rescued from Kenya" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                    <textarea name="description" required value={formData.description} onChange={handleChange} rows="2" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:border-green-500 focus:bg-white outline-none transition-all resize-none font-medium text-sm text-gray-700"></textarea>
                  </div>
                  
                  <div className="border-2 border-dashed border-green-200 rounded-xl p-5 text-center bg-green-50 hover:bg-green-100/50 transition-colors group">
                    <label className="cursor-pointer flex flex-col items-center">
                      <div className="bg-white p-2 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-6 h-6 text-green-500" />
                      </div>
                      <span className="text-sm font-bold text-green-700">Select Image File</span>
                      <input type="file" className="hidden" onChange={uploadFileHandler} />
                    </label>
                    {uploading && <p className="text-xs text-blue-600 mt-2 font-black animate-bounce">Uploading...</p>}
                    {formData.image && <p className="text-xs text-green-700 mt-2 font-black flex items-center justify-center gap-1 bg-white inline-flex px-3 py-1 rounded-full shadow-sm"><CheckCircle className="w-3 h-3"/> Image Ready</p>}
                  </div>

                  <button type="submit" disabled={uploading} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-all shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5 disabled:bg-gray-400 mt-4">
                    Create Record
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* TICKET / BOOKING MANAGEMENT SECTION */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mt-8">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-900 text-white">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Ticket className="text-yellow-400 w-7 h-7" /> Financial & Booking Log
              </h2>
              <p className="text-gray-400 text-sm mt-1">Track all global ticket sales and visitor reservations.</p>
            </div>
          </div>
          
          <div className="overflow-x-auto p-4 max-h-[500px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="p-5 font-bold">Ticket ID</th>
                  <th className="p-5 font-bold">Visitor Details</th>
                  <th className="p-5 font-bold">Visit Date</th>
                  <th className="p-5 font-bold">Party Size</th>
                  <th className="p-5 font-bold text-right">Revenue</th>
                  <th className="p-5 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tickets.length === 0 ? (
                  <tr><td colSpan="6" className="p-12 text-center text-gray-500 font-medium text-lg">No bookings yet.</td></tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-5 font-mono text-sm font-bold text-gray-600 tracking-wide">
                        {ticket.ticketId || ticket._id.substring(0,8)}
                      </td>
                      <td className="p-5">
                        <p className="font-bold text-gray-900 text-base">{ticket.visitorName}</p>
                        <p className="text-xs text-gray-500 font-medium">{ticket.email}</p>
                      </td>
                      <td className="p-5 text-sm font-bold text-gray-700">
                        <span className="bg-gray-100 px-3 py-1 rounded-md border border-gray-200">
                          {new Date(ticket.visitDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-5 text-sm font-medium text-gray-600">
                        {ticket.adultCount} Adults, {ticket.childCount} Kids
                      </td>
                      <td className="p-5 text-right font-black text-green-600 text-lg">
                        ${ticket.totalAmount}
                      </td>
                      <td className="p-5 text-right">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase inline-block shadow-sm ${
                          ticket.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                          {ticket.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;