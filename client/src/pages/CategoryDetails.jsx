import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Dna, Calendar, MapPin, ArrowLeft, Sparkles, 
  Heart, Activity, ShieldCheck, Zap, Globe 
} from 'lucide-react';

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/animals');
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

  if (loading) {
    return (
      <div className="bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f4f8] min-h-screen pb-32 pt-12 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation */}
        <Link to="/about" className="group inline-flex items-center gap-3 text-emerald-700 font-black uppercase tracking-widest text-xs mb-12 transition-all hover:gap-5">
          <div className="bg-white p-2 rounded-full shadow-md group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Sanctuary
        </Link>

        {/* Dynamic Header */}
        <div className="mb-24 relative">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-200/40 blur-3xl rounded-full"></div>
          <h1 className="text-6xl md:text-8xl font-[1000] text-slate-900 mb-6 capitalize leading-none tracking-tighter">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500">{categoryName}</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Exploring the magnificent biodiversity of our {categoryName} inhabitants. Each resident tells a unique story of survival and grace.
          </p>
        </div>

        {animals.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-xl p-20 rounded-[3rem] text-center border-4 border-dashed border-slate-200">
             <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Globe className="w-10 h-10" />
             </div>
             <h3 className="text-3xl font-black text-slate-800 mb-2">Sanctuary Empty</h3>
             <p className="text-slate-500">Our team is currently gathering data for this sector.</p>
          </div>
        ) : (
          <div className="space-y-32">
            {animals.map((animal, index) => (
              <div 
                key={animal._id} 
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center group`}
              >
                {/* Image Section - The "Window" */}
                <div className="w-full lg:w-1/2 relative">
                  <div className={`absolute -inset-4 bg-gradient-to-tr ${index % 2 === 0 ? 'from-emerald-400 to-cyan-400' : 'from-purple-400 to-pink-400'} rounded-[4rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}></div>
                  
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-white">
                    <img 
                      src={animal.image} 
                      alt={animal.name} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    
                    {/* Floating Status Badge */}
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Status: {animal.conservationStatus || 'Thriving'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section - The "Tablet" */}
                <div className="w-full lg:w-1/2 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-[2px] w-12 bg-emerald-500"></div>
                      <span className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">Profile 00{index + 1}</span>
                    </div>
                    <h2 className="text-6xl font-[1000] text-slate-900 tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                      {animal.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="bg-slate-900 text-white px-4 py-1.5 rounded-xl font-bold text-[10px] uppercase flex items-center gap-2">
                        <Dna className="w-3 h-3 text-emerald-400" /> {animal.species}
                      </span>
                      <span className="bg-white px-4 py-1.5 rounded-xl font-bold text-[10px] uppercase border border-slate-200 text-slate-600 shadow-sm">
                        Gen: {animal.gender || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xl text-slate-600 leading-relaxed font-medium bg-white/50 p-6 rounded-3xl border border-white">
                    <Sparkles className="w-5 h-5 text-emerald-500 mb-3" />
                    "{animal.description}"
                  </p>

                  {/* Grid Data Chips */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="group/item bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all">
                      <Calendar className="w-6 h-6 text-emerald-500 mb-3 group-hover/item:scale-110 transition-transform" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Arrival/Age</p>
                      <p className="font-extrabold text-slate-800 text-lg">{animal.born || 'Adult'}</p>
                    </div>
                    <div className="group/item bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all">
                      <MapPin className="w-6 h-6 text-cyan-500 mb-3 group-hover/item:scale-110 transition-transform" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Native Habitat</p>
                      <p className="font-extrabold text-slate-800 text-lg">{animal.origin || 'Sanctuary'}</p>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group/bar">
                    <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
                    <div className="space-y-6 relative z-10">
                      <div className="flex gap-4">
                        <div className="bg-emerald-500/20 p-2 rounded-lg h-fit"><Activity className="w-4 h-4 text-emerald-400" /></div>
                        <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Daily Behavior</p>
                          <p className="text-sm font-medium text-slate-300 leading-snug">{animal.behavior || 'Shows highly complex social interactions within the group.'}</p>
                        </div>
                      </div>
                      <div className="w-full h-px bg-white/10"></div>
                      <div className="flex gap-4">
                        <div className="bg-cyan-500/20 p-2 rounded-lg h-fit"><ShieldCheck className="w-4 h-4 text-cyan-400" /></div>
                        <div>
                          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Unique Trait</p>
                          <p className="text-sm font-medium text-slate-300 leading-snug">{animal.funFacts || 'Possesses unique biological markers used for environmental research.'}</p>
                        </div>
                      </div>
                    </div>
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