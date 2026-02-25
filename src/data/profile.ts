export const profile = {
  fullName: "Salvatore Musella",
  title: "Digital Product Manager",
  location: "Lugano, Switzerland",
  website: "https://salvatoremusella.com",
  whatsappE164: "+41799085728",
  whatsappLink: "https://wa.me/41799085728",
  email: "salvatore_musella@outlook.com",
  linkedinUrl: "https://www.linkedin.com/in/salvatoremusella",
  photoUrl: "/avatar-optimized.webp",
} as const;

export type Profile = typeof profile;
