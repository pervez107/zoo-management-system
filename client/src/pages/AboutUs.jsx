import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, Heart, Utensils, Bus, ShieldCheck, Leaf, 
  Bird, Turtle, Fish, PawPrint, X, ChevronLeft, ChevronRight 
} from 'lucide-react';

import mammalImg from '../assets/zoo/mammals-cat.jpg';
import birdImg from '../assets/zoo/birds-cat.jpg';
import reptileImg from '../assets/zoo/reptiles-cat.jpg';
import aquaticImg from '../assets/zoo/aquatic-cat.jpg';
import animalCareImg from '../assets/zoo/Animal Care.jpg';
import conservationImg from '../assets/zoo/Conservation.jpg';

const AboutUs = () => {
  // State for Modal and Slider
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'restaurant' or 'transport'
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { name: 'Mammals', icon: <PawPrint className="w-8 h-8" />, image: mammalImg, color: 'bg-orange-500' },
    { name: 'Birds', icon: <Bird className="w-8 h-8" />, image: birdImg, color: 'bg-blue-500' },
    { name: 'Reptiles', icon: <Turtle className="w-8 h-8" />, image: reptileImg, color: 'bg-green-600' },
    { name: 'Aquatic', icon: <Fish className="w-8 h-8" />, image: aquaticImg, color: 'bg-cyan-500' },
  ];

  // Gallery Data for the Modal
  const galleryData = {
    restaurant: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200", // Restaurant Exterior
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200", 
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200"
    ],
    transport: [
      "https://images.unsplash.com/photo-1709403229285-35ed7d88a79b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b28lMjBzYWZhcmklMjBqZWVwJTIwd2l0aCUyMGFuaW1hbHN8ZW58MHx8MHx8fDA%3D ",
      "https://images.unsplash.com/photo-1690393637461-9007a8b41fbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8em9vJTIwdG91ciUyMHZlaGljbGUlMjBpbnNpZGUlMjBhbmltYWwlMjBwYXJrfGVufDB8fDB8fHww", // Guided Tour Vehicle
      "https://images.unsplash.com/photo-1664775384407-b8e8bb7d43ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lsZGxpZmUlMjBzYWZhcmklMjBidXMlMjB3aXRoJTIwYW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D", // Electric Zoo Shuttle
      "https://images.unsplash.com/photo-1602410132231-9e6c692e02db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2lsZGxpZmUlMjBzYWZhcmklMjBidXMlMjB3aXRoJTIwYW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D", // Safari Truck
      "https://images.unsplash.com/photo-1681166483273-110dcfa6ed08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZGxpZmUlMjBzYWZhcmklMjBidXMlMjB3aXRoJTIwYW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D"  // Eco-tram path
    ]
  };

  const openModal = (type) => {
    setModalType(type);
    setCurrentIndex(0);
    setIsModalOpen(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === galleryData[modalType].length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryData[modalType].length - 1 : prev - 1));
  };

  // Auto Slider Logic
  useEffect(() => {
    let timer;
    if (isModalOpen) {
      timer = setInterval(() => {
        nextSlide();
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isModalOpen, currentIndex, modalType]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* HERO SECTION */}
      <div
        className="relative bg-green-900 text-white py-32 px-6 text-center shadow-xl bg-cover bg-[center_top_30%]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg flex justify-center items-center gap-4">
            <Info className="w-12 h-12 text-green-400" /> Our Sanctuary
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light drop-shadow-md">
            Dedicated to global conservation, world-class animal care, and unforgettable visitor experiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 space-y-20">
        {/* ANIMAL CATEGORIES SECTION */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Our Residents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg block bg-gray-200"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className={`${category.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {category.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-gray-300 font-medium">View species &rarr;</p>
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
              <p>Our zoo is more than just a park; it is a globally recognized conservation center.</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3"><ShieldCheck className="text-green-500 w-5 h-5" /> Accredited Global Sanctuary Status</li>
                <li className="flex items-center gap-3"><Leaf className="text-green-500 w-5 h-5" /> 100% Organic Diets</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={animalCareImg} className="rounded-2xl shadow-lg h-64 object-cover w-full bg-gray-200" alt="Animal Care" />
            <img src={conservationImg} className="rounded-2xl shadow-lg h-64 object-cover w-full mt-8 bg-gray-200" alt="Conservation" />
          </div>
        </div>

        {/* UPDATED: TOURIST FACILITIES SECTION WITH MODAL TRIGGERS */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Visitor Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Restaurant Unique Card */}
            <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600" 
                  alt="Restaurant" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-orange-500 p-3 rounded-2xl text-white shadow-lg">
                  <Utensils className="w-6 h-6" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">5 Themed Restaurants</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  From the 'Savanna Grill' to the 'Rainforest Cafe', we offer organic dining options for every diet.
                </p>
                <button 
                  onClick={() => openModal('restaurant')}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-200"
                >
                  View Restaurant Gallery
                </button>
              </div>
            </div>

            {/* Transport Unique Card */}
            <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600" 
                  alt="Transport" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-blue-500 p-3 rounded-2xl text-white shadow-lg">
                  <Bus className="w-6 h-6" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Eco-Friendly Transport</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hop on our free, 100% electric Safari Trams that circle the park every 15 minutes.
                </p>
                <button 
                  onClick={() => openModal('transport')}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-200"
                >
                  View Transport Gallery
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* POP-UP MODAL WITH AUTO SLIDER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative max-w-5xl w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-[110] bg-white/20 hover:bg-white text-white hover:text-black rounded-full p-2 transition-all shadow-lg"
            >
              <X size={28} />
            </button>

            {/* Main Slider Area */}
            <div className="relative aspect-video">
              <img 
                src={galleryData[modalType][currentIndex]} 
                className="w-full h-full object-cover transition-opacity duration-700" 
                alt="Sanctuary Gallery" 
              />
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-full text-white transition-all border border-white/20"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-full text-white transition-all border border-white/20"
              >
                <ChevronRight size={32} />
              </button>

              {/* Progress Indicators (Dots) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {galleryData[modalType].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-10' : 'bg-white/40 w-3 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </div>

            {/* Modal Info Footer */}
            <div className="p-8 bg-white flex justify-between items-center">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 capitalize">{modalType} Experience</h4>
                <p className="text-gray-500">Image {currentIndex + 1} of {galleryData[modalType].length}</p>
              </div>
              <div className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Sanctuary Virtual Tour
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;