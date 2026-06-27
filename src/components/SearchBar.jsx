import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function SearchBar({ onSearch, initialFilters = {} }) {
  const [location, setLocation] = useState(initialFilters.location || "");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const popularLocations = [
    "Suncity Residence",
    "Apartemen Prospero",
    "Sidoarjo Kota",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, rentType: "Harian" });
  };

  const selectLocation = (loc) => {
    setLocation(loc);
    setShowLocationDropdown(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white border border-slate-100 p-2 rounded-2xl md:rounded-full shadow-lg relative z-30 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0"
    >
      {/* Input Lokasi */}
      <div className="w-full md:flex-1 relative flex items-center pl-4 pr-3 py-2.5 md:py-0">
        <MapPin className="w-5 h-5 text-slate-455 mr-2.5 flex-shrink-0" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setShowLocationDropdown(true)}
          onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
          placeholder="Cari apartemen (Suncity, Prospero)..."
          className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-semibold outline-none border-none focus:ring-0 p-0"
        />
        {location && (
          <button
            type="button"
            onClick={() => setLocation("")}
            className="text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer ml-2"
          >
            Hapus
          </button>
        )}

        {/* Lokasi Dropdown */}
        {showLocationDropdown && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-50 p-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1.5 border-b border-slate-50">Area Populer</p>
            {popularLocations.map((loc) => (
              <button
                key={loc}
                type="button"
                onMouseDown={() => selectLocation(loc)}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                {loc}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tombol Search */}
      <div className="w-full md:w-auto p-1 flex-shrink-0">
        <button
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-semibold text-sm px-8 py-3 rounded-xl md:rounded-full cursor-pointer transition-colors shadow-sm"
        >
          <Search className="w-4 h-4 text-white" />
          <span>Cari Unit</span>
        </button>
      </div>
    </form>
  );
}
