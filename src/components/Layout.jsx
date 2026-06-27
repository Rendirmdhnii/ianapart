import React from "react";
import { Phone, Building2, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../utils/whatsapp";

export default function Layout({ children, onNavigate, currentPage }) {
  const handleDirectWA = () => {
    const message = "Halo Admin Ian Apartement, saya ingin bertanya mengenai ketersediaan unit apartemen.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      {/* Premium Navbar - Airbnb style, white bg, thin border, no heavy shadow */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => onNavigate("home")} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white">
              <Building2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Ian Apartement
              </span>
              <span className="block text-[8px] text-slate-455 font-bold tracking-widest uppercase -mt-1">
                Katalog Sewa Sidoarjo
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate("home")}
              className={`font-semibold text-sm cursor-pointer transition-colors duration-150 ${
                currentPage === "home" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Beranda
            </button>
            <button 
              onClick={() => onNavigate("search")}
              className={`font-semibold text-sm cursor-pointer transition-colors duration-150 ${
                currentPage === "search" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Cari Unit
            </button>
          </nav>

          {/* Call-to-Action WhatsApp */}
          <div>
            <button
              onClick={handleDirectWA}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-950 text-white rounded-full font-semibold text-xs sm:text-sm cursor-pointer transition-colors duration-150 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 fill-white text-white" />
              <span>Hubungi Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {children}
      </main>

      {/* Airbnb style Footer - White bg, border-t border-slate-100, clean layout */}
      <footer className="bg-slate-50 text-slate-700 border-t border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Col 1: About */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-base text-slate-900">
                  Ian Apartement
                </span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-normal">
                Katalog sewa apartemen harian dan bulanan terbaik di Sidoarjo (Suncity & Prospero). Menghadirkan hunian bersih, berfasilitas lengkap, dengan pemesanan instan via WhatsApp kurang dari 1 menit.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-4">Navigasi</h3>
              <ul className="space-y-2.5 text-sm text-slate-500 font-medium">
                <li>
                  <button onClick={() => onNavigate("home")} className="hover:text-slate-900 hover:underline cursor-pointer text-left">
                    Beranda
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("search")} className="hover:text-slate-900 hover:underline cursor-pointer text-left">
                    Cari Apartemen
                  </button>
                </li>
                <li>
                  <a href="#promo" onClick={() => onNavigate("home")} className="hover:text-slate-900 hover:underline inline-block text-left">
                    Promo Terkini
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-4">Hubungi Kami</h3>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hover:text-slate-900 hover:underline">
                    +62 896-7844-9424
                  </a>
                </li>
                <li className="text-[12px] text-slate-450 leading-relaxed">
                  Operasional Admin:<br/>Senin - Minggu (07.00 - 22.00 WIB)
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Ian Apartement. Semua hak cipta dilindungi.</p>
            <p>Dibuat untuk Katalog Sewa Online Apartemen Sidoarjo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
