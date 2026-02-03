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

export async function downloadVCard(): Promise<void> {
  const vcfContent = generateVCard();
  
  // Create File object (required for navigator.share)
  const file = new File([vcfContent], "Salvatore-Musella.vcf", {
    type: "text/vcard"
  });
  
  // Try Web Share API (works well on Android and iOS)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "Salvatore Musella - Contatto"
      });
      return; // Share successful
    } catch (error) {
      // User cancelled or error: fallback to download
      if ((error as Error).name === 'AbortError') {
        return; // User cancelled, do nothing
      }
    }
  }
  
  // Fallback: traditional download
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
