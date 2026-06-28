import React, { useState, useEffect } from "react";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Search, 
  X, 
  Star, 
  Check, 
  Wifi, 
  Wind, 
  Car, 
  Shield, 
  Utensils, 
  Tv, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Maximize2
} from "lucide-react";

// DATA KATALOG UTAMA (Sidoarjo & Surabaya Only)
const KATALOG_APARTEMEN = [
  {
    id: 1,
    nama: "Apartemen Prospero",
    lokasi: "Sidoarjo",
    harga: "Rp 350.000 / malam",
    image_url: "/images/Prospero.webp",
    detail_images: ["/images/Prospero.webp", "/images/Prospero (2).webp", "/images/Prospero (3).webp"],
    type: "Studio",
    size: 22,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.8,
    facilities: ["WiFi", "AC", "Kolam Renang", "Parkir", "Security 24h"],
    description: "Hunian tipe studio yang nyaman dan modern di Apartemen Prospero. Terletak di kawasan terpadu Kahuripan Nirwana Sidoarjo yang tenang, asri, dan bebas macet. Unit dalam kondisi bersih, full furnished, lengkap dengan perabotan berkualitas. Sangat cocok untuk sewa harian maupun bulanan."
  },
  {
    id: 2,
    nama: "Suncity 2 Bedroom",
    lokasi: "Sidoarjo",
    harga: "Rp 600.000 / malam",
    image_url: "/images/Suncity 2br.jpg",
    detail_images: ["/images/Suncity 2br.jpg", "/images/Suncity 2br (2).jpg", "/images/Suncity 2br (3).jpg", "/images/Suncity 2br (4).jpg"],
    type: "2 Bedrooms",
    size: 42,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.9,
    facilities: ["WiFi", "AC", "Kolam Renang", "Gym", "Parkir", "Dapur", "Security 24h", "Kulkas", "TV"],
    description: "Apartemen mewah 2 Kamar Tidur (2 Bedroom) di Suncity Residence Sidoarjo. Lokasi premium terintegrasi langsung dengan Suncity Mall dan Waterpark Sidoarjo. Unit berdesain modern, luas, bersih, dan dilengkapi dapur fungsional serta ruang tamu mini."
  },
  {
    id: 3,
    nama: "Suncity Studio",
    lokasi: "Sidoarjo",
    harga: "Rp 350.000 / malam",
    image_url: "/images/Suncity studio.jpg",
    detail_images: ["/images/Suncity studio.jpg", "/images/Suncity studio (2).jpg", "/images/Suncity studio (3).jpg", "/images/Suncity studio (4).jpg"],
    type: "Studio",
    size: 24,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    facilities: ["WiFi", "AC", "Kolam Renang", "Gym", "Parkir", "Security 24h", "Kulkas", "Smart TV"],
    description: "Sewa harian/bulanan apartemen tipe studio di Suncity Residence Sidoarjo. Unit ini menawarkan suasana menginap yang nyaman dengan ranjang empuk kualitas hotel, Smart TV, AC dingin, dan kulkas. Memiliki akses lift privat ke Suncity Mall."
  },
  {
    id: 4,
    nama: "Apartemen Papilio",
    lokasi: "Surabaya",
    harga: "Rp 350.000 / malam",
    image_url: "/images/Papilio.jpg",
    detail_images: ["/images/Papilio.jpg", "/images/Papilio (2).jpg", "/images/Papilio (3).jpg", "/images/Papilio (4).jpg"],
    type: "Studio",
    size: 24,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.8,
    facilities: ["WiFi", "AC", "Kolam Renang", "Gym", "Parkir", "Security 24h", "TV"],
    description: "Nikmati kenyamanan tinggal di Apartemen Papilio Surabaya. Terletak strategis di kawasan Jl. Ahmad Yani yang dekat dengan pusat bisnis dan transportasi. Unit studio yang bersih, berAC sejuk, dengan ranjang besar yang empuk, cocok untuk peristirahatan berkualitas Anda."
  },
  {
    id: 5,
    nama: "City Square",
    lokasi: "Surabaya",
    harga: "Rp 350.000 / malam",
    image_url: "/images/City square.jpg",
    detail_images: ["/images/City square.jpg", "/images/City square (2).jpg"],
    type: "Studio",
    size: 24,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.6,
    facilities: ["WiFi", "AC", "Kolam Renang", "Parkir", "Security 24h", "TV"],
    description: "Unit tipe Studio nyaman di City Square Apartment Surabaya. Dilengkapi perabotan berkualitas, ranjang premium, AC dingin, koneksi internet Wi-Fi cepat, serta akses kolam renang yang sejuk. Sangat ideal bagi kalangan profesional maupun traveler."
  }
];

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApt, setSelectedApt] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    setIsLoaded(true);
  }, []);

  // Filter Logic
  const filteredApartments = KATALOG_APARTEMEN.filter(apt => {
    const matchesLocation = selectedLocation === "Semua" || apt.lokasi.toLowerCase() === selectedLocation.toLowerCase();
    const matchesSearch = apt.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          apt.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  const getWhatsAppLink = (unitName) => {
    const baseUrl = "https://wa.me/6289678449424";
    const text = `Halo Admin Ian Apartement, saya ingin menyewa unit ${unitName}`;
    return `${baseUrl}?text=${encodeURIComponent(text)}`;
  };

  const handleOpenDetail = (apt) => {
    setSelectedApt(apt);
    setActiveImageIdx(0);
  };

  // Facility Icon Mapper
  const renderFacilityIcon = (facility) => {
    const iconClass = "w-4 h-4 text-slate-800";
    switch (facility.toLowerCase()) {
      case "wifi":
        return <Wifi className={iconClass} />;
      case "ac":
        return <Wind className={iconClass} />;
      case "kolam renang":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case "gym":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "parkir":
        return <Car className={iconClass} />;
      case "dapur":
        return <Utensils className={iconClass} />;
      case "security 24h":
        return <Shield className={iconClass} />;
      case "tv":
      case "smart tv":
        return <Tv className={iconClass} />;
      default:
        return <Check className={iconClass} />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      
      {/* 1. STICKY LUXURY HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100/80 transition-smooth">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-105">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 block">
                Ian Apartement
              </span>
              <span className="block text-[9px] text-slate-400 font-extrabold tracking-widest uppercase -mt-1">
                Luxury Rental Catalog
              </span>
            </div>
          </a>

          {/* Nav Menu */}
          <nav className="hidden md:flex items-center gap-10">
            <a href="#hero" className="font-medium text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors">Beranda</a>
            <a href="#katalog" className="font-medium text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors">Katalog Unit</a>
            <a href="#keunggulan" className="font-medium text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors">Layanan</a>
            <a href="#faq" className="font-medium text-sm text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 transition-colors">Bantuan</a>
          </nav>

          {/* WA Direct Action Button */}
          <div>
            <a
              href="https://wa.me/6289678449424?text=Halo%20Admin%20Ian%20Apartement,%20saya%20ingin%20bertanya%20mengenai%20ketersediaan%2520unit."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-full font-semibold text-xs sm:text-sm shadow-sm transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Hubungi Admin</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative px-6 sm:px-8 py-10 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 min-h-[75vh] flex flex-col justify-center items-center px-6 sm:px-12 py-20 text-center shadow-lg">
          
          {/* Background Image with Elegant Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/Papilio.jpg"
              alt="Premium Living Background"
              className="w-full h-full object-cover scale-105 animate-pulse duration-10000"
              style={{ animationDuration: "20s" }}
            />
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"></div>
          </div>

          {/* Hero Content Area */}
          <div className="relative z-10 w-full max-w-3xl space-y-8 flex flex-col items-center animate-fade-in-up">
            
            {/* Top Badge */}
            <span className="inline-flex items-center gap-2 px-4.5 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full tracking-wider uppercase border border-white/10">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              Sewa Harian & Bulanan Premium
            </span>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1] font-sans">
                Hunian Nyaman di <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-white to-slate-200 underline decoration-slate-400 decoration-wavy decoration-1 underline-offset-8">
                  Sidoarjo & Surabaya
                </span>
              </h1>
              
              <p className="text-slate-200 font-normal text-base sm:text-xl max-w-2xl mx-auto leading-relaxed pt-2">
                Temukan pilihan unit apartemen eksklusif, terawat, dan berfasilitas hotel bintang 5. Pemesanan instan via WhatsApp kurang dari 1 menit.
              </p>
            </div>

            {/* FLOATING SEARCH / FILTER BAR */}
            <div className="w-full max-w-2xl pt-4">
              <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-3.5 border border-slate-100/50">
                
                {/* Search Input */}
                <div className="relative w-full flex-1">
                  <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Cari unit atau nama apartemen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50/50 sm:bg-transparent rounded-full sm:rounded-none pl-12 pr-4 py-3 sm:py-2 text-sm text-slate-900 font-medium placeholder-slate-400 outline-none border-none focus:ring-0"
                  />
                </div>

                {/* Vertical Divider (Desktop Only) */}
                <div className="hidden sm:block h-8 w-[1px] bg-slate-200"></div>

                {/* Location Selection Dropdown */}
                <div className="w-full sm:w-48">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-slate-50/50 sm:bg-transparent rounded-full sm:rounded-none px-4 py-3 sm:py-2 text-sm text-slate-800 font-semibold outline-none cursor-pointer border-none focus:ring-0"
                  >
                    <option value="Semua">Semua Lokasi</option>
                    <option value="Sidoarjo">Sidoarjo</option>
                    <option value="Surabaya">Surabaya</option>
                  </select>
                </div>

                {/* Reset Button (only shown when filters active) */}
                {(searchQuery || selectedLocation !== "Semua") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedLocation("Semua");
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase px-2"
                  >
                    Reset
                  </button>
                )}

                {/* CTA Filter Action */}
                <a
                  href="#katalog"
                  className="w-full sm:w-auto px-7 py-3 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-full transition-all duration-300 text-center"
                >
                  Cari Unit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KATALOG UNIT SECTION */}
      <section id="katalog" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
            Katalog Unggulan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
            Pilihan Unit Eksklusif
          </h2>
          <div className="w-12 h-[3px] bg-slate-900 mx-auto rounded-full"></div>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed pt-2">
            Pilih hunian impian Anda di kota Sidoarjo & Surabaya dengan harga transparan dan kualitas unit yang selalu terawat maksimal.
          </p>
        </div>

        {/* Filter Quick-Links (Tab Style) */}
        <div className="flex justify-center gap-3 mb-12">
          {["Semua", "Sidoarjo", "Surabaya"].map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-5 py-2.5 text-xs font-extrabold tracking-wider uppercase rounded-full transition-all duration-300 border ${
                selectedLocation === loc
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* GRID LAYOUT FOR CARDS */}
        {filteredApartments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredApartments.map((apt) => (
              <div
                key={apt.id}
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-in-out flex flex-col h-full text-slate-900 animate-fade-in-up"
              >
                {/* Image Cover aspect-[4/3] */}
                <div 
                  onClick={() => handleOpenDetail(apt)}
                  className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={apt.image_url}
                    alt={apt.nama}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Glassmorphic Location Badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold uppercase px-3.5 py-1.5 rounded-full shadow-sm tracking-wider border border-white/20">
                    📍 {apt.lokasi}
                  </span>

                  {/* Rating Overlay */}
                  {apt.rating && (
                    <span className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                      {apt.rating}
                    </span>
                  )}

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Detail Unit
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  {/* Category Specs */}
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-3.5">
                    <span>{apt.type || "Apartemen"}</span>
                    <span>•</span>
                    <span>{apt.size ? `${apt.size} m²` : "Full Furnished"}</span>
                  </div>

                  {/* Name of the Unit */}
                  <h3 
                    onClick={() => handleOpenDetail(apt)}
                    className="font-bold text-slate-900 text-xl hover:text-slate-600 transition-colors cursor-pointer line-clamp-1 mb-2 tracking-tight"
                  >
                    {apt.nama}
                  </h3>

                  {/* Price */}
                  <div className="mb-8">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Harga Sewa</p>
                    <p className="text-slate-900 font-extrabold text-lg leading-tight mt-0.5">
                      {apt.harga}
                    </p>
                  </div>

                  {/* Card CTAs */}
                  <div className="mt-auto space-y-3">
                    {/* Primary Booking Button - solid black */}
                    <a
                      href={getWhatsAppLink(apt.nama)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold text-sm py-3.5 rounded-2xl transition-all duration-300 text-center shadow-sm hover:scale-[1.01]"
                    >
                      <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.113 1.05 11.48 1.05c-5.44 0-9.863 4.37-9.867 9.8-.001 1.73.473 3.418 1.373 4.908L1.964 21.05l5.525-1.42.158-.096z" />
                      </svg>
                      <span>Pesan via WA</span>
                    </a>

                    {/* Secondary Details Button */}
                    <button
                      onClick={() => handleOpenDetail(apt)}
                      className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer text-center"
                    >
                      Lihat Detail & Foto Galeri
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state for search */
          <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center max-w-md mx-auto space-y-4 shadow-sm animate-fade-in-up">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto">
              <Info className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Unit Tidak Ditemukan</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              Maaf, kami tidak menemukan apartemen yang cocok dengan filter atau kata kunci pencarian Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLocation("Semua");
              }}
              className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-full shadow-sm transition-all"
            >
              Reset Filter
            </button>
          </div>
        )}
      </section>

      {/* 4. VALUE PROPOSITION SECTION */}
      <section id="keunggulan" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Layanan Kami</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Mengapa Memilih Ian Apartement?</h2>
            <div className="w-12 h-[3px] bg-slate-900 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="space-y-4 text-center md:text-left">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mx-auto md:mx-0 shadow-sm border border-slate-100">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Unit Bersih & Terawat</h3>
              <p className="text-slate-550 text-base leading-relaxed font-medium">
                Setiap unit melalui pembersihan intensif dan sterilisasi sebelum check-in untuk memastikan kenyamanan tinggal layaknya hotel berbintang.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4 text-center md:text-left">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mx-auto md:mx-0 shadow-sm border border-slate-100">
                <Shield className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Keamanan 24 Jam</h3>
              <p className="text-slate-550 text-base leading-relaxed font-medium">
                Lingkungan apartemen aman yang dijaga oleh petugas keamanan profesional 24/7 didukung pengawasan CCTV dan akses lift privat.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4 text-center md:text-left">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mx-auto md:mx-0 shadow-sm border border-slate-100">
                <Phone className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Layanan Cepat via WhatsApp</h3>
              <p className="text-slate-550 text-base leading-relaxed font-medium">
                Tanpa pengisian formulir rumit. Tanya ketersediaan, negosiasi harga, dan konfirmasi pemesanan langsung dilakukan via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="py-24 sm:py-32 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Bantuan</span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Pertanyaan Populer (FAQ)</h2>
          <div className="w-12 h-[3px] bg-slate-900 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">Bagaimana cara memesan unit apartemen?</h3>
            <p className="text-slate-550 text-base leading-relaxed font-medium">
              Pilih unit yang Anda inginkan di katalog, klik tombol <strong>"Pesan via WA"</strong>. Anda akan diarahkan ke admin WhatsApp kami. Infokan tanggal sewa dan lakukan konfirmasi ketersediaan.
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">Apakah ada biaya tambahan atau deposit?</h3>
            <p className="text-slate-550 text-base leading-relaxed font-medium">
              Semua detail biaya, deposit keamanan (jika ada), dan opsi tambahan akan diinformasikan secara transparan oleh admin kami saat obrolan WhatsApp.
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">Apakah fasilitas kolam renang & gym bebas digunakan?</h3>
            <p className="text-slate-550 text-base leading-relaxed font-medium">
              Ya, seluruh fasilitas umum apartemen seperti kolam renang, area gym, dan taman bermain anak dapat diakses oleh penyewa sesuai dengan kebijakan masing-masing apartemen.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PREMIUM FOOTER */}
      <footer className="bg-slate-900 text-slate-405 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16">
            
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-900 shadow-md">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg tracking-tight">Ian Apartement</span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
                Katalog online penyewaan unit apartemen harian, mingguan, dan bulanan premium di wilayah strategis Sidoarjo & Surabaya. Nyaman, bersih, dan berfasilitas lengkap.
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi Cepat</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#hero" className="hover:text-white transition-colors">Beranda</a></li>
                <li><a href="#katalog" className="hover:text-white transition-colors">Katalog Unit</a></li>
                <li><a href="#keunggulan" className="hover:text-white transition-colors">Layanan Kami</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Col 3: Contact details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hubungi Admin</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 fill-emerald-400/25" />
                  <a href="https://wa.me/6289678449424" target="_blank" rel="noreferrer" className="hover:text-white transition-colors font-medium">
                    +62 896-7844-9424
                  </a>
                </li>
                <li className="text-xs text-slate-500 leading-relaxed font-medium">
                  Operasional Pemesanan:<br/>
                  Senin - Minggu (07:00 - 22:00 WIB)
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Sub-footer */}
          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Ian Apartement. Semua hak cipta dilindungi.</p>
            <p>Pemesanan Aman Langsung via WhatsApp Official.</p>
          </div>
        </div>
      </footer>

      {/* 7. HIGH-END DETAILS DIALOG (MODAL) */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop Overlay */}
          <div 
            onClick={() => setSelectedApt(null)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Center Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10">
            <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition-all animate-fade-in-up">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedApt(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 rounded-full p-2.5 hover:bg-slate-900 hover:text-white transition-all duration-300 z-10 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT SIDE: Slideshow aspect-[4/3] on mobile, fits container on desktop */}
              <div className="w-full md:w-1/2 bg-slate-100 flex flex-col relative">
                
                {/* Active Image */}
                <div className="relative flex-1 aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                  <img
                    src={selectedApt.detail_images[activeImageIdx]}
                    alt={`${selectedApt.nama} ${activeImageIdx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  
                  {/* Slideshow Navigation Buttons */}
                  {selectedApt.detail_images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImageIdx(prev => (prev === 0 ? selectedApt.detail_images.length - 1 : prev - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 rounded-full p-2 shadow-sm transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveImageIdx(prev => (prev === selectedApt.detail_images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 rounded-full p-2 shadow-sm transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Slideshow Thumbs Indicator */}
                {selectedApt.detail_images.length > 1 && (
                  <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto justify-center">
                    {selectedApt.detail_images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIdx(index)}
                        className={`w-12 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          activeImageIdx === index ? "border-slate-900 scale-105" : "border-transparent opacity-60"
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Information Content */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] md:max-h-[600px] overflow-y-auto">
                <div>
                  
                  {/* Category, Rating, Location */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                      {selectedApt.type} Unit
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
                      <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                      <span>{selectedApt.rating} / 5.0</span>
                    </div>
                  </div>

                  {/* Title Name */}
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    {selectedApt.nama}
                  </h2>

                  {/* Location Info */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold mb-6">
                    <MapPin className="w-4 h-4 text-slate-800" />
                    <span>Kota {selectedApt.lokasi}, Jawa Timur</span>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-slate-100 w-full mb-6"></div>

                  {/* Mini Room Specs */}
                  <div className="grid grid-cols-3 gap-3 text-center mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tipe Unit</p>
                      <p className="font-extrabold text-slate-800 text-sm">{selectedApt.type}</p>
                    </div>
                    <div className="border-x border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Kamar</p>
                      <p className="font-extrabold text-slate-800 text-sm">{selectedApt.bedrooms} KT / {selectedApt.bathrooms} KM</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Luas Unit</p>
                      <p className="font-extrabold text-slate-800 text-sm">{selectedApt.size} m²</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi Lengkap</h4>
                    <p className="text-slate-500 text-base leading-relaxed font-semibold">
                      {selectedApt.description}
                    </p>
                  </div>

                  {/* Facilities Grid */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fasilitas Terkait</h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {selectedApt.facilities.map((fac) => (
                        <div key={fac} className="flex items-center gap-2 bg-slate-50 border border-slate-100/80 px-3.5 py-2.5 rounded-xl">
                          {renderFacilityIcon(fac)}
                          <span className="text-xs font-semibold text-slate-700">{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sticky Pricing and Booking CTA */}
                <div className="border-t border-slate-100 pt-6 mt-4">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harga Estimasi</p>
                      <p className="text-xl font-extrabold text-slate-900">{selectedApt.harga}</p>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink(selectedApt.nama)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold text-sm py-4 rounded-2xl shadow-sm transition-all duration-300 text-center hover:scale-[1.01]"
                  >
                    <svg className="w-4.5 h-4.5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.113 1.05 11.48 1.05c-5.44 0-9.863 4.37-9.867 9.8-.001 1.73.473 3.418 1.373 4.908L1.964 21.05l5.525-1.42.158-.096z" />
                    </svg>
                    <span>Hubungi WA Sekarang</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
