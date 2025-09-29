'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* Banner Section */}
      <section className="relative mt-16 overflow-hidden">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
          {bannerSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Link href={slide.link}>
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all ${
                currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/60'
              } rounded-full`}
            />
          ))}
        </div>
      </section>

      {/* Explore Menu Section */}
      <section className="py-12 px-4 container mx-auto">
        <h2 className="text-3xl font-bold mb-8">EXPLORE MENU</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/menu?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 text-white font-semibold text-sm text-center">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">BESTSELLERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestsellers.map((product) => (
              <Link
                key={product.id}
                href={`/menu?category=${product.category}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Deals Section */}
      <section className="py-12 px-4 container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">TOP DEALS</h2>
          <Link
            href="/offers"
            className="flex items-center text-kfc-red hover:text-kfc-dark-red transition-colors"
          >
            View All
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topDeals.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-kfc-red text-white px-2 py-1 rounded text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-kfc-red">{product.price} AED</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">
                      {product.originalPrice} AED
                    </span>
                  )}
                </div>
                <Link
                  href="/menu"
                  className="mt-3 block text-center bg-kfc-red text-white py-2 rounded hover:bg-kfc-dark-red transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Banners */}
      <section className="py-12 px-4 container mx-auto">
        {bottomBanners.map((banner) => (
          <Link key={banner.id} href={banner.link} className="block mb-6">
            <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden">
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          </Link>
        ))}
      </section>

      {/* Tagline */}
      <section className="text-center py-8 px-4">
        <h3 className="text-2xl font-bold">
          Kentucky Fried Chicken | It's finger lickin' good
        </h3>
      </section>
    </div>
  );
}
