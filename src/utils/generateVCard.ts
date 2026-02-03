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
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `URL:${profile.website}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedinUrl}`,
    `NOTE:Added from salvatoremusella.com`,
    "END:VCARD",
  ];
  
  // Use CRLF line endings as per vCard spec
  return lines.join("\r\n");
}

export async function addToContacts(): Promise<void> {
  const vcfContent = generateVCard();
  
  // Create blob with vCard MIME type
  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const file = new File([blob], "Salvatore-Musella.vcf", { 
    type: "text/vcard;charset=utf-8" 
  });

  // 1. Try native share API (works well on Android and some iOS versions)
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      await navigator.share({ 
        files: [file], 
        title: "Salvatore Musella Contact" 
      });
      return;
    }
  } catch (err) {
    // User cancelled share
    if ((err as Error).name === "AbortError") {
      return;
    }
    // Share failed, continue to fallback
    console.log("Share API not available, using download fallback");
  }

  // 2. Fallback: Direct download with <a> element
  // This works reliably on iOS Safari and triggers "Open in Contacts" prompt
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = "Salvatore-Musella.vcf";
  
  // iOS Safari needs the link in DOM
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, 100);
}
