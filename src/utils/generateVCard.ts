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
  const fileName = `${profile.fullName.replace(/\s+/g, "-")}.vcf`;
  
  // Create File object for Web Share API
  const file = new File([vcfContent], fileName, { type: "text/vcard" });
  
  // Try Web Share API (works well on Android and iOS)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${profile.fullName} - Contact`
      });
      return;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return; // User cancelled
      }
    }
  }
  
  // Fallback: traditional download
  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
