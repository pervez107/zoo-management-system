import { Link } from 'react-router-dom';
import { Info, Heart, Utensils, Bus, ShieldCheck, Leaf, Bird, Turtle, Fish, PawPrint } from 'lucide-react';
import mammalImg from '../assets/zoo/mammals-cat.jpg';
import birdImg from '../assets/zoo/birds-cat.jpg';
import reptileImg from '../assets/zoo/reptiles-cat.jpg';
import aquaticImg from '../assets/zoo/aquatic-cat.jpg';
import animalCareImg from '../assets/zoo/Animal Care.jpg';
import conservationImg from '../assets/zoo/Conservation.jpg';

const AboutUs = () => {
  const categories = [
    { name: 'Mammals', icon: <PawPrint className="w-8 h-8" />, image: mammalImg, color: 'bg-orange-500' },
    { name: 'Birds', icon: <Bird className="w-8 h-8" />, image: birdImg, color: 'bg-blue-500' },
    { name: 'Reptiles', icon: <Turtle className="w-8 h-8" />, image: reptileImg, color: 'bg-green-600' },
    { name: 'Aquatic', icon: <Fish className="w-8 h-8" />, image: aquaticImg, color: 'bg-cyan-500' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* HERO SECTION */}
      {/* Note: Hero images generally shouldn't be lazy-loaded because they are at the very top of the screen */}
      <div
        className="relative bg-green-900 text-white py-32 px-6 text-center shadow-xl bg-cover bg-[center_top_30%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg flex justify-center items-center gap-4">
            <Info className="w-12 h-12 text-green-400" /> Our Sanctuary
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light drop-shadow-md">
            Dedicated to global conservation, world-class animal care, and
            unforgettable visitor experiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 space-y-20">
        {/* ANIMAL CATEGORIES SECTION */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore Our Residents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg block bg-gray-200" /* Added bg-gray-200 to act as skeleton */
              >
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"        // ADDED: Lazy loading
                  decoding="async"      // ADDED: Async decoding
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-gray-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div
                    className={`${category.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 font-medium">
                    View species &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ABOUT & ANIMAL CARE SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" /> Care & Conservation
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Our zoo is more than just a park; it is a globally recognized
                conservation center. We believe that every animal deserves an
                environment that closely mimics their natural habitat.
              </p>
              <p>
                Our veterinary team works 24/7 to ensure optimal diets, mental
                stimulation through puzzle feeders, and state-of-the-art medical
                care. Many of our residents are rescues who have been
                rehabilitated by our dedicated staff.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="text-green-500 w-5 h-5" /> Accredited
                  Global Sanctuary Status
                </li>
                <li className="flex items-center gap-3">
                  <Leaf className="text-green-500 w-5 h-5" /> 100% Organic,
                  Species-Specific Diets
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={animalCareImg}
              className="rounded-2xl shadow-lg h-64 object-cover w-full bg-gray-200" // Added bg-gray-200 placeholder
              alt="Animal Care"
              loading="lazy"        // ADDED: Lazy loading
              decoding="async"      // ADDED: Async decoding
            />
            <img
              src={conservationImg}
              className="rounded-2xl shadow-lg h-64 object-cover w-full mt-8 bg-gray-200" // Added bg-gray-200 placeholder
              alt="Conservation"
              loading="lazy"        // ADDED: Lazy loading
              decoding="async"      // ADDED: Async decoding
            />
          </div>
        </div>

        {/* TOURIST FACILITIES SECTION */}
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Visitor Facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex gap-6">
              <div className="bg-orange-100 p-4 rounded-2xl h-fit">
                <Utensils className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  5 Themed Restaurants
                </h3>
                <p className="text-gray-600">
                  From the 'Savanna Grill' overlooking the lion enclosure to the
                  'Rainforest Cafe', we offer a variety of organic,
                  locally-sourced dining options for every diet.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="bg-blue-100 p-4 rounded-2xl h-fit">
                <Bus className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Eco-Friendly Transport
                </h3>
                <p className="text-gray-600">
                  Tired of walking? Hop on our free, 100% electric Safari Trams
                  that circle the park every 15 minutes, complete with guided
                  audio tours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;