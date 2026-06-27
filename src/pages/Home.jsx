import React from "react";
import { APARTMENTS } from "../data/apartments";
import ApartmentCard from "../components/ApartmentCard";
import SearchBar from "../components/SearchBar";

export default function Home({ onNavigate, onSearch }) {
  return (
    <div className="space-y-16 text-slate-900 bg-white min-h-screen">
      {/* 1. Hero Section (Clean & Premium with Dark Overlay) */}
      <section className="relative rounded-2xl overflow-hidden bg-slate-900 min-h-[70vh] flex flex-col justify-center items-center px-4 sm:px-12 py-16 sm:py-24 text-center">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
            alt="Ian Apartement Premium Day Background"
            className="w-full h-full object-cover"
          />
          {/* Solid Dark Overlay (40% opacity) for high-contrast legibility */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content (Centered) */}
        <div className="relative z-10 w-full max-w-3xl space-y-8 flex flex-col items-center">
          <div className="space-y-3.5">
            <span className="inline-flex items-center px-4 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold rounded-full tracking-wide">
              Booking via WhatsApp &lt; 1 Menit
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
              Ian Apartement
            </h1>
            <p className="text-white font-normal text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
              Sewa apartemen harian dan bulanan di Sidoarjo
            </p>
          </div>

          {/* Pill Search Bar - Centered inline under text, no absolute layout positioning issues */}
          <div className="w-full max-w-2xl">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </section>

      {/* 2. Pilihan Hunian Nyaman Section */}
      <section className="space-y-8 px-1 sm:px-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pilihan Hunian Nyaman
          </h2>
          <p className="text-slate-500 text-sm font-semibold mt-1">
            Katalog apartemen eksklusif dan terawat di Sidoarjo (Suncity & Prospero).
          </p>
        </div>

        {/* Grid Layout: 1 col (Mobile), 2 cols (Tablet), 3 cols (Desktop/lg), 4 cols (Large Desktop/xl) with gap-8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {APARTMENTS.map((apt) => (
            <ApartmentCard
              key={apt.id}
              apartment={apt}
              onViewDetail={(id) => onNavigate("detail", { id })}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
