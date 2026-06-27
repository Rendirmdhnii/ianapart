import React, { useState, useMemo } from "react";
import { APARTMENTS } from "../data/apartments";
import { getWhatsAppLink } from "../utils/whatsapp";
import { 
  Star, MapPin, BedDouble, Bath, Square, ArrowLeft,
  Wifi, Wind, Car, Shield, Utensils, Calendar
} from "lucide-react";

export default function PropertyDetail({ apartmentId, onBack, initialRentType = "Harian" }) {
  const [rentType, setRentType] = useState(initialRentType);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const apartment = useMemo(() => {
    return APARTMENTS.find((apt) => apt.id === Number(apartmentId) || apt.id === apartmentId);
  }, [apartmentId]);

  if (!apartment) {
    return (
      <div className="text-center py-12 bg-white">
        <p className="text-slate-500 font-semibold">Apartemen tidak ditemukan.</p>
        <button onClick={onBack} className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-full cursor-pointer">
          Kembali ke Pencarian
        </button>
      </div>
    );
  }

  // Get active price based on rent type
  const activePrice = useMemo(() => {
    switch (rentType.toLowerCase()) {
      case "bulanan":
        return apartment.price.bulanan;
      case "tahunan":
        return apartment.price.tahunan;
      case "harian":
      default:
        return apartment.price.harian;
    }
  }, [rentType, apartment]);

  // Calculate rent duration and total price
  const calculation = useMemo(() => {
    if (!checkInDate || !checkOutDate) return null;

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const timeDiff = end.getTime() - start.getTime();
    
    if (timeDiff <= 0) return { error: "Tanggal Check-Out harus setelah Check-In." };

    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (rentType === "Harian") {
      return {
        duration: totalDays,
        unit: "Malam",
        total: totalDays * activePrice
      };
    } else if (rentType === "Bulanan") {
      const months = Math.ceil(totalDays / 30);
      return {
        duration: months,
        unit: "Bulan",
        total: months * activePrice
      };
    } else if (rentType === "Tahunan") {
      const years = Math.ceil(totalDays / 365);
      return {
        duration: years,
        unit: "Tahun",
        total: years * activePrice
      };
    }
    return null;
  }, [checkInDate, checkOutDate, rentType, activePrice]);

  // Helper to format currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  };

  // Facility Icon Mapper
  const renderFacilityIcon = (facility) => {
    const iconClass = "w-5 h-5 text-slate-800";
    switch (facility.toLowerCase()) {
      case "wifi":
        return <Wifi className={iconClass} />;
      case "ac":
        return <Wind className={iconClass} />;
      case "kolam renang":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case "gym":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "parkir":
        return <Car className={iconClass} />;
      case "dapur":
        return <Utensils className={iconClass} />;
      case "security 24h":
        return <Shield className={iconClass} />;
      default:
        return <div className="w-2 h-2 rounded-full bg-slate-855"></div>;
    }
  };

  const handleWhatsAppRedirect = () => {
    const link = getWhatsAppLink({
      apartmentName: apartment.name,
      unitType: apartment.type,
      location: apartment.location,
      rentType: rentType,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate
    });
    window.open(link, "_blank");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-slate-900 bg-white min-h-screen">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        <span>Kembali</span>
      </button>

      {/* Title & Info */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-slate-100 text-slate-800 text-[10px] font-bold uppercase px-3 py-1 rounded-full">
            {apartment.type}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-400 text-amber-400" />
            <span>{apartment.rating} ({apartment.reviewsCount} Ulasan)</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          {apartment.nama}
        </h1>
        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
          <MapPin className="w-4 h-4 text-slate-800" />
          <span>{apartment.address}</span>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <section className="relative">
        <div className="hidden md:grid grid-cols-3 gap-3 h-[380px] rounded-2xl overflow-hidden border border-slate-100">
          {/* Big Image */}
          <div className="col-span-2 overflow-hidden bg-slate-100">
            <img
              src={apartment.images[0] || apartment.image_url}
              alt={`${apartment.nama} 1`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right Column Stacked Images */}
          <div className="grid grid-rows-2 gap-3">
            <div className="overflow-hidden bg-slate-100">
              <img
                src={apartment.images[1] || apartment.image_url}
                alt={`${apartment.nama} 2`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden bg-slate-100">
              <img
                src={apartment.image_url}
                alt={`${apartment.nama} 3`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile View Slider */}
        <div className="md:hidden flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory rounded-2xl border border-slate-100">
          {(apartment.images || [apartment.image_url]).map((image, idx) => (
            <div key={idx} className="w-[85vw] flex-shrink-0 snap-center aspect-[4/3] bg-slate-100 overflow-hidden">
              <img
                src={image}
                alt={`${apartment.nama} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Side: Property Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Room Specs Highlight */}
          <div className="grid grid-cols-3 gap-4 bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 text-center shadow-sm">
            <div className="space-y-1">
              <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-800 mx-auto rounded-full font-bold">
                <BedDouble className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kamar Tidur</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800">
                {apartment.type === "Studio" ? "Studio" : `${apartment.bedrooms} KT`}
              </p>
            </div>
            <div className="space-y-1 border-x border-slate-100">
              <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-800 mx-auto rounded-full font-bold">
                <Bath className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kamar Mandi</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800">{apartment.bathrooms} KM</p>
            </div>
            <div className="space-y-1">
              <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-800 mx-auto rounded-full font-bold">
                <Square className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Luas Unit</p>
              <p className="font-semibold text-sm sm:text-base text-slate-800">{apartment.size} m²</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-905">Deskripsi</h2>
            <p className="text-slate-655 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {apartment.description}
            </p>
          </div>

          {/* Facilities / Amenities */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-905">Fasilitas Unit</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {apartment.facilities.map((fac) => (
                <div
                  key={fac}
                  className="flex items-center gap-3 bg-white border border-slate-100 p-3 rounded-xl shadow-sm"
                >
                  <div className="flex-shrink-0">{renderFacilityIcon(fac)}</div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">{fac}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Booking Card */}
        <aside className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-md sticky top-24">
          <div className="space-y-6">
            {/* Rent Period Switch */}
            <div className="bg-slate-50 p-1 flex gap-1 border border-slate-100 rounded-xl">
              {["Harian", "Bulanan", "Tahunan"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setRentType(t);
                    setCheckInDate("");
                    setCheckOutDate("");
                  }}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    rentType === t
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Price Display */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Harga Sewa ({rentType})
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900">
                  {formatPrice(activePrice)}
                </span>
                <span className="text-slate-500 text-sm font-semibold">
                  / {rentType === "Harian" ? "malam" : rentType === "Bulanan" ? "bulan" : "tahun"}
                </span>
              </div>
            </div>

            {/* Date Picker Form */}
            <div className="space-y-4 border-t border-slate-50 pt-5">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-555 uppercase tracking-wider">
                  Tanggal Masuk (Check-In)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold pl-9 pr-3 py-2.5 outline-none cursor-pointer focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-555 uppercase tracking-wider">
                  Tanggal Keluar (Check-Out)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold pl-9 pr-3 py-2.5 outline-none cursor-pointer focus:border-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Estimation Summary */}
            {calculation && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 text-xs font-bold animate-in fade-in duration-150">
                {calculation.error ? (
                  <p className="text-rose-600">{calculation.error}</p>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-500">
                      <span>Rincian ({calculation.duration} {calculation.unit})</span>
                      <span>{formatPrice(activePrice)} x {calculation.duration}</span>
                    </div>
                    <div className="flex justify-between text-slate-900 border-t border-slate-200 pt-2 text-sm font-bold">
                      <span>Estimasi Total</span>
                      <span>{formatPrice(calculation.total)}</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* WhatsApp CTA Button */}
            <button
              onClick={handleWhatsAppRedirect}
              disabled={calculation && calculation.error}
              className={`w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold text-sm py-4 rounded-full shadow-sm cursor-pointer transition-colors ${
                calculation && calculation.error ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <svg className="w-4.5 h-4.5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.113 1.05 11.48 1.05c-5.44 0-9.863 4.37-9.867 9.8-.001 1.73.473 3.418 1.373 4.908L1.964 21.05l5.525-1.42.158-.096z" />
              </svg>
              <span>Tanya Ketersediaan via WA</span>
            </button>

            <p className="text-[10px] text-slate-400 font-bold text-center leading-relaxed">
              *Tanpa pembayaran di web. Pemesanan dikonfirmasi secara langsung oleh admin kami melalui WhatsApp.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
