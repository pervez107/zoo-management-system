import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Ticket, Compass } from 'lucide-react';
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
      <div className="bg-gray-50 min-h-screen pb-12">
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

          {/* ANIMAL GRID SKELETON (Renders 8 placeholder cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                {/* Image Placeholder */}
                <div className="h-56 bg-slate-200"></div>
                
                {/* Text Placeholders */}
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
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* HERO SECTION */}
      {/* Note: We generally don't lazy-load the hero image because it's immediately visible ("above the fold") */}
      <div
        className="relative text-white py-32 px-6 text-center overflow-hidden shadow-2xl bg-cover bg-center min-h-[450px] flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${heroImg})`, 
        }}
      >
        {/* Dark overlay so the white text is readable */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl flex flex-wrap justify-center items-center gap-4">
            Discover the Wild <Compass className="w-10 h-10 md:w-14 md:h-14 text-green-400" />
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light drop-shadow-md">
            Experience nature up close. Book your tickets today and skip the lines.
          </p>
          
          <Link
            to="/book"
            className="inline-flex items-center gap-3 bg-yellow-500 text-gray-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
          >
            <Ticket className="w-6 h-6" /> Book Your Visit Now
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 max-w-7xl">
        {/* SEARCH BAR SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Meet Our Residents
          </h2>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search animals or species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm text-gray-700 bg-white transition-shadow hover:shadow-md"
            />
            <span className="absolute right-4 top-3.5 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* ANIMAL GRID */}
        {filteredAnimals.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
            No animals found matching "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAnimals.map((animal) => (
              <div
                key={animal._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  {/* OPTIMIZED: Added Lazy Loading and Async Decoding */}
                  <img
                    src={animal.image}
                    alt={animal.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-gray-200"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-semibold border border-white/20">
                    {animal.count} in Zoo
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {animal.name}
                  </h3>
                  <p className="text-sm text-green-600 font-medium italic mb-4">
                    {animal.species}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {animal.description}
                  </p>
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