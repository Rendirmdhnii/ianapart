// Utilitas WhatsApp untuk Ian Apartement Sidoarjo.
// Nomor WhatsApp Admin: 6289678449424

export const WHATSAPP_NUMBER = "6289678449424";

/**
 * Membuat link WhatsApp dinamis berdasarkan properti dan input sewa.
 */
export const getWhatsAppLink = ({
  apartmentName,
  unitType,
  location,
  rentType,
  checkInDate,
  checkOutDate,
}) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateStr;
    }
  };

  const checkIn = formatDate(checkInDate);
  const checkOut = formatDate(checkOutDate);

  const message = `Halo Admin Ian Apartement, saya ingin menyewa unit *${apartmentName}* (${unitType || "Studio"}) di Sidoarjo.
Rencana sewa: ${rentType || "Harian"} (Periode: ${checkIn} s/d ${checkOut}).`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Membuat link WhatsApp langsung untuk Card katalog
 * Format: https://wa.me/6289678449424?text=Halo%20Admin%20Ian%20Apartement,%20saya%20ingin%20menyewa%20unit%20[nama]
 */
export const getDirectWhatsAppLink = (nama) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Admin%20Ian%20Apartement,%20saya%20ingin%20menyewa%20unit%20${encodeURIComponent(nama)}`;
};
