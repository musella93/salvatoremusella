import avatarImg from "@/assets/avatar.jpg";

export const profile = {
  fullName: "Salvatore Musella",
  title: "Digital Product Manager",
  location: "Lugano, Switzerland",
  website: "https://salvatoremusella.com",
  whatsappE164: "+393924499458",
  whatsappLink: "https://wa.me/393924499458",
  email: "salvatore_musella@outlook.com",
  linkedinUrl: "https://www.linkedin.com/in/salvatoremusella",
  photoUrl: avatarImg,
} as const;

export type Profile = typeof profile;
