'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import LocationModal from '@/components/features/LocationModal';
import { bannerSlides, categories, products, bottomBanners } from '@/lib/data';

export default function Home() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Check if location is already selected
    const location = localStorage.getItem('selectedLocation');
    if (!location) {
      setIsLocationModalOpen(true);
    } else {
      setSelectedLocation(location);
    }

    // Listen for location modal open event
    const handleOpenLocationModal = () => {
      setIsLocationModalOpen(true);
    };
    window.addEventListener('openLocationModal', handleOpenLocationModal);

    return () => {
      window.removeEventListener('openLocationModal', handleOpenLocationModal);
    };
  }, []);

  useEffect(() => {
    // Auto-rotate banner slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const topDeals = products.filter(p => p.category === 'exclusive-deals').slice(0, 3);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* Main Content */}
      <main className="pt-20 pb-20 md:pb-0">
        
        {/* Location Bar */}
        {selectedLocation && (
          <div className="bg-white py-2 px-4 border-b">
            <div className="container mx-auto flex items-center justify-between">
              <button 
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center text-sm hover:text-kfc-red"
              >
                <MapPin className="w-4 h-4 mr-1 text-kfc-red" />
                <span className="font-medium">{selectedLocation}</span>
                <span className="ml-2 text-gray-600">15 minutes delivery</span>
              </button>
              <Link href="/login" className="text-sm text-kfc-red hover:underline">
                login
              </Link>
            </div>
          </div>
        )}

        {/* Delivery Type Selector - Like Original */}
        <div className="flex justify-center py-4">
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 rounded-full border-2 border-kfc-red flex items-center justify-center bg-white">
              <Image
                src="https://kfc.discount/_next/image?url=https%3A%2F%2Fkfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net%2Fcmsimages%2Fkfc%2Fimagestemp%2Ficon_address_type_delivery_col.png&w=64&q=75"
                alt="Delivery"
                width={40}
                height={40}
              />
            </div>
            <p className="text-center text-sm font-medium mt-2 text-kfc-red">DELIVERY</p>
          </div>
        </div>

        {/* EXCLUSIVE OFFERS Section - Horizontal Scroll */}
        <section className="mb-8 px-4">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            EXCLUSIVE OFFERS
            <Flame className="w-5 h-5 ml-2 text-orange-500" />
          </h2>
          <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4">
            <Link href="/menu" className="flex-none">
              <div className="relative w-[300px] h-[180px] rounded-lg overflow-hidden">
                <Image
                  src="https://i.ibb.co/9kYGPcs5/sm123.jpg"
                  alt="Mighty Twist"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <Link href="/menu" className="flex-none">
              <div className="relative w-[300px] h-[180px] rounded-lg overflow-hidden">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/FD_AE_En_190525.jpg"
                  alt="Loaded Twist"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <Link href="/menu" className="flex-none">
              <div className="relative w-[300px] h-[180px] rounded-lg overflow-hidden">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/stripsdipping_UAE_En_270325.jpg"
                  alt="Strips Dipping"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <Link href="/menu" className="flex-none">
              <div className="relative w-[300px] h-[180px] rounded-lg overflow-hidden">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/cheeselavameal_AE_En_140525.jpg"
                  alt="Cheese Lavameal"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <Link href="/menu" className="flex-none">
              <div className="relative w-[300px] h-[180px] rounded-lg overflow-hidden">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/superduobucket_AE_En_010825.jpg"
                  alt="Super Duo Bucket"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
        </section>

        {/* EXPLORE MENU Section - Match Original Design */}
        <section className="px-4 mb-8">
          <h2 className="text-xl font-bold mb-4">
            EXPLORE MENU
            <span className="ml-2 text-gray-400">🔍</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Exclusive Deals Card */}
            <Link href="/menu?category=exclusive-deals" className="group">
              <div className="relative rounded-lg overflow-hidden bg-kfc-red">
                <div className="relative h-[180px] md:h-[250px]">
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/Exclusive_Deals_En_211124.png"
                    alt="Exclusive Deals"
                    fill
                    className="object-cover"
                  />
                  <h3 className="absolute top-4 left-4 text-white text-3xl font-black">
                    EXCLUSIVE<br/>DEALS
                  </h3>
                </div>
              </div>
            </Link>
            
            {/* Twisters Card */}
            <Link href="/menu?category=twisters" className="group">
              <div className="relative rounded-lg overflow-hidden bg-[#f5e9dc]">
                <div className="relative h-[180px] md:h-[250px]">
                  <h3 className="absolute top-4 left-4 text-kfc-red text-3xl font-black z-10">
                    Twisters
                  </h3>
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/twisters_En_170625.png"
                    alt="Twisters"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </Link>
            
            {/* Chicken Meals Card */}
            <Link href="/menu?category=chicken-meals" className="group">
              <div className="relative rounded-lg overflow-hidden bg-[#f5e9dc]">
                <div className="relative h-[180px] md:h-[250px]">
                  <h3 className="absolute top-4 right-4 text-kfc-red text-3xl font-black text-right z-10">
                    CHICKEN<br/>MEALS
                  </h3>
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/ChickenMeals_En_211124.png"
                    alt="Chicken Meals"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
            </Link>
          </div>
          
          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* Burgers Card */}
            <Link href="/menu?category=burgers" className="group">
              <div className="relative rounded-lg overflow-hidden bg-[#f5e9dc]">
                <div className="relative h-[180px] md:h-[250px]">
                  <h3 className="absolute top-4 left-4 text-kfc-red text-3xl font-black z-10">
                    BURGERS
                  </h3>
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/burgers_En_170625.png"
                    alt="Burgers"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </Link>
            
            {/* Chicken Buckets Card */}
            <Link href="/menu?category=chicken-buckets" className="group">
              <div className="relative rounded-lg overflow-hidden bg-[#f5e9dc]">
                <div className="relative h-[180px] md:h-[250px]">
                  <h3 className="absolute top-4 left-4 text-kfc-red text-3xl font-black text-center w-full z-10">
                    Chicken<br/>Buckets
                  </h3>
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/Chickenbuckets_En_211124.png"
                    alt="Chicken Buckets"
                    fill
                    className="object-contain object-center pt-12"
                  />
                </div>
              </div>
            </Link>
            
            {/* Sides & Drinks Card */}
            <Link href="/menu?category=drinks" className="group">
              <div className="relative rounded-lg overflow-hidden bg-[#f5e9dc]">
                <div className="relative h-[180px] md:h-[250px]">
                  <h3 className="absolute top-4 right-4 text-kfc-red text-3xl font-black text-right z-10">
                    Sides<br/>& Drinks
                  </h3>
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/sidesamddrink_En_180625.png"
                    alt="Sides & Drinks"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* BESTSELLERS Section - Match Original Design */}
        <section className="px-4 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            BESTSELLERS
            <Star className="w-5 h-5 ml-2 text-yellow-500" />
          </h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {/* Mighty Twist */}
            <Link href="/menu" className="flex-none">
              <div className="relative w-[150px] h-[200px] rounded-lg overflow-hidden">
                <div className="absolute top-2 left-2 bg-kfc-red text-white px-2 py-1 rounded text-xs font-bold z-10">
                  BEST<br/>SELLER
                </div>
                <div className="absolute top-2 right-2 bg-white text-kfc-red px-2 py-1 rounded font-bold z-10">
                  AED 44
                </div>
                <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-700">
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/575-combo.png"
                    alt="Mighty Twist"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-bold">Mighty Twist →</p>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Duo Zinger */}
            <Link href="/menu" className="flex-none">
              <div className="relative w-[150px] h-[200px] rounded-lg overflow-hidden">
                <div className="absolute top-2 left-2 bg-kfc-red text-white px-2 py-1 rounded text-xs font-bold z-10">
                  BEST<br/>SELLER
                </div>
                <div className="absolute top-2 right-2 bg-white text-kfc-red px-2 py-1 rounded font-bold z-10">
                  AED 42
                </div>
                <div className="relative h-full bg-kfc-red">
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/247-combo.png"
                    alt="Duo Zinger"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-bold">Duo Zinger →</p>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Loaded Twist */}
            <Link href="/menu" className="flex-none">
              <div className="relative w-[150px] h-[200px] rounded-lg overflow-hidden">
                <div className="absolute top-2 left-2 bg-kfc-red text-white px-2 py-1 rounded text-xs font-bold z-10">
                  BEST<br/>SELLER
                </div>
                <div className="absolute top-2 right-2 bg-white text-kfc-red px-2 py-1 rounded font-bold z-10">
                  AED 33
                </div>
                <div className="relative h-full bg-kfc-red">
                  <Image
                    src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/imagestemp/FD_AE_En_190525.jpg"
                    alt="Loaded Twist"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-bold">Loaded Twist →</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* TOP DEALS Section - Match Original Design */}
        <section className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              TOP DEALS
              <span className="ml-2 text-gray-400">🔥</span>
            </h2>
            <Link href="/offers" className="text-sm text-kfc-red hover:underline">
              View All ➜
            </Link>
          </div>
          
          {/* Deals Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Super 30 Deal */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">Super 30</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    15pcs chicken+ 15pcs strips + Family Fries
                  </p>
                </div>
                <span className="bg-kfc-red text-white text-xs px-2 py-1 rounded font-bold">
                  76% OFF
                </span>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/303-combo.png"
                  alt="Super 30"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-kfc-red">50 AED</span>
                  <span className="text-sm text-gray-400 line-through ml-2">208.5 AED</span>
                </div>
              </div>
              <Link href="/menu" className="block">
                <button className="w-full border-2 border-kfc-red text-kfc-red py-2 rounded-full font-medium hover:bg-kfc-red hover:text-white transition-colors">
                  View Details
                </button>
              </Link>
            </div>

            {/* Mighty Cruncher Meal */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">Mighty Cruncher Meal- Large</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Mighty Cruncher + Fries + Drink
                  </p>
                </div>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/1091-combo.png"
                  alt="Mighty Cruncher"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-kfc-red">20 AED</span>
                  <span className="text-sm text-gray-400 line-through ml-2">30 AED</span>
                </div>
                <span className="bg-red-100 text-kfc-red text-xs px-2 py-1 rounded">
                  DOUBLE CHICKEN
                </span>
              </div>
              <Link href="/menu" className="block">
                <button className="w-full border-2 border-kfc-red text-kfc-red py-2 rounded-full font-medium hover:bg-kfc-red hover:text-white transition-colors">
                  View Details
                </button>
              </Link>
            </div>

            {/* Super Mega Deal */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">Super Mega Deal</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    12pcs Chicken + Family Fries + Large Coleslaw
                  </p>
                </div>
                <span className="bg-kfc-red text-white text-xs px-2 py-1 rounded font-bold">
                  67% OFF
                </span>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="https://kfcprodimages-ehcsdud6a5a5eqcm.z01.azurefd.net/cmsimages/kfc/uae/imagestemp/247-combo.png"
                  alt="Super Mega Deal"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-kfc-red">25 AED</span>
                  <span className="text-sm text-gray-400 line-through ml-2">75 AED</span>
                </div>
              </div>
              <Link href="/menu" className="block">
                <button className="w-full border-2 border-kfc-red text-kfc-red py-2 rounded-full font-medium hover:bg-kfc-red hover:text-white transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* App Download Banner */}
        <section className="px-4 mb-8">
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-black to-gray-900">
            <div className="relative h-[300px] md:h-[400px]">
              <div className="absolute left-0 top-0 h-full w-1/2 p-8 flex flex-col justify-center z-10">
                <h2 className="text-white text-4xl md:text-6xl font-black mb-4">
                  Mega<br/>COMBO
                </h2>
                <div className="bg-kfc-red text-white px-6 py-3 rounded-full inline-block w-fit">
                  <span className="text-2xl font-bold">1.00 AED</span>
                </div>
                <p className="text-white text-sm mt-4 mb-6">ONLY IN APP</p>
                <button className="bg-white text-black px-6 py-3 rounded-full font-bold w-fit">
                  DOWNLOAD
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2">
                <Image
                  src="https://i.ibb.co/KzLJYFd/bn2.jpg"
                  alt="App Banner"
                  fill
                  className="object-contain object-right"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer Banner */}
        <section className="text-center py-12 bg-white">
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32">
              <Image
                src="/assets/img/kfc-logo.png"
                alt="KFC Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h3 className="text-xl font-semibold">
            Kentucky Fried Chicken | It's finger lickin' good
          </h3>
        </section>
      </main>
    </div>
  );
}
