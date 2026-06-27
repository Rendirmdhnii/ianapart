// Data asli Ian Apartement Sidoarjo (Edisi 5 Unit).
// Etalase katalog online sewa apartemen Sidoarjo.

export const APARTMENTS = [
  {
    id: 1,
    nama: "Apartemen Prospero",
    name: "Apartemen Prospero",
    nama_unit: "Apartemen Prospero",
    kategori: "Prospero",
    harga: "Mulai Rp 350.000 / malam",
    location: "Kahuripan Nirwana, Sidoarjo",
    address: "Apartemen Prospero, Jl. Kahuripan Nirwana, Entalsewu, Buduran, Sidoarjo, Jawa Timur 61252",
    type: "Studio",
    size: 22,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.8,
    reviewsCount: 32,
    popular: true,
    price: {
      harian: 350000,
      bulanan: 4500000,
      tahunan: 45000000
    },
    facilities: ["WiFi", "AC", "Kolam Renang", "Parkir", "Security 24h"],
    description: "Hunian tipe studio yang nyaman dan modern di Apartemen Prospero. Terletak di kawasan terpadu Kahuripan Nirwana Sidoarjo yang tenang, asri, dan bebas macet. Unit dalam kondisi bersih, full furnished, lengkap dengan perabotan berkualitas. Sangat cocok untuk sewa harian maupun bulanan.",
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2d812ca5?w=800&q=80"
    ]
  },
  {
    id: 2,
    nama: "Type 2bedroom",
    name: "Type 2bedroom",
    nama_unit: "Type 2bedroom",
    kategori: "Suncity",
    harga: "Rp 600.000 / malam",
    location: "Suncity Residence, Sidoarjo",
    address: "Suncity Residence Apartment, Jl. Pahlawan No.1, Sidokumpul, Kec. Sidoarjo, Sidoarjo, Jawa Timur 61212",
    type: "2BR",
    size: 42,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.9,
    reviewsCount: 48,
    popular: true,
    price: {
      harian: 600000,
      bulanan: 7500000,
      tahunan: 75000000
    },
    facilities: ["WiFi", "AC", "Kolam Renang", "Gym", "Parkir", "Dapur", "Security 24h", "Kulkas", "TV"],
    description: "Apartemen mewah 2 Kamar Tidur (2 Bedroom) di Suncity Residence Sidoarjo. Lokasi premium terintegrasi langsung dengan Suncity Mall dan Waterpark Sidoarjo. Unit berdesain modern, luas, bersih, dan dilengkapi dapur fungsional serta ruang tamu mini.",
    image_url: "https://images.unsplash.com/photo-1502672260266-1c1de24227e5?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1de24227e5?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"
    ]
  },
  {
    id: 3,
    nama: "Studio 1053b",
    name: "Studio 1053b",
    nama_unit: "Studio 1053b",
    kategori: "Suncity",
    harga: "Rp 350.000 / malam",
    location: "Suncity Residence, Sidoarjo",
    address: "Suncity Residence Apartment, Unit 1053b, Jl. Pahlawan No.1, Sidokumpul, Kec. Sidoarjo, Sidoarjo, Jawa Timur 61212",
    type: "Studio",
    size: 24,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    reviewsCount: 26,
    popular: false,
    price: {
      harian: 350000,
      bulanan: 4200000,
      tahunan: 42000000
    },
    facilities: ["WiFi", "AC", "Kolam Renang", "Gym", "Parkir", "Security 24h", "Kulkas", "Smart TV"],
    description: "Sewa harian/bulanan apartemen tipe studio di Suncity Residence Sidoarjo. Unit no. 1053b ini menawarkan suasana menginap yang nyaman dengan ranjang empuk kualitas hotel, Smart TV, AC dingin, dan kulkas. Memiliki akses lift privat ke Suncity Mall.",
    image_url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    ]
  },
  {
    id: 4,
    nama: "Studio",
    name: "Studio",
    nama_unit: "Studio",
    kategori: "Suncity",
    harga: "Rp 350.000 / malam",
    location: "Suncity Residence, Sidoarjo",
    address: "Suncity Residence Apartment, Jl. Pahlawan No.1, Sidokumpul, Kec. Sidoarjo, Sidoarjo, Jawa Timur 61212",
    type: "Studio",
    size: 24,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    reviewsCount: 39,
    popular: false,
    price: {
      harian: 350000,
      bulanan: 4000000,
      tahunan: 40000000
    },
    facilities: ["WiFi", "AC", "Kolam Renang", "Gym", "Parkir", "Security 24h", "TV"],
    description: "Sewa unit tipe Studio di Suncity Residence Sidoarjo. Unit nyaman, bersih, ber-AC dingin, dilengkapi Wi-Fi cepat, TV, serta akses fasilitas olahraga eksklusif.",
    image_url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
    ]
  },
  {
    id: 5,
    nama: "Type Studio",
    name: "Type Studio",
    nama_unit: "Type Studio",
    kategori: "Suncity",
    harga: "Rp 350.000 / malam",
    location: "Suncity Residence, Sidoarjo",
    address: "Suncity Residence Apartment, Jl. Pahlawan No.1, Sidokumpul, Kec. Sidoarjo, Sidoarjo, Jawa Timur 61212",
    type: "Studio",
    size: 24,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.6,
    reviewsCount: 18,
    popular: false,
    price: {
      harian: 350000,
      bulanan: 4000000,
      tahunan: 40000000
    },
    facilities: ["WiFi", "AC", "Kolam Renang", "Parkir", "Security 24h", "TV"],
    description: "Pilihan sewa tipe Studio di Suncity Residence Sidoarjo. Dilengkapi dengan perabotan standar, kasur nyaman, AC dingin, Wi-Fi gratis, TV layar datar, dan kamar mandi bersih.",
    image_url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80"
    ]
  }
];

export const PROMOS = [
  {
    id: "promo-1",
    title: "Sewa Harian Sidoarjo",
    description: "Sewa unit apartemen Sidoarjo harian dengan kenyamanan dan kualitas hotel bintang 5.",
    code: "PREMIUMDAILY",
    discount: "Hemat",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80"
  }
];
