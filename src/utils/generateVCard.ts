import { profile } from "@/data/profile";

export function generateVCard(): string {
  const [firstName, ...lastNameParts] = profile.fullName.split(" ");
  const lastName = lastNameParts.join(" ");
  
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.fullName}`,
    `N:${lastName};${firstName};;;`,
    `TITLE:${profile.title}`,
    `TEL;TYPE=CELL:${profile.whatsappE164}`,
    `EMAIL:${profile.email}`,
    `URL:${profile.website}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedinUrl}`,
    "END:VCARD",
  ];
  
  return lines.join("\r\n");
}

export function downloadVCard(): void {
  const vcfContent = generateVCard();
  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "Salvatore-Musella.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
