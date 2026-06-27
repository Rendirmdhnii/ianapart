import React, { useState, useMemo } from "react";
import { APARTMENTS } from "../data/apartments";
import ApartmentCard from "../components/ApartmentCard";
import SearchBar from "../components/SearchBar";
import { SlidersHorizontal, X, Info, Sliders, Check } from "lucide-react";

export default function SearchResults({ onNavigate, searchFilters, onSearch }) {
  // Filter States
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const availableFacilities = ["WiFi", "AC", "Kolam Renang", "Gym", "Parkir", "Dapur"];
  const unitTypes = ["Studio", "1BR", "2BR"];

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities(prev =>
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedTypes([]);
    setSelectedFacilities([]);
    setSortBy("popular");
  };

  const filteredApartments = useMemo(() => {
    return APARTMENTS.filter((apt) => {
      // 1. Filter Lokasi
      if (searchFilters.location) {
        const query = searchFilters.location.toLowerCase();
        const matchesLocation = apt.location.toLowerCase().includes(query) ||
          apt.name.toLowerCase().includes(query) ||
          apt.address.toLowerCase().includes(query);
        if (!matchesLocation) return false;
      }

      // Get price based on selected Rent Type
      const currentRentType = (searchFilters.rentType || "Harian").toLowerCase();
      let price = apt.price.harian;
      if (currentRentType === "bulanan") price = apt.price.bulanan;
      if (currentRentType === "tahunan") price = apt.price.tahunan;

      // 2. Filter Min Price
      if (minPrice && price < parseFloat(minPrice)) return false;

      // 3. Filter Max Price
      if (maxPrice && price > parseFloat(maxPrice)) return false;

      // 4. Filter Tipe Unit
      if (selectedTypes.length > 0 && !selectedTypes.includes(apt.type)) return false;

      // 5. Filter Fasilitas
      if (selectedFacilities.length > 0) {
        const hasAllFacilities = selectedFacilities.every(facility =>
          apt.facilities.includes(facility)
        );
        if (!hasAllFacilities) return false;
      }

      return true;
    }).sort((a, b) => {
      const currentRentType = (searchFilters.rentType || "Harian").toLowerCase();
      let priceA = a.price.harian;
      let priceB = b.price.harian;
      if (currentRentType === "bulanan") {
        priceA = a.price.bulanan;
        priceB = b.price.bulanan;
      } else if (currentRentType === "tahunan") {
        priceA = a.price.tahunan;
        priceB = b.price.tahunan;
      }

      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.popular - a.popular;
    });
  }, [searchFilters, minPrice, maxPrice, selectedTypes, selectedFacilities, sortBy]);

  const FilterContent = () => (
    <div className="space-y-6 text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="font-bold text-slate-900 text-base">Filter Pencarian</h3>
        <button
          onClick={handleResetFilters}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
        >
          Reset Semua
        </button>
      </div>

      {/* 1. Rentang Harga */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Rentang Harga
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-400 font-bold">MIN (Rp)</span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold p-2.5 outline-none focus:border-slate-900"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold">MAX (Rp)</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold p-2.5 outline-none focus:border-slate-900"
            />
          </div>
        </div>
      </div>

      {/* 2. Tipe Unit */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tipe Unit</h4>
        <div className="flex flex-wrap gap-2">
          {unitTypes.map((type) => {
            const isSelected = selectedTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleTypeToggle(type)}
                className={`px-3.5 py-2 text-xs font-bold border rounded-full transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-900"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Fasilitas */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Fasilitas</h4>
        <div className="space-y-2">
          {availableFacilities.map((facility) => {
            const isSelected = selectedFacilities.includes(facility);
            return (
              <label
                key={facility}
                className="flex items-center gap-3 text-xs font-semibold text-slate-655 hover:text-slate-900 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleFacilityToggle(facility)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span>{facility}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-slate-900 bg-white">
      {/* Search Header - Airbnb Style */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 px-4 py-12 text-center sm:text-left">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
            alt="Search Header Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto sm:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Cari Hunian Sidoarjo</h2>
          <SearchBar onSearch={onSearch} initialFilters={searchFilters} />
        </div>
      </div>

      {/* Main Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter - Desktop Only */}
        <aside className="hidden lg:block bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <FilterContent />
        </aside>

        {/* Results Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-slate-100 rounded-2xl shadow-sm">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hasil Pencarian</p>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {filteredApartments.length} Apartemen di{" "}
                <span className="text-slate-800 underline">
                  {searchFilters.location || "Semua Area"}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase whitespace-nowrap">Urutkan</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 px-3.5 py-2 outline-none focus:border-slate-900 cursor-pointer"
              >
                <option value="popular">Terpopuler</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-full cursor-pointer hover:bg-black transition-colors shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Catalog Grid - Airbnb layout with gap-8 */}
          {filteredApartments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredApartments.map((apt) => (
                <ApartmentCard
                  key={apt.id}
                  apartment={apt}
                  onViewDetail={(id) => onNavigate("detail", { id })}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-455 mx-auto">
                <Info className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Unit Tidak Ditemukan</h3>
              <p className="text-slate-550 text-xs leading-relaxed">
                Maaf, kami tidak menemukan apartemen yang cocok dengan filter atau lokasi pencarian Anda saat ini. Silakan atur ulang kriteria pencarian Anda.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-full shadow-sm transition-all cursor-pointer"
              >
                Reset Filter & Coba Lagi
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet Drawer Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 lg:hidden flex justify-end">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 flex flex-col justify-between shadow-lg animate-slide-in-right">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-slate-900" />
                  <span className="font-bold text-slate-900 text-base">Filter Unit</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content */}
              <FilterContent />
            </div>

            {/* Sticky bottom CTA */}
            <div className="mt-8 border-t border-slate-100 pt-4 flex gap-4">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 border border-slate-200 rounded-full text-slate-500 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-slate-900 text-white font-bold text-xs rounded-full hover:bg-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Check className="w-4 h-4" />
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
