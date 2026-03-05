import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Dna, Calendar, MapPin, ArrowLeft, Sparkles } from 'lucide-react';

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/animals');
        
        // Filter animals based on the category clicked
        const filtered = res.data.filter(animal => 
          (animal.category && animal.category.toLowerCase() === categoryName) ||
          (animal.species && animal.species.toLowerCase().includes(categoryName.slice(0, 3)))
        );
        
        setAnimals(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animals:", error);
        setLoading(false);
      }
    };
    fetchAnimals();
  }, [categoryName]);

  // ==========================================
  // SKELETON LOADER UI
  // ==========================================
  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Skeleton Header Area */}
          <div className="w-48 h-10 bg-emerald-100/50 rounded-full mb-8 animate-pulse"></div>
          <div className="mb-16">
            <div className="w-3/4 md:w-1/3 h-14 md:h-16 bg-slate-200 rounded-2xl mb-4 animate-pulse"></div>
            <div className="w-full md:w-1/2 h-6 bg-slate-200 rounded-full animate-pulse"></div>
          </div>

          {/* Skeleton Animal Cards (Render 2 placeholders) */}
          <div className="space-y-20">
            {[1, 2].map((item, index) => (
              <div 
                key={item} 
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 animate-pulse`}
              >
                
                {/* Left Side: Text Skeletons */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div>
                    <div className="h-10 md:h-12 bg-slate-200 rounded-xl w-3/4 mb-4"></div>
                    <div className="h-8 bg-emerald-100/50 rounded-full w-1/3"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded-full w-full"></div>
                    <div className="h-4 bg-slate-200 rounded-full w-5/6"></div>
                    <div className="h-4 bg-slate-200 rounded-full w-4/6"></div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <div className="flex-1 h-24 bg-blue-50/50 rounded-3xl border border-blue-100/50"></div>
                    <div className="flex-1 h-24 bg-orange-50/50 rounded-3xl border border-orange-100/50"></div>
                  </div>
                </div>

                {/* Right Side: Image Skeleton */}
                <div className="w-full lg:w-1/2">
                  <div className="h-[400px] md:h-[500px] w-full bg-slate-200 rounded-[2.5rem]"></div>
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
    <div className="bg-slate-50 min-h-screen pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <Link to="/about" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-500 mb-8 transition-colors bg-emerald-50 px-4 py-2 rounded-full shadow-sm hover:shadow">
          <ArrowLeft className="w-5 h-5" /> Back to Categories
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400 mb-4 capitalize flex items-center gap-4">
            {categoryName} <Sparkles className="w-10 h-10 text-teal-400" />
          </h1>
          <p className="text-xl text-gray-500 font-medium">Meet the incredible {categoryName} of our sanctuary.</p>
        </div>

        {animals.length === 0 ? (
          <div className="bg-white p-16 rounded-[2.5rem] text-center shadow-xl shadow-emerald-900/5 border border-emerald-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
            <h3 className="text-3xl font-black text-gray-800 mb-3">No {categoryName} found yet!</h3>
            <p className="text-gray-500 text-lg">Check back later or add some from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {animals.map((animal, index) => (
              <div 
                key={animal._id} 
                className={`relative flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-white hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group overflow-hidden`}
              >
                {/* Decorative Background Blob */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

                {/* LEFT: Text Information */}
                <div className="w-full lg:w-1/2 space-y-8 relative z-10">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-emerald-700 transition-colors duration-300">
                      {animal.name}
                    </h2>
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg shadow-emerald-500/30">
                      <Dna className="w-4 h-4" /> {animal.species}
                    </span>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    {animal.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {/* DOB Card */}
                    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-3xl border border-blue-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-500">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Date of Birth</p>
                          <p className="font-black text-gray-800 text-lg">{animal.born || 'Protected'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Origin Card */}
                    <div className="flex-1 bg-gradient-to-br from-orange-50 to-amber-50/50 p-5 rounded-3xl border border-orange-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-2xl shadow-sm text-orange-500">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Origin</p>
                          <p className="font-black text-gray-800 text-lg">{animal.origin || 'Rescue Program'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Single Beautiful Image */}
                <div className="w-full lg:w-1/2 relative z-10">
                  {/* Decorative Image Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-teal-300 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-slate-900/20 border-4 border-white">
                    {/* OPTIMIZED: Lazy Loading & Async Decoding Added */}
                    <img 
                      src={animal.image} 
                      alt={animal.name} 
                      loading="lazy" 
                      decoding="async"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out bg-slate-200" 
                    />
                    
                    {/* Subtle overlay gradient on image to make it pop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
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

export default CategoryDetails;