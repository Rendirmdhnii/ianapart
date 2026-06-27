import React from "react";
import { MapPin } from "lucide-react";
import { getDirectWhatsAppLink } from "../utils/whatsapp";

export default function ApartmentCard({ apartment, onViewDetail }) {
  const waLink = getDirectWhatsAppLink(apartment.nama);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full text-slate-900">
      {/* Aspect Video Photo Cover */}
      <div className="relative aspect-video overflow-hidden bg-slate-50">
        <img
          src={apartment.image_url}
          alt={apartment.nama}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Simple Category Overlay Text (No Emoticon) */}
        <span className="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm tracking-wider">
          {apartment.kategori}
        </span>
      </div>

      {/* Content Area with loose padding (p-5) */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category & Location */}
        <div className="flex items-center gap-1 text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-2">
          <span>{apartment.kategori} Residence</span>
          <span>•</span>
          <div className="flex items-center gap-0.5">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[100px]">{apartment.location.split(",")[0]}</span>
          </div>
        </div>

        {/* Title / Name (font-semibold, text-lg) */}
        <h3 
          onClick={() => onViewDetail(apartment.id)}
          className="font-semibold text-slate-900 text-lg hover:text-slate-700 transition-colors cursor-pointer line-clamp-1 mb-1.5"
        >
          {apartment.nama}
        </h3>

        {/* Price (text-slate-900, font-bold) */}
        <p className="text-slate-900 font-bold text-sm mb-6">
          {apartment.harga}
        </p>

        {/* Action Buttons - Solid dark CTA */}
        <div className="mt-auto space-y-2.5">
          {/* Main WhatsApp Booking CTA - Solid Dark slate-900 */}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold text-sm py-3 rounded-lg transition-colors text-center cursor-pointer shadow-sm"
          >
            <span>Pesan via WA</span>
          </a>

          {/* Secondary Details Button */}
          <button
            onClick={() => onViewDetail(apartment.id)}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-655 font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}
