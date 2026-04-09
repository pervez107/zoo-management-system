import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Ticket, Compass, Users, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast'; 

// IMPORT LOCAL ASSETS
import heroImg from '../assets/zoo/hero-wildlife.jpg';

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/animals');
        setAnimals(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animals:", error);
        toast.error("Unable to load animal data. Please check your connection."); 
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  // Filter animals based on the search bar
  const filteredAnimals = animals.filter(animal => 
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    animal.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==========================================
  // SKELETON LOADER UI
  // ==========================================
  if (loading) {
    return (
      <div className="bg-[#f0f4f8] min-h-screen pb-12">
        {/* HERO SKELETON */}
        <div className="relative py-32 px-6 text-center overflow-hidden bg-slate-800 animate-pulse min-h-[450px] flex flex-col justify-center items-center">
          <div className="w-3/4 md:w-1/2 h-14 md:h-16 bg-slate-700 rounded-3xl mb-6"></div>
          <div className="w-5/6 md:w-2/3 h-6 md:h-8 bg-slate-700 rounded-full mb-10"></div>
          <div className="w-56 h-14 bg-slate-700 rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 mt-12 max-w-7xl">
          {/* SEARCH BAR SKELETON */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 animate-pulse">
            <div className="w-64 h-10 bg-slate-200 rounded-xl"></div>
            <div className="w-full md:w-96 h-12 bg-slate-200 rounded-full"></div>
          </div>

          {/* ANIMAL GRID SKELETON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-64 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-emerald-100/60 rounded w-1/2"></div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN COMPONENT UI
  // ==========================================
  return (
    <div className="bg-[#f0f4f8] min-h-screen pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      {/* HERO SECTION */}
      <div
        className="relative text-white py-32 px-6 text-center overflow-hidden shadow-2xl bg-cover bg-center min-h-[450px] flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${heroImg})`, 
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-[1000] mb-6 tracking-tighter drop-shadow-2xl flex flex-wrap justify-center items-center gap-4 leading-tight">
            Discover the Wild <Compass className="w-10 h-10 md:w-14 md:h-14 text-emerald-400" />
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-medium drop-shadow-md">
            Experience nature up close. Book your tickets today and skip the lines.
          </p>
          
          <Link
            to="/book"
            className="inline-flex items-center gap-3 bg-yellow-400 text-yellow-950 px-8 py-4 rounded-full text-lg font-black uppercase tracking-widest hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(250,204,21,0.4)]"
          >
            <Ticket className="w-6 h-6" /> Book Your Visit Now
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 max-w-7xl">
        {/* SEARCH BAR SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Meet Our Residents
          </h2>

          <div className="relative w-full md:w-96 group">
            <input
              type="text"
              placeholder="Search animals or species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-5 pr-12 py-4 rounded-full border-2 border-slate-200 focus:outline-none focus:border-emerald-500 shadow-sm text-slate-700 bg-white transition-all font-bold group-hover:shadow-lg"
            />
            <span className="absolute right-5 top-4 text-slate-400 group-hover:text-emerald-500 transition-colors">
              <Search className="w-6 h-6" />
            </span>
          </div>
        </div>

        {/* ANIMAL GRID */}
        {filteredAnimals.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-xl bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-sm font-bold">
            No animals found matching "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAnimals.map((animal) => (
              <div
                key={animal._id}
                className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest shadow-lg">
                    {animal.category}
                  </div>

                  {/* Fixed Count Badge */}
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border border-white/10 flex items-center gap-1.5 shadow-lg">
                    <Users className="w-3 h-3 text-emerald-400" /> QTY: {animal.count}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="text-3xl font-black text-slate-900 mb-1 tracking-tight group-hover:text-emerald-600 transition-colors">
                      {animal.name}
                    </h3>
                    <p className="text-xs text-emerald-500 font-black uppercase tracking-widest">
                      {animal.species}
                    </p>
                  </div>
                  
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed font-medium mb-6 flex-grow">
                    {animal.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-cyan-500"/> {animal.conservationStatus || 'Stable'}
                    </span>
                    <Link 
                      to={`/category/${animal.category?.toLowerCase()}`} 
                      className="text-xs font-black text-emerald-600 hover:text-emerald-800 uppercase tracking-widest transition-colors"
                    >
                      View &rarr;
                    </Link>
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

export default Home;